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
!function(t){function e(t){if(t&&""!==t){console.log(o,t),$(".lang-selector a").removeClass("active"),$(".lang-selector a[data-language-id='"+t+"']").addClass("active");for(var e=0;e<o.length;e++)$(".code-block."+o[e]).hide();$(".code-block."+t).show(),$(window.location.hash).get(0).scrollIntoView(!0)}}function i(t){if(history){var e=window.location.hash;e&&(e=e.replace(/^#+/,"")),history.pushState({},"","?"+t+"#"+e),localStorage.setItem("language",t)}}function n(t){console.log(t);for(var i in t)s[Object.keys(t[i])[0]]=t[i][Object.keys(t[i])[0]],o.push(t[i][Object.keys(t[i])[0]]);var n=o[0],r=localStorage.getItem("language");console.log(o,s,n,r),""!==location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),o)?(console.log("in the list"),e(location.search.substr(1)),localStorage.setItem("language",location.search.substr(1))):null!==r&&-1!=jQuery.inArray(r,o)?(console.log("in localstorage"),e(r)):(console.log("no localstorage, using default"),e(o[0]))}var o=[],s={};t.setupLanguages=n,t.activateLanguage=e,$(function(){$(".code-block pre code").each(function(t,e){hljs.highlightBlock(e)}),$(".lang-selector a").on("click",function(){var t=($(this).data("language-name"),$(this).data("language-id"));return i(t),e(t),!1}),window.onpopstate=function(){e(window.location.search.substr(1))}})}(window);