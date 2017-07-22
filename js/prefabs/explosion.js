/**
 * Created by s.neidig on 21/07/17.
 */

let Bots = Bots || {};

Bots.Explosion = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    const explosion = this.animations.add('explosion');
    this.animations.play('explosion', 25, false, true);
};

Bots.Explosion.prototype = Object.create(Bots.Prefab.prototype);
Bots.Explosion.prototype.constructor = Bots.Explosion;