(function(){
  if (typeof(Asteroids) == "undefined"){
    window.Asteroids = {};
  }

  var MovingObject = window.Asteroids.MovingObject;

  var Ship = window.Asteroids.Ship = function(shipParam){
    this.width = 35;
    this.height = 40;
    MovingObject.call(this,
                      {
                      pos: shipParam.pos,
                      vel: [0, 0],
                      radius: this.height / 2 ,
                      color: Ship.COLOR,
                      game: shipParam.game
                      })

    this.shipImg = new Image();
    this.shipImg.src = './lib/ship.png'
    this.angle = 0;
  }

  Ship.inherits(MovingObject)

  Ship.prototype.gotHit = function(){
    this._gotHit = true;
  }


  Ship.prototype.center = function(){
    return [this.width / 2 + this.pos[0], this.height /2 + this.pos[1]]
  }

  Ship.prototype.power = function(impulse){
    this.vel = this.vel.addVector(impulse);
  }

  Ship.prototype.moveForward = function(){
    var velToAdd = window.Asteroids.Util.unitVec(this.angle)
    var newVel = this.vel.addVector([velToAdd[0] * 0.01, velToAdd[1] * 0.01])
    if (newVel.norm() < Ship.MAXSPEED){
      this.vel = newVel;
    }
  }

  Ship.prototype.moveBackward = function(){
    var velToAdd = window.Asteroids.Util.unitVec(this.angle)
    this.vel = this.vel.addVector([ -1 * velToAdd[0] * 0.02, -1 * velToAdd[1] * 0.02]);
  }
  Ship.prototype.moveLeft = function(){
    this.angle -= Math.PI / 240;
  }

  Ship.prototype.moveRight = function(){
    this.angle += Math.PI / 240;
  }

  Ship.prototype.slow = function(impulse){
    var x = this.vel[0];
    var y = this.vel[1];

    if (x > 0){
      x -= 0.008
    } else if (x < 0){
      x += 0.008
    }

    if (y > 0){
      y -= 0.008
    } else if (y < 0){
      y += 0.008
    }
    this.vel = [x, y]
  }


  Ship.prototype.fireBullet = function () {
    var bullet = new window.Asteroids.Bullet({pos: this.center(), vel: window.Asteroids.Util.unitVec(this.angle), game: this.game});
    this.game.addBullets(bullet);
  }

  Ship.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.center()[0], this.center()[1])
    ctx.rotate(this.angle)
    ctx.translate(-this.center()[0], -this.center()[1])
    ctx.translate(this.pos[0], this.pos[1])
    ctx.drawImage(this.shipImg, 10, 7, 63, 72, 0, 0, this.width, this.height);
    ctx.restore();
  }

  Ship.prototype.isCollidedWith = function(otherObject){
    return this.center().distanceTo(otherObject.center()) <= this.radius + otherObject.radius;
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
  Ship.MAXSPEED = 7;
  Ship.RADIUS = 20;
  Ship.COLOR = '#5500FF';
})();
