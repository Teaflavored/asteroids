(function(){
  if (typeof(Asteroids) == "undefined"){
    window.Asteroids = {};
  }

  var GameView = window.Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function(){
    var that = this;
    window.setInterval(function(){
      that.game.step();
      that.game.draw(that.ctx);
      that.game.checkOver(that.ctx);
    }, 20);

    window.setInterval(function(){
      //key.getPressedKeyCodes().indexOf("w") !== -1
      var keys = key.getPressedKeyCodes();
      if(keys.indexOf(87) !== -1 && keys.indexOf(65) !== -1){
        that.game.ship.moveLeft();
        that.game.ship.moveForward();
      } else if (keys.indexOf(87) !== -1 && keys.indexOf(68) !== -1){
        that.game.ship.moveRight();
        that.game.ship.moveForward();
      }
        else if(keys.indexOf(87) !== -1){
        that.game.ship.moveForward();
      } else if(keys.indexOf(83) !== -1){
        that.game.ship.moveBackward();
      } else if(keys.indexOf(65) !== -1){
        that.game.ship.moveLeft();
      } else if(keys.indexOf(68) !== -1){
        that.game.ship.moveRight();
      } else {
        that.game.ship.slow();
      }

    }, 10)
    key('space', function(){ that.game.ship.fireBullet()});
    key('r', function(){ that.game.restart()});
  };

})();
