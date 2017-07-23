/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.ChestSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.ChestSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.ChestSpawner.prototype.constructor = Bots.ChestSpawner;

Bots.ChestSpawner.prototype.createObject = function (name, position) {
    const key = sample(this.properties.keys);

    return new Bots.Chest(this.state, name, position, {
        key,
        group: 'chests',
        scale: {
            x: 0.75,
            y: 0.75
        },
        lifePoints: this.game.rnd.integerInRange(1, 5)
    });
}