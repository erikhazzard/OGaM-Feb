// Generated by CoffeeScript 1.4.0
(function() {

  define(['components/vector', 'lib/d3'], function(Vector, d3) {
    var Physics;
    Physics = (function() {

      function Physics(entity, params) {
        params = params || {};
        this.entity = entity;
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.maxSpeed = params.maxSpeed || 8;
        this.maxForce = params.maxForce || 0.5;
        this.maxSeekForceDistance = params.maxSeekForceDistance || 150;
        this.mass = params.mass || 10;
        this.maxX = 500;
        this.maxY = 500;
        if (this.entity && this.entity.components.world) {
          this.maxX = this.entity.components.world.width;
          this.maxY = this.entity.components.world.height;
        }
        return this;
      }

      Physics.prototype.applyForce = function(force) {
        this.acceleration.add(force.copy());
        return force;
      };

      Physics.prototype.seekForce = function(target, maxDistance, flee) {
        var curDistance, desiredVelocity, distance, magnitude, position, scale, steer, steerLine;
        maxDistance = maxDistance || 100;
        if (target && target.components && target.components.position) {
          target = target.components.position;
        }
        position = this.entity.components.position;
        desiredVelocity = Vector.prototype.subtract(target, position);
        if (this.maxSeekForceDistance) {
          curDistance = position.distance(target);
          if (curDistance <= 0 || curDistance > this.maxSeekForceDistance) {
            return new Vector(0, 0);
          }
        }
        distance = desiredVelocity.magnitude();
        magnitude = 0;
        scale = d3.scale.linear().domain([0, maxDistance]).range([0, this.maxSpeed]);
        if (distance < maxDistance) {
          magnitude = scale(distance);
          desiredVelocity.multiply(magnitude);
        } else {
          desiredVelocity.multiply(this.maxSpeed);
        }
        steer = Vector.prototype.subtract(desiredVelocity, this.velocity);
        steerLine = Vector.prototype.add(position, steer);
        steer.limit(this.maxForce);
        if (flee) {
          steer.multiply(-1);
        }
        return steer;
      };

      return Physics;

    })();
    return Physics;
  });

}).call(this);
