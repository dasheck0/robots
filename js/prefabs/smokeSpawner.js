/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.SmokeSpwaner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.SmokeSpwaner.prototype = Object.create(Bots.Spawner.prototype);
Bots.SmokeSpwaner.prototype.constructor = Bots.SmokeSpwaner;

Bots.SmokeSpwaner.prototype.spawn = function (object) {
    let probability = 0;

    if (object.properties.health <= object.properties.maxHealth * 0.5) {
        probability = 0.4;
    }

    if (object.properties.health <= object.properties.maxHealth * 0.25) {
        probability = 1;
    }

    if (this.game.rnd.frac() <= probability) {
        return this.createObject('randomName', object)
    }
}

Bots.SmokeSpwaner.prototype.createObject = function (name, position) {
    const scale = this.game.rnd.realInRange(0.5, 2);
    const maxOffset = 30;
    const offset = new Phaser.Point(this.game.rnd.integerInRange(-maxOffset, maxOffset), this.game.rnd.integerInRange(-maxOffset, maxOffset));

    const properties = {
        key: 'blackSmoke',
        group: this.properties.pool,
        alpha: this.game.rnd.realInRange(0.7, 1),
        scale: {
            x: scale,
            y: scale
        },
        angle: this.game.rnd.integerInRange(0, 360),
        anchor: {
            x: 0.5,
            y: 0.5
        }
    }

    return new Bots.Smoke(this.state, name, new Phaser.Point(position.x + offset.x, position.y + offset.y), properties);
}