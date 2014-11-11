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
      if(key.isPressed("w")){
        that.game.ship.moveForward();
      } else if(key.isPressed("s")){
        that.game.ship.power([0, 0.08]);
      } else if(key.isPressed("a")){
        that.game.ship.moveLeft();
      } else if(key.isPressed("d")){
        that.game.ship.moveRight();
      } else {
        that.game.ship.slow();
      }

    }, 10)
    key('space', function(){ that.game.ship.fireBullet()});
    key('r', function(){ that.game.restart()});
  };

})();
