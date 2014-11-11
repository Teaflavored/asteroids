(function(){
  if (typeof(Asteroids) == "undefined"){
    window.Asteroids = {};
  }

  var MovingObject = window.Asteroids.MovingObject;

  var Asteroid = window.Asteroids.Asteroid = function(asteroidParam){
    MovingObject.call(this, {
      pos: asteroidParam.pos,
      vel: window.Asteroids.Util.randomVec(Math.random()),
      radius: Asteroid.RADIUS,
      color: Asteroid.COLOR,
      game: asteroidParam.game
    });

    this.astImg = new Image();
    this.astImg.src = './lib/asteroid.png'
  };

  Asteroid.inherits(MovingObject)

  Asteroid.prototype.collideWith = function (otherObject){
    this.game.remove(this);
    if (otherObject instanceof window.Asteroids.Ship) {
      this.game.ship.regenerate();
    } else {
      this.game.remove(otherObject);
    }
  };

  Asteroid.prototype.draw = function(ctx){
    ctx.drawImage(this.astImg, 0, 0, 70, 70, this.pos[0], this.pos[1], Asteroid.RADIUS * 1.3, Asteroid.RADIUS * 1.3);
  }


  Asteroid.COLOR = '#FFFFFF';
  Asteroid.RADIUS = 35;

})();
