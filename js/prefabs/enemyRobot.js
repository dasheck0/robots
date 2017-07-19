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
            this.game.physics.arcade.moveToObject(this, member.member /* + random offset */, 100); // speed
        }
    }

    // if (!this.humanRobot) {
    //     this.state.groups.robots.forEachAlive((robot) => {
    //         if (robot.human) {
    //             console.log("Found human");
    //             this.humanRobot = robot;
    //         }
    //     });
    // } else {
    //     const distance = this.game.physics.arcade.distanceBetween(this, this.humanRobot);
    //
    //     if (distance < 150) { // sight range
    //         this.currentDestination = null;
    //
    //         if (distance < 100) { // shoot range
    //             this.body.velocity.x = 0;
    //             this.body.velocity.y = 0;
    //         } else {
    //             this.rotation = this.game.physics.arcade.angleBetween(this, this.humanRobot);
    //             this.game.physics.arcade.moveToObject(this, this.humanRobot /* + random offset */, 100); // speed
    //         }
    //
    //         console.log("Firing weapon");
    //         this.weapon.fire(); // make this dependent on aggresivity
    //     } else {
    //         // scan chests in sight range
    //         let closestChest = null;
    //         let closestChestDistance = Number.MAX_VALUE;
    //
    //         this.state.groups.chests.forEachAlive((chest) => {
    //             const distance = this.game.physics.arcade.distanceBetween(this, chest);
    //             if (distance < closestChestDistance) {
    //                 closestChestDistance = distance;
    //                 closestChest = chest;
    //             }
    //         });
    //
    //         console.log("Found closet chest ", !!closestChest);
    //
    //         if (!!closestChest) {
    //             if (!this.currentDestination || !(this.currentDestination.x === closestChest.x && this.currentDestination.y === closestChest.y)) {
    //                 this.rotation = this.game.physics.arcade.angleBetween(this, closestChest);
    //                 this.game.physics.arcade.moveToObject(this, closestChest /* + random offset */, 100);
    //                 this.currentDestination = new Phaser.Point(closestChest.x, closestChest.y);
    //             }
    //
    //             if (closestChestDistance < 100) {
    //                 this.weapon.fire();
    //             }
    //         }
    //     }
    // }
}