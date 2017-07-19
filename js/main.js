/**
 * Created by s.neidig on 11/07/17.
 */


let Template = Template || {};

window.onload = function () {
    var game = new Phaser.Game(640, 360, Phaser.CANVAS);

    game.state.add('boot', new Template.Boot());
    game.state.add('loading', new Template.Loading());
    game.state.add('level', new Template.Level());

    game.state.start('boot', true, false, 'assets/json/level.json');

    console.log(36, 24, calculateDamage(36, 24));
    console.log(36, 36, calculateDamage(36, 36));
    console.log(36, 59, calculateDamage(36, 59));
    console.log(127, 59, calculateDamage(127, 59));
    console.log(127, 127, calculateDamage(127, 127));
    console.log(127, 240, calculateDamage(127, 240));
};