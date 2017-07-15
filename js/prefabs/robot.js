/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

let Template = Template || {};

Template.Robot = function (state, name, position, properties) {
    Phaser.Sprite.call(this, state.game, position.x, position.y, properties.key);

    this.state = state;
    this.name = name;
    this.dropped = false;

    this.anchor.setTo(0.5);
    this.dropRobot();

    this.state.groups[properties.group].add(this);
    this.state.prefabs[name] = this;
};

Template.Robot.prototype = Object.create(Phaser.Sprite.prototype);
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
                this.body.angularVelocity -= 200;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.angularVelocity += 200;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.game.physics.arcade.velocityFromAngle(this.angle, 300, this.body.velocity);
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.game.physics.arcade.velocityFromAngle(this.angle, -300, this.body.velocity);
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.weapon.fire();
            }
        }
    }
}

Template.Robot.prototype.render = function () {
    this.weapon.forEach((bullet) => {
        this.game.debug.body(bullet);
    }, this)
}

Template.Robot.prototype.dropRobot = function () {
    this.scale.setTo(4);
    const tween = this.game.add.tween(this.scale).to({ x: 0.5, y: 0.5 }, 750, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(this.initializeRobot, this);
}

Template.Robot.prototype.initializeRobot = function () {
    this.dropped = true;

    /* Physics */

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    /* Weapon */

    this.weapon = this.game.add.weapon(10, 'bullet');
    this.weapon.bullets.forEach((bullet) => {
        bullet.scale.setTo(0.5);
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