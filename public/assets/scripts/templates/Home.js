define([
  "jquery",
  "backstretch"
], function($, Backstretch){

  var Home = function(){

    this.processClasses = ["is-planning", "is-designing","is-coding", "is-launching"];
    this.currentProcessClassIndex = 0;

  };

  Home.prototype.init = function(){

    var self = this;

    $(".hero").backstretch("/assets/images/bg-hero.png");

    var cb = function(){
      self.changeProcess();
    };

    setInterval(cb, 5000);

  };

  Home.prototype.changeProcess = function(){

    this.currentProcessClassIndex += 1;

    $(".svg-process-container")
      .removeClass(this.processClasses.join(" "))
      .addClass(this.processClasses[this.currentProcessClassIndex]);

  };

  return Home;

});