define([
  "jquery"
], function($){

  var Sitewide = function(options){

  };

  Sitewide.prototype.init = function(){

    this.init_icon_hovers();

  };

  Sitewide.prototype.init_icon_hovers = function(){
    $("[data-hover-image]").each(function(){

      var $el = $(this);
      var $parent = $el.parent();
      var $sibling = $("<img src='"+$el.data("hover-image")+"' />");

      $parent.css({
        "display": "inline-block",
        "height": $el.height(),
        "width": $el.width()
      }).addClass("activates-hover-image");

      if($el.parent().css("position") !== "absolute"){
        $el.parent().css("position", "relative");
      }

      $el.css({
        "position":"absolute",
        "top": 0,
        "left": 0
      });

      $sibling.css({
        "position":"absolute",
        "top": 0,
        "left": 0
      });

      $parent.append($sibling);

    });
  };

  return Sitewide;

});