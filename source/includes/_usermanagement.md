
# User Management API

## Installation

You need to click 'Enable the User Management' button in your OAuth.io dashboard in the `Users Overview` tab.

<aside class="notice">This is version 1.0 of our User Management, so don't hesitate to give your feedback or feature requests. During this period, only the Javascript SDK and Android SDK can use this API but others SDKs are in the roadmap.</aside>

<div class="code-block Android"><pre><code class="highlight java">users = new OAuthUsers(oauth);
</code></pre></div>

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

<div class="code-block Android"><pre><code class="highlight java">Hashtable<String, String>infos = new Hashtable<>();
infos.put("firstname", "John");
infos.put("lastname", "Doe");
infos.put("email", "john.doe@gmail.com");
infos.put("password", "St0ngP4ssw0rd!");
// ...

users.signup(infos, new OAuthUserCallback() {
    @Override
    public void onFinished() {
        // receive your identity
        OAuthUser id = users.getIdentity();
    }

    @Override
    public void onError(String message) {
        displayError(message);
    }
});
</code></pre></div>

### With email/password

You can sign up your users using their email/password.

`data` is an object that must contains:

* email
* password
* firstname
* lastname

You can add other pieces of data if you wish (the structure is free).

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

<div class="code-block Android"><pre><code class="highlight java">// Callback from oauth.popup
public void onFinished(OAuthData data) {
    if (data.status.equals("error"))
        displayError(data.error);
    else {
        users.signup(data, new OAuthUserCallback() {
            @Override
            public void onFinished() {
                // receive your identity
                OAuthUser id = users.getIdentity();
            }

            @Override
            public void onError(String message) {
                displayError(message);
            }
        });
    }
}
</code></pre></div>
### With social logins

You can also use the Token API to sign up your users with their social identity. `provider` is the name of a provider on OAuth.io as `facebook`, `twitter`, `google` and 100+ others.

The provider needs to have the User API enabled to work properly (you can see it when you add a new provider in your OAuth.io Dashbaord).

<br style="clear:both;">
<div class="code-block Javascript"><pre><code class="highlight javascript">OAuth.popup('twitter').then(function(twitter) {
    twitter.email = "john.doe@gmail.com";
    return User.signup(twitter);
}).done(function(user) {
    //todo with `user`
});
</code></pre></div>
<div class="code-block Android"><pre><code class="highlight java">// Callback from oauth.popup
public void onFinished(OAuthData data) {
  if (data.status.equals("error"))
      displayError(data.error);
  else {
    Hashtable<String, String> infos = new Hashtable<>();
    infos.put("email", "john.doe@gmail.com");
    // ...
    users.signup(data, infos, new OAuthUserCallback() {
      @Override
      public void onFinished() {
          // receive your identity
          OAuthUser id = users.getIdentity();
      }
      @Override
      public void onError(String message) {
          displayError(message);
      }
    });
  }
}
</code></pre></div>

### Handling errors

