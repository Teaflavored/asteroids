(function(){
  if (typeof(Asteroids) == "undefined"){
    window.Asteroids = {};
  }

  var MovingObject = window.Asteroids.MovingObject;

  var Ship = window.Asteroids.Ship = function(shipParam){
    MovingObject.call(this,
                      {
                      pos: shipParam.pos,
                      vel: [0, 0],
                      radius: Ship.RADIUS,
                      color: Ship.COLOR,
                      game: shipParam.game
                      })
    this.shipImg = new Image();
    this.shipImg.src = './lib/ship.png'
    this.angle = 0;
  }
  Ship.inherits(MovingObject)

  Ship.prototype.regenerate = function () {
    this.pos = this.game.startingShipPos();//this.game.startingShipPos();
    this.vel = [0, 0];
  }

  Ship.prototype.power = function(impulse){
    this.vel = this.vel.addVector(impulse);
  }

  Ship.prototype.moveForward = function(){
    var velToAdd = window.Asteroids.Util.unitVec(this.angle)
    this.vel = this.vel.addVector([velToAdd[0] * 0.02, velToAdd[1] * 0.02]);
  }

  Ship.prototype.moveBackward = function(){
    var velToAdd = window.Asteroids.Util.unitVec(this.angle)
    this.vel = this.vel.addVector([ -1 * velToAdd[0] * 0.02, -1 * velToAdd[1] * 0.02]);
  }
  Ship.prototype.moveLeft = function(){
    this.angle -= Math.PI / 60;
  }

  Ship.prototype.moveRight = function(){
    this.angle += Math.PI / 60;
  }

  Ship.prototype.slow = function(impulse){
    var x = this.vel[0];
    var y = this.vel[1];


    if (y > 0){
      y -= 0.008
    } else if (y < 0){
      y += 0.008
    }
    this.vel = [x, y]
  }


  Ship.prototype.fireBullet = function () {
    var bullet = new window.Asteroids.Bullet({pos: this.pos, vel: window.Asteroids.Util.unitVec(this.angle), game: this.game});
    this.game.addBullets(bullet);
  }

  Ship.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1])
    ctx.rotate(this.angle)
    ctx.drawImage(this.shipImg, 0, 0, 78, 73, 0, 0, Ship.RADIUS, Ship.RADIUS);
    ctx.restore();
  }

  Ship.prototype.move = function() {
    var newPos = this.pos.addVector(this.vel);
    if (this.game.isOutOfBounds(newPos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(newPos);
      } else {
        this.game.remove(this);
      }
    } else {
      this.pos = newPos;
    }
  }

  Ship.RADIUS = 36;
  Ship.COLOR = '#5500FF';
})();
