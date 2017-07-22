/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.Chest = function (state, name, position, properties) {
    Bots.Droppable.call(this, state, name, position, properties);

    this.scale.setTo(Bots.scale);
    this.anchor.setTo(0.5);
};

Bots.Chest.prototype = Object.create(Bots.Droppable.prototype);
Bots.Chest.prototype.constructor = Bots.Chest;

Bots.Chest.prototype.initializeObject = function () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.mass = 5;
    this.body.immovable = true;
}