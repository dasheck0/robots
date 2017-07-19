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
        "key": sample(['robot3Dred', 'robot3Dblue', 'robot3Dgreen', 'robot3Dyellow']),
        "friction": 10,
        "rotationSpeed": 10,
        "attack": this.state.game.rnd.integerInRange(18, 30),
        "defense": this.state.game.rnd.integerInRange(12, 24),
        "speed": this.state.game.rnd.integerInRange(50, 70),
        "health": this.state.game.rnd.integerInRange(900, 1200)
    });
}
