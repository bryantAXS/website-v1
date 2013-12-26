define([
  "jquery",
  "backstretch",
  "transit",
  "cycle2"
], function(
  $,
  Backstretch,
  Transit,
  Cycle2
  ){

  $.fn.cycle.transitions.authSlide = {
      before: function( opts, curr, next, fwd ) {
          opts.API.stackSlides( opts, curr, next, fwd );
          var height = opts.container.css('overflow','hidden').height();
          opts.cssBefore = { left: 60, opacity: 0, display: "block" };
          opts.animIn = { left: 0, opacity: 1 };
          opts.animOut = { left: 60, opacity: 0 };
      }
  };


  /**
   * Constructor mo'fucka
   */
  var WorkSection = function(){

    $(".work").backstretch("/assets/images/bg-work.png");
    this.$logosContainer = $(".logos-container");
    this.$galleriesContainer = $(".galleries-container");
    this.$copyGalleryContainer = $(".work-gallery-copy-container");
    this.$examplesGalleryContainer = $(".work-gallery-examples-container");

    // speed of animating in/out the opacity change of the logos and work galleries
    this.galleriesTransitionSpeed = 300;

    // speed of the actual cycle animations
    this.galleryTransitionSpeed = 1000;

    // how much to delay the work gallery fade in after the copy
    this.showClientWorkDelay = 200;

    // how much to delay the work gallery fade out after the copy leaves
    this.showLogosWorkDelay = 200;

  };


  /**
   * Getting things underway
   * @return {[type]} [description]
   */
  WorkSection.prototype.init = function(){

    var self = this;

    this.$copyGallery = this.$copyGalleryContainer.cycle({
      slides: ".slide",
      timeout: 0,
      fx: "authSlide",
      // autoHeight: "calc",
      speed: this.galleryTransitionSpeed,
      sync: false,
      easing: "easeInOutCubic"
    });

    this.$examplesGallery = this.$examplesGalleryContainer.cycle({
      slides: ".slide",
      timeout: 0,
      fx: "authSlide",
      autoHeight: "calc",
      speed: this.galleryTransitionSpeed,
      sync: false,
      easing: "easeInOutCubic"
    });

    $(".client-link").on({
      click: function(){
        var $el = $(this);
        var clientName = $el.data("client-name");
        self.showClient(clientName);
        return false;
      }
    });

    $(".back-to-clients").on({
      click: function(){
        self.showLogos();
        return false;
      }
    });

  };

  WorkSection.prototype.showClient = function(clientName){

    var self = this;

    var slideIndex = this.getSlideIndex(clientName);

    // turning off the logos
    this.$logosContainer.animate({
      opacity: 0
    }, this.galleriesTransitionSpeed, function(){

      // show the copy
      self.$copyGallery.cycle("goto", slideIndex);

      // show the work
      setTimeout(function(){
        self.$examplesGallery.cycle("goto", slideIndex);
      }, self.showClientWorkDelay);

    });

  };

  WorkSection.prototype.showLogos = function(){

    var self = this;

    this.$copyGallery.cycle("goto", 0);

    setTimeout(function(){

      self.$examplesGallery.cycle("goto", 0);

      setTimeout(function(){

        //turning on the logos
        self.$logosContainer.animate({
          opacity: 1
        }, self.galleriesTransitionSpeed);

      }, self.galleryTransitionSpeed);

    }, self.showLogosWorkDelay);

  };

  WorkSection.prototype.getSlideIndex = function(clientName){

    return this.$copyGalleryContainer.find(".slide[data-client-name='"+clientName+"']").data("slide-index");

  };

  return WorkSection;

});