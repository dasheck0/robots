/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

var Template = Template || {};

Template.Droppable = function (state, name, position, properties) {
    Template.Prefab.call(this, state, name, position, properties);

    this.dropped = false;
    this.dropObject();
};

Template.Droppable.prototype = Object.create(Phaser.Sprite.prototype);
Template.Droppable.prototype.constructor = Template.Droppable;

Template.Droppable.prototype.dropObject = function () {
    this.scale.setTo(Template.scale * 8);
    const tween = this.game.add.tween(this.scale).to({
        x: Template.scale,
        y: Template.scale
    }, 750, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(function () {
        this.dropped = true;
        this.initializeObject();
    }, this);
}

Template.Droppable.prototype.reset = function (x, y) {
    Phaser.Sprite.prototype.reset.call(this, x, y);

    this.dropped = false;
    this.dropObject();
}