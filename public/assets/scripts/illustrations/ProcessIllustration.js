define([
  "jquery",
  "transit",
], function($,Transit){

  var ProcessIllustration = function(){

    this.$images = $("#overview-process img");
    this.$activeImage = $($("#overview-process img").get(0));

  };

  ProcessIllustration.prototype.init = function(){

    var self = this;

    $("#overview-process").on("mouseenter", function(){

      self.interval = setInterval(function(){
        self.changeImage();
      }, 1250);

      self.changeImage();

    }).on("mouseleave", function(){

      clearInterval(self.interval);

    });


  };

  ProcessIllustration.prototype.changeImage = function(){

    var self = this;
    var $oldImage = this.$activeImage;
    var $newImage = this.$activeImage.next().length > 0 ? this.$activeImage.next() : $(this.$images.get(0));

    $oldImage.transit({
      "left": "-150%"
    }, 500, function(){
      $oldImage.css({
        "left": "150%"
      });
    });

    $newImage.transit({
      "left": "50%"
    }, 500, function(){
      self.$activeImage = $newImage;
    });


  };

  return ProcessIllustration;

});