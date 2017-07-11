/**
 * Created by s.neidig on 11/07/17.
 */


var Template = Template || {};

Template.Prefab = function (state, name, position, properties) {
    "use strict";

    Phaser.Sprite.call(this, state.game, position.x, position.y, properties.key);

    this.state = state;
    this.name = name;

    this.state.groups[properties.group].add(this);
    this.frame = properties.frame;
    this.state.prefabs[name] = this;
};

Template.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
Template.Prefab.prototype.constructor = Template.Prefab;