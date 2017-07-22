/**
 * Created by s.neidig on 15/07/17.
 */

let Bots = Bots || {};

Bots.Spawner = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.pool = this.state.groups[properties.pool];

    this.spawnTime = properties.spawnTimeInSeconds;
    this.spawnTimer = this.game.time.create();

    this.scheduleSpawn();
}

Bots.Spawner.prototype = Object.create(Bots.Prefab.prototype);
Bots.Spawner.prototype.constructor = Bots.Spawner;

Bots.Spawner.prototype.scheduleSpawn = function () {
    if (this.properties.mode !== 'never') {
        const time = this.game.rnd.between(this.spawnTime.min, this.spawnTime.max);

        this.spawnTimer.add(Phaser.Timer.SECOND * time, this.spawn, this);
        this.spawnTimer.start();
    }
}

Bots.Spawner.prototype.spawn = function () {
    if (this.isAllowedToSpawn()) {
        const position = new Phaser.Point(this.game.rnd.between(-Bots.worldSize.x / 2, Bots.worldSize.x / 2), this.game.rnd.between(-Bots.worldSize.y / 2, Bots.worldSize.y / 2));

        let object = this.pool.getFirstDead();
        if (object) {
            object.reset(position.x, position.y);
        } else {
            const name = `object_${this.pool.countLiving()}`;
            object = this.createObject(name, position);
        }
    }

    if (this.properties.mode === 'infinite' || this.properties.mode === 'limited') {
        this.scheduleSpawn();
    }
}

Bots.Spawner.prototype.isAllowedToSpawn = function () {
    return this.properties.mode === 'once' ||
        this.properties.mode === 'infinite' ||
        (this.properties.mode === 'limited' && this.pool.countLiving() < this.properties.limit);
}