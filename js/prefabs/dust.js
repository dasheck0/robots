/**
 * Created by s.neidig on 21/07/17.
 */

let Bots = Bots || {};

Bots.Dust = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.game.add.tween(this).to({ alpha: 0 }, 5000, Phaser.Easing.Quartic.In, true).onComplete.add(function () {
        this.kill();
        this.destroy();
        this.state.groups[this.properties.group].remove(this);
    }, this);
    //
    // const explosion = this.animations.add('explosion');
    // this.animations.play('explosion', 25, false);
    // this.animations.currentAnim.onComplete.add(function () {
    //     console.log("Rxploded");
    //
    //     this.loadTexture('blackSmoke', 0);
    //     this.alpha = 0.8;
    //
    //     this.game.add.tween(this).to({ alpha: 0 }, 1000, Phaser.Easing.Quartic.In, true).onComplete.add(function () {
    //         this.kill();
    //         this.destroy();
    //         this.state.groups[this.properties.group].remove(this);
    //     }, this);
    // }, this)
};

Bots.Dust.prototype = Object.create(Bots.Prefab.prototype);
Bots.Dust.prototype.constructor = Bots.Dust;