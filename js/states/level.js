/**
 * Created by s.neidig on 11/07/17.
 */


var Template = Template || {};
Template.Level = function () {
    "use strict";
    Phaser.State.call(this);

    this.prefabClasses = {
        "test": Template.Prefab.prototype.constructor
    }
};

Template.Level.prototype = Object.create(Phaser.State.prototype);
Template.Level.prototype.constructor = Template.Level;

Template.Level.prototype.init = function (data) {
    "use strict";
    this.data = data;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
};

Template.Level.prototype.create = function () {
    "use strict";
    this.groups = {};
    this.data.groups.forEach(function (groupName) {
        this.groups[groupName] = this.game.add.group();
    }, this);

    this.prefabs = {};
    for (var prefabName in this.data.prefabs) {
        if (this.data.prefabs.hasOwnProperty(prefabName)) {
            this.createPrefab(prefabName, this.data.prefabs[prefabName]);
        }
    }
};

Template.Level.prototype.createPrefab = function (prefabName, properties) {
    "use strict";
    if (this.prefabClasses.hasOwnProperty(properties.type)) {
        var position = new Phaser.Point(properties.position.x, properties.position.y);
        var prefab = new this.prefabClasses[properties.type](this, prefabName, position, properties.properties);
    }
};