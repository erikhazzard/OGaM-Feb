// Generated by CoffeeScript 1.4.0
(function() {

  define([], function() {
    var Renderer;
    Renderer = (function() {

      function Renderer(entity) {
        this.entity = entity;
        this.color = 'rgba(0,0,0,0.7)';
        this.x = this.y = 0;
        this.size = 10;
        return this;
      }

      Renderer.prototype.setColor = function(color) {
        return this.color = color;
      };

      Renderer.prototype.setSize = function(size) {
        return this.size = size;
      };

      Renderer.prototype.getPosition = function() {
        this.x = Math.round(this.entity.components.position.x);
        this.y = Math.round(this.entity.components.position.y);
        return {
          x: this.x,
          y: this.y
        };
      };

      return Renderer;

    })();
    return Renderer;
  });

}).call(this);
