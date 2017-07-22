/**
 * Created by s.neidig on 22/07/17.
 */

let Template = Template || {};
Template.Menu = function () {
    Phaser.State.call(this);

    this.prefabClasses = {
        'tileSprite': Template.TileSprite.prototype.constructor
    }
};

Template.Menu.prototype = Object.create(Phaser.State.prototype);
Template.Menu.prototype.constructor = Template.Menu;

Template.Menu.prototype.create = function () {
    this.game.time.advancedTiming = true;
}

Template.Menu.prototype.init = function (data) {
    this.data = data;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
}

Template.Menu.prototype.create = function () {
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
};

Template.Menu.prototype.createPrefab = function (prefabName, properties) {
    if (this.prefabClasses.hasOwnProperty(properties.type)) {
        const position = new Phaser.Point(properties.position.x, properties.position.y);
        const prefab = new this.prefabClasses[properties.type](this, prefabName, position, properties.properties);
    }
};

Template.Menu.prototype.render = function () {
    if (Template.debug) {
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
    }
}