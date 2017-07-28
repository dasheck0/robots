/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.RobotSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.RobotSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.RobotSpawner.prototype.constructor = Bots.RobotSpawner;

Bots.RobotSpawner.prototype.createObject = function (name, position) {
    return new Bots.Robot(this.state, name, position, {
        "group": "robots",
        "key": this.properties.spawnKey,
        "friction": 10,
        "attack": 34,
        "defense": 48,
        "speed": 70,
        "health": 100,
        "maxHealth": 100,
        "displayName": "Player",
        scaleMultiplier: 1
    });
}