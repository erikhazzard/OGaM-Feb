// Generated by CoffeeScript 1.4.0
(function() {

  define(['components/vector', 'components/physics', 'entity'], function(Vector, Physics, Entity) {
    describe('Physics: Base tests', function() {
      return it('Should setup physics component', function() {
        var physics;
        return physics = new Physics();
      });
    });
    describe('Physics: tick() update tests', function() {
      it('tick() should properly update position', function() {
        var entity, physics;
        entity = new Entity();
        entity.addComponent('world');
        entity.addComponent('physics');
        entity.addComponent('position');
        physics = entity.components.physics;
        entity.components.position.x.should.equal(0);
        entity.components.position.y.should.equal(0);
        physics.tick();
        entity.components.position.x.should.equal(0);
        entity.components.position.y.should.equal(0);
        physics.velocity = new Vector(2, 2);
        physics.tick();
        entity.components.position.x.should.equal(2);
        return entity.components.position.y.should.equal(2);
      });
      return it('tick() should properly update velocity and acceleration', function() {
        var entity, physics;
        entity = new Entity();
        entity.addComponent('physics');
        entity.addComponent('position');
        physics = entity.components.physics;
        physics.velocity = new Vector(2, 2);
        physics.tick();
        entity.components.position.x.should.equal(2);
        entity.components.position.y.should.equal(2);
        physics.acceleration = new Vector(1, 1);
        physics.tick();
        entity.components.position.x.should.equal(5);
        entity.components.position.y.should.equal(5);
        entity.components.physics.acceleration.x.should.equal(0);
        entity.components.physics.acceleration.y.should.equal(0);
        entity.components.physics.velocity.x.should.equal(3);
        entity.components.physics.velocity.y.should.equal(3);
        physics.tick();
        entity.components.position.x.should.equal(8);
        return entity.components.position.y.should.equal(8);
      });
    });
    describe('Physics: seek() tests', function() {
      return it('should return a proper seek force', function() {
        var a, b, force;
        a = new Entity().addComponent('physics').addComponent('position');
        b = new Entity().addComponent('physics').addComponent('position');
        force = a.components.physics.seekForce(b);
        force.x.should.equal(0);
        force.y.should.equal(0);
        a.components.position = new Vector(4, 4);
        b.components.position = new Vector(8, 8);
        a.components.physics.maxForce = 0.5;
        a.components.physics.maxSpeed = 8;
        force = a.components.physics.seekForce(b);
        force.x.should.equal(0.35355339059327373);
        return force.y.should.equal(0.35355339059327373);
      });
    });
    return describe('Physics: applyForce()', function() {
      return it('should return apply a force', function() {});
    });
  });

}).call(this);
