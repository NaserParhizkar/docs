
# Contribute

You can contribute by cloning our [oauthd repository](https://github.com/oauth-io/oauthd), or any of our SDK's repositories  on GitHub (please check [this repository list](https://github.com/oauth-io)) and making a pull request.

## Issues

If you have any issue using OAuth.io, you can:

* Open a QA on [StackOverflow](http://stackoverflow.com/) (with the mention of OAuth.io in the title).

* Open a [GitHub issue](https://github.com/oauth-io) on the appropriate repository.

* If the content is private, feel free to send us an email on [support@oauth.io](mailto:support@oauth.io)

* You can ping us on Twitter with the mention [@oauth_io](https://twitter.com/oauth_io)

We try to be as reactive as possible on every channel, according to the support questions load, and to the chosen plan (paying customers have the priority on support).

## Adding Providers to OAuth.io

You can easily add new OAuth providers in OAuth.io by using our configuration file format.

The format is [explained here](https://github.com/oauth-io/oauthd/wiki/Specs:-Provider's-configuration) and you can find all the existing OAuth providers on our [GitHub repository](https://github.com/oauth-io/oauthd/tree/master/providers).

Once you've implemented your provider, you can test it using [oauthd](https://github.com/oauth-io/oauthd), the opensource version of OAuth.io and then, just make a pull request and we'll merge it into OAuth.io as soon as we can.

A provider contains 4 simple files:

* __conf.json__ The OAuth provider's JSON file (e.g. facebook.json)
* __settings.json__ - Some settings for users who want to add the OAuth provider in OAuth.io (e.g. the link and screenshot where developers can create an application with your provider)
* __logo.png__ - The logo of the OAuth provider
* __me.js__ (optional) - A file used to retrieve the user information in a unified way.

## Pull request (bug fixes / providers / typos)

You're welcome to fork our repositories on GitHub to make pull requests. We'll review each of them, and integrate all the relevant changes in a future release.

In every repository, we have included notes in the README.md file to show you how to test your feature.

### oauthd

Fork [the repository](https://github.com/oauth-io/oauthd) to implement your feature / bug fixes.

You can use `npm link` to use the `oauthd` command anywhere in your console, and create test instances.

OAuth.io is an oauthd instance, so if you find and fix bugs in oauthd, the changes will also be on OAuth.io. 

### SDKs

You can fork all the SDKs from GitHub in your favorite language. Every SDK (except iOS for the moment) has a test suite than can be launched in a standard way to try your feature / bug fixes.

### Documentation

You can fork all the [documentation from GitHub](https://github.com/oauth-io/docs). The content is in the `source` folder. The main file is `index.md`
