// Generated by CoffeeScript 1.4.0
(function() {

  define(['components/world'], function(World) {
    return describe('World: Base tests', function() {
      it('Should setup world component and properties', function() {
        var world, world2;
        world = new World();
        world.should.not.equal(void 0);
        world.width.should.not.equal(void 0);
        world.height.should.not.equal(void 0);
        world.canvas.should.not.equal(void 0);
        world.context.should.not.equal(void 0);
        world2 = new World();
        return world.should.not.equal(void 0);
      });
      return it('Should use prototype for default props', function() {
        var contextIdentical, contextIsPrototype, world, world2;
        world = new World();
        world2 = new World();
        contextIdentical = world.context === world2.context;
        contextIdentical.should.be["true"];
        contextIsPrototype = world.context === World.context;
        return contextIsPrototype.should.be["true"];
      });
    });
  });

}).call(this);
