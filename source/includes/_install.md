# Installation

## Download the SDK

<div class="code-block Node">
    <pre><code class="highlight bash">npm install oauthio</code></pre>
</div>

<div class="code-block iOS">
    <pre>
You can use CocoaPods to install OAuth.io in your iOS project
</pre>
</div>

<div class="code-block iOS">
    <pre><code class="highlight bash">
# add this line to your Podfile:
pod 'OAuth.io'
</code></pre>
<pre><code class="highlight bash">
# run this command in your project directory
$ pod install
 </code></pre>
<pre>
You can also install the framework manually. To do so, please follow the following steps: 

The framework is available in [https://github.com/oauth-io/oauth-ios](https://github.com/oauth-io/oauth-ios) as the Dist/OAuthiOS.framework file. To add it as a dependency in your projet in XCode, follow this procedure:

- click on the project name in the Documents explorer
go to Build phases
- open the Link Binary with Libraries section
- click on the + button
- click on Add other...
- Select the OAuthiOS.framework
- Click on Add
</pre>
</div>

<div class="code-block PHP">
    <pre>You can use Composer to install the SDK in your PHP project.
    </pre>
    <pre><code class="highlight bash">
# Add this line to require object of your composer.json file:
"oauth-io/oauth": "0.3.0"
# Run this command in your folder directory
$ composer update
    </code></pre>
</div>

<div class="code-block Javascript">
    <pre><code class="highlight bash">#For Web app
bower install oauth.io

#Or for mobile app (using Phonegap)
phonegap plugin install https://github.com/oauth-io/oauth-phonegap</code></pre>
</div>

To ease your integration, SDKs are available in lots of language:

- [Javascript](https://github.com/oauth-io/oauth-js)
- [Phonegap/Cordova](https://github.com/oauth-io/oauth-phonegap)
- [iOS](https://github.com/oauth-io/oauth-ios)
- [Android](https://github.com/oauth-io/oauth-android)
- [PHP](https://github.com/oauth-io/sdk-php)
- [Node.js](https://github.com/oauth-io/sdk-node)
- [Go](https://github.com/oauth-io/sdk-go)

## Install the SDK

<div class="code-block Node">
    <pre><code class="highlight javascript">var OAuth = require('oauthio');
// Initialize the SDK
OAuth.initialize('Your-public-key', 'Your-secret-key');</code></pre>
</div>

<div class="code-block Javascript Phonegap">
    <pre><code class="highlight html">&lt;script src="path/to/oauth.js"&gt;&lt;/script&gt;</code></pre>
</div>

To install the SDK, you just need to load it in your source code.

<div class="code-block Javascript Phonegap">
    <pre><code class="highlight javascript">// Initialize the SDK
OAuth.initialize('Your-public-key')</code></pre>
</div>

<div class="code-block iOS objectivec">
    <pre>You need to create a class implementing the OAuthIODelegate. This delegate needs you to add the following methods:

- "didReceiveOAuthIOResponse": called when a popup call is successful
- "didFailWithOAuthIOError": called when a popup call is not successful
- "didAuthenticateServerSide": when using the server-side mode, called on a successful authentication
- "didFailAuthenticationServerSide": when using the server-side mode, called on an unsuccessful authentication
</pre>
    <pre><code class="highlight objectivec">
// Then in the class implementing OAuthIODelegate, you can initialize the SDK
// Initialize the SDK
_oauthioModal = [[OAuthIOModal alloc] initWithKey:@"Your-public-key" delegate:self];</code></pre>
</div>

<div class="code-block php PHP">
    <pre><code class="highlight php">
use OAuth_io\OAuth;

$oauth = new OAuth();
// Initialize the SDK
$oauth->initialize('Your-public-key', 'Your-secret-key');
</code></pre>
</div>



When you create an OAuth.io application in your dashboard, it generates a pair of public key, private key. Initialize the SDK using them.

<aside class="notice">Client-side SDKs (Javascript, Phonegap/Cordova, Android, iOS) only need the public key for the initialization</aside>
