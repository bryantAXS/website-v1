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