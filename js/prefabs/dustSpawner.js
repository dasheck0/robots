/**
 * Created by s.neidig on 15/07/17.
 */

var Template = Template || {};

Template.DustSpawner = function (state, name, position, properties) {
    Template.Spawner.call(this, state, name, position, properties);
};

Template.DustSpawner.prototype = Object.create(Template.Spawner.prototype);
Template.DustSpawner.prototype.constructor = Template.DustSpawner;

Template.DustSpawner.prototype.spawn = function (object) {
    const position = new Phaser.Point(object.x, object.y);

    let dust = this.pool.getFirstDead();
    if (dust) {
        dust.reset(position.x, position.y);
    } else {
        const name = `dust_${this.pool.countLiving()}`;
        const dustOrNull = this.createObject(name, position, object);

        if (dustOrNull) {
            dust = dustOrNull;
        }
    }
}

Template.DustSpawner.prototype.createObject = function (name, position, object) {
    if (object) {
        const properties = {
            key: 'blackSmoke',
            group: 'ground',
            alpha: this.game.rnd.realInRange(0.4, 0.6),
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

        return new Template.Dust(this.state, name, position, properties);
    }

    return null;
}