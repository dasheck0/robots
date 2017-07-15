/**
 * Created by s.neidig on 11/07/17.
 */


let Template = Template || {};
Template.Level = function () {
    Phaser.State.call(this);

    this.prefabClasses = {
        'sprite': Template.Prefab.prototype.constructor,
        'robot': Template.Robot.prototype.constructor,
        'spawner': Template.Spawner.prototype.constructor,
        'robotSpawner': Template.RobotSpawner.prototype.constructor
    }
};

Template.Level.prototype = Object.create(Phaser.State.prototype);
Template.Level.prototype.constructor = Template.Level;

Template.Level.prototype.init = function (data) {
    this.data = data;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
};

Template.Level.prototype.create = function () {
    this.game.stage.backgroundColor = '#212A31';
    this.groups = {};
    this.prefabs = {};

    this.data.groups.forEach(groupName => (this.groups[groupName] = this.game.add.group()), this);
    for (var prefabName in this.data.prefabs) {
        if (this.data.prefabs.hasOwnProperty(prefabName)) {
            this.createPrefab(prefabName, this.data.prefabs[prefabName]);
        }
    }
};

Template.Level.prototype.createPrefab = function (prefabName, properties) {
    if (this.prefabClasses.hasOwnProperty(properties.type)) {
        const position = new Phaser.Point(properties.position.x, properties.position.y);
        const prefab = new this.prefabClasses[properties.type](this, prefabName, position, properties.properties);
    }
};

Template.Level.prototype.render = function () {
    // this.prefabs.robot.render();
}