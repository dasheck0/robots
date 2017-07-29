/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};

Bots.SoundPrefab = function (state, name, position, properties) {
    Phaser.Sound.call(this, state.game, properties.key);

    this.name = name;
    this.properties = properties;
    this.game = state.game;
    this.isPrepared = false;
    this.isKilled = false;

    this.game.sound.setDecodedCallback([this], () => {
        this.isPrepared = true;
        if (properties.playAfterDecode) {
            this.safelyPlay();
        }
    }, this);
};

Bots.SoundPrefab.prototype = Object.create(Phaser.Sound.prototype);
Bots.SoundPrefab.prototype.constructor = Bots.SoundPrefab;

Bots.SoundPrefab.prototype.safelyPlay = function () {
    if (!this.isKilled && this.isPrepared) {
        this.play('', 0, 1, false, false);
    }
}