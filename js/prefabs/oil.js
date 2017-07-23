/**
 * Created by s.neidig on 21/07/17.
 */

let Bots = Bots || {};

Bots.Oil = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.game.add.tween(this).to({ alpha: 0 }, 20000, Phaser.Easing.Quartic.In, true)
        .onComplete.add(() => killFromGroup(this, this.state.groups[this.properties.group]), this);
};

Bots.Oil.prototype = Object.create(Bots.Prefab.prototype);
Bots.Oil.prototype.constructor = Bots.Oil;