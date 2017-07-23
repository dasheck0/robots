/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.Droppable = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.dropped = false;
    this.dropObject();
};

Bots.Droppable.prototype = Object.create(Phaser.Sprite.prototype);
Bots.Droppable.prototype.constructor = Bots.Droppable;

Bots.Droppable.prototype.dropObject = function () {
    this.scale.setTo(Bots.scale * 8);
    const tween = this.game.add.tween(this.scale).to({
        x: Bots.scale * (this.properties.scaleMultiplier || 1),
        y: Bots.scale * (this.properties.scaleMultiplier || 1)
    }, 750, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(function () {
        this.dropped = true;
        this.initializeObject();
    }, this);
}

Bots.Droppable.prototype.reset = function (x, y) {
    Phaser.Sprite.prototype.reset.call(this, x, y);

    this.dropped = false;
    this.dropObject();
}