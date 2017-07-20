/**
 * Created by s.neidig on 15/07/17.
 */

var Template = Template || {};

Template.LootSpawner = function (state, name, position, properties) {
    Template.Spawner.call(this, state, name, position, properties);
};

Template.LootSpawner.prototype = Object.create(Template.Spawner.prototype);
Template.LootSpawner.prototype.constructor = Template.LootSpawner;

Template.LootSpawner.prototype.spawn = function (chest, robot) {
    const position = new Phaser.Point(chest.x, chest.y);

    let loot = this.pool.getFirstDead();
    if (loot) {
        loot.reset(position.x, position.y);
    } else {
        const name = `loot_${this.pool.countLiving()}`;
        const lootOrNull = this.createObject(name, position, robot);

        if (lootOrNull) {
            loot = lootOrNull;
        }
    }
}

Template.LootSpawner.prototype.createObject = function (name, position, robot) {
    const properties = this.generateLootProperties(robot);
    if (properties) {
        properties.robot = robot;
        properties.alpha = 0.5;
        properties.group = 'loot';
        properties.anchor = { x: 0.5, y: 0.5 };

        return new Template.Loot(this.state, name, position, properties);
    }

    return null;
}

Template.LootSpawner.prototype.generateLootProperties = function (robot) {
    if (robot) {
        const properties = [{
            type: 'attack',
            amount: this.game.rnd.integerInRange(robot.properties.attack * 0.05, robot.properties.attack * 0.15),
            key: 'lucifer_cannon'
        }, {
            type: 'defense',
            amount: this.game.rnd.integerInRange(robot.properties.attack * 0.08, robot.properties.attack * 0.12),
            key: 'shield'
        }, {
            type: 'maxHealth',
            amount: this.game.rnd.integerInRange(robot.properties.attack * 0.15, robot.properties.attack * 0.20),
            key: 'medical_pack'
        }, {
            type: 'speed',
            amount: this.game.rnd.integerInRange(robot.properties.attack * 0.05, robot.properties.attack * 0.1),
            key: 'jet_pack'
        }];

        return sample(properties);
    }

    return null;
}