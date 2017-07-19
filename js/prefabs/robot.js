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
};

Template.Robot.prototype = Object.create(Template.DroppableRobot.prototype);
Template.Robot.prototype.constructor = Template.Robot;

Template.Robot.prototype.initializeObject = function () {
    Template.DroppableRobot.prototype.initializeObject(this.game);

    // /* Life */
    //
    // this.life = this.game.add.sprite(-this.width * 0.25, 0, 'heart');
    // this.life.anchor.setTo(0.5);
    // this.life.scale.setTo(1);
    // this.life.angle = 90;
    // this.addChild(this.life);
    //
    // /* Shadow */
    //
    // this.shadow = this.game.add.sprite(0, 0, this.properties.key)
    // this.shadow.tint = 0x000000;
    // this.shadow.alpha = 0.1;
    // this.shadow.scale.setTo(1.2);
    // // this.shadow.angle = 90;
    // this.shadow.anchor.setTo(0.5);
    // this.addChild(this.shadow);
    //
    // this.aim = this.game.add.sprite(0, 0, this.properties.key);
    // // this.aim.scale.setTo(Template.scale);
    // this.aim.anchor.setTo(0.5);
    // this.addChild(this.aim);
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
        }
    }
}

Template.Robot.prototype.updateLife = function (life) {
    const alpha = life < 0 ? 0 : (life > 1 ? 1 : life);
    this.life.alpha = alpha;
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