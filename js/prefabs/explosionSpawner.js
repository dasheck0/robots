/**
 * Created by s.neidig on 15/07/17.
 */

var Template = Template || {};

Template.ExplosionSpawner = function (state, name, position, properties) {
    Template.Spawner.call(this, state, name, position, properties);
};

Template.ExplosionSpawner.prototype = Object.create(Template.Spawner.prototype);
Template.ExplosionSpawner.prototype.constructor = Template.ExplosionSpawner;

Template.ExplosionSpawner.prototype.spawn = function (object) {
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

Template.ExplosionSpawner.prototype.createObject = function (name, position, object) {
    if (object) {
        const properties = {
            key: 'explosion2',
            group: 'explosions',
            anchor: {
                x: 0.5,
                y: 0.5
            }
        }

        return new Template.Explosion(this.state, name, position, properties);
    }

    return null;
}