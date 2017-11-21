/*
Copyright 2008-2013 Concur Technologies, Inc.
Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
;(function () {
  'use strict';
  
  var languages = [];
  var languagesHash = {}

  window.setupLanguages = setupLanguages;
  window.activateLanguage = activateLanguage;
  window.getLanguageFromQueryString = getLanguageFromQueryString;
  
  function activateLanguage(language) {
    if (!language) return;
    if (language === "") return;

    console.group('Activate Language')
    console.log('languages', languages);
    console.log('language', language);
    console.groupEnd();

    $(".lang-selector a").removeClass('active');
    $(".lang-selector a[data-language-id='" + language + "']").addClass('active');
    for (var i=0; i < languages.length; i++) {
      $(".code-block." + languages[i]).hide();
    }
    $(".code-block." + language).show();

	// scroll to the new location of the position
	if ($(window.location.hash).get(0)) {
		$(window.location.hash).get(0).scrollIntoView(true);
	}
  }

  // parseURL and stringifyURL are from https://github.com/sindresorhus/query-string
  // MIT licensed
  // https://github.com/sindresorhus/query-string/blob/7bee64c16f2da1a326579e96977b9227bf6da9e6/license
  function parseURL(str) {
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return {};
    }

    return str.split('&').reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts[0];
      var val = parts[1];

      key = decodeURIComponent(key);
      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  };

  function stringifyURL(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
      var val = obj[key];

      if (Array.isArray(val)) {
        return val.sort().map(function (val2) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
        }).join('&');
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
  };

  // gets the language set in the query string
  function getLanguageFromQueryString() {
    if (location.search.length >= 1) {
      var language = parseURL(location.search).language;
      if (language) {
        return language;
      } else if (jQuery.inArray(location.search.substr(1), languages) != -1) {
        return location.search.substr(1);
      }
    }

    return false;
  }

  // returns a new query string with the new language in it
  function generateNewQueryString(language) {
    var url = parseURL(location.search);
    if (url.language) {
      url.language = language;
      return stringifyURL(url);
    }
    return language;
  }

  // if a button is clicked, add the state to the history
  function pushURL(language) {
    if (!history) { return; }
    var hash = window.location.hash;
    if (hash) {
      hash = hash.replace(/^#+/, '');
    }
    history.pushState({}, '', '?' + generateNewQueryString(language) + '#' + hash);

    // save language as next default
    localStorage.setItem("language", language);
  }


  function setupLanguages(l) {
    console.log(l);
    for (var i in l) {
      languagesHash[Object.keys(l[i])[0]] = l[i][Object.keys(l[i])[0]];
      languages.push(l[i][Object.keys(l[i])[0]]);
    }

    var currentLanguage = languages[0];
    var defaultLanguage = localStorage.getItem("language");

    console.log(languages, languagesHash, currentLanguage, defaultLanguage);

    if ((location.search.substr(1) !== "") && (jQuery.inArray(location.search.substr(1), languages)) != -1) {
      // the language is in the URL, so use that language!
      console.log('in the list');
      activateLanguage(location.search.substr(1));

      localStorage.setItem("language", location.search.substr(1));
    } else if ((defaultLanguage !== null) && (jQuery.inArray(defaultLanguage, languages) != -1)) {
      // the language was the last selected one saved in localstorage, so use that language!
      console.log("in localstorage");
      activateLanguage(defaultLanguage);
    } else {
      // no language selected, so use the default
      console.log("no language in localstorage, using default language");
      activateLanguage(languages[0]);
    }
  }

  // if we click on a language tab, activate that language
  $(function() {
    $('.code-block pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    $(".lang-selector a").on("click", function() {
      var language = $(this).data("language-name");
      var languageId = $(this).data("language-id");
      pushURL(languageId);
      activateLanguage(languageId);
      return false;
    });
    window.onpopstate = function(event) {
      activateLanguage(window.location.search.substr(1));
    };
  });
})(window);