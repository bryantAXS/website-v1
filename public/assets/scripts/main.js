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
    "sitewide": "plugins/sitewide"
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