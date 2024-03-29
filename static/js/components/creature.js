// Generated by CoffeeScript 1.4.0
(function() {

  define([], function() {
    var Creature;
    Creature = (function() {

      function Creature(entity, params) {
        params = params || {};
        this.entity = entity;
        this.health = params.health || 100;
        this.tickFunctions = [];
        this.isDead = false;
      }

      Creature.prototype.tick = function(delta) {
        if (this.health < 0) {
          this.isDead = true;
        }
        return this;
      };

      return Creature;

    })();
    return Creature;
  });

}).call(this);
