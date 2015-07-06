# Token API - Client side

The Token API lets you authorize your app on behalf of your users on one of our 120+ API providers. The best known example is to add a Facebook connect to your website to ease the user's onboarding.

You can perform this authorization either client-side or server-side, depending your needs.

<div class="code-block Node"><pre>The Client side section is not available for this SDK</pre></div>

<aside class="notice">The client side authorization can be made only by one of these client-side SDKs: Javascript, Phonegap, iOS, Android</aside>

## Configuration

To authorize your app using OAuth.io, you just need to add a provider to your OAuth.io app, copy/paste your provider's API Keys (usually client_id and client_secret), and specify a permission scope. Then, you can directly try a connection to the provider, by clicking on the `Try auth` button.

## Authorize with a popup

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
})</code></pre>
</div>

<div class="code-block iOS">
  <pre>In the OAuthIODelegate class, you can call the showWithProvider method, which shows a popup.
</pre>
  <pre><code class="highlight iOS objectivec">
//Example with Twitter with no cache options
[_oauthioModal showWithProvider:@"twitter"];</code></pre>
<pre><code class="highlight iOS objectivec">
//On success, the didReceiveOAuthIOResponde delegate method is called:
- (void)didReceiveOAuthIOResponse:(OAuthIORequest *)request
{
    // Here you can use the request object to make requests directly
    // or store it for later use (e.g. when a button is pressed)
    _request_object = request;
}
  </code></pre>
</div>

<div class="code-block Android">
<pre><code class="highlight java">
oauth.popup("facebook", new OAuthCallback() {
    @Override
    public void onFinished(OAuthData data) {
        if (data.status.equals("error"))
            activity.displayError(data.error);
        else {
            // Do API calls with data
        }
    }
});
</code></pre>
</div>

This mode asks the user's authorization in a simple popup.
This gives you a request object, which allows you to perform API calls, or to retrieve the credentials (i.e. access or oauth tokens).

You can send multiple options to customize it.

Options|Description|Type|Default value
-------|-----------|----|-------------
cache|If set to true, when the popup is called, the SDK will directly return the cached credentials (if available) through a "request object" instead of showing a popup everytime the user logs in. That is to say, once the user has seen the popup on his browser, his credentials are kept in the local storage.|boolean|false
authorize|Some OAuth providers let developers send parameters to customize the authorization popup|Object|null

## Authorize with redirection

<div class="code-block Javascript Phonegap">
  <pre><code class="highlight javascript">//Example with Google
OAuth.redirect('google', 'http://localhost/callback');</code></pre>
  <pre><code class="highlight javascript">//in your callback page (can be the same page)
OAuth.callback('google').done(function(google) {
  //make API calls with `google`
}).fail(function(err) {
  //todo when the OAuth flow failed
})</code></pre>
</div>

Redirects to the provider's login page, where the user can accept your app's permissions. Once he/she accepts them, he/she is redirected to the callback URL.

<br style="clear:both">

## Caching the request object

Client-side SDKs allow you to cache the credentials (i.e. access tokens) to not have to show the popup everytime you need the access token.

<div class="code-block Javascript Phonegap">
  <pre><code class="highlight javascript">//Example with Twitter with the cache option enabled
OAuth.popup('twitter', {cache: true}).done(function(twitter) {
  //make API calls with `twitter`
}).fail(function(err) {
  //todo when the OAuth flow failed
})</code></pre>
</div>

<div class="code-block iOS">
  <pre><code class="highlight objectivec">//Example with Twitter with the cache option enabled
NSMutableDictionary *options = [[NSMutableDictionary alloc] init];
[options setObject:@"true" forKey:@"cache"];
[options setObject:@"true" forKey:@"clear-popup-cache"]; // prevents the webview from keeping cookies
[_oauthioModal showWithProvider:@"twitter" options:options];</code></pre>
</div>

### Save your user's authorization in the cache

If the cache option is enabled, when the popup is called, it will directly create a request object from the cached credentials (if available) instead of showing a popup everytime the user logs in. That is to say, once the user has seen the popup once, his credentials are kept in the browser local storage for Javascript/Phonegap SDK and in the mobile with iOS and Android.

<div class="code-block Javascript Phonegap">
  <pre><code class="highlight javascript">var twitter = OAuth.create('twitter');
