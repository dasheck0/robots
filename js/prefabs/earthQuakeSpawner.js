/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.EarthQuakeSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.EarthQuakeSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.EarthQuakeSpawner.prototype.constructor = Bots.EarthQuakeSpawner;

Bots.EarthQuakeSpawner.prototype.spawn = function (object, magnitude = 1) {
    if (this.game.physics.arcade.distanceBetween(object, getHumanRobot(this.state.groups.robots)) < 400) {
        const position = new Phaser.Point(object.x, object.y);
        this.game.camera.shake(0.001 * magnitude, 150 * magnitude);
    }

    if (magnitude >= 5) {
        this.state.groups.robots.forEach((robot) => {
            if (this.game.physics.arcade.distanceBetween(object, robot) < 400 && !robot.boss) {
                robot.stunned = true;
                this.game.time.events.add(150 * magnitude / 2, () => {
                    robot.stunned = false;
                }, this);
            }
        });
    }
}