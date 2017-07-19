/**
 * Created by s.neidig on 15/07/17.
 */

var Template = Template || {};

Template.EnemyRobotSpawner = function (state, name, position, properties) {
    Template.Spawner.call(this, state, name, position, properties);
};

Template.EnemyRobotSpawner.prototype = Object.create(Template.Spawner.prototype);
Template.EnemyRobotSpawner.prototype.constructor = Template.EnemyRobotSpawner;

Template.EnemyRobotSpawner.prototype.createObject = function (name, position) {
    return new Template.EnemyRobot(this.state, name, position, {
        "group": "robots",
        "key": "robot3Dred",
        "friction": 10,
        "speed": 200,
        "rotationSpeed": 10
    });
}