//`twitter` is a request object.
//`twitter` can be `null` if the request object has not been created yet.</code></pre>
</div>

<div class="code-block Node">
  <pre><code class="highlight javascript">var twitter = OAuth.create('twitter');
//`twitter` is a request object.
//`twitter` can be `null` if the request object has not been created yet.</code></pre>
</div>

### Creating a request object from Cache

Once credentials have been cached, you can re-create the request object from them (later or in another page for instance).

Note that you can also create a request object from existing credentials if needed.

### Clearing the cache

<div class="code-block iOS">
  <pre><code class="highlight objectivec">//clear the cache for all providers
[oauthioModal clearCache];
//clear the cache for facebook
[oauthioModal clearCacheForProvider:@"facebook"];</code></pre>
</div>

<div class="code-block Javascript Phonegap">
  <pre><code class="highlight javascript">//clears the cache for Facebook
OAuth.clearCache('facebook');
//removes cache for all providers
OAuth.clearCache();</code></pre>
</div>

You can of course partially or totally remove the cache generated by OAuth.io. Note that it can be used when you want to logout your users to be sure it will open the popup the next time they try to login.

# Token API - Server side

The server side authorization is mostly used to get a refresh token and perform actions on behalf of your user when they are not online and connected on your website / app (for instance, crawl your user's feed and update it everyday even if the user is not connected).

## Configuration

In the same way as for the client-side authorization, you need to add a provider to your OAuth.io app and copy paste your provider's API keys. But this time, you have to select a backend in your oauth.io app. This way, only server side authorization will be allowed.

You can also set the both mode to get a copy of the access_token client side too (and use all of the results method).

## Simple server-side authorization

<div class="code-block Node">
  <pre><code class="highlight javascript">// Syntax
app.get(authorizeEndpoint, OAuth.auth(provider, urlToRedirect));
app.get(redirectEndpoint, OAuth.redirect(function(result, req, res) {
    //todo with result
}));

// Example with Linkedin
app.get('/signin', OAuth.auth('linkedin', 'http://localhost:8080/oauth/redirect'));

app.get('/oauth/redirect', OAuth.redirect(function(result, req, res) {
    if (result instanceof Error) {
        res.send(500, "error: " + result.message);
    }
    result.me().done(function(me) {
        console.log(me);
        res.send(200, JSON.stringify(me));
    });
}));</code></pre>
</div>

<div class="code-block PHP">
  <pre style="padding-bottom: 0px"><code class="highlight php">
//Syntaxe
//in the Authorize endpoint
$oauth->redirect(provider, urlToRedirect);

//in the Redirect endpoint
$oauth->auth(provider, array('redirect' => true));

<hr style="border:0px solid black; background-color: #666; height: 1px">
// Exemple with Google (using ZendFramwork, Controller /oauth)
// Action /signin (url: /oauth/authorize)
public function signinAction() {
    try {
        $this->oauth->redirect('google', '/oauth/redirect');
    } catch (\Exception $e) {
        echo $e->getMessage();
    }
}

// Action /redirect (url: /oauth/redirect)
public function redirectAction() {
    try {
        $request_object = $this->oauth->auth('google', array(
            'redirect' => true
        ));
    } catch (\Exception $e) {
        die($e->getMessage());
    }
    //Your user is authorized by Google
    //You can use $request_object to make API calls on behalf of your user
}
</code></pre>
  <pre style="margin-top: 0px; padding-top: 0"><code class="highlight html">
<hr style="border:0px solid black; background-color: #666; height: 1px">
&lt;!-- In your html --&gt;
&lt;a href="/oauth/signin"&gt;&lt;/a&gt;
  </code></pre>
</div>

<div class="code-block Javascript iOS Android">
  <pre>This feature is not supported by this SDK</pre>
</div>

This method is the simplest way to achieve a server-side authorization.

You need to define 2 endpoints:

- the first endpoint (`authorizeEndpoint`) is where you will redirect your users to authorize them to one of our 120+ OAuth `provider`

- then they will be redirected to the second endpoint (`redirectEndpoint`) with the `result` of the authorization in the callback.

In the HTML of your webapp, you just have to create a link to the first endpoint to start the authorization flow `<a href="/url/to/authorizeEndpoint">Signin</a>`

If an error occured, the error is placed in the `result`.

<br style="clear:both;">

## Authorizing the user with both front-end and back-end SDKs

<aside class="info">This authorization can be done by any backend (Ruby, Python, C# etc...) using REST.</aside>

This method is a bit longer than the redirect one but can be used by any backend. This can be done in 3 steps:

<div class="code-block Node">
  <pre><code class="highlight javascript">//Node.js
var token = OAuth.generateStateToken(req);
res.send(200, {token:token});</code></pre>
</div>

<div class="code-block PHP">
  <pre><code class="highlight php">
// Example with Zend - /state action, called from the frontend
// to get a code
public function tokenAction() {
    
    // This generates a token and stores it in the session
    $token = $this->oauth->generateStateToken();
    
    $array = array(
        'token' => $token
    );
    $json = new JsonModel($array);
    return $json;
}</code></pre>
</div>


* Generating a state token in your backend. Basically, it generates a unique id, stores it in session and sends it to the front.

<br style="clear:both;">
<div class="code-block Node PHP Go Javascript">
  <pre><code class="highlight javascript">//Javascript (client-side)
OAuth.popup(provider, {
  state: params.token
}).done(function(result) {
  $.post('/auth', {code: result.code})
})
</code></pre></div>

* Authorizing your user with a client side SDK using the state token (you will receive a code instead of an access_token).

<br style="clear:both;">
<div class="code-block Node">
  <pre><code class="highlight javascript">//Node.js
app.get('/auth', function(req, res) {
  OAuth.auth(provider, req.session, {
    code: JSON.parse(req.body).code
  }).then(function(oauthResult) {
    //todo with oauthResult
    //oauthResult.access_token oauthResult.refresh_token
  })
});</code></pre>
</div>

<div class="code-block PHP">
  <pre><code class="highlight javascript">
// PHP with Zend - endpoint on /auth
public function authAction() {
    try {
        $code = $this->getRequest()->getPost('code');
        $request_object = $this->oauth->auth('facebook', array(
            'code' => $code
        ));
        $credentials = $request_object->getCredentials();
        $json = new JsonModel(array('status' => 'success'));
        if (!isset($credentials['access_token']) && !isset($credentials['oauth_token'])) {
            $this->getResponse()->setStatusCode(400);
        }
        return $json;
    } catch (\Exception $e) {
        echo $e->getMessage();
    }
}</code></pre>
</div>

<div class="code-block Javascript iOS Android">
  <pre>POST https://oauth.io/auth/access_token
Body:
  code=ePLi3...EQfdq
  key=public_key
  secret=secret_key</pre>
</div>

* Finally, from your backend, send the code to OAuth.io to get the access_token and refresh_token. OAuth.io will also send back the state token that you have to manually check. It must be the same state token as the one stored in session in the 1st step -- **This is automatically done using a server-side SDK**.

## Request object from session

<div class="code-block Javascript iOS Android">
  <pre>This feature is not supported by this SDK</pre>
</div>

<div class="code-block Node">
  <pre><code class="highlight javascript">OAuth.auth('facebook', req.session)
  .then(function (request_object) {
    // call endpoints with request_object here, or save it for later use
  });
});</code></pre>
</div>

