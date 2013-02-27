// Generated by CoffeeScript 1.4.0
(function() {

  define(['entity', 'assemblages/assemblages'], function(Entity, Assemblages) {
    var Living;
    Living = (function() {

      function Living(entities) {
        this.entities = entities;
        return this;
      }

      Living.prototype.calculateResources = function(entity) {
        var human, resources;
        resources = entity.components.resources.resources;
        human = entity.components.human;
        if (human.age < 20) {
          resources -= 0.005 + ((20 - human.age) / 46);
        } else if (this.age > 60) {
          resources -= 0.1 + (human.age * 0.0005);
        } else {
          resources -= 0.01;
          if (human.isPregnant) {
            resources -= 0.05;
          }
        }
        return resources;
      };

      Living.prototype.calculateHealth = function(entity) {
        var health, human, resources;
        human = entity.components.human;
        resources = entity.components.resources.resources;
        health = entity.components.health.health;
        if (resources < 0) {
          health -= 0.1 + Math.abs(resources * 0.02);
        }
        if (human.age > 70) {
          health -= 0.1 + (human.age * 0.005);
        }
        if (human.age > 100) {
          if (Math.random() < 0.1) {
            health = -1;
          }
        }
        if (human.hasZombieInfection) {
          health -= 5;
        }
        return health;
      };

      Living.prototype.updateHuman = function(entity) {
        var child, health, human, i, len, neighbors, newZombie, physics, resources;
        human = entity.components.human;
        physics = entity.components.physics;
        health = entity.components.health;
        resources = entity.components.resources;
        human.age += human.ageSpeed;
        if (physics) {
          physics.maxSpeed = human.getMaxSpeed();
        }
        neighbors = entity.components.world.getNeighbors(5);
        entity.components.physics.maxSpeed = 10 - neighbors.length;
        entity.components.physics.maxForce = 0.5 - (neighbors.length / 10);
        resources.resources = this.calculateResources(entity);
        if (resources < 10) {
          if (Math.random() < 0.05) {
            entity.components.flocking.rules.cohesion = -1;
            entity.components.flocking.rules.align = -1;
          }
        }
        health.health = this.calculateHealth(entity);
        human.isDead = human.getIsDead(health.health);
        if (human.isDead && human.hasZombieInfection) {
          newZombie = Assemblages.zombie();
          if (entity.hasComponent('userMovable')) {
            newZombie.addComponent('userMovable');
          }
          newZombie.components.position.x = entity.components.position.x;
          newZombie.components.position.y = entity.components.position.y;
          this.entities.add(newZombie);
        }
        if (human.isDead) {
          if (!human.hasZombieInfection && entity.hasComponent('userMovable') && human.children) {
            i = 0;
            len = human.children.length;
            while (i < len) {
              if (human.children[i]) {
                child = this.entities.entities[human.children[i]];
                if (child && child.hasComponent('human') && !child.components.human.isDead) {
                  child.addComponent('userMovable');
                }
                break;
              }
            }
          }
          this.entities.remove(entity);
        }
        return true;
      };

      Living.prototype.tick = function(delta) {
        var entity, id, _ref;
        _ref = this.entities.entitiesIndex['human'];
        for (id in _ref) {
          entity = _ref[id];
          this.updateHuman(entity);
        }
        return this;
      };

      return Living;

    })();
    return Living;
  });

}).call(this);
