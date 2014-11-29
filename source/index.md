---
title: OAuth.io API Reference

language_tabs:
  - javascript: Javascript
  - objectivec: iOS
  - java: Android
  - php: PHP
  - javascript: Node
  - go: Go

toc_footers:
  - <a href='https://oauth.io'>Back to OAuth.io</a>
  - <a href='https://oauth.io/signup'>Sign Up for a Developer Key</a>
  - <a href='http://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:

search: true
---

# Introduction

<div class="code-block"><pre><code class="highlight plaintext"> _____  _____         _    _                
(  _  )(  _  )       ( )_ ( )       _       
| ( ) || (_) | _   _ | ,_)| |__    (_)   _  
| | | ||  _  |( ) ( )| |  |  _ `\  | | /'_`\
| (_) || | | || (_) || |_ | | | |  | |( (_) )
(_____)(_) (_)`\___/'`\__)(_) (_)()(_)`\___/
</code></pre></div>

OAuth.io helps you to emboard your users with a suite of services easy to use.

- **Token API**: Authorize your user on one of our 120+ OAuth provider.

- **Request API**: Make authorized API calls to those OAuth providers in a simple way.

- **User Data API**: Get the unified user's information of your users.

- **User Management API**: Signup/signin your user without any backend using multiple social identity.

<aside class="success">To use these APIs, you need to have an account on [OAuth.io](https://oauth.io).</aside>

# Installation

## Download the SDK

<div class="code-block Javascript"><pre><code class="highlight bash">#For Web app
bower install oauth.io

#Or for mobile app (using Phonegap)
phonegap plugin install https://github.com/oauth-io/oauth-phonegap</code></pre></div>

To ease your integration, SDKs are available in lots of language:

- Javascript
- Phonegap
- iOS
- Android
- PHP
- Node.js
- Go

## Install the SDK

<div class="code-block Javascript Phonegap"><pre><code class="highlight html">&lt;script src="path/to/oauth.js"&gt;&lt;/script&gt;</code></pre></div>

To install the SDK, you just need to load it in your source code.

<div class="code-block Javascript Phonegap"><pre><code class="highlight javascript">// Initialize the SDK
OAuth.initialize('Your-public-key')</code></pre></div>

When you create an OAuth.io application in your dashboard, it generates a pair of public key, private key. Initialize the SDK using them.

<aside class="notice">Client-side SDKs (Javascript, Phonegap/Cordova, Android, iOS) only need the public key for the initialization</aside>

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

# Request API

The Request API allow you to make easily API calls to the OAuth provider your user is authorized to. You can perform classic HTTP calls using GET, POST, PUT, DELETE, PATCH

## GET

Allows you to perform `GET` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, we already know the domain.|string|/api/endpoint

## POST

Allows you to perform `POST` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, we already know the domain.|string|/api/endpoint
params|A jQuery type object for an ajax request, which can contain the data, to send POST params.|Object|{data:{field:'value'}}

## PUT

Allows you to perform `PUT` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, we already know the domain.|string|/api/endpoint
params|A jQuery type object for an ajax request, which can contain the data, to send POST params.|Object|{data:{field:'value'}}

## DELETE

Allows you to perform `DELETE` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, we already know the domain.|string|/api/endpoint

## PATCH

Allows you to perform `PATCH` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, we already know the domain.|string|/api/endpoint
params|A jQuery type object for an ajax request, which can contain the data, to send POST params.|Object|{data:{field:'value'}}


# User Data API

## Usage

<div class="code-block Javascript Phonegap"><pre><code class="highlight javascript">res = OAuth.create('facebook');
res.me().done(function(me) {
  alert('Hello ' + me.name);
}).fail(function(err) {
  //todo when the OAuth flow failed
});</code></pre></div>

This API allow you to retrieve your user's data in a unified way. That mean you don't have to make a bridge between APIs to retrieve user's info, all field sent are unified and described here. Filters can be added to retrieve a subset of these unified fields.

The endpoint is accessible using REST

`GET https://oauth.io/auth/:provider/me`

## Fields

