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

  var startingSlides = {
    dimos: 1,
    broomfield: 4,
    plymold: 7,
  };

  var WorkGallery = function(){

    var self = this;

    this.$allNavs = $(".work-slides-navigation");

  };

  WorkGallery.prototype.init = function(){

    this.gallery = $(".work-slides-container").cycle({
      slides: ".slide",
      timeout: 0
    });

    $(".work-slides-container").backstretch("/assets/images/bg-work.png");

    this.initProjectButtons();
    this.initNavigations();

  };

  WorkGallery.prototype.initProjectButtons = function(){

    var self = this;

    // project buttons
    $(".work-button").on("click", function(){

      var projectName = $(this).data("project");
      var slideIndex = startingSlides[projectName];

      self.gallery.cycle("goto", slideIndex);

      $("#"+projectName+"-navigation").transition({top: 0}, 350);

    });

  };

  WorkGallery.prototype.initNavigations = function(){

    var self = this;

    $(".work-slides-navigation .arrow-left").on("click", function(){

      self.gallery.cycle("goto", 0);
      self.closeNavigation();

    });

    $(".work-slides-navigation .arrow-right").on("click", function(){

      // TODO: this is where we are leaving off

    });

  };

  WorkGallery.prototype.closeNavigation = function(){
    this.$allNavs.transition({top: -65}, 350);
  };

  return WorkGallery;

});