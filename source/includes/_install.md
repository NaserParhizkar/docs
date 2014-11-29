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
