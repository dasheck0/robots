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
    this.isJumping = false;
    this.kills = 0;
    this.deaths = 0;

    this.scale.setTo(Bots.scale);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.currentSpeed = 0;
    this.body.maxVelocity.setTo(this.properties.speed);
    this.body.mass = 1;
    this.body.collideWorldBounds = true;
    this.speedMultiplier = 1;

    this.weapon = this.game.add.weapon(10 + this.game.rnd.integerInRange(-2, 2), 'bullet', 0, this.state.groups.bullets);
    this.weapon.bullets.forEach((bullet) => {
        bullet.scale.setTo(Bots.scale);
    }, this);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    this.weapon.bulletKillDistance = 1000;
    this.weapon.bulletSpeed = 600 + this.game.rnd.integerInRange(-50, 50);
    this.weapon.fireRate = 300 + this.game.rnd.integerInRange(-30, 30); // 1 per 60 ms
    this.weapon.bulletAngleVariance = 5 + this.game.rnd.integerInRange(-5, 5);
    this.weapon.trackSprite(this, 0, 0, true);
    this.weapon.onFire.add(() => {
        getMemberByName(this.state.groups.spawners, 'soundSpawner').spawn(this, 'shotSound');
    }, this);

    this.killCounter = this.game.add.text(0, 0, '1', { font: '10pt Arial', fill: '#ffffff', align: 'right' })
    this.killCounter.anchor.setTo(1, 0);
    this.state.groups.hud.add(this.killCounter);

    this.nameText = this.game.add.text(0, 0, properties.displayName || 'Player', {
        font: '10pt Arial',
        fill: '#ffffff',
        align: 'center'
    });
    this.nameText.anchor.setTo(0.5);
    this.state.groups.hud.add(this.nameText);

    this.healthBar = this.game.add.graphics(0, 0, state.groups.hud);

    this.shadow = this.game.add.sprite(this.x, this.y, properties.key);
    this.shadow.scale.x = this.scale.x * 1.2;
    this.shadow.scale.y = this.scale.y * 1.2;
    this.shadow.alpha = 0.25;
    this.shadow.anchor.setTo(0.5);
    this.shadow.tint = 0x000000;
    this.shadow.name = `${name}_shadow`;
    this.state.groups.shadows.add(this.shadow);

    this.spawnProtect = true;
};

Bots.DroppableRobot.prototype = Object.create(Bots.Droppable.prototype);
Bots.DroppableRobot.prototype.constructor = Bots.DroppableRobot;

Bots.DroppableRobot.prototype.initializeObject = function (instance) {
    instance.alpha = 0.5;
    instance.spawnProtect = true;
    instance.game.time.events.add(2000, () => {
        instance.alpha = 1;
        instance.spawnProtect = false;
    }, instance);
}

Bots.DroppableRobot.prototype.reset = function (x, y) {
    Bots.Droppable.prototype.reset.call(this, x, y);
}

Bots.DroppableRobot.prototype.dealDamage = function (damage) {
    if (this.spawnProtect) {
        return false;
    }

    if (this.boss && damage < 0) {
        damage = 0;
    }

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

Bots.DroppableRobot.prototype.killedOtherRobot = function (deadRobot) {
    this.dealDamage(-this.properties.maxHealth);
    if (this.boss) {
        console.log(this.kill.text, deadRobot.killCounter.text);
    }

    if (this.human) {
        Bots.killCount += 1;
    }

    if (deadRobot.human) {
        Bots.deathCount += 1;
    }

    this.killCounter.text = parseInt(this.killCounter.text) + parseInt(deadRobot.killCounter.text);
    this.game.time.events.repeat(50, parseInt(deadRobot.killCounter.text), function () {
        getMemberByName(this.state.groups.spawners, 'lootSpawner').spawn(deadRobot, this);
    }, this);
}

Bots.DroppableRobot.prototype.animateDeath = function () {
    this.isDead = true;

    const deathTween = this.game.add.tween(this).to({ x: this.x - 10 }, 25, Phaser.Easing.Quadratic.InOut, true, 0, 5, true);
    deathTween.onComplete.add(function () {
        getMemberByName(this.state.groups.spawners, 'dustSpawner').spawn(this);
        getMemberByName(this.state.groups.spawners, 'explosionSpawner').spawn(this);
        getMemberByName(this.state.groups.spawners, 'earthQuakeSpawner').spawn(this, 4);

        killFromGroup(this.shadow, this.state.groups.shadows);

        this.game.add.tween(this.scale).to({ x: 4, y: 4 }, 500, Phaser.Easing.Quadratic.Out, true);
        this.game.add.tween(this).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
            if (this.trackTimer) {
                this.game.time.events.remove(this.trackTimer);
                this.trackTimer = null;
            }

            if (this.checkSurroundingsTimer) {
                this.game.time.events.remove(this.checkSurroundingsTimer);
                this.checkSurroundingsTimer = null;
            }

            if (this.jumpTimer) {
                this.game.time.events.remove(this.jumpTimer);
                this.jumpTimer = null;
            }

            if (this.meteoritTimer) {
                this.game.time.events.remove(this.meteoritTimer);
                this.meteoritTimer = null;
            }

            if (this.smokeTimer) {
                this.game.time.events.remove(this.smokeTimer);
                this.smokeTimer = null;
            }

            killFromGroup(this.killCounter, this.state.groups.hud);
            killFromGroup(this.healthBar, this.state.groups.hud);
            killFromGroup(this.nameText, this.state.groups.hud);
            killFromGroup(this, this.state.groups.hud);

            if (this.human) {
                getMemberByName(this.state.groups.spawners, 'robotSpawner').spawn('robot');
            } else if (this.boss) {
                getMemberByName(this.state.groups.spawners, 'bossRobotSpawner').spawn(true);
            }
        }, this);
    }, this);
}

