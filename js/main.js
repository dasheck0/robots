/**
 * Created by s.neidig on 11/07/17.
 */


var Template = Template || {};

window.onload = function () {
    var game = new Phaser.Game("640", "360", Phaser.CANVAS);

    game.state.add("boot", new Template.Boot());
    game.state.add("loading", new Template.Loading());
    game.state.add("level", new Template.Level());

    game.state.start("boot", true, false, "assets/json/test.json");
};