// Generated by CoffeeScript 1.4.0
(function() {

  define(['components/vector'], function(Vector) {
    var UserInput;
    UserInput = (function() {

      function UserInput(entities) {
        var _this = this;
        this.entities = entities;
        document.addEventListener('keydown', function(e) {
          var force;
          force = new Vector(0, 0);
          if (e.keyCode === 37) {
            force.add(new Vector(-1, 0));
          } else if (e.keyCode === 38) {
            force.add(new Vector(0, -1));
          } else if (e.keyCode === 39) {
            force.add(new Vector(1, 0));
          } else if (e.keyCode === 40) {
            force.add(new Vector(0, 1));
          }
          return _this.inputForce = force.copy();
        });
        this.inputForce = null;
        return this;
      }

      UserInput.prototype.tick = function(delta) {
        var entity, id, _ref, _results;
        _ref = this.entities.entitiesIndex.userMovable;
        _results = [];
        for (id in _ref) {
          entity = _ref[id];
          if (entity.hasComponent('physics')) {
            if (this.inputForce) {
              _results.push(entity.components.physics.applyForce(this.inputForce).multiply(2));
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return UserInput;

    })();
    return UserInput;
  });

}).call(this);
