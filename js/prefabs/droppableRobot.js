/**
 * Created by s.neidig on 16/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.DroppableRobot = function (state, name, position, properties) {
    Bots.Droppable.call(this, state, name, position, properties);
    this.anchor.setTo(0.5);
    this.human = false;
    this.isDead = false;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.currentSpeed = 0;
    this.body.maxVelocity.setTo(this.properties.speed);
    this.body.collideWorldBounds = true;

    this.weapon = this.game.add.weapon(10, 'bullet');
    this.weapon.bullets.forEach((bullet) => {
        bullet.scale.setTo(Bots.scale);
    }, this);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 100; // 1 per 60 ms
    this.weapon.trackSprite(this, 0, 0, true);

    this.killCounter = this.game.add.text(0, 0, '1', { font: '10pt Arial', fill: '#ffffff', align: 'right' })
    this.killCounter.anchor.setTo(1, 0);
    this.state.groups.hud.add(this.killCounter);

    this.healthBar = this.game.add.graphics(0, 0, state.groups.hud);
};

Bots.DroppableRobot.prototype = Object.create(Bots.Droppable.prototype);
Bots.DroppableRobot.prototype.constructor = Bots.DroppableRobot;

Bots.DroppableRobot.prototype.initializeObject = function (game) {
}

Bots.DroppableRobot.prototype.reset = function (x, y) {
    Bots.Droppable.prototype.reset.call(this, x, y);
}

Bots.DroppableRobot.prototype.dealDamage = function (damage) {
    this.properties.health = Math.ceil(this.properties.health - damage);

    if (this.properties.health > this.properties.maxHealth) {
        this.properties.health = this.properties.maxHealth;
    }

    if (this.human) {
        getMemberByName(this.state.groups.hud, 'healthText').text = this.properties.health < 0 ? 0 : this.properties.health;
    }

    if (this.properties.health < 0) {
        this.animateDeath();
        return true;
    }

    return false;
}

Bots.DroppableRobot.prototype.killedOtherRobot = function () {
    this.dealDamage(-this.properties.maxHealth);
    this.killCounter.text = parseInt(this.killCounter.text) + 1;
}

Bots.DroppableRobot.prototype.animateDeath = function () {
    this.isDead = true;

    const deathTween = this.game.add.tween(this).to({ x: this.x - 10 }, 25, Phaser.Easing.Quadratic.InOut, true, 0, 5, true);
    deathTween.onComplete.add(function () {
        getMemberByName(this.state.groups.spawners, 'dustSpawner').spawn(this);
        getMemberByName(this.state.groups.spawners, 'explosionSpawner').spawn(this);

        this.game.add.tween(this.scale).to({ x: 4, y: 4 }, 500, Phaser.Easing.Quadratic.Out, true);
        this.game.add.tween(this).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
            if (this.trackTimer) {
                this.game.time.events.remove(this.trackTimer);
                this.trackTimer = null;
            }

            this.killCounter.kill();
            this.killCounter.destroy();
            this.state.groups.hud.remove(this.killCounter);

            this.healthBar.kill();
            this.healthBar.destroy();
            this.state.groups.hud.remove(this.healthBar);

            this.kill();
            this.destroy();
            this.state.groups.robots.remove(this);

            if (this.human) {
                getMemberByName(this.state.groups.spawners, 'robotSpawner').spawn('robot');
            }
        }, this);
    }, this);
}

Bots.DroppableRobot.prototype.update = function (instance) {
    if (instance.body) {
        instance.game.physics.arcade.overlap(instance.weapon.bullets, instance.state.groups.chests, this.onBulletChestCollide, null, instance);
        instance.game.physics.arcade.overlap(instance.weapon.bullets, instance.state.groups.robots, this.onBulletRobotCollide, this.onBulletRobotCollideProcess, instance);
        instance.game.physics.arcade.collide(instance.state.groups.robots);
    }

    if (instance.healthBar) {
        instance.healthBar.clear();

        if (instance.properties.health > 0) {
            instance.healthBar.beginFill(0x00ff00);
            instance.healthBar.lineStyle(0);
            instance.healthBar.drawRect(instance.x - instance.width / 2 + 16, instance.y + instance.height / 2 + 4, (instance.width - 16) * (instance.properties.health / instance.properties.maxHealth), 4);
            instance.healthBar.endFill();

            instance.healthBar.lineStyle(1, 0x000000, 0.8)
            instance.healthBar.drawRect(instance.x - instance.width / 2 + 16, instance.y + instance.height / 2 + 4, instance.width - 16, 4);
        }
    }

    if (instance.killCounter) {
        instance.killCounter.x = instance.x - instance.width / 2 + 12;
        instance.killCounter.y = instance.y + instance.height / 2 - 2;
    }
}

Bots.DroppableRobot.prototype.onBulletChestCollide = function (bullet, chest) {
    bullet.kill();
    chest.kill();

    getMemberByName(this.state.groups.spawners, 'explosionSpawner').spawn(chest);
    getMemberByName(this.state.groups.spawners, 'dustSpawner').spawn(chest);
    getMemberByName(this.state.groups.spawners, 'lootSpawner').spawn(chest, this);
}

Bots.DroppableRobot.prototype.onBulletRobotCollide = function (bullet, robot) {
    if (robot !== this && !robot.isDead) {
        bullet.kill();

        if (robot.dealDamage(calculateDamage(this.properties.attack, robot.properties.defense))) {
            this.killedOtherRobot();
        }
    }
}

Bots.DroppableRobot.prototype.onBulletRobotCollideProcess = function (bullet, robot) {
    return robot !== this;
}