Bots.DroppableRobot.prototype.update = function (instance) {
    instance.speedMultiplier = 1;

    if (instance.body) {
        instance.game.physics.arcade.overlap(instance.weapon.bullets, instance.state.groups.chests, this.onBulletChestCollide, null, instance);
        instance.game.physics.arcade.overlap(instance.weapon.bullets, instance.state.groups.robots, this.onBulletRobotCollide, this.onBulletRobotCollideProcess, instance);
        instance.game.physics.arcade.overlap(instance.state.groups.oil, instance.state.groups.robots, this.onOilRobotOverlap, null, instance);
    }

    if (instance.healthBar) {
        instance.healthBar.clear();

        if (instance.properties.health > 0) {
            let color = 0x00ff00;
            if (instance.properties.health < 0.5 * instance.properties.maxHealth) {
                color = 0xffae00;
            }

            if (instance.properties.health < 0.25 * instance.properties.maxHealth) {
                color = 0xff0000;
            }

            instance.healthBar.beginFill(color);
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

    if (instance.nameText) {
        instance.nameText.x = instance.x;
        instance.nameText.y = instance.y - instance.height / 2 - 4;
    }

    instance.shadow.x = instance.x;
    instance.shadow.y = instance.y;
    instance.shadow.angle = instance.angle;
}

Bots.DroppableRobot.prototype.onBulletChestCollide = function (bullet, chest) {
    bullet.kill();
    getMemberByName(this.state.groups.spawners, 'soundSpawner').spawn(chest, 'plingSound');

    if (chest.hit()) {
        killFromGroup(chest.shadow, this.state.groups.shadows);
        killFromGroup(chest, this.state.groups.chests);

        getMemberByName(this.state.groups.spawners, 'explosionSpawner').spawn(chest);
        getMemberByName(this.state.groups.spawners, 'dustSpawner').spawn(chest);
        getMemberByName(this.state.groups.spawners, 'earthQuakeSpawner').spawn(this, 2);
        getMemberByName(this.state.groups.spawners, 'lootSpawner').spawn(chest, this);
    }
}

Bots.DroppableRobot.prototype.onBulletRobotCollide = function (bullet, robot) {
    if (robot !== this && !robot.isDead) {
        bullet.kill();

        if (robot.dealDamage(calculateDamage2(this.properties.attack, robot.properties.defense))) {
            getMemberByName(this.state.groups.spawners, 'textSpawner').spawn(`${this.properties.displayName} (${this.killCounter.text}) killed ${robot.properties.displayName} (${robot.killCounter.text})`);

            this.killedOtherRobot(robot);
        }
    }
}

Bots.DroppableRobot.prototype.onOilRobotOverlap = function (oil, robot) {
    robot.speedMultiplier = 0.5;
}

Bots.DroppableRobot.prototype.onBulletRobotCollideProcess = function (bullet, robot) {
    return robot !== this;
}

Bots.DroppableRobot.prototype.fire = function () {
    if (!this.isDead && !this.spawnProtect) {
        this.weapon.fire();
    }
}

Bots.DroppableRobot.prototype.applySpeedIncrease = function () {
    this.properties.rotationSpeed = this.properties.speed / 17;
    this.properties.maxSpeed = this.properties.speed * 2.5;

    if (this.body) {
        this.body.maxVelocity.setTo(this.boss ? 100 : this.properties.maxSpeed);
    }
}