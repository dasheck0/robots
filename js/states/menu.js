/**
 * Created by s.neidig on 22/07/17.
 */

let Bots = Bots || {};
Bots.Menu = function () {
    Phaser.State.call(this);

    this.prefabClasses = {
        'sprite': Bots.Prefab.prototype.constructor,
        'animatedSprite': Bots.AnimatedSprite.prototype.constructor,
        'tileSprite': Bots.TileSprite.prototype.constructor,
        'button': Bots.Button.prototype.constructor,
        'menuRobotChooser': Bots.MenuRobotChooser.prototype.constructor,
        'menuBackgroundChooser': Bots.MenuBackgroundChooser.prototype.constructor,
        'selectableSprite': Bots.SelectableSprite.prototype.constructor
    }
};

Bots.Menu.prototype = Object.create(Phaser.State.prototype);
Bots.Menu.prototype.constructor = Bots.Menu;

Bots.Menu.prototype.create = function () {
    this.game.time.advancedTiming = true;
}

Bots.Menu.prototype.init = function (data) {
    this.data = data;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
}

Bots.Menu.prototype.create = function () {
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

    /* Animations */

    /* Clouds */
    this.game.add.tween(getMemberByName(this.groups.logo, 'middleCloud'))
        .to({ alpha: 1 }, 500, Phaser.Easing.Circular.InOut, true);
    this.game.add.tween(getMemberByName(this.groups.logo, 'leftCloud'))
        .to({ x: 35 }, 550, Phaser.Easing.Circular.InOut, true, 500)
        .onComplete.add(() => {
        getMemberByName(this.groups.logo, 'leftCloud').x = 35;
        this.game.add.tween(getMemberByName(this.groups.logo, 'leftCloud'))
            .to({ x: getMemberByName(this.groups.logo, 'leftCloud').x + 10 }, 5000, Phaser.Easing.Linear.None, true, 25, -1, true);
        this.game.add.tween(getMemberByName(this.groups.logo, 'leftCloud'))
            .to({ y: getMemberByName(this.groups.logo, 'leftCloud').y + 8 }, 7200, Phaser.Easing.Linear.None, true, 75, -1, true);
    }, this);
    this.game.add.tween(getMemberByName(this.groups.logo, 'rightCloud'))
        .to({ x: 500 }, 550, Phaser.Easing.Circular.InOut, true, 500)
        .onComplete.add(() => {
        getMemberByName(this.groups.logo, 'rightCloud').x = 500;
        this.game.add.tween(getMemberByName(this.groups.logo, 'rightCloud'))
            .to({ x: getMemberByName(this.groups.logo, 'rightCloud').x - 8 }, 4500, Phaser.Easing.Linear.None, true, 50, -1, true);
        this.game.add.tween(getMemberByName(this.groups.logo, 'rightCloud'))
            .to({ y: getMemberByName(this.groups.logo, 'rightCloud').y + 4 }, 9000, Phaser.Easing.Linear.None, true, 82, -1, true);
    }, this);

    /* robots */
    this.game.add.tween(getMemberByName(this.groups.logo, 'logoRobotGreen'))
        .to({ alpha: 1, x: 442 }, 500, Phaser.Easing.Circular.InOut, true, 500);
    this.game.add.tween(getMemberByName(this.groups.logo, 'logoRobotRed'))
        .to({ alpha: 1, x: 274 }, 500, Phaser.Easing.Circular.InOut, true, 500);
    this.game.add.tween(getMemberByName(this.groups.logo, 'logoBulletRight'))
        .to({ alpha: 1, x: 510, y: 42 }, 500, Phaser.Easing.Circular.InOut, true, 500);
    this.game.add.tween(getMemberByName(this.groups.logo, 'logoBulletLeft'))
        .to({ alpha: 1, x: 194, y: 36 }, 500, Phaser.Easing.Circular.InOut, true, 500);

    /* chooser */

    getMemberByName(this.groups.chooser, 'redRobotMoving').play('driving');
    getMemberByName(this.groups.chooser, 'greenRobotMoving').play('driving');
    getMemberByName(this.groups.chooser, 'greyRobotMoving').play('driving');
    getMemberByName(this.groups.chooser, 'yellowRobotMoving').play('driving');

    this.chooser = getMemberByName(this.groups.spawners, 'menuChooser');
    this.chooser.showRobot(0, true);

    this.backgroundChooser = getMemberByName(this.groups.spawners, 'menuBackgroundChooser');
};

Bots.Menu.prototype.createPrefab = function (prefabName, properties) {
    if (this.prefabClasses.hasOwnProperty(properties.type)) {
        const position = new Phaser.Point(properties.position.x, properties.position.y);
        const prefab = new this.prefabClasses[properties.type](this, prefabName, position, properties.properties);
    }
};

Bots.Menu.prototype.render = function () {
    if (Bots.debug) {
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
    }
}

Bots.Menu.prototype.onButtonPressed = function (button) {
    if (button.name === 'leftButton') {
        this.chooser.showPrevious();
    }

    if (button.name === 'rightButton') {
        this.chooser.showNext();
    }

    if (button.name === 'startButton') {
        const content = this.game.cache.getText('level');
        const payload = JSON.parse(content);
        payload.prefabs.robotSpawner.properties.spawnKey = this.chooser.getChosenRobot().properties.secondKey;
        payload.prefabs.background.properties.key = this.backgroundChooser.selectedTile.properties.key;

        this.chooser.chooseRobot(500);
        this.game.add.tween(this.groups.logo).to({ y: -200 }, 500, Phaser.Easing.Elastic.In, true);
        this.game.add.tween(this.groups.hud).to({ alpha: 0 }, 500, Phaser.Easing.Quintic.Out, true)
            .onComplete.add(function () {
            this.game.state.start('loading', true, false, payload, 'level');
        }, this);
    }
    
    if (button.name === 'settingsButton') {
    }
}