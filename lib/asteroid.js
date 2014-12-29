(function(){
  if (typeof(Asteroids) == "undefined"){
    window.Asteroids = {};
  }

  var MovingObject = window.Asteroids.MovingObject;


  var Asteroid = window.Asteroids.Asteroid = function(asteroidParam){
    this.width = 60;
    this.height = 63;

    MovingObject.call(this, {
      pos: asteroidParam.pos,
      vel: window.Asteroids.Util.randomVec(Math.random()),
      radius: this.width / 2,
      color: Asteroid.COLOR,
      game: asteroidParam.game
    });



    this.astImg = new Image();
    this.astImg.src = './lib/asteroid.png'
  };

  Asteroid.inherits(MovingObject)

  Asteroid.prototype.center = function(){
    return [this.width / 2 + this.pos[0], this.height /2 + this.pos[1]]
  }

  Asteroid.prototype.collideWith = function (otherObject){
    if (otherObject instanceof window.Asteroids.Bullet){
      this.game.remove(this);
    } else if (otherObject instanceof window.Asteroids.Ship) {
      this.game.ship.gotHit();
      //say lost
    }
  };

  Asteroid.prototype.draw = function(ctx){
    ctx.drawImage(this.astImg, 6, 5, 60, 63, this.pos[0], this.pos[1], this.width, this.height);
  }


  Asteroid.COLOR = '#FFFFFF';
  Asteroid.RADIUS = 30;

})();
