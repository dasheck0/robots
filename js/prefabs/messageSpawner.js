/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.MessageSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.MessageSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.MessageSpawner.prototype.constructor = Bots.MessageSpawner;

Bots.MessageSpawner.prototype.spawn = function (text, key) {
    const name = `textPrefab_${this.pool.countLiving()}`;
    const textPrefabOrNull = this.createObject(name, text, key);
}

Bots.MessageSpawner.prototype.createObject = function (name, text, key) {
    const result = new Bots.MessagePrefab(this.state, name, new Phaser.Point(0, 0), {
        group: this.properties.pool,
        text: text,
        key: key,
        style: {
            font: `12pt Arial`,
            fill: '#ffffff',
            align: 'left'
        },
        imageScale: {
            x: 0.75,
            y: 0.75
        }
    });

    return result;
}