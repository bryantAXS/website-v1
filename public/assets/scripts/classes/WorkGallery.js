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


  /**
   * Constructor mo'fucka
   */
  var WorkGallery = function(){

    var self = this;

    this.$allNavs = $(".work-slides-navigation");
  };


  /**
   * Getting things underway
   * @return {[type]} [description]
   */
  WorkGallery.prototype.init = function(){

    this.gallery = $(".work-slides-container").cycle({
      slides: ".slide",
      timeout: 0
    });

    // setup our bg image
    $(".work-slides-container").backstretch("/assets/images/bg-work.png");

    this.initProjectButtons();
    this.initNavigations();

  };


  /**
   * Hooking up the buttons on the first slide
   * @return {[type]} [description]
   */
  WorkGallery.prototype.initProjectButtons = function(){

    var self = this;

    $(".work-button").on("click", function(){

      var projectName = $(this).data("project");
      var projectSlideIndex = 0;
      var absoluteSlideIndex = self.getAbsoluteSlideIndex(projectName, projectSlideIndex);

      self.gallery.cycle("goto", absoluteSlideIndex);
      self.setNavigation(projectName, projectSlideIndex);
      $("#"+projectName+"-navigation").transition({top: 0}, 350);

    });

  };


  /**
   * Hooking up individual navigation items
   * @return {[type]} [description]
   */
  WorkGallery.prototype.initNavigations = function(){

    var self = this;

    $(".work-slides-navigation .arrow-left").on("click", function(){
      self.gallery.cycle("goto", 0);
      self.closeNavigation();
    });

    $(".work-slides-navigation .arrow-right").on("click", function(){
      self.gotoNextSlide();
    });

  };


  /**
   * Determining what the next slide is and going to it. If there isn't one, go back home
   * @return {[type]} [description]
   */
  WorkGallery.prototype.gotoNextSlide = function(){

    var self = this;
    var $activeSlide = $(".cycle-slide-active");
    var project = $activeSlide.data("project");
    var projectIndex = Number($activeSlide.data("slide"));

    var nextAbsoluteSlideIndex = this.getAbsoluteSlideIndex(project, projectIndex + 1);

    if(nextAbsoluteSlideIndex === undefined){
      self.gallery.cycle("goto", 0);
      self.closeNavigation();
    }else{
      self.gallery.cycle("goto", nextAbsoluteSlideIndex);
      self.setNavigation(project, projectIndex + 1);
    }

  };


  /**
   * Adjusting the active state for the project specific navigation
   * @param {[type]} projectName  [description]
   * @param {[type]} projectIndex [description]
   */
  WorkGallery.prototype.setNavigation = function(projectName, projectIndex){
    $(".work-slides-navigation .project").removeClass("is-active");
    $(".work-slides-navigation .project[data-project='"+projectName+"'][data-slide='"+projectIndex+"']").addClass("is-active");
  };


  /**
   * Close all project specific navigation
   * @return {[type]} [description]
   */
  WorkGallery.prototype.closeNavigation = function(){
    this.$allNavs.transition({top: -65}, 350);
  };


  /**
   * Return the absolute slide index based on a project's name and project slide index
   * @param  {[type]} projectName  [description]
   * @param  {[type]} projectIndex [description]
   * @return {[type]}              [description]
   */
  WorkGallery.prototype.getAbsoluteSlideIndex = function(projectName, projectIndex){
    return $(".slide[data-project='"+projectName+"'][data-slide='"+projectIndex+"']").data("absolute-slide-index");
  };

  return WorkGallery;

});