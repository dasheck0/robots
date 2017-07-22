/**
 * Created by s.neidig on 15/07/17.
 */

let Bots = Bots || {};

Bots.Robot = function (state, name, position, properties) {
    Bots.DroppableRobot.call(this, state, name, position, properties);

    this.human = true;

    this.game.camera.follow(this);
    this.game.camera.deadzone = new Phaser.Rectangle(Bots.cameraPadding, Bots.cameraPadding, Bots.screenSize.x - 4 * Bots.minimapPadding.x - Bots.minimapWidth - Bots.cameraPadding, Bots.screenSize.y - 2 * Bots.cameraPadding);
    this.game.camera.focusOnXY(0, 0);

    this.trackTimer = null;

    this.dpad = getMemberByName(this.state.groups.hud, 'uiDPad');
    this.shootButton = getMemberByName(this.state.groups.hud, 'uiShootButton');

    if (this.game.device.desktop) {
        killFromGroup(this.dpad, this.state.groups.hud);
        killFromGroup(this.shootButton, this.state.groups.hud);

        this.dpad = null;
        this.shootButton = null;
    }
};

Bots.Robot.prototype = Object.create(Bots.DroppableRobot.prototype);
Bots.Robot.prototype.constructor = Bots.Robot;

Bots.Robot.prototype.initializeObject = function () {
    Bots.DroppableRobot.prototype.initializeObject(this.game);

    getMemberByName(this.state.groups.hud, 'atkText').text = this.properties.attack;
    getMemberByName(this.state.groups.hud, 'defText').text = this.properties.defense;
    getMemberByName(this.state.groups.hud, 'healthText').text = this.properties.health;
    getMemberByName(this.state.groups.hud, 'speedText').text = this.properties.speed;

    this.properties.rotationSpeed = this.properties.speed / 17;
    this.properties.maxSpeed = this.properties.speed * 2;
    this.body.maxVelocity.setTo(this.properties.maxSpeed);
}

Bots.Robot.prototype.update = function () {
    Bots.DroppableRobot.prototype.update(this);

    if (this.body) {
        this.body.angularAcceleration = 0;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.angularVelocity = 0;

        if (this.dropped && !this.isDead) {
            if (this.game.device.desktop) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.angle -= this.properties.rotationSpeed;
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.angle += this.properties.rotationSpeed;
                }

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.currentSpeed = this.properties.maxSpeed;
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                    this.currentSpeed = -this.properties.maxSpeed;
                }

                if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                    this.weapon.fire();
                }
            } else {
                if (this.dpad && this.dpad.isPressed) {
                    const angle = this.dpad.dpadAngle();
                    if (angle) {
                        this.angle = angle;
                        this.currentSpeed = this.properties.maxSpeed;
                    }
                }

                if (this.shootButton && this.shootButton.isPressed) {
                    this.weapon.fire();
                }
            }

            if (this.currentSpeed > 0) {
                this.currentSpeed -= this.properties.friction;
            } else {
                this.currentSpeed += this.properties.friction;
            }

            if (Math.abs(this.currentSpeed) <= this.properties.friction) {
                this.currentSpeed = 0;
            }

            if (this.currentSpeed !== 0) {
                this.game.physics.arcade.velocityFromRotation(this.rotation, this.currentSpeed, this.body.velocity);

                if (!this.trackTimer) {
                    this.trackTimer = this.game.time.events.loop(100, function () {
                        getMemberByName(this.state.groups.spawners, 'trackSpawner').spawn(this);
                    }, this);
                }
            } else {
                this.game.time.events.remove(this.trackTimer);
                this.trackTimer = 0;
            }
        }
    }
}

Bots.Robot.prototype.onBulletChestCollide = function (bullet, chest) {
    bullet.kill();
    chest.kill();
}

Bots.Robot.prototype.onBulletRobotCollide = function (bullet, robot) {
    if (robot !== this) {
        bullet.kill();
        robot.animateDeath();
    }
}

Bots.Robot.prototype.onBulletRobotCollideProcess = function (bullet, robot) {
    return robot !== this;
}