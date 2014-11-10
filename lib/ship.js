(function(){
  if (typeof(Asteroids) == "undefined"){
    window.Asteroids = {};
  }
  
  var MovingObject = window.Asteroids.MovingObject;
  
  var Ship = window.Asteroids.Ship = function(shipParam){
    MovingObject.call(this,
                      {
                      pos: shipParam.pos, 
                      vel: 0,
                      radius: Ship.RADIUS,
                      color: Ship.COLOR,
                      game: shipParam.game
                      })
  }
  
  Ship.RADIUS = 20;
  Ship.COLOR = 'green';
})();