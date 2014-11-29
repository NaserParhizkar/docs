
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
