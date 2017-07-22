/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};

window.onload = function () {
    var game = new Phaser.Game(640, 360, Phaser.CANVAS);

    game.state.add('boot', new Bots.Boot());
    game.state.add('loading', new Bots.Loading());
    game.state.add('level', new Bots.Level());
    game.state.add('menu', new Bots.Menu());

    game.state.start('boot', true, false, 'assets/json/level.json');
};