<div class="code-block Javascript Phonegap"><pre><code class="highlight json">{
  "id": "1234",
  "name": "John Doe",
  "firstname": "John",
  "lastname": "Doe",
  "alias": "john87",
  "email": "john@doe.com",
  "birthdate": {
    "day": 27,
    "month": 11,
    "year": 1987
  },
  "raw": {
    [RAW RESULT]
  }
}
</code></pre></div>


Field|Description|Type|Example value
-----|-----------|----|-------------
id|The user id -- This id is unique for a provider|string|"1234"
name|The user's name|string|John Doe
firstname|The user's firstname|string|John
lastname|The user's lastname|string|Doe
alias|The user's alias (or login)|string|john87
email|The user's email address|string|john@doe.com
birthdate|The user's birthday|Object|{day: 27, month: 11, year: 1987}
gender|The user's gender. 0: male; 1: female|integer|0
location|The user's last location|string|San Francisco
local|The user's local|string|FR
company|The user's company|string|Webshell
occupation|The user's job occupation|string|developer
raw|The unmodified provider's response with non unified field|Object|

# User Management API

## Installation

You need to enable the User Management feature in your OAuth.io dashboard in the `users` tab. For that, you need to get API Key from stormpath and copy paste them in OAuth.io.

<aside class="notice">This feature is in BETA, don't hesitate to give your feedback. During this period, only the Javascript SDK can use this API but others SDKs are in the roadmap.</aside>

## Signup your user

<div class="code-block Javascript"><pre><code class="highlight javascript">User.signup(data).done(function(user) {
    //todo with `user`
});

User.signup({
   email: 'john.doe@gmail.com',
   password: 'St0ngP4ssw0rd!',
   firstname: 'John',
   lastname: 'Doe',
   company: 'X Corp',
   age: 47
}).done(function(user) {
   //here, your user is logged in
   console.log(user.data.firstname);
}).fail(function(err) {
   //todo with `err`
});
</code></pre></div>

### With email/password

You can sign up you users using their email/password, this user will be store in Stormpath.

`data` is an object that must contains:

* email
* password
* firstname
* lastname

You can add other data if you wish (free structure).

<br style="clear:both;">
<div class="code-block Javascript"><pre><code class="highlight javascript">OAuth.popup(provider).then(function(res) {
    return User.signup(res)
}).done(function(user) {
   //here, your user is logged in
   console.log(user.data.firstname);
}).fail(function(err) {
   //todo with `err`
});
</code></pre></div>

### With social logins

You can also use the Token API to sign up your users with their social identity. `provider` is the name of a provider on OAuth.io as `facebook`, `twitter`, `google` and 100+ others.

The provider need to have the User API enabled to work properly (you can see it when you add a new provider in your OAuth.io Dashbaord).

<br style="clear:both;">
<div class="code-block Javascript"><pre><code class="highlight javascript">OAuth.popup('twitter').then(function(twitter) {
    twitter.email = "john.doe@gmail.com";
    return User.signup(twitter);
}).done(function(user) {
    //todo with `user`
});
</code></pre></div>

### Handling errors

