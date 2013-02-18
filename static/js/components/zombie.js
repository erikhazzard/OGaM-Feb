// Generated by CoffeeScript 1.4.0
(function() {

  define(['lib/d3'], function(d3) {
    var Zombie;
    Zombie = (function() {

      function Zombie(entity, params) {
        params = params || {};
        this.entity = entity;
        this.age = params.age || 0.1;
        this.resources = params.resources || 100;
        this.isDead = false;
        this.decayRate = params.decayRate || Math.abs(d3.random.normal(1, 0.4)());
        this.strength = Math.random() * 20 | 0;
        this.agility = Math.random() * 20 | 0;
      }

      Zombie.prototype.calculateHealth = function(health) {
        if (this.resources < 20) {
          health -= 0.01 + Math.abs(this.resources * 0.01);
        }
        if (this.resources < 0) {
          health -= 0.2 + Math.abs(this.resources * 0.04);
        }
        if (this.resources > 50) {
          health += 0.01 + Math.abs(this.resources * 0.005);
        }
        return health;
      };

      Zombie.prototype.getIsDead = function(health) {
        if (this.resources <= 0 || health <= 0) {
          this.isDead = true;
        }
        return this.isDead;
      };

      Zombie.prototype.getMaxSpeed = function() {
        var maxSpeed;
        maxSpeed = 8;
        if (this.resources < 20) {
          maxSpeed = 4;
        }
        return maxSpeed;
      };

      Zombie.prototype.calculateResources = function() {
        var resources;
        resources = this.resources;
        resources -= this.decayRate;
        return resources;
      };

      return Zombie;

    })();
    return Zombie;
  });

}).call(this);
