
# Request API

<div class="code-block Node">
  <pre><code class="highlight javascript">OAuth.auth(provider, req.session).then(function(oauthResult) {
  return oauthResult.get('/me')
}).then(function(data) {
  //data is the result of the request to /me
}).fail(function(err) {
  //handle an error
});</code></pre>
</div>

<div class="code-block PHP">
  <pre><code class="highlight php">
    $me = $request_object->get('/me');
  </code></pre>
</div>

<div class="code-block Javascript">
  <pre><code class="highlight javascript">OAuth.popup(provider).then(function(oauthResult) {
  return oauthResult.get('/me');
}).then(function(data) {
  // data is the result of the request to /me
}).fail(function(err) {
  // handle an error
});</code></pre>
</div>

<div class="code-block iOS">
  <pre><code class="highlight objectivec">
// In a <OAuthIODelegate>
- (void)didReceiveOAuthIOResponse:(OAuthIORequest *)request
{
    // The request object
    _request_object = request;
    
    // Making a request
    [_request_object get:@"/me" success:^(NSDictionary *output, NSString *body, NSHTTPURLResponse *httpResponse)
    {
        // logs the the user's information
        NSLog(@"%@", body); 
    }];
}
  </code></pre>
</div>

<div class="code-block Android">
  <pre><code class="highlight java">data.http("/me", new OAuthRequest() {
    @Override
    public void onSetURL(String _url) {
        // This method is called once the final url is returned.
    }

    @Override
    public void onSetHeader(String header, String value) {
        // This method is called for each header to add to the request.
    }

    @Override
    public void onReady() {
        // This method is called once url and headers are set.
    }

    @Override
    public void onError(String message) {
        // This method is called if an error occured
    }
});
  </code></pre>
</div>

The Request API allows you to easily perform authorized API calls to the OAuth provider from which you got a request object or credentials with the Token API. You can perform classic HTTP calls using GET, POST, PUT, DELETE, PATCH. OAuth.io will automatically fill all authorization parameters for you (OAuth1 signature, nonce, timestamp, access_token, oauth_token etc...). All the parameters in the request will be sent to the provider thanks to the oauth.io proxy.

<div class="code-block Android">
  <pre><code class="highlight java">data.http(new OAuthJSONRequest(OAuthJSONRequest.HTTP_GET, "/me"), new OAuthJSONCallback() {
    @Override
    public void onFinished(JSONObject data) {
      // data is the result of the request to /me
    }

    @Override
    public void onError(String message) {
      // handle an error
    }
});
  </code></pre>
</div>

<aside class="notice">For the Android SDK, you have two ways of using the request API: the generic way is by using the OAuthRequest interface to inject the parameters in your favorite http library. You can also use OAuthData.http to send basic json requests.</aside>

## GET

<div class="code-block Node">
  <pre><code class="highlight javascript">oauthResult.get(url).then(function(data) {
  //todo with data
}).fail(function(err) {
  //todo with err
});</code></pre>
</div>

<div class="code-block Javascript">
  <pre><code class="highlight javascript">oauthResult.get(url).done(function(data) {
  //todo with data
}).fail(function(err) {
  //todo with err
});</code></pre>
</div>

<div class="code-block PHP">
  <pre><code class="highlight php">
$me = $request_object->get('/me');
  </code></pre>
</div>

<div class="code-block iOS">
  <pre><code class="highlight objectivec">
// Making a request
[_request_object get:@"/me" success:^(NSDictionary *output, NSString *body, NSHTTPURLResponse *httpResponse)
{
    // logs the the user's information
    NSLog(@"%@", body); 
}];
  </code></pre>
</div>

<div class="code-block Android"><pre><code class="highlight java">// See http method</code></pre></div>

Allows you to perform `GET` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, the domain is already known|string|/api/endpoint?param=value

## POST

<div class="code-block Javascript">
  <pre><code class="highlight javascript">oauthResult.post(url, params).done(function(data) {
  //todo with data
}).fail(function(err) {
  //todo with err
});

// params has the same syntaxe as jQuery.ajax (http://api.jquery.com/jquery.ajax/)
//e.g Post a tweet on Twitter
oauthResult.post('/1.1/statuses/update.json', {
  data: {
    status: "hello world!"
  }
})</code></pre>
</div>

<div class="code-block Node">
  <pre><code class="highlight javascript">oauthResult.post(url, params).done(function(data) {
  //todo with data
}).fail(function(err) {
  //todo with err
});

//e.g Post a tweet on Twitter
oauthResult.post('/1.1/statuses/update.json', {
  status: "hello world!"
});</code></pre>
</div>

<div class="code-block PHP">
  <pre><code class="highlight php">
$request_object->post('/me/feed', array(
  'message' => 'Hello world'
));
  </code></pre>
</div>

<div class="code-block iOS">
  <pre><code class="highlight objectivec">
NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
[data setValue:@"Hello world" forKey:@"message"];
[_request post:@"/me/feed" withParams:data success:^(NSDictionary *output, NSString *body, NSHTTPURLResponse *httpResponse)
{
    NSLog(@"%@", body);
}];
  </code></pre>
</div>

<div class="code-block Android"><pre><code class="highlight java">// See http method</code></pre></div>

Allows you to perform `POST` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, the domain is already known|string|/api/endpoint
params|The parameters of the HTTP request|Object|

## PUT

<div class="code-block Javascript">
  <pre><code class="highlight javascript">oauthResult.put(url, params).done(function(data) {
  //todo with data
}).fail(function(err) {
  //todo with err
});

