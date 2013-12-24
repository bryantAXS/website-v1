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
  var WorkSection = function(){

    $(".work").backstretch("/assets/images/bg-work.png");
    this.$logosContainer = $(".logos-container");
    this.$galleriesContainer = $(".galleries-container");
    this.$copyGalleryContainer = $(".work-gallery-copy-container");
    this.$examplesGalleryContainer = $(".work-gallery-examples-container");

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
      fx: "fadeout",
      autoHeight: "calc",
      speed: 300
    });

    this.$examplesGallery = this.$examplesGalleryContainer.cycle({
      slides: ".slide",
      timeout: 0,
      fx: "fadeout",
      autoHeight: "calc",
      speed: 300
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
        // self.showLogos();
        return false;
      }
    });

  };

  WorkSection.prototype.showClient = function(clientName){

    var slideIndex = this.getSlideIndex(clientName);
    this.$copyGallery.cycle("goto", slideIndex);
    this.$examplesGallery.cycle("goto", slideIndex);

  };

  WorkSection.prototype.getSlideIndex = function(clientName){

    return this.$copyGalleryContainer.find(".slide[data-client-name='"+clientName+"']").data("slide-index");

  };

  return WorkSection;

});