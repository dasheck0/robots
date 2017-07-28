/**
 * Created by s.neidig on 16/07/17.
 */

let Bots = Bots || {};

Bots.BossRobot = function (state, name, position, properties) {
    Bots.DroppableRobot.call(this, state, name, position, properties);

    this.boss = true;
    this.currentDestination = null;
    this.body.mass = 100;
};

Bots.BossRobot.prototype = Object.create(Bots.DroppableRobot.prototype);
Bots.BossRobot.prototype.constructor = Bots.BossRobot;

Bots.BossRobot.prototype.initializeObject = function () {
    Bots.DroppableRobot.prototype.initializeObject(this.game);

    this.properties.rotationSpeed = this.properties.speed / 17;
    this.properties.maxSpeed = this.properties.speed * 2;
    this.body.maxVelocity.setTo(this.properties.maxSpeed);

    this.trackTimer = this.game.time.events.loop(100, function () {
        getMemberByName(this.state.groups.spawners, 'trackSpawner').spawn(this);
    }, this);

    this.smokeTimer = this.game.time.events.loop(500, function () {
        getMemberByName(this.state.groups.spawners, 'smokeSpawner').spawn(this);
    }, this);

    this.initiateJump();
    this.initiateMeteoritHail();
}

Bots.BossRobot.prototype.getClosestMemberOfGroup = function (group) {
    let closestMember = null;
    let closestDistance = Number.MAX_VALUE;

    group.forEachAlive((member) => {
        if (member.name !== this.name) {
            const distance = this.game.physics.arcade.distanceBetween(this, member);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestMember = member;
            }
        }
    });

    return {
        member: closestMember,
        distance: closestDistance,
        present: closestMember !== null
    };
}

Bots.BossRobot.prototype.update = function () {
    Bots.DroppableRobot.prototype.update(this);

    if (!this.isDead) {
        if (!this.currentDestination || this.game.physics.arcade.distanceToXY(this, this.currentDestination.x, this.currentDestination.y) <= 50) {
            this.currentDestination = new Phaser.Point(randomInteger(Bots.worldSize.x) - Bots.worldSize.x / 2, randomInteger(Bots.worldSize.y) - Bots.worldSize.y / 2);
            const offset = -60 * this.game.rnd.realInRange(this.properties.accuracy, 1) + 60;
        }

        if (this.currentDestination) {
            this.rotation = this.game.physics.arcade.angleToXY(this, this.currentDestination.x, this.currentDestination.y, true);
            this.game.physics.arcade.moveToObject(this, this.currentDestination, this.properties.maxSpeed);
        }

        if (!this.checkSurroundingsTimer) {
            this.checkSurroundingsTimer = this.game.time.events.loop(1000, this.attackSurrounding, this);
        }
    }
}

Bots.BossRobot.prototype.attackNearbyObjects = function (group) {
    if (!this.attackedNearbyObjectInTurn) {
        group.forEachAlive((object) => {
            if (this.game.physics.arcade.distanceBetween(this, object) < this.properties.shootRange && this.game.rnd.frac() < this.properties.sloppiness) {
                this.rotation = this.game.physics.arcade.angleBetween(this, object);
                this.weapon.fire();
                this.attackedNearbyObjectInTurn = true;
                return;
            }
        });
    }
}

Bots.BossRobot.prototype.attackSurrounding = function () {
    this.attackedNearbyObjectInTurn = false;
    this.attackNearbyObjects(this.state.groups.robots);
    this.attackNearbyObjects(this.state.groups.chests);
}

Bots.BossRobot.prototype.initiateJump = function () {
    this.jump();
    this.jumpTimer = this.game.time.events.add(this.game.rnd.integerInRange(10000, 25000), this.initiateJump, this);
}

Bots.BossRobot.prototype.jump = function () {
    this.game.add.tween(this.scale).to({
        x: Bots.scale * this.properties.scaleMultiplier * 2,
        y: Bots.scale * this.properties.scaleMultiplier * 2
    }, 300, Phaser.Easing.Linear.None, true)
        .onComplete.add(() => {
        this.scale.x = Bots.scale * this.properties.scaleMultiplier * 2;
        this.scale.y = Bots.scale * this.properties.scaleMultiplier * 2;

        this.isJumping = false;
        this.game.add.tween(this.scale).to({
            x: Bots.scale * this.properties.scaleMultiplier,
            y: Bots.scale * this.properties.scaleMultiplier
        }, 300, Phaser.Easing.Linear.None, true)
            .onComplete.add(() => {
            this.scale.x = Bots.scale * this.properties.scaleMultiplier;
            this.scale.y = Bots.scale * this.properties.scaleMultiplier;

            getMemberByName(this.state.groups.spawners, 'earthQuakeSpawner').spawn(this, 10);
        }, this);
    }, this);
}

Bots.BossRobot.prototype.initiateMeteoritHail = function () {
    this.state.groups.robots.forEachAlive((robot) => {
        if (!robot.isDead && !robot.boss && this.game.physics.arcade.distanceBetween(this, robot) < this.properties.shootRange) {
            const position = new Phaser.Point(robot.x, robot.y);
            getMemberByName(this.state.groups.spawners, 'meteoritSpawner').forceSpawn(position);
        }
    })

    const count = this.game.rnd.integerInRange(5, 10);
    for (let i = 0; i < count; i++) {
        this.game.time.events.add(this.game.rnd.integerInRange(50, 500), () => {
            const position = new Phaser.Point(this.x + this.game.rnd.integerInRange(0, 200) * (randomBoolean() ? 1 : -1), this.y + this.game.rnd.integerInRange(0, 200) * (randomBoolean() ? 1 : -1));
            getMemberByName(this.state.groups.spawners, 'meteoritSpawner').forceSpawn(position);
        }, this);
    }

    this.meteoritTimer = this.game.time.events.add(this.game.rnd.integerInRange(12000, 15000), this.initiateMeteoritHail, this);
}