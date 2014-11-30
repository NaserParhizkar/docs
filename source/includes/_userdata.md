
# User Data API

## Usage

<div class="code-block Javascript Phonegap">
  <pre><code class="highlight javascript">res = OAuth.create('facebook');
res.me().done(function(me) {
  alert('Hello ' + me.name);
}).fail(function(err) {
  //todo when the OAuth flow failed
});</code></pre>
</div>

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
