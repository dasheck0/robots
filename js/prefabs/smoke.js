/**
 * Created by s.neidig on 21/07/17.
 */

let Bots = Bots || {};

Bots.Smoke = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    const initialScale = this.scale;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.game.add.tween(this.scale).to({
        x: initialScale.x * 3,
        y: initialScale.y * 3
    }, 5000, Phaser.Easing.Quartic.In, true)
    this.game.add.tween(this).to({ alpha: 0 }, 3000, Phaser.Easing.Quartic.In, true)
        .onComplete.add(() => killFromGroup(this, this.state.groups[this.properties.group]), this);
};

Bots.Smoke.prototype = Object.create(Bots.Prefab.prototype);
Bots.Smoke.prototype.constructor = Bots.Smoke;