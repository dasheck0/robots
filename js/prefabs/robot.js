/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

let Template = Template || {};

Template.Robot = function (state, name, position, properties) {
    Phaser.Sprite.call(this, state.game, position.x, position.y, properties.key);

    this.state = state;
    this.name = name;
    this.anchor.setTo(0.5);
    this.scale.setTo(0.5);

    this.state.groups[properties.group].add(this);
    this.state.prefabs[name] = this;
};

Template.Robot.prototype = Object.create(Phaser.Sprite.prototype);
Template.Robot.prototype.constructor = Template.Robot;