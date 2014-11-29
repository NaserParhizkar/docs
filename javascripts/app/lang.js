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
!function(e){function t(e){if(e&&""!==e){console.log(o,e),$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-id='"+e+"']").addClass("active");for(var t=0;t<o.length;t++)$(".code-block."+o[t]).hide();$(".code-block."+e).show(),$(window.location.hash).get(0).scrollIntoView(!0)}}function i(e){if(history){var t=window.location.hash;t&&(t=t.replace(/^#+/,"")),history.pushState({},"","?"+e+"#"+t),localStorage.setItem("language",e)}}function n(e){console.log(e);for(var i in e)s[Object.keys(e[i])[0]]=e[i][Object.keys(e[i])[0]],o.push(e[i][Object.keys(e[i])[0]]);var n=o[0],r=localStorage.getItem("language");console.log(o,s,n,r),""!==location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),o)?(console.log("in the list"),t(location.search.substr(1)),localStorage.setItem("language",location.search.substr(1))):null!==r&&-1!=jQuery.inArray(r,o)?(console.log("in localstorage"),t(r)):(console.log("no localstorage, using default"),t(o[0]))}var o=[],s={};e.setupLanguages=n,e.activateLanguage=t,$(function(){$(".code-block pre code").each(function(e,t){hljs.highlightBlock(t)}),$(".lang-selector a").on("click",function(){var e=($(this).data("language-name"),$(this).data("language-id"));return i(e),t(e),!1}),window.onpopstate=function(){t(window.location.search.substr(1))}})}(window);