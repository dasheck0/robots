/**
 * Created by s.neidig on 21/07/17.
 */

let Bots = Bots || {};

Bots.Track = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.game.add.tween(this).to({ alpha: 0 }, 1000, Phaser.Easing.Quartic.In, true).onComplete.add(function () {
        this.kill();
        this.destroy();
        this.state.groups[this.properties.group].remove(this);
    }, this);
};

Bots.Track.prototype = Object.create(Bots.Prefab.prototype);
Bots.Track.prototype.constructor = Bots.Track;