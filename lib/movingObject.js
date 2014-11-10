(function(){
  if (typeof(Asteroids) == "undefined"){
    window.Asteroids = {};
  }
  
  var MovingObject = window.Asteroids.MovingObject = function(objParam){
    this.pos = objParam.pos;
    this.vel = objParam.vel;
    this.radius = objParam.radius;
    this.color = objParam.color;
    this.game = objParam.game;
  }
  
  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
  
  MovingObject.prototype.collideWith = function(otherObject){
    this.game.remove(this);
    this.game.remove(otherObject);
  }
  
  MovingObject.prototype.move = function() {
    this.pos = this.game.wrap(this.pos.addVector(this.vel));
  }
  
  MovingObject.prototype.isCollidedWith = function(otherObject){
    return this.pos.distanceTo(otherObject.pos) < this.radius + otherObject.radius;
  }
})();