/* global define: false */
/* global require: false */
/* global log: false */

// Setting up require.js paths
require.config( {
  baseUrl: "/assets/scripts",
  urlArgs: "bust=1388941986695",
  paths: {
    jquery: "../../bower_components/jquery/jquery",
    underscore: "../../bower_components/underscore/underscore",
    sitewide: "plugins/sitewide",
    cycle2: "plugins/cycle2",
    foundation: "../../bower_components/foundation/js/foundation",
    "jquery-backstretch": "../../bower_components/jquery-backstretch/jquery.backstretch",
    "jquery.easing": "../../bower_components/jquery.easing/js/jquery.easing.min",
    "jquery.transit": "../../bower_components/jquery.transit/jquery.transit",
    modernizr: "../../bower_components/modernizr/modernizr"
  },
  shim: {
    underscore: {
      exports: "_"
    },
    "jquery-backstretch": {
      deps: [
        "jquery"
      ]
    },
    sitewide: {
      deps: [
        "jquery"
      ]
    },
    "jquery.transit": {
      deps: [
        "jquery",
        "jquery.easing"
      ]
    },
    "jquery.easing": {
      deps: [
        "jquery"
      ]
    },
    cycle2: {
      deps: [
        "jquery",
        "jquery.easing"
      ]
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