Some provider don't give their user's email in their API (it's the case of Twitter for instance). So, you have to ask your user his email manually and setup the email.

## Signin your users

Once your user has signed up, you can login them with their email password or with one of the social identity the user attached to his account.

OAuth.io manage your user's session for you and give a simple API to let you know if the user is still logged in or not.

During the beta, the session expires after 6h of inactivity but we are working to make this expiration configurable.

<div class="code-block Javascript"><pre><code class="highlight javascript">User.signin(email, password).done(function(user) {
    console.log(user.data.firstname);
}).fail(function(err) {
    // email/password incorrect.
});</code></pre></div>

### With email/password

<br style="clear:both">

<div class="code-block Javascript"><pre><code class="highlight javascript">OAuth.popup(provider).then(function(res) {
    return User.signin(res);
}).done(function(user) {
    console.log(user.data.firstname);
}).fail(function(err) {
    //todo with err
});
</code></pre></div>

### With social logins

Note: For social login, the signin and signup are exactly the same functionality. If the user doesn't exist, it will automatically signup the user before to signin him.

## Get the connected user

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
</code></pre></div>

### From cache

<br style="clear:both">
<div class="code-block Javascript"><pre><code class="highlight javascript">User.refreshIdentity().done(function(user) {
    //todo with `user`
})</code></pre></div>

### From the API

## Know if the user is authenticated

<div class="code-block Javascript"><pre><code class="highlight javascript">if (User.isLogged()) {
    //todo with authenticated user
}
else {
    //todo with unauthenticated user
}</code></pre></div>

## Update your user data

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity()
user.data.firstname = 'Thomas';
user.data.someData = {
    a: 42,
    b: "some string"
}
user.save().done(function() {
    //todo when saved
}).fail(function(err) {
    //handle `err``
});</code></pre></div>

You can update all your user data and then, once you are done, just use the `save()` method to save your changes in Stormpath. Fields has free structure so you can name them as you wish (just few fields name are protected for our use: `_provider_*`).

## Reset password (or lost password)

<div class="code-block Javascript"><pre><code class="highlight javascript">User.resetPassword(email).done(function() {
    //email sent to the user containing a key
});

//then...
User.confirmResetPassword(newPassword, key);
</code></pre></div>


## Change password

> Coming soon

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
user.changePassword(oldPassword, newPassword);
</code></pre></div>

## Attach social identity to an account

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
OAuth.popup('google').then(function(google) {
   return user.addProvider(google);
}).done(function() {
   //provider attached
   //Your user are now able to signin with Google
});</code></pre></div>

## Remove social identity to an account

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
user.removeProvider('google').done(function() {
   //provider detached
   //Your user are now able to signin with Google
});</code></pre></div>


## The list of providers attached to an account

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
console.log(user.providers)
</code></pre></div>

### From cache

When a user logged in, we store a local version of the providers list attached to this user so you can access it directly in the `user` object.

<br style="clear:both;">
<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
user.getProviders().done(function(providers) {
   console.log(providers);
});</code></pre></div>

### From the API

You can also get the list from the API to be sure it's synchronized with the backend.

## Logout

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
user.logout().done(function() {
   //todo when logout
});</code></pre></div>

You can logout your user from your application user the `logout()` method. It will clear the session and all the cache associated with this user.

# Contribute

You can contribute by cloning our OAuthd repository on GitHub and making a pull request.

## Issues

If you have any issue using OAuth.io, you can:

* Open a QA on [StackOverflow](http://stackoverflow.com/) (with the mention of OAuth.io in the title).

* Open a [GitHub issue](https://github.com/oauth-io) on the appropriate repository.

* If the content is private, feel free to send us an email on [support@oauth.io](mailto:support@oauth.io)

* You can ping us on Twitter with the mention [@oauth_io](https://twitter.com/oauth_io)

We try to be reactive on every channel!

## Adding Providers to OAuth.io

It's easy to add new OAuth providers in OAuth.io using our configuration file format.

The format is [explained here](https://github.com/oauth-io/oauthd/wiki/Specs:-Provider's-configuration) and you can find all existing OAuth providers on our [GitHub repository](https://github.com/oauth-io/oauthd/tree/master/providers).

Once you've implemented your provider, you can test it using [oauthd](https://github.com/oauth-io/oauthd), the opensource version of OAuth.io and then, just pull request it and we'll merge it into OAuth.io as soon as we can.

A provider contains 4 simple files:

* __your_provider.json__ The OAuth provider's JSON file (e.g. facebook.json)
* __settings.json__ - Some settings for users who want to add the OAuth provider in OAuth.io (e.g. the link and screenshot where developers can create an application with your provider)
* __logo.png__ - The logo of the OAuth provider
* __me.js__ (optional) - A file used to retrieve the user information in a unified way.



## Pull request (bug fixes / providers / typos)

You're welcome to fork our repositories on GitHub to make pull requests. We'll review each of them, and integrate them in a future release, if they are relevant.

In every repository, we have included notes in the README file to show you how to test your feature.

### OAuthd

Fork [the repository](https://github.com/oauth-io/oauthd) to implement your feature / bug fixes.

Then you can run the local server using `grunt server` to try it. From there, you can start the test suite using `grunt test`.

### SDKs

You can fork all the SDKs from GitHub in your favorite language. Every SDK (except iOS for the moment) has a test suite than can be launched in a standard way to try your feature / bug fixes.
