define([
  "jquery",
  "jquery-backstretch",
  "jquery.transit",
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
    this.initNavScrolling();

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

    self.$hero = $(".hero");
    self.heroHeight = self.$hero.height();

    // are we animating
    self.animating = false;

    $window.scroll(function(){
      self.scrollTop = $window.scrollTop();
      self.calcScrollDistance();
    });


  };

  Home.prototype.calcScrollDistance = function(){

    var self = this;

    if(!self.animating && self.scrollTop < self.heroHeight){

      self.animating = true;

      requestAnimationFrame(function(){

        self.animating = false;
        var pct = self.scrollTop / self.heroHeight;
        var rgba = "rgba(27, 31, 29, "+pct+")";

        self.$hero.css({
          "background-color": rgba
        });

      });

    }

  };

  Home.prototype.initNavScrolling = function(){

    $(".scroll").on({
      click: function(){

        var $el = $(this);

        var id = $el.attr("href").replace("/","");

        $('html, body').animate({
          scrollTop: $(id).offset().top
        }, 1500, "easeOutQuint");

        return false;

      }
    });

  };

  return Home;

});