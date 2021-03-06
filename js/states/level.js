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
        'bossRobotSpawner': Bots.BossRobotSpawner.prototype.constructor,
        'chestSpawner': Bots.ChestSpawner.prototype.constructor,
        'chest': Bots.Chest.prototype.constructor,
        'meteoritSpawner': Bots.MeteoritSpawner.prototype.constructor,
        'meteorit': Bots.Meteorit.prototype.constructor,
        'minimap': Bots.Minimap.prototype.constructor,
        'text': Bots.TextPrefab.prototype.constructor,
        'lootSpawner': Bots.LootSpawner.prototype.constructor,
        'loot': Bots.Loot.prototype.constructor,
        'explosionSpawner': Bots.ExplosionSpawner.prototype.constructor,
        'smokeSpawner': Bots.SmokeSpwaner.prototype.constructor,
        'earthQuakeSpawner': Bots.EarthQuakeSpawner.prototype.constructor,
        'textSpawner': Bots.TextSpawner.prototype.constructor,
        'soundSpawner': Bots.SoundSpawner.prototype.constructor,
        'explosion': Bots.Explosion.prototype.constructor,
        'dust': Bots.Dust.prototype.constructor,
        'dustSpawner': Bots.DustSpawner.prototype.constructor,
        'statisticsPanel': Bots.StatisticsPanel.prototype.constructor,
        'oilSpawner': Bots.OilSpawner.prototype.constructor,
        'track': Bots.Track.prototype.constructor,
        'trackSpawner': Bots.TrackSpawner.prototype.constructor,
        'button': Bots.Button.prototype.constructor,
        'dpad': Bots.DPad.prototype.constructor,
        'control': Bots.Control.prototype.constructor,
        'pauseDialogSpawner': Bots.PauseDialogSpawner.prototype.constructor,
        'messageSpawner': Bots.MessageSpawner.prototype.constructor,
        'sound': Bots.SoundPrefab.prototype.constructor
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
        if (this.data.prefabs.hasOwnProperty(prefabName)) {
            this.createPrefab(prefabName, this.data.prefabs[prefabName]);
        }
    }

    this.game.world.setBounds(-Bots.worldSize.x / 2, -Bots.worldSize.y / 2, Bots.worldSize.x, Bots.worldSize.y);
    Bots.killCount = 0;
    Bots.deathCount = 0;
};

Bots.Level.prototype.createPrefab = function (prefabName, properties) {
    if (this.prefabClasses.hasOwnProperty(properties.type)) {
        const position = new Phaser.Point(properties.position.x, properties.position.y);
        const prefab = new this.prefabClasses[properties.type](this, prefabName, position, properties.properties);

        this.prefabs[prefabName] = prefab;
    }
};

Bots.Level.prototype.update = function () {
    this.game.physics.arcade.collide(this.groups.chests, this.groups.robots);
    this.game.physics.arcade.collide(this.groups.robots, this.groups.robots, function (robot1, robot2) {
        if (robot1.boss && !robot2.isDead && !robot1.isDead) {
            robot1.killedOtherRobot(robot2);
            robot2.animateDeath();
        }

        if (robot2.boss && !robot1.isDead && !robot2.isDead) {
            robot2.killedOtherRobot(robot1);
            robot1.animateDeath();
        }
    }, null, this);

    const panel = getMemberByName(this.groups.panel, 'statisticsPanel');
    if (panel) {
        panel.show(this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT));
    }
}

Bots.Level.prototype.onButtonPressed = function (button) {
    if (button.name === 'menuButton') {
        const content = this.game.cache.getText('menu');
        const payload = JSON.parse(content);
        payload.prefabs.background.properties.key = Bots.background;
        this.game.state.start('loading', true, false, payload, 'menu');
    }
}