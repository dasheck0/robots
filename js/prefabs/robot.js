/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

let Template = Template || {};

Template.Robot = function (state, name, position, properties) {
    Template.Droppable.call(this, state, name, position, properties);

    this.anchor.setTo(0.5);

    this.game.camera.follow(this);
    this.game.camera.deadzone = new Phaser.Rectangle(100, 100, 400, 200);
    this.game.camera.focusOnXY(0, 0);
};

Template.Robot.prototype = Object.create(Template.Droppable.prototype);
Template.Robot.prototype.constructor = Template.Robot;

Template.Robot.prototype.updateLife = function (life) {
    const alpha = life < 0 ? 0 : (life > 1 ? 1 : life);
    console.log("Life", life, alpha);
    this.life.alpha = alpha;
}

Template.Robot.prototype.update = function () {
    if (this.body) {
        this.body.angularAcceleration = 0;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.angularVelocity = 0;

        if (this.dropped) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.angle -= this.properties.rotationSpeed;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.angle += this.properties.rotationSpeed;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.currentSpeed = this.properties.speed;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.currentSpeed = -this.properties.speed;
            } else {
                if (this.currentSpeed > 0) {
                    this.currentSpeed -= this.properties.friction;
                } else {
                    this.currentSpeed += this.properties.friction;
                }

                if (Math.abs(this.currentSpeed) <= this.properties.friction) {
                    this.currentSpeed = 0;
                }
            }

            if (this.currentSpeed !== 0) {
                this.game.physics.arcade.velocityFromRotation(this.rotation, this.currentSpeed, this.body.velocity);
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.weapon.fire();
            }

            this.game.physics.arcade.overlap(this.weapon.bullets, this.state.groups.chests, this.onBulletChestCollide, null, this);
        }
    }
}

Template.Robot.prototype.render = function () {
    this.weapon.forEach((bullet) => {
        this.game.debug.body(bullet);
    }, this)
}

Template.Robot.prototype.initializeObject = function () {
    /* Physics */

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.currentSpeed = 0;
    this.body.maxVelocity.setTo(400);
    this.body.collideWorldBounds = true;
    /* Weapon */

    this.weapon = this.game.add.weapon(10, 'bullet');
    this.weapon.bullets.forEach((bullet) => {
        bullet.scale.setTo(Template.scale);
    }, this);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 600;
    this.weapon.fireRate = 100; // 1 per 60 ms
    this.weapon.trackSprite(this, 0, 0, true);

    /* Life */

    this.life = this.game.add.sprite(-this.width * 0.25, 0, 'heart');
    this.life.anchor.setTo(0.5);
    this.life.scale.setTo(1);
    this.life.angle = 90;
    this.addChild(this.life);
}

Template.Robot.prototype.onBulletChestCollide = function (bullet, chest) {
    bullet.kill();
    chest.kill();
}