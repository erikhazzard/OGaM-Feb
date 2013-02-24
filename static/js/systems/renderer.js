// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['components/world'], function(World) {
    var Renderer, canvas, context, miniMapCanvas, miniMapContext;
    canvas = World.canvas;
    context = World.context;
    miniMapCanvas = document.getElementById('miniMap');
    miniMapContext = miniMapCanvas.getContext('2d');
    Renderer = (function() {

      function Renderer(entities) {
        this.tick = __bind(this.tick, this);
        this.entities = entities;
        this.canvasHalfWidth = canvas.width / 2;
        this.canvasHalfHeight = canvas.height / 2;
        return this;
      }

      Renderer.prototype.tick = function(delta) {
        var alpha, entity, entityFill, id, renderPosition, size, targetX, targetY, _ref, _ref1;
        canvas.width = canvas.width;
        miniMapCanvas.width = miniMapCanvas.width;
        this.camera = {
          x: 0,
          y: 0,
          radius: 20
        };
        _ref = this.entities.entitiesIndex['userMovable'];
        for (id in _ref) {
          entity = _ref[id];
          this.camera.x = entity.components.position.x;
          this.camera.y = entity.components.position.y;
        }
        _ref1 = this.entities.entitiesIndex['renderer'];
        for (id in _ref1) {
          entity = _ref1[id];
          context.save();
          renderPosition = entity.components.position;
          size = entity.components.renderer.size;
          targetX = renderPosition.x - (size / 2) - this.camera.x + this.canvasHalfWidth;
          targetY = renderPosition.y - (size / 2) - this.camera.y + this.canvasHalfHeight;
          entityFill = entity.components.renderer.color;
          if (entity.hasComponent('human')) {
            alpha = Math.round((1 - (entity.components.human.age / 110)) * 10) / 10;
            if (entity.components.human.age < 20) {
              entityFill = 'rgba(0,0,0,0.9)';
            } else if (entity.components.human.age > 64) {
              entityFill = 'rgba(150,150,150,0.9)';
            }
            if (entity.components.human.age > 19 && entity.components.human.age < 65) {
              if (entity.components.human.sex === 'female') {
                entityFill = 'rgba(255,100,255,' + alpha + ')';
              } else {
                entityFill = 'rgba(100,150,200,' + alpha + ')';
              }
            }
            if (entity.components.human.isPregnant) {
              context.save();
              context.strokeStyle = 'rgba(0,255,0,0.5)';
              context.lineWidth = 8;
              context.strokeRect(targetX, targetY, size, size);
              context.restore();
            }
            if (this.entities.entities[0] && this.entities.entities[0].components.human && entity.id === this.entities.entities[0].components.human.mateId) {
              context.save();
              context.strokeStyle = 'rgba(0,255,255,0.5)';
              context.lineWidth = 8;
              context.strokeRect(targetX, targetY, size, size);
              context.restore();
            }
            if (entity.components.human && entity.components.human.mateId) {
              context.save();
              context.strokeStyle = 'rgba(255,100,255,0.5)';
              context.strokeRect(targetX, targetY, size, size);
              context.restore();
            }
          }
          if (entity.hasComponent('zombie')) {
            entityFill = 'rgba(255,100,100,1)';
          }
          context.save();
          context.fillStyle = entityFill;
          context.fillRect(targetX, targetY, size, size);
          context.restore();
          if (entity.hasComponent('userMovable')) {
            context.save();
            context.strokeStyle = 'rgba(100,150,200,1)';
            context.lineWidth = 2;
            context.strokeRect(targetX, targetY, size, size);
            context.restore();
          }
          if (entity.hasComponent('combat')) {
            if (entity.components.combat.canAttack) {
              context.save();
              context.beginPath();
              context.strokeStyle = 'rgba(255,0,0,0.2)';
              context.lineWidth = 2;
              context.arc(targetX + (size / 2), targetY + (size / 2), 10, 0, 20);
              context.stroke();
              context.restore();
            }
          }
          miniMapContext.save();
          miniMapContext.fillStyle = 'rgba(20,20,20,1)';
          if (entity.hasComponent('zombie')) {
            miniMapContext.fillStyle = 'rgba(255,20,20,1)';
          }
          if (entity.hasComponent('userMovable')) {
            miniMapContext.fillStyle = 'rgba(20,255,20,1)';
            miniMapContext.strokeRect((renderPosition.x / 8) - this.canvasHalfWidth / 4, (renderPosition.y / 8) - this.canvasHalfHeight / 4, this.canvasHalfWidth / 2, this.canvasHalfHeight / 2);
          }
          miniMapContext.fillRect(renderPosition.x / 8 - 1, renderPosition.y / 8 - 1, 2, 2);
          miniMapContext.restore();
        }
        return this;
      };

      return Renderer;

    })();
    return Renderer;
  });

}).call(this);
