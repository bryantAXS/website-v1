define([
  "jquery",
  "backstretch",
  "transit",

  "illustrations/DepthIllustration",
  "illustrations/ProcessIllustration",
  "illustrations/BeliefIllustration",

  "classes/WorkGallery"
], function(
  $,
  Backstretch,
  Transit,
  DepthIllustration,
  ProcessIllustration,
  BeliefIllustration,
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

    // No animations at this point
    //this.initDepth();

    this.processIllustration = new ProcessIllustration();
    this.processIllustration.start();

    this.beliefIllustration = new BeliefIllustration();
    this.beliefIllustration.start();

  };

  return Home;

});