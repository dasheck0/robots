/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.Chest = function (state, name, position, properties) {
    Bots.Droppable.call(this, state, name, position, properties);

    this.scale.setTo(Bots.scale);
    this.anchor.setTo(0.5);
    this.angle = this.game.rnd.integerInRange(0, 360);

    this.shadow = this.game.add.sprite(this.x, this.y, properties.key);
    this.shadow.scale.x = this.scale.x * 1.3;
    this.shadow.scale.y = this.scale.y * 1.3;
    this.shadow.alpha = 0.25;
    this.shadow.anchor.setTo(0.5);
    this.shadow.tint = 0x000000;
    this.shadow.name = `${name}_shadow`;
    this.shadow.angle = this.angle;
    this.state.groups.shadows.add(this.shadow);
};

Bots.Chest.prototype = Object.create(Bots.Droppable.prototype);
Bots.Chest.prototype.constructor = Bots.Chest;

Bots.Chest.prototype.initializeObject = function () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
}

Bots.Chest.prototype.hit = function () {
    this.properties.lifePoints -= 1;
    return this.properties.lifePoints <= 0;
}