define([
  "jquery",
  "backstretch",
  "transit",
  "illustrations/ProcessIllustration",
  "illustrations/CommunicationIllustration",
  "classes/WorkGallery"
], function(
  $,
  Backstretch,
  Transit,
  ProcessIllustration,
  CommunicationIllustration,
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

    this.communicationIllustration = new CommunicationIllustration();
    this.communicationIllustration.init();

  };

  return Home;

});