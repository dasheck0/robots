/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.RobotSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.RobotSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.RobotSpawner.prototype.constructor = Bots.RobotSpawner;

Bots.RobotSpawner.prototype.createObject = function (name, position) {
    const properties = this.robotStats();

    return new Bots.Robot(this.state, name, position, {
        group: "robots",
        key: this.properties.spawnKey,
        friction: 10,
        attack: properties.attack,
        defense: properties.defense,
        speed: properties.speed,
        health: properties.health,
        maxHealth: properties.maxHealth,
        displayName: "Player",
        scaleMultiplier: 1
    });
}

Bots.RobotSpawner.prototype.robotStats = function () {
    switch (this.properties.spawnKey) {
        case 'robot3Dred':
            return {
                attack: 70,
                defense: 70,
                speed: 90,
                health: 200,
                maxHealth: 200
            };

        case 'robot3Dgreen':
            return {
                attack: 50,
                defense: 50,
                speed: 80,
                health: 150,
                maxHealth: 150
            };

        case 'robot3Dyellow':
            return {
                attack: 40,
                defense: 45,
                speed: 70,
                health: 120,
                maxHealth: 120
            };

        case 'robot3Dblue':
            return {
                attack: 40,
                defense: 40,
                speed: 65,
                health: 110,
                maxHealth: 110
            };

        default:
            return {
                attack: 34,
                defense: 48,
                speed: 70,
                health: 100,
                maxHealth: 100
            }
    }
}