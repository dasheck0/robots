/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};

Bots.Boot = function () {
    Phaser.State.call(this);
};

Bots.Boot.prototype = Object.create(Phaser.State.prototype);
Bots.Boot.prototype.constructor = Bots.Boot;

Bots.Boot.prototype.init = function (data) {
    this.data = data;
};

Bots.Boot.prototype.preload = function () {
    this.load.text('data', this.data);
};

Bots.Boot.prototype.create = function () {
    var content = this.game.cache.getText('data');
    var payload = JSON.parse(content);

    this.prepareScreenForScaling();
    this.game.state.start('loading', true, false, payload, 'menu');
};

Bots.Boot.prototype.prepareScreenForScaling = function () {
    this.game.stage.disableVisibilityChange = true;

    this.game.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
    this.game.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.windowConstraints.bottom = 'visual';
}