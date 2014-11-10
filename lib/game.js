(function(){
  if (typeof(Asteroids) == "undefined"){
    window.Asteroids = {};
  }
  
  var Game = window.Asteroids.Game = function(){
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new window.Asteroids.Ship({pos: [GAME.DIM_X/2, GAME.DIM_Y/2], game: this});
  }
  
  Game.prototype.addAsteroids = function(){
    while (this.asteroids.length < Game.NUM_ASTEROIDS) {
      //console.log(new window.Asteroids.Asteroid({pos: Game.randomPosition()}))
      this.asteroids.push(new window.Asteroids.Asteroid({pos: Game.prototype.randomPosition(), game: this}));
    }
  }
  
  Game.prototype.randomPosition = function(){
    return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
  }
  
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    for(var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw(ctx);
    }
  }
  
  Game.prototype.moveObjects = function(){
    for(var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].move();
    }
  }
  
  Game.prototype.checkCollisions = function(){
    for(var i = 0; i < this.allObjects().length; i++){
      for(var j = 0; j < this.allObjects().length; j++){
        if(i !== j){
          if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
            this.allObjects()[i].collideWith(this.allObjects()[j])
          }
        }
      }
    }
  } 
  
  Game.prototype.remove = function(asteroid){
    this.asteroids.splice(this.asteroids.indexOf(asteroid), 1);
  }
  
  Game.prototype.step = function(){
    this.moveObjects();
    this.checkCollisions();
  }
  
  Game.prototype.wrap = function(pos){
    var x = pos[0];
    var y = pos[1];
    if (x >= Game.DIM_X){
      x = x - Game.DIM_X;
    } else if (x < 0) {
      x = x + 600
    }
    if ( y >= Game.DIM_Y) {
      y = y - Game.DIM_Y
    } else if (y < 0) {
      y = y + Game.DIM_Y
    }
    return [x, y];
  }
  
  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]);
  }
  
  
  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 4;
})();