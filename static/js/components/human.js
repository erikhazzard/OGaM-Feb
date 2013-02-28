// Generated by CoffeeScript 1.4.0
(function() {

  define(['lib/d3'], function(d3) {
    var Human;
    Human = (function() {

      function Human(entity, params) {
        params = params || {};
        this.entity = entity;
        this.age = params.age || 0.1;
        this.ageSpeed = params.ageSpeed || 0.1;
        this.isDead = false;
        this.resources = params.resources || 100;
        this.sex = ['male', 'female'][Math.random() * 2 | 0];
        this.isPregnant = false;
        this.pregnancyChance = Math.random();
        this.findMateChance = Math.random();
        this.gestationLength = 0.9;
        this.gestationTimeLeft = 0;
        this.mateId = null;
        this.children = [];
        this.family = [];
        this.hasZombieInfection = false;
        this.infectionScale = d3.scale.linear().domain([0, 100]).range([0.3, 0.001]).clamp(true);
        this.strength = Math.random() * 20 | 0;
        this.agility = Math.random() * 20 | 0;
      }

      Human.prototype.getIsDead = function(health) {
        if (health <= 0) {
          this.isDead = true;
        }
        return this.isDead;
      };

      return Human;

    })();
    return Human;
  });

}).call(this);