Some providers don't give their user's email in their API (it's the case of Twitter for instance). So, you have to ask your user for their email manually and setup the email.

## Signin your users

Once your user has signed up, you can log them in with their email password or with one of the social identity the user attached to their account.

OAuth.io manages your user's session for you and gives a simple API to let you know if the user is still logged in or not.

In this version, the session expires after 6 hours of inactivity but we are working on making this expiration configurable.

<div class="code-block Javascript"><pre><code class="highlight javascript">User.signin(email, password).done(function(user) {
    console.log(user.data.firstname);
}).fail(function(err) {
    // email/password incorrect.
});</code></pre></div>
<div class="code-block Android"><pre><code class="highlight java">users.signin(email, password, new OAuthUserCallback() {
    @Override
    public void onFinished() {
        // receive your identity
        OAuthUser id = users.getIdentity();
    }

    @Override
    public void onError(String message) {
        displayError(message);
    }
});
</code></pre></div>

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
<div class="code-block Android"><pre><code class="highlight java">// Callback from oauth.popup
public void onFinished(OAuthData data) {
    if (data.status.equals("error"))
        displayError(data.error);
    else
        users.signin(data, new OAuthUserCallback() {
            @Override
            public void onFinished() {
                // receive your identity
                OAuthUser id = users.getIdentity();
            }

            @Override
            public void onError(String message) {
                displayError(message);
            }
        });
}
</code></pre></div>

### With social logins

Note: For social logins, the signin and signup steps are exactly the same feature. If the user doesn't exist, it will automatically sign them up before signing them in.

## Get the connected user

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
</code></pre></div>
<div class="code-block Android"><pre><code class="highlight java">OAuthUser id = users.getIdentity();
</code></pre></div>

### From cache

When a user logs in, we store their identity (information, providers linked etc.) in a cookie. You can access this cached version instantly using the SDK with `User.getIdentity()`.

It returns the same data structure as the API version: `User.refreshIdentity()`.

<br style="clear:both">
<div class="code-block Javascript"><pre><code class="highlight javascript">User.refreshIdentity().done(function(user) {
    //todo with `user`
})</code></pre></div>
<div class="code-block Android"><pre><code class="highlight java">OAuthUser user;
// ...
user.refreshIdentity(new OAuthUserCallback() {
    @Override
    public void onFinished() {
        // user data updated
    }
    @Override
    public void onError(String message) {
        displayError(message);
    }
});
</code></pre></div>

### From the API

Retrieve the latest change done to your user.

## Know if the user is authenticated

<div class="code-block Javascript"><pre><code class="highlight javascript">if (User.isLogged()) {
    //todo with authenticated user
}
else {
    //todo with unauthenticated user
}</code></pre></div>
<div class="code-block Android"><pre><code class="highlight java">if (users.isLogged()) {
    //todo with authenticated user
}
else {
    //todo with unauthenticated user
}</code></pre></div>

This method will check if the authorization cookie has been detected in the user's browser. It returns `true` or `false`

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
<div class="code-block Android"><pre><code class="highlight java">OAuthUser user = users.getIdentity();
user.data.put("firstname", "Thomas");
user.data.put("someData", "some string");
user.saveIdentity(new OAuthUserCallback() {
    @Override
    public void onFinished() {
        // user data saved
    }

    @Override
    public void onError(String message) {
        displayError(message);
    }
});</code></pre></div>

You can update all your user's data. Once you are done, just use the `save()` method to save your changes. Fields are freely structurable so you can name them as you wish (just a few fields name are protected for our use: `_provider_*`).

## Reset password (or lost password)

<div class="code-block Javascript"><pre><code class="highlight javascript">User.resetPassword(email).done(function() {
    //email sent to the user containing a key
});

//then...
User.confirmResetPassword(newPassword, key);
</code></pre></div>
<div class="code-block Android"><pre><code class="highlight java">users.resetPassword(email, new OAuthUserCallback() {
    @Override
    public void onFinished() {
        // reset email sent
    }

    @Override
    public void onError(String message) {
        displayError(message);
    }
});
</code></pre></div>

The reset flow is used when a user tries to login and can't remember their password. It will send an email to the user with a `key` (to check their identity using their email). If the user is able to input the code on another page, they can change their password using this `key`.

## Change password

> Coming soon

This feature is not released yet but will be used to change the password of the user (this option is often in the setting page of an account). The user can use it if they knows their current password to confirm their identity.

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
user.changePassword(oldPassword, newPassword);
</code></pre></div>


## Attach social identity to an account

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
OAuth.popup('google').then(function(google) {
   return user.addProvider(google);
}).done(function() {
   //provider attached
   //Your user is now able to signin with Google
});</code></pre></div>
<div class="code-block Android"><pre><code class="highlight java">// Callback from oauth.popup
public void onFinished(OAuthData data) {
    if (data.status.equals("error"))
        displayError(data.error);
    else {
        OAuthUser user = users.getIdentity();
        user.addProvider(data.provider, new OAuthUserCallback() {
            @Override
            public void onFinished() {
                // provider attached
                // Your user is now able to signin with data.provider
            }

            @Override
            public void onError(String message) {
                displayError(message);
            }
        });
    }
}
</code></pre></div>

You can attach a social identity to an account easily. That means at the next signin, they will be able to signin with another configured provider. This way a user can securely connect with more than one provider.

## Remove social identity to an account

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
user.removeProvider('google').done(function() {
   //provider detached
});</code></pre></div>
<div class="code-block Android"><pre><code class="highlight java">OAuthUser user = users.getIdentity();
user.removeProvider("google", new OAuthUserCallback() {
    @Override
    public void onFinished() {
        // provider detached from google
    }

    @Override
    public void onError(String message) {
        displayError(message);
    }
});
</code></pre></div>

A user can detach a social identity from their account. Once a provider is detached, the user won't be able to login with it again, they needs to re-attach it again to be able to login with it.

## The list of providers attached to an account

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
console.log(user.providers)
</code></pre></div>
<div class="code-block Javascript"><pre><code class="highlight javascript">OAuthUser user = users.getIdentity();
// providers list is available in user.providers
</code></pre></div>

### From cache

When a user logs in, we store a local version of the providers list attached to their account so you can access it directly in the `user` object.

<br style="clear:both;">
<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
user.getProviders().done(function(providers) {
   console.log(providers);
});</code></pre></div>
<div class="code-block Android"><pre><code class="highlight java">OAuthUser user;
// ...
user.getProviders(new OAuthUserCallback() {
    @Override
    public void onFinished() {
        // providers list is available in user.providers
    }
    @Override
    public void onError(String message) {
        displayError(message);
    }
});
</code></pre></div>

### From the API

You can also get this list from the API to be sure it's synchronized with the backend.

## Logout

<div class="code-block Javascript"><pre><code class="highlight javascript">var user = User.getIdentity();
user.logout().done(function() {
   //todo when logout
});</code></pre></div>
<div class="code-block Android"><pre><code class="highlight java">OAuthUser user = users.getIdentity();
user.logout(new OAuthUserCallback() {
    @Override
    public void onFinished() {
        // user is logout and their token is expired
    }
    @Override
    public void onError(String message) {
        displayError(message);
    }
});</code></pre></div>

You can log your user out from your application using the `logout()` method. It will clear the session and the associated cache.
