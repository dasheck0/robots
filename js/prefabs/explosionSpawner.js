/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.ExplosionSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.ExplosionSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.ExplosionSpawner.prototype.constructor = Bots.ExplosionSpawner;

Bots.ExplosionSpawner.prototype.spawn = function (object) {
    const position = new Phaser.Point(object.x, object.y);

    let explosion = this.pool.getFirstDead();
    if (explosion) {
        explosion.reset(position.x, position.y);
    } else {
        const name = `explosion_${this.pool.countLiving()}`;
        const explosionOrNull = this.createObject(name, position, object);

        if (explosionOrNull) {
            explosion = explosionOrNull;
        }
    }
}

Bots.ExplosionSpawner.prototype.createObject = function (name, position, object) {
    if (object) {
        const properties = {
            key: 'explosion2',
            group: 'explosions',
            anchor: {
                x: 0.5,
                y: 0.5
            }
        }

        return new Bots.Explosion(this.state, name, position, properties);
    }

    return null;
}