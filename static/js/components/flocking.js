// Generated by CoffeeScript 1.4.0
(function() {

  define(['components/vector', 'components/physics'], function(Vector, Physics) {
    var Flocking;
    Flocking = (function() {

      function Flocking(entity, params) {
        params = params || {};
        this.rules = {};
        this.rules.separate = params.separate || Math.random() * 2;
        this.rules.align = params.align || Math.random() * 2;
        this.rules.cohesion = params.cohesion || Math.random() * 2;
        this.flockDistance = params.flockDistance || 40;
        this.separationDistance = params.separationDistance || null;
        this.entity = entity;
        return this;
      }

      Flocking.prototype.separate = function(entities) {
        var count, curDistance, diffVector, key, maxSpeed, position, separationDistance, steer, sumVector, targetEntity, velocity;
        separationDistance = this.separationDistance || this.entity.components.physics.mass;
        targetEntity = null;
        curDistance = 0;
        diffVector = null;
        sumVector = new Vector(0, 0);
        count = 0;
        steer = new Vector(0, 0);
        position = this.entity.components.position;
        maxSpeed = this.entity.components.physics.maxSpeed;
        velocity = this.entity.components.physics.velocity;
        for (key in entities) {
          targetEntity = entities[key];
          if (this.entity === targetEntity) {
            continue;
          }
          curDistance = position.distance(targetEntity.components.position);
          if (curDistance > 0 && curDistance < separationDistance && (targetEntity !== this)) {
            diffVector = Vector.prototype.subtract(position, targetEntity.components.position);
            diffVector.normalize();
            diffVector.divide(curDistance);
            sumVector.add(diffVector);
            count += 1;
          }
        }
        if (count > 0) {
          sumVector.divide(count);
          sumVector.normalize();
          sumVector.multiply(maxSpeed);
          steer = Vector.prototype.subtract(sumVector, velocity);
          steer.limit(maxSpeed);
        }
        return steer;
      };

      Flocking.prototype.align = function(entities) {
        var count, curDistance, distance, entity, i, key, maxForce, maxSpeed, position, steer, sum, targetEntity, velocity;
        distance = this.flockDistance;
        sum = new Vector(0, 0);
        i = 0;
        entity = null;
        curDistance = 0;
        count = 0;
        position = this.entity.components.position;
        velocity = this.entity.components.physics.velocity;
        maxSpeed = this.entity.components.physics.maxSpeed;
        maxForce = this.entity.components.physics.maxForce;
        for (key in entities) {
          targetEntity = entities[key];
          if (this.entity === targetEntity) {
            continue;
          }
          curDistance = position.distance(targetEntity.components.position);
          if (curDistance <= distance) {
            sum.add(targetEntity.components.physics.velocity);
            count += 1;
          }
        }
        steer = new Vector(0, 0);
        if (count > 0) {
          sum.divide(count);
          sum.normalize();
          sum.multiply(maxSpeed);
          steer = Vector.prototype.subtract(sum, velocity);
          steer.limit(maxForce);
        }
        return steer;
      };

      Flocking.prototype.cohesion = function(entities) {
        var count, curDistance, distance, entity, i, key, physics, position, seekForce, steer, sum, targetEntity;
        sum = new Vector(0, 0);
        i = 0;
        entity = null;
        distance = this.flockDistance;
        curDistance = 0;
        count = 0;
        position = this.entity.components.position;
        physics = this.entity.components.physics;
        seekForce = Physics.prototype.seekForce;
        for (key in entities) {
          targetEntity = entities[key];
          if (this.entity === targetEntity) {
            continue;
          }
          curDistance = position.distance(targetEntity.components.position);
          if (curDistance <= distance) {
            sum.add(targetEntity.components.position);
            count += 1;
          }
        }
        steer = new Vector(0, 0);
        if (count > 0) {
          sum.divide(count);
          steer = seekForce.call(physics, sum);
        }
        return steer;
      };

      Flocking.prototype.flock = function(entities, multiplier) {
        var align, cohesion, physics, sep;
        multiplier = multiplier || 1;
        if (!entities) {
          console.log('ERROR: COMPONENT: FLOCKING');
          console.log('must pass in entities object');
        }
        sep = this.separate(entities);
        align = this.align(entities);
        cohesion = this.cohesion(entities);
        sep.multiply(this.rules.separate).multiply(multiplier);
        align.multiply(this.rules.align).multiply(multiplier);
        cohesion.multiply(this.rules.cohesion).multiply(multiplier);
        physics = this.entity.components.physics;
        physics.applyForce(sep);
        physics.applyForce(align);
        physics.applyForce(cohesion);
        return this;
      };

      return Flocking;

    })();
    return Flocking;
  });

}).call(this);
