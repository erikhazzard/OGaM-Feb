// Generated by CoffeeScript 1.4.0
(function() {

  define(['components/vector', 'components/physics', 'systems/physics', 'entity', 'entities'], function(Vector, PhysicsComponent, PhysicsSystem, Entity, Entities) {
    describe('Physics System: Base tests', function() {
      return it('Should setup physics component', function() {
        var physics;
        return physics = new PhysicsSystem();
      });
    });
    return describe('Physics System: tick() update tests', function() {
      it('tick() should properly update position', function() {
        var entities, entity, physicsComponent, physicsSystem;
        entity = new Entity();
        entities = new Entities();
        entities.add(entity);
        entity.addComponent('world');
        entity.addComponent('physics');
        entity.addComponent('position');
        physicsComponent = entity.components.physics;
        physicsSystem = new PhysicsSystem(entities);
        entity.components.position.x.should.equal(0);
        entity.components.position.y.should.equal(0);
        physicsSystem.tick();
        entity.components.position.x.should.equal(0);
        entity.components.position.y.should.equal(0);
        physicsComponent.velocity = new Vector(2, 2);
        physicsSystem.tick();
        entity.components.position.x.should.equal(2);
        return entity.components.position.y.should.equal(2);
      });
      return it('tick() should properly update velocity and acceleration', function() {
        var entities, entity, physicsComponent, physicsSystem;
        entity = new Entity();
        entities = new Entities();
        entities.add(entity);
        entity.addComponent('physics');
        entity.addComponent('position');
        physicsComponent = entity.components.physics;
        physicsComponent.velocity = new Vector(2, 2);
        physicsSystem = new PhysicsSystem(entities);
        physicsSystem.tick();
        entity.components.position.x.should.equal(2);
        entity.components.position.y.should.equal(2);
        physicsComponent.acceleration = new Vector(1, 1);
        physicsSystem.tick();
        entity.components.position.x.should.equal(5);
        entity.components.position.y.should.equal(5);
        entity.components.physics.acceleration.x.should.equal(0);
        entity.components.physics.acceleration.y.should.equal(0);
        entity.components.physics.velocity.x.should.equal(3);
        entity.components.physics.velocity.y.should.equal(3);
        physicsSystem.tick();
        entity.components.position.x.should.equal(8);
        return entity.components.position.y.should.equal(8);
      });
    });
  });

}).call(this);