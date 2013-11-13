define([
  "jquery",
  "backstretch"
], function($, Backstretch){

  var Home = function(){

  };

  Home.prototype.init = function(){

    var self = this;

    $(".hero").backstretch("/assets/images/bg-hero.jpg");

  };

  return Home;

});