//e.g Merge a pull request on Github
oauthResult.put('/repos/oauth-io/oauthd/pulls/5/merge')</code></pre>
</div>

<div class="code-block Node">
  <pre><code class="highlight javascript">oauthResult.put(url, params).done(function(data) {
  //todo with data
}).fail(function(err) {
  //todo with err
});

//e.g Merge a pull request on Github
oauthResult.put('/repos/oauth-io/oauthd/pulls/5/merge');</code></pre>
</div>

<div class="code-block PHP">
  <pre><code class="highlight php">
$request_object->put('/some/endpoint', array(
  'name' => 'My updated name'
));
  </code></pre>
</div>

<div class="code-block iOS">
  <pre><code class="highlight objectivec">
NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
[data setValue:@"My updated name" forKey:@"message"];
[_request put:@"/some/endpoint" withParams:data success:^(NSDictionary *output, NSString *body, NSHTTPURLResponse *httpResponse)
{
    NSLog(@"%@", body);
}];
  </code></pre>
</div>

<div class="code-block Android"><pre><code class="highlight java">// See http method</code></pre></div>


Allows you to perform `PUT` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, the domain is already known|string|/api/endpoint
params|The parameters of the HTTP request|Object|

## DELETE

<div class="code-block Javascript Node">
  <pre><code class="highlight javascript">oauthResult.del(url).then(function(data) {
  //todo with data
}).fail(function(err) {
  //todo with err
});

//e.g Delete a status on Facebook
oauthResult.del('/v2.2/:status_id')</code></pre>
</div>

<div class="code-block PHP">
  <pre><code class="highlight php">
$request_object->del('/some/endpoint/someid');
  </code></pre>
</div>

<div class="code-block iOS">
  <pre><code class="highlight objectivec">
[_request del:@"/some/endpoint/someid" success:^(NSDictionary *output, NSString *body, NSHTTPURLResponse *httpResponse)
{
    NSLog(@"%@", body);
}];
  </code></pre>
</div>

<div class="code-block Android"><pre><code class="highlight java">// See http method</code></pre></div>


Allows you to perform `DELETE` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, the domain is already known|string|/api/endpoint

## PATCH

<div class="code-block Javascript">
  <pre><code class="highlight javascript">oauthResult.patch(url, params).done(function(data) {
  //todo with data
}).fail(function(err) {
  //todo with err
});

// params has the same syntaxe as jQuery.ajax (http://api.jquery.com/jquery.ajax/)
//e.g Edit a Gist on Github
oauthResult.patch('/gists/1', {
  data: {
    "description": "the description for this gist",
    "files": {
      "file1.txt": {
        "content": "updated file contents"
      },
      "new_file.txt": {
        "content": "a new file"
      }
    }
  }
})</code></pre>
</div>

<div class="code-block Node">
  <pre><code class="highlight javascript">oauthResult.put(url, params).done(function(data) {
  //todo with data
}).fail(function(err) {
  //todo with err
});

//e.g Merge a pull request on Github
oauthResult.patch('/gists/1', {
  "description": "the description for this gist",
  "files": {
    "file1.txt": {
      "content": "updated file contents"
    },
    "new_file.txt": {
      "content": "a new file"
    }
  }
});</code></pre>
</div>

<div class="code-block PHP">
  <pre><code class="highlight php">
$request_object->patch('/some/endpoint', array(
  'name' => 'My updated name'
));
  </code></pre>
</div>

<div class="code-block iOS">
  <pre><code class="highlight objectivec">
NSMutableDictionary *data = [[NSMutableDictionary alloc] init];
[data setValue:@"My updated name" forKey:@"message"];
[_request patch:@"/some/endpoint" withParams:data success:^(NSDictionary *output, NSString *body, NSHTTPURLResponse *httpResponse)
{
    NSLog(@"%@", body);
}];
  </code></pre>
</div>

<div class="code-block Android"><pre><code class="highlight java">// See http method</code></pre></div>


Allows you to perform `PATCH` request to an API endpoint

Argument|Description|Type|Example value
--------|-----------|----|-------------
url|The URL of the endpoint, it can be an absolute URL or just the endpoint (after the domain) as for most provider, the domain is already known|string|/api/endpoint
params|The parameters of the HTTP request|Object|

## USING REST

<div class="code-block">
   <pre>#Example with twitter on /1.1/account/verify_credentials.json

GET /request/twitter/%2F1.1%2Faccount%2Fverify_credentials.json HTTP/1.1
Host: oauth.io
oauthio: k=OAUTHIO_PUBLIC_KEY&oauthv=1&oauth_token=TWITTER_PUBLIC_TOKEN&oauth_token_secret=TWITTER_SECRET_TOKEN
Referer: https://whitelisted_domain_in_oauthio/</pre>
</div>

`GET|POST|PUT|DELETE|PATCH https://oauth.io/request/:provider/:url`

Field|Description
-----|-----------
provider|The provider's name (e.g. "facebook")
url|The api request's url, can be relative to the main api domain (e.g `api.facebook.com`) or absolute. This url must be urlencoded.

You must include the `oauthio` HTTP header inside your request, which is a application/x-www-form-urlencoded hash containing:

Field|Description
-----|-----------
k|The public OAuth.io key of your app. If the http header Origin or Referer is set, this will be checked against your app's whitelist. If none are present, you must accept the "localhost" domain in your OAuthio's app.
oauth_token|OAuth1 public token.
oauth_secret_token|OAuth1 secret token.
access_token|OAuth2 token.
oauthv *(optional)*|when a provider supports both OAuth1 and OAuth2, this can be set to "1" or "2" to desambiguate the version of OAuth to use.
