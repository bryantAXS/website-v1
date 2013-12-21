define([
  "jquery",
  "backstretch",
  "transit",
  "illustrations/ProcessIllustration",
  "classes/WorkGallery"
], function(
  $,
  Backstretch,
  Transit,
  ProcessIllustration,
  WorkGallery
  ){

  var Home = function(){

  };

  Home.prototype.init = function(){

    var self = this;

    $(".hero").backstretch("/assets/images/bg-hero.png");

    this.initAnimations();

    var workGallery = new WorkGallery();
    workGallery.init();

  };

  Home.prototype.initAnimations = function(){

    this.processIllustration = new ProcessIllustration();
    this.processIllustration.init();

  };

  return Home;

});