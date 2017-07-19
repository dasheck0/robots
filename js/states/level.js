/**
 * Created by s.neidig on 11/07/17.
 */


let Template = Template || {};
Template.Level = function () {
    Phaser.State.call(this);

    this.prefabClasses = {
        'sprite': Template.Prefab.prototype.constructor,
        'tileSprite': Template.TileSprite.prototype.constructor,
        'robot': Template.Robot.prototype.constructor,
        'enemyRobot': Template.EnemyRobot.prototype.constructor,
        'spawner': Template.Spawner.prototype.constructor,
        'robotSpawner': Template.RobotSpawner.prototype.constructor,
        'enemyRobotSpawner': Template.EnemyRobotSpawner.prototype.constructor,
        'chestSpawner': Template.ChestSpawner.prototype.constructor,
        'chest': Template.Chest.prototype.constructor,
        'minimap': Template.Minimap.prototype.constructor,
        'text': Template.TextPrefab.prototype.constructor
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
        console.log(prefabName);

        if (this.data.prefabs.hasOwnProperty(prefabName)) {
            this.createPrefab(prefabName, this.data.prefabs[prefabName]);
        }
    }

    this.game.world.setBounds(-Template.worldSize.x / 2, -Template.worldSize.y / 2, Template.worldSize.x, Template.worldSize.y);
};

Template.Level.prototype.createPrefab = function (prefabName, properties) {
    if (this.prefabClasses.hasOwnProperty(properties.type)) {
        const position = new Phaser.Point(properties.position.x, properties.position.y);
        const prefab = new this.prefabClasses[properties.type](this, prefabName, position, properties.properties);
    }
};

Template.Level.prototype.update = function () {
    this.game.physics.arcade.collide(this.groups.chests, this.groups.robots);
}