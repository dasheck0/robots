/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

var Template = Template || {};

Template.Chest = function (state, name, position, properties) {
    Template.Droppable.call(this, state, name, position, properties);

    this.scale.setTo(Template.scale);
    this.anchor.setTo(0.5);
};

Template.Chest.prototype = Object.create(Template.Droppable.prototype);
Template.Chest.prototype.constructor = Template.Chest;

Template.Chest.prototype.initializeObject = function () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.mass = 5;
    this.body.immovable = true;
}