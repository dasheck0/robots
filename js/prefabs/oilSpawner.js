/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.OilSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.OilSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.OilSpawner.prototype.constructor = Bots.OilSpawner;

Bots.OilSpawner.prototype.createObject = function (name, position) {
    const properties = {
        key: 'oil',
        group: 'oil',
        alpha: this.game.rnd.realInRange(0.6, 0.75),
        scale: {
            x: this.game.rnd.realInRange(0.9, 1.1),
            y: this.game.rnd.realInRange(0.9, 1.1)
        },
        angle: this.game.rnd.integerInRange(0, 360),
        anchor: {
            x: 0.5,
            y: 0.5
        }
    }

    return new Bots.Oil(this.state, name, position, properties);
}