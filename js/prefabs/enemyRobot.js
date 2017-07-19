/**
 * Created by s.neidig on 16/07/17.
 */

let Template = Template || {};

Template.EnemyRobot = function (state, name, position, properties) {
    Template.DroppableRobot.call(this, state, name, position, properties);

    this.humanRobot = null;
    this.currentDestination = null;
};


Template.EnemyRobot.prototype = Object.create(Template.DroppableRobot.prototype);
Template.EnemyRobot.prototype.constructor = Template.EnemyRobot;

Template.EnemyRobot.prototype.initializeObject = function () {
    Template.DroppableRobot.prototype.initializeObject(this.game);

    this.properties.rotationSpeed = this.properties.speed / 17;
    this.properties.maxSpeed = this.properties.speed * 2;
    this.body.maxVelocity.setTo(this.properties.maxSpeed);
}

Template.EnemyRobot.prototype.getClosestMemberOfGroup = function (group) {
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

Template.EnemyRobot.prototype.update = function () {
    Template.DroppableRobot.prototype.update(this);

    if (!this.isDead) {
        const closestRobot = this.getClosestMemberOfGroup(this.state.groups.robots);
        const closestChest = this.getClosestMemberOfGroup(this.state.groups.chests);

        const member = (closestRobot.present && closestRobot.distance < closestChest.distance) ? closestRobot : closestChest;

        if (member.member) {
            if (member.distance < 150) {
                if (member.distance < 100) {
                    this.body.velocity.x = 0;
                    this.body.velocity.y = 0;
                } else {
                }

                this.weapon.fire();
            }

            this.rotation = this.game.physics.arcade.angleBetween(this, member.member);
            this.game.physics.arcade.moveToObject(this, member.member /* + random offset */, this.properties.maxSpeed); // speed
        }
    }
}