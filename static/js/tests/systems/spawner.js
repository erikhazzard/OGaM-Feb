// Generated by CoffeeScript 1.4.0
(function() {

  define(['systems/spawner', 'entity', 'entities'], function(Spawner, Entity, Entities) {
    return describe('Spawner: Base Tests', function() {
      return it('should successfully create an entity', function() {
        var a;
        a = new Entity();
        return a.components.should.deep.equal({});
      });
    });
  });

}).call(this);
