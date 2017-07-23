/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.MeteoritSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.MeteoritSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.MeteoritSpawner.prototype.constructor = Bots.MeteoritSpawner;

Bots.MeteoritSpawner.prototype.forceSpawn = function (position) {
    let object = this.pool.getFirstDead();
    if (object) {
        object.reset(position.x, position.y);
    } else {
        const name = `object_${this.pool.countLiving()}`;
        object = this.createObject(name, position);
    }
}

Bots.MeteoritSpawner.prototype.createObject = function (name, position) {
    const key = sample(this.properties.keys);

    return new Bots.Meteorit(this.state, name, position, {
        key,
        group: this.properties.pool,
        scale: {
            x: 0.75,
            y: 0.75
        },
        avoidBounce: this.properties.avoidBounce,
        attack: this.game.rnd.integerInRange(100, 200)
    });
}