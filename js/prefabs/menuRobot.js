/**
 * Created by s.neidig on 16/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.MenuRobot = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);
    this.anchor.setTo(0.5);
    this.scale.setTo(Bots.scale);
    this.currentDestination = null;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.maxVelocity.setTo(100);
    this.currentSpeed = this.game.rnd.integerInRange(50, 100);
    this.body.mass = 1;
    this.speedMultiplier = 1;

    this.shadow = this.game.add.sprite(this.x, this.y, properties.key);
    this.shadow.scale.x = this.scale.x * 1.2;
    this.shadow.scale.y = this.scale.y * 1.2;
    this.shadow.alpha = 0.25;
    this.shadow.anchor.setTo(0.5);
    this.shadow.tint = 0x000000;
    this.shadow.name = `${name}_shadow`;
    this.state.groups.shadows.add(this.shadow);
};

Bots.MenuRobot.prototype = Object.create(Bots.Prefab.prototype);
Bots.MenuRobot.prototype.constructor = Bots.MenuRobot;

Bots.MenuRobot.prototype.reset = function (x, y) {
    Bots.Prefab.prototype.reset.call(this, x, y);
}

Bots.MenuRobot.prototype.update = function () {
    this.speedMultiplier = 1;

    this.shadow.x = this.x;
    this.shadow.y = this.y;
    this.shadow.angle = this.angle;

    if (!this.currentDestination || this.game.physics.arcade.distanceToXY(this, this.currentDestination.x, this.currentDestination.y) <= 50) {
        this.currentDestination = new Phaser.Point(randomInteger(2 * Bots.screenSize.x) - Bots.screenSize.x / 2, randomInteger(2 * Bots.screenSize.y) - Bots.screenSize.y / 2);
    }

    if (this.currentDestination) {
        this.rotation = this.game.physics.arcade.angleToXY(this, this.currentDestination.x, this.currentDestination.y, true);
        this.game.physics.arcade.moveToObject(this, this.currentDestination, this.currentSpeed);
    }
}