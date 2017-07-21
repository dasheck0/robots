/**
 * Created by s.neidig on 15/07/17.
 */

let Template = Template || {};

Template.Robot = function (state, name, position, properties) {
    Template.DroppableRobot.call(this, state, name, position, properties);

    this.human = true;

    this.game.camera.follow(this);
    this.game.camera.deadzone = new Phaser.Rectangle(Template.cameraPadding, Template.cameraPadding, Template.screenSize.x - 4 * Template.minimapPadding.x - Template.minimapWidth - Template.cameraPadding, Template.screenSize.y - 2 * Template.cameraPadding);
    this.game.camera.focusOnXY(0, 0);

    this.trackTimer = null;
};

Template.Robot.prototype = Object.create(Template.DroppableRobot.prototype);
Template.Robot.prototype.constructor = Template.Robot;

Template.Robot.prototype.initializeObject = function () {
    Template.DroppableRobot.prototype.initializeObject(this.game);

    getMemberByName(this.state.groups.hud, 'atkText').text = this.properties.attack;
    getMemberByName(this.state.groups.hud, 'defText').text = this.properties.defense;
    getMemberByName(this.state.groups.hud, 'healthText').text = this.properties.health;
    getMemberByName(this.state.groups.hud, 'speedText').text = this.properties.speed;

    this.properties.rotationSpeed = this.properties.speed / 17;
    this.properties.maxSpeed = this.properties.speed * 2;
    this.body.maxVelocity.setTo(this.properties.maxSpeed);
}

Template.Robot.prototype.update = function () {
    Template.DroppableRobot.prototype.update(this);

    if (this.body) {
        this.body.angularAcceleration = 0;
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.body.angularVelocity = 0;

        if (this.dropped && !this.isDead) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.angle -= this.properties.rotationSpeed;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.angle += this.properties.rotationSpeed;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.currentSpeed = this.properties.maxSpeed;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.currentSpeed = -this.properties.maxSpeed;
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

                if (!this.trackTimer) {
                    this.trackTimer = this.game.time.events.loop(100, function () {
                        getMemberByName(this.state.groups.spawners, 'trackSpawner').spawn(this);
                    }, this);
                }
            } else {
                this.game.time.events.remove(this.trackTimer);
                this.trackTimer = 0;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.weapon.fire();
            }
        }
    }
}

Template.Robot.prototype.onBulletChestCollide = function (bullet, chest) {
    bullet.kill();
    chest.kill();
}

Template.Robot.prototype.onBulletRobotCollide = function (bullet, robot) {
    if (robot !== this) {
        bullet.kill();
        robot.animateDeath();
    }
}

Template.Robot.prototype.onBulletRobotCollideProcess = function (bullet, robot) {
    return robot !== this;
}