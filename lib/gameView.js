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
      if(key.isPressed("up")){
        that.game.ship.power([0, -0.08]);
      } else if(key.isPressed("down")){
        that.game.ship.power([0, 0.08]);
      } else if(key.isPressed("left")){
        that.game.ship.power([-0.08, 0]);
      } else if(key.isPressed("right")){
        that.game.ship.power([0.08, 0]);
      } else {
        that.game.ship.slow();
      }

    }, 10)
    key('space', function(){ that.game.ship.fireBullet()});
    key('r', function(){ that.game.restart()});
  };

})();
