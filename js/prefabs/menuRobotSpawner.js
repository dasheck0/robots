/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.MenuRobotSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.MenuRobotSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.MenuRobotSpawner.prototype.constructor = Bots.MenuRobotSpawner;

Bots.MenuRobotSpawner.prototype.createObject = function (name, position) {
    position = new Phaser.Point(randomInteger(2 * Bots.screenSize.x) - Bots.screenSize.x / 2, randomInteger(2 * Bots.screenSize.y) - Bots.screenSize.y / 2);

    return new Bots.MenuRobot(this.state, name, position, {
        "group": "robots",
        "key": sample(['robot3Dred', 'robot3Dblue', 'robot3Dgreen', 'robot3Dyellow']),
        "friction": 10,
        "rotationSpeed": 10
    });
}
