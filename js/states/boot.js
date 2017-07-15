/**
 * Created by s.neidig on 11/07/17.
 */


let Template = Template || {};

Template.Boot = function () {
    Phaser.State.call(this);
};

Template.Boot.prototype = Object.create(Phaser.State.prototype);
Template.Boot.prototype.constructor = Template.Boot;

Template.Boot.prototype.init = function (data) {
    this.data = data;
};

Template.Boot.prototype.preload = function () {
    this.load.text('data', this.data);
};

Template.Boot.prototype.create = function () {
    var content = this.game.cache.getText('data');
    var payload = JSON.parse(content);

    this.prepareScreenForScaling();
    this.game.state.start('loading', true, false, payload);
};

Template.Boot.prototype.prepareScreenForScaling = function () {
    this.game.stage.disableVisibilityChange = true;

    this.game.scale.maxWidth = window.innerWidth * window.devicePixelRatio;
    this.game.scale.maxHeight = window.innerHeight * window.devicePixelRatio;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.windowConstraints.bottom = 'visual';
}