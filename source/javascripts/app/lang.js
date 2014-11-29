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
(function (global) {
  var languages = [];
  var languagesHash = {}

  global.setupLanguages = setupLanguages;
  global.activateLanguage = activateLanguage;

  function activateLanguage(language) {
    if (!language) return;
    if (language === "") return;

    console.log(languages, language);
    $(".lang-selector a").removeClass('active');
    $(".lang-selector a[data-language-id='" + language + "']").addClass('active');
    for (var i=0; i < languages.length; i++) {
      $(".code-block." + languages[i]).hide();
    }
    $(".code-block." + language).show();

    // scroll to the new location of the position
    $(window.location.hash).get(0).scrollIntoView(true);
  }

  // if a button is clicked, add the state to the history
  function pushURL(language) {
    if (!history) { return; }
    var hash = window.location.hash;
    if (hash) {
      hash = hash.replace(/^#+/, '');
    }
    history.pushState({}, '', '?' + language + '#' + hash);

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
      console.log("no localstorage, using default");
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
