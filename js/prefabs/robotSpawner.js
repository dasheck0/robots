/**
 * Created by s.neidig on 15/07/17.
 */

var Template = Template || {};

Template.RobotSpawner = function (state, name, position, properties) {
    Template.Spawner.call(this, state, name, position, properties);
};

Template.RobotSpawner.prototype = Object.create(Template.Spawner.prototype);
Template.RobotSpawner.prototype.constructor = Template.RobotSpawner;

Template.RobotSpawner.prototype.createObject = function (name, position) {
    position = new Phaser.Point(0, 0);

    return new Template.Robot(this.state, name, position, {
        "group": "robots",
        "key": "robot3Dblue",
        "friction": 10,
        "attack": 34,
        "defense": 43,
        "speed": 75,
        "health": 1000,
        "maxHealth": 1000
    });
}
