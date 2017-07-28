/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.Meteorit = function (state, name, position, properties) {
    Bots.Droppable.call(this, state, name, position, properties);

    this.scale.setTo(Bots.scale);
    this.anchor.setTo(0.5);
    this.angle = this.game.rnd.integerInRange(0, 360);
};

Bots.Meteorit.prototype = Object.create(Bots.Droppable.prototype);
Bots.Meteorit.prototype.constructor = Bots.Meteorit;

Bots.Meteorit.prototype.initializeObject = function () {
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    getMemberByName(this.state.groups.spawners, 'explosionSpawner').spawn(this);
    getMemberByName(this.state.groups.spawners, 'dustSpawner').spawn(this);
    getMemberByName(this.state.groups.spawners, 'earthQuakeSpawner').spawn(this, this.game.rnd.integerInRange(0, 10));

    const bounds = this.getBounds();
    this.state.groups.robots.forEachAlive((robot) => {
        if (!robot.isDead && !robot.boss && Phaser.Rectangle.intersects(bounds, robot.getBounds())) {
            if (robot.dealDamage(calculateDamage2(this.properties.attack, robot.properties.defense))) {
                getMemberByName(this.state.groups.spawners, 'textSpawner').spawn(`${robot.properties.displayName} (${robot.killCounter.text}) was killed by a comet`);
            }
        }
    });

    killFromGroup(this, this.state.groups[this.properties.group]);
}