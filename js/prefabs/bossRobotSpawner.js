/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.BossRobotSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.BossRobotSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.BossRobotSpawner.prototype.constructor = Bots.BossRobotSpawner;

Bots.BossRobotSpawner.prototype.spawn = function (withDelay) {
    const time = this.game.rnd.integerInRange(this.properties.spawnTimeInSeconds.min, this.properties.spawnTimeInSeconds.max);
    this.game.time.events.add(withDelay ? time * 1000 : 0, () => {
        if (this.isAllowedToSpawn()) {
            const position = new Phaser.Point(this.game.rnd.between(-Bots.worldSize.x / 2, Bots.worldSize.x / 2), this.game.rnd.between(-Bots.worldSize.y / 2, Bots.worldSize.y / 2));
            const name = `object_${this.pool.countLiving()}`;
            const object = this.createObject(name, position);
        }
    }, this);
}

Bots.BossRobotSpawner.prototype.createObject = function (name, position) {
    const maxHealth = this.state.game.rnd.integerInRange(1000, 1500);
    const randomName = getRandomName();

    getMemberByName(this.state.groups.spawners, 'messageSpawner').spawn(`A new boss '${randomName}' has entered the stage`, 'warning');

    return new Bots.BossRobot(this.state, name, position, {
        group: "robots",
        key: sample(['robot3Dred', 'robot3Dblue', 'robot3Dgreen', 'robot3Dyellow']),
        friction: 10,
        rotationSpeed: 5,
        attack: this.state.game.rnd.integerInRange(60, 80),
        defense: this.state.game.rnd.integerInRange(130, 180),
        speed: this.state.game.rnd.integerInRange(20, 35),
        health: maxHealth,
        maxHealth: maxHealth,
        displayName: randomName,
        shootRange: this.state.game.rnd.integerInRange(300, 500),
        stopRange: this.state.game.rnd.integerInRange(150, 200),
        accuracy: this.state.game.rnd.realInRange(0.9, 1),
        scaleMultiplier: 3,
        sloppiness: this.state.game.rnd.realInRange(0.25, 0.6)
    });
}
