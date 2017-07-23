/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.BossRobotSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.BossRobotSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.BossRobotSpawner.prototype.constructor = Bots.BossRobotSpawner;

Bots.BossRobotSpawner.prototype.createObject = function (name, position) {
    const maxHealth = this.state.game.rnd.integerInRange(5000, 6200);

    console.log("Dropped boss");

    return new Bots.BossRobot(this.state, name, position, {
        group: "robots",
        key: sample(['robot3Dred', 'robot3Dblue', 'robot3Dgreen', 'robot3Dyellow']),
        friction: 10,
        rotationSpeed: 5,
        attack: this.state.game.rnd.integerInRange(60, 120),
        defense: this.state.game.rnd.integerInRange(30, 35),
        speed: this.state.game.rnd.integerInRange(20, 35),
        health: maxHealth,
        maxHealth: maxHealth,
        displayName: getRandomName(),
        shootRange: this.state.game.rnd.integerInRange(300, 500),
        stopRange: this.state.game.rnd.integerInRange(150, 200),
        accuracy: this.state.game.rnd.realInRange(0.9, 1),
        scaleMultiplier: 3,
        sloppiness: this.state.game.rnd.realInRange(0.25, 0.6)
    });
}
