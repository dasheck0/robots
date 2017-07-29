/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.SoundSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.SoundSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.SoundSpawner.prototype.constructor = Bots.SoundSpawner;

Bots.SoundSpawner.prototype.spawn = function (source, key) {
    const humanRobot = getHumanRobot(this.state.groups.robots);

    if (humanRobot) {
        const distance = this.game.physics.arcade.distanceBetween(source, humanRobot);
        if (distance < 300) {
            const sound = this.createObject(`sound_${key}`, key);
        }
    }
}

Bots.SoundSpawner.prototype.createObject = function (name, key) {
    const properties = {
        key,
        playAfterDecode: true,
        killAfterPlay: true
    };

    return new Bots.SoundPrefab(this.state, name, new Phaser.Point(0, 0), properties);
};