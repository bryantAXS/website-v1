define([
  "jquery",
  "jquery.transit",
], function($,Transit){

  var CommunicationIllustration = function(){

    this.$image1 = $(".talk-1");
    this.$image2 = $(".talk-2");

  };

  CommunicationIllustration.prototype.init = function(){

    var self = this;

    $("#overview-communication").on("mouseenter", function(){

      self.$image1
        .transition({ "margin-left": "-37.5px", "delay": 1200 }, 300)
        .transition({ "rotate": "15deg" }, 300)
        .transition({ "rotate": "-15deg" }, 300)
        .transition({ "rotate": "15deg" }, 300)
        .transition({ "rotate": "-15deg" }, 300)
        .transition({ "margin-left": "-100%", "rotate": "0deg" }, 300)

      // self.$image2.transition({ "margin-left": "100%" }, 300, function(){ console.log("image 2 offscreen callback"); });
      self.$image2
        .transition({ "rotate": "15deg" }, 300)
        .transition({ "rotate": "-15deg" }, 300)
        .transition({ "rotate": "15deg" }, 300)
        .transition({ "rotate": "-15deg" }, 300)
        .transition({ "rotate": "0deg", "margin-left": "100%" }, 300)
        .transition({ "margin-left": "-37.5px", "delay": 1200 }, 300)

    }).on("mouseleave", function(){

      self.$image1.stop(true).transition({
        "margin-left": "-100%",
        "rotate": "0deg"
      });

      self.$image2.stop(true).transition({
        "margin-left": "-37.5px",
        "rotate": "0deg"
      });

    });

  };

  CommunicationIllustration.prototype.runAnimation = function(){

  };

  return CommunicationIllustration;

});