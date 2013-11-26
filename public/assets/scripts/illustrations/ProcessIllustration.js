define([
  "jquery",
  "transit"
], function($, Transit){


  /**
   * Constructor baby
   */
  var ProcessIllustration = function(){

    var self = this;

    this.processClasses = ["is-planning", "is-designing","is-coding", "is-launching"];
    this.processTitles = ["Strategy & Planning", "Design", "Development", "Launch & Beyond"];
    this.currentProcessClassIndex = 0;
    this.$objectsContainer = $(".objects-container");
    this.$processItems = $(".objects-container img");
    this.$title = $(".process-title");

  };


  /**
   * Lets get this process going
   * @return {[type]} [description]
   */
  ProcessIllustration.prototype.start = function(){

    var self = this;

    var cb = function(){
      self.changeProcess();
    };

    setInterval(cb, 4000);

  };


  /**
   * The first step towards changing a process, and calling other methods to handle the dirty stuff
   * @return {[type]} [description]
   */
  ProcessIllustration.prototype.changeProcess = function(){

    if(this.currentProcessClassIndex === 3){
      this.currentProcessClassIndex = 0;
    }else{
      this.currentProcessClassIndex += 1;
    }

    this.rotateObjectsContainer();
    this.rotateItems();
    this.updateTitle();

  };


  /**
   * Roating the container (containing all documents)
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  ProcessIllustration.prototype.rotateObjectsContainer = function(callback){

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


  /**
   * Rotating the documents to compensate for the container rotation.
   * @return {[type]} [description]
   */
  ProcessIllustration.prototype.rotateItems = function(){

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


  /**
   * Updating title of the current active section
   * @return {[type]} [description]
   */
  ProcessIllustration.prototype.updateTitle = function(){

    var self = this;

    this.$title.fadeOut(500, function(){
      self.$title.html(self.processTitles[self.currentProcessClassIndex]);
      self.$title.fadeIn(500);
    });

  };

  return ProcessIllustration;

});