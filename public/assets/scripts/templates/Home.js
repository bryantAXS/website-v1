define([
  "jquery",
  "backstretch",
  "transit",
  "illustrations/ProcessIllustration",
  "illustrations/CommunicationIllustration",
  "classes/WorkSection"
], function(
  $,
  Backstretch,
  Transit,
  ProcessIllustration,
  CommunicationIllustration,
  WorkSection
  ){

  var Home = function(){

  };

  Home.prototype.init = function(){

    var self = this;

    $(".fixed-hero").backstretch("/assets/images/bg-hero.png");

    this.initAnimations();
    this.initHeroBlackout();

    var workSection = new WorkSection();
    workSection.init();

  };

  Home.prototype.initAnimations = function(){

    this.processIllustration = new ProcessIllustration();
    this.processIllustration.init();

    this.communicationIllustration = new CommunicationIllustration();
    this.communicationIllustration.init();

  };

  Home.prototype.initHeroBlackout = function(){

    var self = this;
    var $window = $(window);
    var $hero = $(".hero");
    var heroHeight = $hero.height();
    this.$hero = $(".hero");

    $window.scroll(function(){

      var scrollTop = $window.scrollTop();
      if(scrollTop < heroHeight){
        self.setHeroBackground(scrollTop, heroHeight);
      }

    });

  };

  Home.prototype.setHeroBackground = function(scrollTop, heroHeight){

    var pct = scrollTop / heroHeight;
    var rgba = "rgba(0,0,0, "+pct+")";

    this.$hero.css({
      "background-color": rgba
    });

  };

  return Home;

});