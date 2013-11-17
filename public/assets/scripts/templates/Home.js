define([
  "jquery",
  "backstretch",
  "transit",

  "illustrations/DepthIllustration",
  "illustrations/ProcessIllustration",
  "illustrations/BeliefIllustration",
], function(
  $,
  Backstretch,
  Transit,
  DepthIllustration,
  ProcessIllustration,
  BeliefIllustration){

  var Home = function(){

  };

  Home.prototype.init = function(){

    var self = this;

    $(".hero").backstretch("/assets/images/bg-hero.png");

    this.initAnimations();
  };

  Home.prototype.initAnimations = function(){

    this.initDepth();
    this.initProcess();

    this.beliefIllustration = new BeliefIllustration();
    this.beliefIllustration.start();

  };

  Home.prototype.initDepth = function(){

  };

  Home.prototype.initProcess = function(){

    var self = this;

    this.processClasses = ["is-planning", "is-designing","is-coding", "is-launching"];
    this.processTitles = ["Strategy & Planning", "Design", "Development", "Launch & Beyond"];
    this.currentProcessClassIndex = 0;
    this.$objectsContainer = $(".objects-container");
    this.$processItems = $(".objects-container img");
    this.$title = $(".process-title");

    var cb = function(){
      self.changeProcess();
    };

    setInterval(cb, 4000);

  };

  Home.prototype.initBelief = function(){

  };

  Home.prototype.changeProcess = function(){

    if(this.currentProcessClassIndex === 3){
      this.currentProcessClassIndex = 0;
    }else{
      this.currentProcessClassIndex += 1;
    }

    this.rotateObjectsContainer();
    this.rotateItems();
    this.updateTitle();

  };

  Home.prototype.rotateObjectsContainer = function(callback){

    var self = this;
    var currentRotation = this.$objectsContainer.css("rotate");
    currentRotation = typeof(currentRotation) === "string" ? Number(currentRotation.replace("deg", "")) : currentRotation;

    var newRotation = currentRotation + 90;

    this.$objectsContainer.transition({
      rotate: newRotation + "deg"
    }, 1000, "ease-in-out", function(){

      if(newRotation === 360){
        self.$objectsContainer.css({
          rotate: "0deg"
        });
      }

    });

  };

  Home.prototype.rotateItems = function(){

    var self = this;

    this.$processItems.each(function(item){

      var $item = $(this);
      var currentRotation = $item.css("rotate");
      currentRotation = typeof(currentRotation) === "string" ? Number(currentRotation.replace("deg", "")) : currentRotation;

      var newRotation = currentRotation - 90;

      $item.transition({
        rotate: newRotation + "deg"
      }, 1000, "ease-in-out", function(){

        if(newRotation === -360){
          $item.css({
            rotate: "0deg"
          });
        }

      });

    });

  };

  Home.prototype.updateTitle = function(){

    var self = this;

    this.$title.fadeOut(500, function(){
      self.$title.html(self.processTitles[self.currentProcessClassIndex]);
      self.$title.fadeIn(500);
    });

  };

  return Home;

});