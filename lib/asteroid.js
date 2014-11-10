(function(){
  if (typeof(Asteroids) == "undefined"){
    window.Asteroids = {};
  }
  
  var MovingObject = window.Asteroids.MovingObject;
  
  var Asteroid = window.Asteroids.Asteroid = function(asteroidParam){
    MovingObject.call(this,
                      {
                      pos: asteroidParam.pos, 
                      vel: window.Asteroids.Util.randomVec(Math.random() * 10 + 1),
                      radius: Asteroid.RADIUS,
                      color: Asteroid.COLOR,
                      game: asteroidParam.game
                      })
  }
  Asteroid.inherits(MovingObject)
  Asteroid.COLOR = '#000000';
  Asteroid.RADIUS = 50;
})();