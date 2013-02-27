// Generated by CoffeeScript 1.4.0
(function() {

  define(['entity', 'assemblages/assemblages'], function(Entity, Assemblages) {
    var Zombie;
    Zombie = (function() {

      Zombie.ageSpeed = 0.05;

      function Zombie(entities) {
        this.entities = entities;
        return this;
      }

      Zombie.prototype.calculateResources = function(entity) {
        var resources;
        resources = entity.components.resources.resources;
        resources -= entity.components.zombie.decayRate;
        return resources;
      };

      Zombie.prototype.calculateHealth = function(entity) {
        var health, resources;
        resources = entity.components.resources.resources;
        health = entity.components.health.health;
        if (resources < 0) {
          health -= 0.4 + Math.abs(resources * 0.04);
        } else if (resources < 20) {
          health -= 0.2 + Math.abs(resources * 0.01);
        } else if (resources > 50) {
          health += 0.005 + Math.abs(resources * 0.005);
        }
        return health;
      };

      Zombie.prototype.calculateMaxSpeed = function(entity) {
        var maxSpeed;
        maxSpeed = entity.components.physics.maxSpeed;
        if (entity.components.resourcesresources < 20) {
          maxSpeed = 2;
        }
        return maxSpeed;
      };

      Zombie.prototype.updateZombie = function(entity) {
        var health, physics, resources, zombie;
        zombie = entity.components.zombie;
        physics = entity.components.physics;
        health = entity.components.health;
        resources = entity.components.resources;
        zombie.age += Zombie.ageSpeed;
        physics.maxSpeed = this.calculateMaxSpeed(entity);
        resources.resources = this.calculateResources(entity);
        if (health) {
          health.health = this.calculateHealth(entity);
          zombie.isDead = zombie.getIsDead(health.health);
        }
        if (zombie.isDead) {
          this.entities.remove(entity);
        }
        return true;
      };

      Zombie.prototype.tick = function(delta) {
        var entity, id, _ref;
        _ref = this.entities.entitiesIndex.zombie;
        for (id in _ref) {
          entity = _ref[id];
          this.updateZombie(entity);
        }
        return this;
      };

      return Zombie;

    })();
    return Zombie;
  });

}).call(this);
