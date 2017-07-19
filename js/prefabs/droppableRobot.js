/**
 * Created by s.neidig on 16/07/17.
 */

"use strict";

var Template = Template || {};

Template.DroppableRobot = function (state, name, position, properties) {
    Template.Droppable.call(this, state, name, position, properties);
    this.anchor.setTo(0.5);
    this.human = false;
    this.isDead = false;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.currentSpeed = 0;
    this.body.maxVelocity.setTo(this.properties.speed);
    this.body.collideWorldBounds = true;

    this.weapon = this.game.add.weapon(10, 'bullet');
    this.weapon.bullets.forEach((bullet) => {
        bullet.scale.setTo(Template.scale);
    }, this);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 100; // 1 per 60 ms
    this.weapon.trackSprite(this, 0, 0, true);
};

Template.DroppableRobot.prototype = Object.create(Template.Droppable.prototype);
Template.DroppableRobot.prototype.constructor = Template.DroppableRobot;

Template.DroppableRobot.prototype.initializeObject = function (game) {
}

Template.DroppableRobot.prototype.animateDeath = function () {
    this.isDead = true;

    const deathTween = this.game.add.tween(this).to({ x: this.x - 10 }, 25, Phaser.Easing.Quadratic.InOut, true, 0, 5, true);
    deathTween.onComplete.add(function () {
        this.game.add.tween(this.scale).to({ x: 4, y: 4 }, 500, Phaser.Easing.Quadratic.Out, true);
        this.game.add.tween(this).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
            this.kill();
            this.destroy();
            this.state.groups.robots.remove(this);
        }, this);
    }, this);
}

Template.DroppableRobot.prototype.update = function (instance) {
    if (instance.body) {
        instance.game.physics.arcade.overlap(instance.weapon.bullets, instance.state.groups.chests, this.onBulletChestCollide, null, instance);
        instance.game.physics.arcade.overlap(instance.weapon.bullets, instance.state.groups.robots, this.onBulletRobotCollide, this.onBulletRobotCollideProcess, instance);
    }
}

Template.DroppableRobot.prototype.onBulletChestCollide = function (bullet, chest) {
    bullet.kill();
    chest.kill();
}

Template.DroppableRobot.prototype.onBulletRobotCollide = function (bullet, robot) {
    if (robot !== this) {
        bullet.kill();
        if (!robot.human) {
            robot.animateDeath();
        }
    }
}

Template.DroppableRobot.prototype.onBulletRobotCollideProcess = function (bullet, robot) {
    return robot !== this;
}