<div class="code-block PHP">
  <pre><code class="highlight php">
// Uses the $_SESSION array by default
$request_object = $this->oauth->auth('facebook');


// Note that you can specify another session array at initialization, for example:
$_SESSION['some_array'] = array();
$oauth->setSession($_SESSION['some_array']);
// Beware, the array is passed by reference, so you need to have a real grasp on the stored array
</code></pre>
</div>

Once a user has been authorized by a provider, he is stored in session by the SDK. This means you can recreate the request object from the session. If the request object has an `expires_in` field and the access token has expired, the SDK will automatically refresh the `access_token`.

## Building a request object from saved credentials

<div class="code-block PHP">
  <pre><code class="highlight php">
// Retrieve the credentials and save them
$credentials = $old_request_object->getCredentials();

// Later use these credentials to rebuild the request_object object
$new_request_object = $oauth->auth('twitter', array(
  'credentials' => $credentials
));
  </code></pre>
</div>

<div class="code-block Node">
  <pre><code class="highlight node">
// Retrieve the credentials and save them
var credentials = request_object.getCredentials();

// Later use these credentials to rebuild the request_object object
request_object = oauth.auth('twitter', {
  credentials: credentials
});
  </code></pre>
</div>

<div class="code-block Phonegap Javascript iOS">
  <pre>Not available for this SDK</pre>
