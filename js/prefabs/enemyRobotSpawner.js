/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.EnemyRobotSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.EnemyRobotSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.EnemyRobotSpawner.prototype.constructor = Bots.EnemyRobotSpawner;

Bots.EnemyRobotSpawner.prototype.createObject = function (name, position) {
    const maxHealth = this.state.game.rnd.integerInRange(900, 1200);

    return new Bots.EnemyRobot(this.state, name, position, {
        "group": "robots",
        "key": sample(['robot3Dred', 'robot3Dblue', 'robot3Dgreen', 'robot3Dyellow']),
        "friction": 10,
        "rotationSpeed": 10,
        "attack": this.state.game.rnd.integerInRange(18, 30),
        "defense": this.state.game.rnd.integerInRange(12, 24),
        "speed": this.state.game.rnd.integerInRange(50, 70),
        "health": maxHealth,
        "maxHealth": maxHealth,
        "displayName": getRandomName(),
        shootRange: this.state.game.rnd.integerInRange(200, 300),
        stopRange: this.state.game.rnd.integerInRange(150, 200),
        accuracy: this.state.game.rnd.realInRange(0.75, 0.98),
        scaleMultiplier: 1
    });
}
