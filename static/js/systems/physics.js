// Generated by CoffeeScript 1.4.0
(function() {

  define(['components/vector'], function(Vector) {
    var Physics;
    Physics = (function() {

      function Physics(entities) {
        this.entities = entities;
        return this;
      }

      Physics.prototype.updatePhysics = function(entity) {
        var physics;
        physics = entity.components.physics;
        physics.velocity.add(physics.acceleration);
        physics.velocity.limit(physics.maxSpeed);
        if (entity) {
          entity.components.position.add(physics.velocity);
        }
        physics.acceleration.multiply(0);
        this.checkEdges(entity);
        return this;
      };

      Physics.prototype.checkEdges = function(entity) {
        var physics, position;
        physics = entity.components.physics;
        position = entity.components.position;
        if (position.x >= physics.maxX) {
          position.x = position.x % physics.maxX;
        } else if (position.x < 0) {
          position.x = physics.maxX - 1;
        }
        if (position.y >= physics.maxY) {
          position.y = position.y % physics.maxY;
        } else if (position.y < 0) {
          position.y = physics.maxY - 1;
        }
        return entity;
      };

      Physics.prototype.humanZombieBehavior = function(entity) {
        var behaviorForce, behvaiorForce, neighbor, neighborId, neighbors, numHumans, numZombies, physics, pursuitDesire, scale, _i, _j, _len, _len1, _ref;
        physics = entity.components.physics;
        behvaiorForce = new Vector(0, 0);
        if (entity.hasComponent('human') && this.entities.entitiesIndex.zombie) {
          numHumans = numZombies = 0;
          neighbors = [];
          _ref = entity.components.world.getNeighbors(10);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            neighborId = _ref[_i];
            neighbor = this.entities.entities[neighborId];
            if (!(neighbor != null)) {
              continue;
            }
            if (neighbor.hasComponent('zombie')) {
              numZombies += 1;
            }
            if (neighbor.hasComponent('human')) {
              numHumans += 1;
            }
            if (neighbor !== entity) {
              neighbors.push(neighborId);
            }
          }
          pursuitDesire = 0;
          if (entity.components.health.health < 20) {
            pursuitDesire -= 2;
          }
          if (entity.components.human.age < 10 || entity.components.human.age > 80) {
            pursuitDesire -= 3;
          }
          for (_j = 0, _len1 = neighbors.length; _j < _len1; _j++) {
            neighborId = neighbors[_j];
            neighbor = this.entities.entities[neighborId];
            if (!(neighbor != null)) {
              continue;
            }
            if (neighbor.hasComponent('zombie')) {
              scale = numHumans - numZombies;
              scale += pursuitDesire;
              behaviorForce = physics.seekForce(neighbor).multiply(scale);
              physics.applyForce(behaviorForce);
            }
          }
          return behaviorForce;
        }
      };

      Physics.prototype.tick = function(delta) {
        var chaseForce, child, childId, childPhysics, entity, human, id, mateId, matePhysics, neighbor, neighborId, physics, zombie, _i, _j, _len, _len1, _ref, _ref1, _ref2;
        _ref = this.entities.entitiesIndex['physics'];
        for (id in _ref) {
          entity = _ref[id];
          physics = entity.components.physics;
          if (entity.hasComponent('userMovable') === false) {
            if (entity.hasComponent('randomWalker')) {
              physics.applyForce(entity.components.randomWalker.walkForce());
            }
            if (entity.hasComponent('human') && !entity.hasComponent('userMovable')) {
              this.humanZombieBehavior(entity);
              if (this.entities.entities[this.entities.PC]) {
                physics.applyForce(physics.seekForce(this.entities.entities[this.entities.PC], 80, false).multiply(1));
              }
              human = entity.components.human;
              mateId = human.mateId;
              if (mateId !== null) {
                if (this.entities.entities[mateId]) {
                  physics.applyForce(physics.seekForce(this.entities.entities[mateId], 700, true).multiply(1.1));
                  matePhysics = this.entities.entities[mateId].components.physics;
                  matePhysics.applyForce(matePhysics.seekForce(entity, 700, true).multiply(1.1));
                }
              }
              if (human.children.length > 0) {
                _ref1 = human.children;
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  childId = _ref1[_i];
                  child = this.entities.entities[childId];
                  if (child && child.components.human.age < 10) {
                    physics.applyForce(physics.seekForce(child).multiply(1.3));
                    childPhysics = child.components.physics;
                    childPhysics.applyForce(childPhysics.seekForce(entity).multiply(1.3));
                  }
                }
              }
            }
            if (entity.hasComponent('zombie') && !entity.hasComponent('userMovable')) {
              zombie = entity.components.zombie;
              _ref2 = entity.components.world.getNeighbors(zombie.seekRange);
              for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                neighborId = _ref2[_j];
                neighbor = this.entities.entities[neighborId];
                if (!(neighbor != null)) {
                  continue;
                }
                if (neighbor.id === this.entities.PC) {
                  chaseForce = physics.seekForce(neighbor).multiply(4);
                  entity.components.physics.applyForce(chaseForce);
                  if (neighbor.components.zombie) {
                    if (neighbor.components.zombie.group.indexOf(entity.id) === -1) {
                      neighbor.components.zombie.group.push(entity.id);
                    }
                  }
                }
                if (neighbor.hasComponent('human')) {
                  chaseForce = physics.seekForce(neighbor).multiply(5);
                  entity.components.physics.applyForce(chaseForce);
                  break;
                }
              }
            }
          }
          this.updatePhysics(entity);
        }
        return this;
      };

      return Physics;

    })();
    return Physics;
  });

}).call(this);
