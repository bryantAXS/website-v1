/* global define: false */
/* global require: false */
/* global log: false */

// Setting up require.js paths
require.config( {

  baseUrl: "/assets/scripts",

  urlArgs: "bust=" +  (new Date()).getTime(),

  paths:{
    "jquery": "vendor/jquery",
    "underscore": "vendor/underscore",
    "backstretch": "plugins/backstretch",
    "sitewide": "plugins/sitewide",
    "transit": "vendor/jquery.transit",
    "easing": "vendor/jquery.easing",
    "cycle2": "plugins/cycle2"
  },

  shim: {
    'underscore': {
      exports: "_"
    },
    'backstretch': {
      deps: ['jquery']
    },
    'sitewide': {
      deps: ['jquery']
    },
    'transit': {
      deps: ['jquery', 'easing']
    },
    'cycle2': {
      deps: ['jquery', 'easing']
    }
  }

});


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


// Includes File Dependencies
require([
  "jquery",
  "underscore",
  "sitewide",
  "classes/sitewide"
  ], function($, _, Sitewide){

    var sitewide = new Sitewide();
    sitewide.init();

    // Intantiating template js
    var template_name = $("[data-template]").data("template");

    if(template_name === "home"){
      require(["templates/Home"], function(HomeTemplate){
        var template = new HomeTemplate();
        template.init();
      });
    }

});