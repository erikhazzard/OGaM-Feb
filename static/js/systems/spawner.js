// Generated by CoffeeScript 1.4.0
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['entity'], function(Entity) {
    var Spawner;
    Spawner = (function() {

      function Spawner(entities) {
        this.entities = entities;
        return this;
      }

      Spawner.prototype.canBirth = function(entity, neighbors) {
        var human, neighbor, neighborHuman, parentIndex, _i, _len, _ref;
        human = entity.components.human;
        if (human.sex === 'male') {
          return false;
        }
        if (human.age < 20 || human.age > 64 || human.resources < 5) {
          return false;
        }
        if (human.isPregnant) {
          human.gestationTimeLeft -= 0.1;
          if (human.gestationTimeLeft < 0) {
            return true;
          } else {
            return false;
          }
        }
        if (neighbors.length < 1) {
          return false;
        } else {
          for (_i = 0, _len = neighbors.length; _i < _len; _i++) {
            neighbor = neighbors[_i];
            if (neighbor.hasComponent('human') !== true) {
              continue;
            }
            neighborHuman = neighbor.components.human;
            if (neighborHuman.sex === 'male') {
              parentIndex = neighborHuman.family.indexOf(entity.id);
              if (parentIndex > -1 && parentIndex < 6) {
                return false;
              }
              if (_ref = entity.id, __indexOf.call(neighborHuman.children, _ref) >= 0) {
                return false;
              }
              if (human.mateId !== null && human.mateId !== neighbor.id) {
                return false;
              }
              if (neighborHuman.mateId === null) {
                neighborHuman.mateId = entity.id;
              } else if (neighborHuman.mateId !== entity.id) {
                return false;
              }
              if (Math.random() < human.pregnancyChance) {
                human.isPregnant = true;
                human.mateId = neighbor.id;
                break;
              }
            }
          }
        }
        return false;
      };

      Spawner.prototype.makeBaby = function(entity, neighbors) {
        var human, newEntity;
        human = entity.components.human;
        human.isPregnant = false;
        human.gestationTimeLeft = human.gestationLength;
        newEntity = new Entity();
        newEntity.addComponents(entity.getComponentNames());
        newEntity.components.position = entity.components.position.copy();
        newEntity.components.position = entity.components.position.copy();
        newEntity.components.human.family.push(entity.id);
        newEntity.components.human.family.push(human.mateId);
        this.entities.add(newEntity);
        human.children.push(newEntity.id);
        if (this.entities.entities[human.mateId]) {
          this.entities.entities[human.mateId].components.human.children.push(newEntity.id);
        }
        return newEntity;
      };

      Spawner.prototype.tick = function(delta) {
        var canBirth, entity, id, neighbors, spawner, _ref, _results;
        _ref = this.entities.entitiesIndex['spawner'];
        _results = [];
        for (id in _ref) {
          entity = _ref[id];
          if (entity.hasComponent('human') !== true) {
            continue;
          }
          spawner = entity.components.spawner;
          neighbors = spawner.getNeighbors();
          canBirth = this.canBirth(entity, neighbors);
          if (canBirth) {
            _results.push(this.makeBaby(entity));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return Spawner;

    })();
    return Spawner;
  });

}).call(this);
