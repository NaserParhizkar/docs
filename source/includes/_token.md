# Token API

The Token API let you authorize your user with one of our 120+ providers. The most known example is to add a Facebook connect to your website to ease the emboarding of your user.

You can get this authorization client-side or server-side depending your needs.

## Client side authorization

<div class="code-block PHP Node Go"><pre>The client side authorization section is not available for the selected SDK.
</pre></div>

<aside class="notice">The client side authorization can be made only by one of these client-side SDKs: Javascript, Phonegap, iOS, Android</aside>

### Configuration

To authorize your users using OAuth.io, you just need to add a provider to your OAuth.io app and copy paste your provider's API Keys. Once added, you can try if the provider works by clicking on the `Try auth` button.

<div class="code-block Javascript Phonegap"><pre><code class="highlight javascript">//Example with Facebook
OAuth.popup('facebook').done(function(facebook) {
  //make API calls with `facebook`
}).fail(function(err) {
  //todo when the OAuth flow failed
});</code></pre>
<pre><code class="highlight javascript">//Example with Twitter with the cache option enabled
OAuth.popup('twitter', {cache: true}).done(function(twitter) {
  //make API calls with `twitter`
}).fail(function(err) {
  //todo when the OAuth flow failed
})</code></pre></div>

### Using popup (Javascript SDK only)

This mode ask the user's authorization in a simple popup. You can send multiple option to customize it.

Options|Description|Type|Default value
-------|-----------|----|-------------
cache|If set to true, when the popup is called, it will directly return the cached credentials (if available) instead of showing a popup everytime the user logs in. That is to say, once the user has seen the popup once, his credentials are kept in the browser local storage.|boolean|false
authorize|Some OAuth provider let developers send parameters to customer the authorization popup|Object|null

<br style="clear:both;">
<div class="code-block Javascript Phonegap"><pre><code class="highlight javascript">//Example with Google
OAuth.redirect('google', 'http://localhost/callback');</code></pre>
<pre><code class="highlight javascript">//in your callback page (can be the same page)
OAuth.callback('google').done(function(google) {
  //make API calls with `google`
}).fail(function(err) {
  //todo when the OAuth flow failed
})</code></pre></div>

### Using redirection

Redirects to the provider's login page, where the user can accept your app's permissions. Once the user accepts the permissions, they are redirected to the callback URL.

## Server side authorization

The server side authorization is mostly use to get a refresh token and make action on behalf of your user when they are not online on your website (for instance, crawl your user's feed and update them everyday even if the user is not connected).

### Configuration

As for the client side authorization, you need to add a provider to your OAuth.io app and copy paste your provider's API keys. But this time, you have to select a backend in your oauth.io app, like that, only server side authorization will be allowed.

You can also set the both mode to get a copy of the access_token client side too (and use all of the results method).

### Redirect

This method is the simplest if you are using the server side authorization only (without using the access_token client side).

You just need to define 2 endpoints, the first is used for the login, the second for the callback after the authorization.

### Popup

This method is a bit longer than the redirect one. This can be done in 3 steps:

* Generate a state token in your backend

* Authorize your user with a client side SDK using the state token (you will receive a code instead of an access_token)

* Exchange the code against the access_token and refresh_token server side

## OAuth result

<div class="code-block Javascript Phonegap iOS Android"><pre><code class="highlight json">with Facebook (OAuth 2)
{
  "access_token": "CAAHv0hYN...RmO4zcd",
  "expires_in": 5183561,
  "provider": "facebook"
}</code></pre>
<pre><code class="highlight json">with Twitter (OAuth 1.0a)
{
  "oauth_token": "9568514...0AQMedh",
  "oauth_token_secret": "Ktakg008...60KSNG4",
  "provider": "twitter"
}</code></pre>
<pre><code class="highlight json">with Google using the server side flow
{
  "code": "XsrpW...leE3",
  "provider": "twitter"
}</code></pre></div>

The results object after an authorization will contains these fields:

Field|Description|Type|Example value
-----|-----------|----|-------------
access_token|**OAuth 2** -- The authorization key to access the OAuth2 API|string|CAAHv...aAWy
oauth_token|**OAuth 1** -- The authorization key to access the OAuth1 API|string|XVQpX...WR0K
oauth_token_secret|**OAuth 1** -- The second authorization key to access OAuth1 API|string|PHQD2...V7xw
expires_in|*Optional depending the provider* -- The expiration of the `access_token`|integer|5184000
code|**Server side authorization** -- The code to be exchanged against the access token server side|string|XsrpW...leE3
provider|The provider your user is connected with|string|facebook

The access token can be sent to your backend to make API calls but, you can't be sure that the access token is a real one (as the user could fake a request with a wrong access token) so you need to make a test API call and see if it returns 200 (OK) or 401 (UNAUTHORIZED).

As you can see, using the client side authorization, you won't have a `refresh_token`. For this, take a look at the `Server side authorization` section

<aside class="notice">The result contains also some methods to access others OAuth.io APIs:

* `get()` `post()` `put()` `del()` `patch()` - Request API

* `me()` - User Data API

* `login()` - User Management API
</aside>

## Use the cache option

<div class="code-block Javascript Phonegap"><pre><code class="highlight javascript">//Example with Twitter with the cache option enabled
OAuth.popup('twitter', {cache: true}).done(function(twitter) {
  //make API calls with `twitter`
}).fail(function(err) {
  //todo when the OAuth flow failed
})</code></pre></div>

### Save your user's authorization in the cache

If the cache option is enabled, when the popup is called, it will directly return the cached credentials (if available) instead of showing a popup everytime the user logs in. That is to say, once the user has seen the popup once, his credentials are kept in the browser local storage for Client side SDK (Javascript, Phonegap, iOS, Android) and in the session for Server side SDK (PHP, Node.js, Go).


<div class="code-block Javascript Phonegap"><pre><code class="highlight javascript">var twitter = OAuth.create('twitter');
//`twitter` is an OAuth result.
//`twitter` can be `null` if the OAuth result has not been created yet.
</code></pre></div>



### Create an OAuth result from Cache

Once an OAuth result has been cached, you can re-create the OAuth result from it (later or in another page for instance). 

Note that you can also create an OAuth result from existing credentials if needed.

<div class="code-block Javascript Phonegap"><pre><code class="highlight javascript">//clear the cache for Facebook
OAuth.clearCache('facebook');
//remove all the cache
OAuth.clearCache();
</code></pre></div>

### Clear the cache

You can of course remove partially or totally the cache generated by OAuth.io. Note that it can be used when you want to logout your user to be sure it will open the popup the next time the user try to login.

## Refresh the access token

For most provider, the server side authorization without any configuration send back a refresh token. The refresh token is added to the result on a server side authorization only.

This refresh token can be used when an access token expires to regenerate one without having to open a popup and ask your user for permissions (as the user has already accepted them).

In all our server side SDK, a method is available to refresh the access token easily. It gives back a new OAuth object containing a fresh access token.
