/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};
Bots.Level = function () {
    Phaser.State.call(this);

    this.prefabClasses = {
        'sprite': Bots.Prefab.prototype.constructor,
        'tileSprite': Bots.TileSprite.prototype.constructor,
        'robot': Bots.Robot.prototype.constructor,
        'enemyRobot': Bots.EnemyRobot.prototype.constructor,
        'spawner': Bots.Spawner.prototype.constructor,
        'robotSpawner': Bots.RobotSpawner.prototype.constructor,
        'enemyRobotSpawner': Bots.EnemyRobotSpawner.prototype.constructor,
        'chestSpawner': Bots.ChestSpawner.prototype.constructor,
        'chest': Bots.Chest.prototype.constructor,
        'minimap': Bots.Minimap.prototype.constructor,
        'text': Bots.TextPrefab.prototype.constructor,
        'lootSpawner': Bots.LootSpawner.prototype.constructor,
        'loot': Bots.Loot.prototype.constructor,
        'explosionSpawner': Bots.ExplosionSpawner.prototype.constructor,
        'textSpawner': Bots.TextSpawner.prototype.constructor,
        'explosion': Bots.Explosion.prototype.constructor,
        'dust': Bots.Dust.prototype.constructor,
        'dustSpawner': Bots.DustSpawner.prototype.constructor,
        'track': Bots.Track.prototype.constructor,
        'trackSpawner': Bots.TrackSpawner.prototype.constructor,
        'button': Bots.Button.prototype.constructor,
        'dpad': Bots.DPad.prototype.constructor,
        'control': Bots.Control.prototype.constructor
    }
};

Bots.Level.prototype = Object.create(Phaser.State.prototype);
Bots.Level.prototype.constructor = Bots.Level;

Bots.Level.prototype.init = function (data) {
    this.data = data;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
};

Bots.Level.prototype.create = function () {
    this.game.time.advancedTiming = true

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

    this.game.world.setBounds(-Bots.worldSize.x / 2, -Bots.worldSize.y / 2, Bots.worldSize.x, Bots.worldSize.y);
};

Bots.Level.prototype.createPrefab = function (prefabName, properties) {
    if (this.prefabClasses.hasOwnProperty(properties.type)) {
        const position = new Phaser.Point(properties.position.x, properties.position.y);
        const prefab = new this.prefabClasses[properties.type](this, prefabName, position, properties.properties);
    }
};

Bots.Level.prototype.update = function () {
    this.game.physics.arcade.collide(this.groups.chests, this.groups.robots);
}

Bots.Level.prototype.render = function () {
    if (Bots.debug) {
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
    }
}

Bots.Level.prototype.onButtonPressed = function (button) {
    if (button.name === 'menuButton') {
        const content = this.game.cache.getText('menu');
        const payload = JSON.parse(content);
        this.game.state.start('loading', true, false, payload, 'menu');
    }
}