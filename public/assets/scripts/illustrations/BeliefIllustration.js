define([
  "jquery",
  "transit"
], function($, Transit){

  var BeliefIllustration = function(){

    this.$screenContainer = $(".screen-container");
    this.$monitor = $(".belief-row .monitor");
    this.$allDocs = $(".belief-row .screen-container img").not(".chat");
    this.$plannDoc = $(".belief-row .planning");

    this.currentDocIndex = 0;

  };

  BeliefIllustration.prototype.start = function(){

    var self = this;

    setInterval(function(){
      self.run();
    }, 3000);

    self.run();

  };

  BeliefIllustration.prototype.run = function(){

    var self = this;

    this.animateOutPromise = new $.Deferred();
    this.animateInPromise = new $.Deferred();

    var $currentImage = this.getCurrentImage();


    if($currentImage){
      if($currentImage.hasClass("chat")){
        var $nextImage = this.getNextDoc();
        var nextIsDoc = true;
      }else{
        var $nextImage = $(".screen-container .chat");
        var nextIsDoc = false;
      }
    }else{
      var $nextImage = this.getNextDoc();
      var nextIsDoc = true;
    }

    if($currentImage){
      this.animateOut($currentImage);
    }else{
      this.animateOutPromise.resolve();
    }

    this.animateOutPromise.done(function(){
      self.animateIn($nextImage);
    });

    this.animateInPromise.done(function(){

      if(nextIsDoc){

        self.currentDocIndex += 1;

        if(self.currentDocIndex === 4){
          self.currentDocIndex = 0;
        }

      }

    });

  };

  BeliefIllustration.prototype.getNextDoc = function(){

    return $(this.$allDocs.get(this.currentDocIndex));

  };

  BeliefIllustration.prototype.getCurrentImage = function(){

    var $currentImage = $(".belief-row .currentImage");

    if($currentImage.length){
      return $currentImage;
    }else{
      return false;
    }

  };

  BeliefIllustration.prototype.animateOut = function($currentImage){
    if($currentImage.hasClass("chat")){
      this.animateChatOut($currentImage);
    }else{
      this.animateDocOut($currentImage);
    }
  };

  BeliefIllustration.prototype.animateIn = function($currentImage){
    if($currentImage.hasClass("chat")){
      this.animateChatIn($currentImage);
    }else{
      this.animateDocIn($currentImage);
    }
  };

  BeliefIllustration.prototype.animateChatIn = function($nextImage){

    var self = this;
    var screenWidth = this.$screenContainer.width();
    var startingImageWidth = 0;
    var startingImageOpacity = 0;
    var startingImageMarginTop = 0;
    var startingImageMartinLeft = 0;

    var endingImageWidth = screenWidth / 4;
    var endingImageHeight = endingImageWidth / 1.77;
    var endingImageOpacity = 1;
    var endingImageMarginTop = -(endingImageHeight/2);
    var endingImageMarginLeft = -(endingImageWidth/2);

    $nextImage.css(
      {
        left: "50%",
        top: "60%",
        width: startingImageWidth,
        opacity: startingImageOpacity,
        marginLeft: startingImageMartinLeft,
        marginTop: startingImageMarginTop
      }
    );

    $nextImage.transition(
      {
        width: endingImageWidth,
        opacity: endingImageOpacity,
        marginLeft: endingImageMarginLeft,
        marginTop: endingImageMarginLeft
      }, 750, "easeInOutBack", function(){
      $nextImage.addClass("currentImage");
      self.animateInPromise.resolve();
    });

  };

  BeliefIllustration.prototype.animateChatOut = function($currentImage){

    var self = this;

    $currentImage.transition({
      opacity: 0
    }, 750, "easeInOutBack", function(){
      $currentImage.removeClass("currentImage");
      self.animateOutPromise.resolve();
    });

  };

  BeliefIllustration.prototype.animateDocIn = function($nextDoc){

    var self = this;
    var docWidth = $nextDoc.width();
    var startingRight = (docWidth * -1) - 20;
    var screenWidth = this.$screenContainer.width();
    var endRight = (screenWidth - docWidth) / 2;

    $nextDoc.css({right: startingRight});
    $nextDoc.transition({
      right: endRight
    }, 750, "easeInOutBack", function(){
      $nextDoc.addClass("currentImage");
      self.animateInPromise.resolve();
    });

  };

  BeliefIllustration.prototype.animateDocOut = function($currentDoc){

    var self = this;
    var docWidth = $currentDoc.width();
    var screenWidth = this.$screenContainer.width();
    var endRight = screenWidth + docWidth + 20;

    $currentDoc.transition({
      right: endRight
    }, 750, "easeInOutBack", function(){
      $currentDoc.removeClass("currentImage");
      self.animateOutPromise.resolve();
    });

  };

  BeliefIllustration.prototype.getScreenWidth = function(){
    return this.$screenContainer.width();
  };

  return BeliefIllustration;

});