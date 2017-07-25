/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.BossRobotSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.BossRobotSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.BossRobotSpawner.prototype.constructor = Bots.BossRobotSpawner;

Bots.BossRobotSpawner.prototype.spawn = function () {
    if (this.isAllowedToSpawn()) {
        const position = new Phaser.Point(this.game.rnd.between(-Bots.worldSize.x / 2, Bots.worldSize.x / 2), this.game.rnd.between(-Bots.worldSize.y / 2, Bots.worldSize.y / 2));

        // let object = this.pool.getFirstDead();
        // if (object) {
        //     object.reset(position.x, position.y);
        // } else {
        const name = `object_${this.pool.countLiving()}`;
        const object = this.createObject(name, position);
        // }
    }

    if (this.properties.mode === 'infinite' || this.properties.mode === 'limited') {
        this.scheduleSpawn();
    }
}

Bots.BossRobotSpawner.prototype.createObject = function (name, position) {
    console.log("Dropped boss", this.state.game);
    const maxHealth = this.state.game.rnd.integerInRange(5000, 6200);


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
