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
        case 'robot3Dblue':
            return {
                attack: 34,
                defense: 60,
                speed: 70,
                health: 150,
                maxHealth: 150
            };

        case 'robot3Dgreen':
            return {
                attack: 50,
                defense: 20,
                speed: 90,
                health: 100,
                maxHealth: 100
            };

        case 'robot3Dred':
            return {
                attack: 50,
                defense: 50,
                speed: 70,
                health: 120,
                maxHealth: 120
            };

        case 'robot3Dyellow':
            return {
                attack: 28,
                defense: 75,
                speed: 50,
                health: 230,
                maxHealth: 230
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