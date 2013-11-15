define([
  "jquery",
  "transit"
], function($, Transit){

  var BeliefIllustration = function(){

    this.$screenContainer = $(".screen-container");
    this.$monitor = $(".belief-row .monitor");
    this.$allDocs = $(".belief-row .screen-container img");
    this.$plannDoc = $(".belief-row .planning");

    console.log(this.$allDocs);

    this.currentDocIndex = 0;

  };

  BeliefIllustration.prototype.start = function(){

    var self = this;

    setInterval(function(){
      self.run();
    }, 5000);

    self.run();

  };

  BeliefIllustration.prototype.run = function(){

    var self = this;
    var $nextDoc = this.getNextDoc();
    var $currentDoc = this.getCurrentDoc();

    this.animatedDocOutPromise = new $.Deferred();
    this.animatedDocInPromise = new $.Deferred();

    if($currentDoc){
      this.animateDocOut($currentDoc);
    }else{
      this.animatedDocOutPromise.resolve();
    }

    this.animatedDocOutPromise.done(function(){
      self.animateDocIn($nextDoc);
    });

    this.animatedDocInPromise.done(function(){

      self.currentDocIndex += 1;

      if(self.currentDocIndex === 4){
        self.currentDocIndex = 0;
      }

    })

  };

  BeliefIllustration.prototype.getNextDoc = function(){
    return $(this.$allDocs.get(this.currentDocIndex));
  };

  BeliefIllustration.prototype.getCurrentDoc = function(){

    var $currentDoc = $(".belief-row .currentDoc");

    if($currentDoc.length){
      return $currentDoc;
    }else{
      return false;
    }

  };

  BeliefIllustration.prototype.getScreenWidth = function(){
    return this.$screenContainer.width();
  };

  BeliefIllustration.prototype.animateDocOut = function($currentDoc){

    var self = this;
    var docWidth = $currentDoc.width();
    var screenWidth = this.$screenContainer.width();
    var endRight = screenWidth + docWidth + 20;

    $currentDoc.transition({
      right: endRight
    }, 750, "easeInOutBack", function(){
      $currentDoc.removeClass("currentDoc");
      self.animatedDocOutPromise.resolve();
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
      $nextDoc.addClass("currentDoc");
      self.animatedDocInPromise.resolve();
    });

  };

  return BeliefIllustration;

});