</div>

For back end SDKs you can to rebuild the request object after having saved the credentials (set of access token, refresh tokens, etc.) manually.

## Refreshing the tokens

<div class="code-block Javascript iOS Android">
  <pre># Using a backend
https://oauth.io/auth/refresh_token/:provider
Body:
  token: REFRESH_TOKEN
  key: PUBLIC_OAUTHIO_KEY
  secret: SECRET_OAUTHIO_KEY</pre>
</div>
<div class="code-block Node">
  <pre><code class="highlight javascript">OAuth.refreshCredentials(oauthResult, req.session)
    .then(function(newOAuthResult) {
      //todo with newOAuthResult
    })
    .fail(function(e) {
      //handle an error
    });
});</code></pre>
  <pre><code class="highlight javascript">//or from session
OAuth.auth('facebook', req.session, {
  force_refresh: true
})</code></pre>
</div>

<div class="code-block PHP">
  <pre><code class="highlight php">
    // The auth method automatically refreshes the tokens if needed
    $request_object = $oauth->auth('facebook', array(
      'credentials' => $credentials
    ));
  </code></pre>
</div>

For most providers, the server side authorization sends back a refresh token without any specific configuration. The refresh token is added to the result on a server-side authorization only.

This refresh token can be used when an access token expires to regenerate one without having to open a popup and ask your user for permissions (as the user has already accepted them).

In all our server-side SDK, a method is available to manually refresh the access token. It gives back a new request object containing a fresh access token.

For the Google provider, it's a bit more complex. To get a refresh token, please follow this Stackoverflow link: [http://stackoverflow.com/questions/23759138/getting-refresh-tokens-from-google-with-oauth-io](http://stackoverflow.com/questions/23759138/getting-refresh-tokens-from-google-with-oauth-io)

# Request objects

<div class="code-block"><pre><code class="highlight json">with Facebook (OAuth 2)
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
<pre><code class="highlight json">with Google using the server side flow with a frontend SDK
{
  "code": "XsrpW...leE3",
  "provider": "google"
}</code></pre>
<pre><code class="highlight json">with Github using the server side flow in a backend SDK
{
  "provider": "github",
  "access_token": "akpWg0...QEof",
  "refresh_token": "HvOiruf...Zriv",
  "expires_in": 5183561
}</code></pre>
</div>

We call **request object** the result object you get after an authorization. It lets you access the tokens, expiry date etc. but also gives you simple methods to access others OAuth.io API (Make authorized API call to the provider, retrieve unified user data, and more). The request object will contains these fields:

Field|Description|Type|Example value
-----|-----------|----|-------------
access_token|**OAuth 2** -- The authorization key to access the OAuth2 API|string|CAAHv...aAWy
oauth_token|**OAuth 1** -- The authorization key to access the OAuth1 API|string|XVQpX...WR0K
oauth_token_secret|**OAuth 1** -- The second authorization key to access OAuth1 API|string|PHQD2...V7xw
expires_in|*Optional depending the provider* -- The expiration of the `access_token`|integer|5184000
code|**Client side only** -- The code to be exchanged against the access token **server side authorization**|string|XsrpW...leE3
refresh_token|**Server side only** -- The refresh token is used to refresh the access_token to extend the expiration.|string|Tgfgso|...Geo4e5
provider|The provider your user is connected with|string|facebook

The access token can be sent to your backend to make API calls but, you can't be sure that the access token is a real one (as the user could fake a request with a wrong access token) so you need to make a test API call and see if it returns 200 (OK) or 401 (UNAUTHORIZED).

As you can see, using the client side authorization, you won't have a `refresh_token`. For this, please take a look at the `Server side authorization` section.

<aside class="notice">OAuth.io SDKs will extend the result with some usefull methods to access others OAuth.io APIs:

* `get()` `post()` `put()` `del()` `patch()` - Request API

* `me()` - User Data API

* more soon

</aside>
