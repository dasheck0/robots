/**
 * Created by s.neidig on 22/07/17.
 */

let Bots = Bots || {};
Bots.Credits = function () {
    Phaser.State.call(this);

    this.prefabClasses = {
        'sprite': Bots.Prefab.prototype.constructor,
        'tileSprite': Bots.TileSprite.prototype.constructor,
        'button': Bots.Button.prototype.constructor,
        'creditsItem': Bots.CreditsItem.prototype.constructor,
        'creditsItemSpawner': Bots.CreditsItemSpawner.prototype.constructor,
        'text': Bots.TextPrefab.prototype.constructor,
        'sound': Bots.SoundPrefab.prototype.constructor
    }
};

Bots.Credits.prototype = Object.create(Phaser.State.prototype);
Bots.Credits.prototype.constructor = Bots.Credits;

Bots.Credits.prototype.create = function () {
    this.game.time.advancedTiming = true;
}

Bots.Credits.prototype.init = function (data) {
    this.data = data;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
}

Bots.Credits.prototype.create = function () {
    this.game.time.advancedTiming = true

    this.game.stage.backgroundColor = '#212A31';
    this.groups = {};
    this.prefabs = {};

    this.data.groups.forEach(groupName => (this.groups[groupName] = this.game.add.group()), this);
    for (var prefabName in this.data.prefabs) {
        console.log("prefabName", prefabName);

        if (this.data.prefabs.hasOwnProperty(prefabName)) {
            this.createPrefab(prefabName, this.data.prefabs[prefabName]);
        }
    }

    this.game.add.tween(this.groups.credits).to({ y: -1000 }, 120000, Phaser.Easing.Linear.None, true, 5000);
};

Bots.Credits.prototype.createPrefab = function (prefabName, properties) {
    if (this.prefabClasses.hasOwnProperty(properties.type)) {
        const position = new Phaser.Point(properties.position.x, properties.position.y);
        const prefab = new this.prefabClasses[properties.type](this, prefabName, position, properties.properties);

        this.prefabs[prefabName] = prefab;
    }
};

Bots.Credits.prototype.onButtonPressed = function (button) {
    if (button.name === 'menuButton') {
        const content = this.game.cache.getText('menu');
        const payload = JSON.parse(content);
        payload.prefabs.background.properties.key = Bots.background;
        this.game.state.start('loading', true, false, payload, 'menu');
    }
}