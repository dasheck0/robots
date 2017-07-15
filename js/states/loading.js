/**
 * Created by s.neidig on 11/07/17.
 */


let Template = Template || {};

Template.Loading = function () {
    Phaser.State.call(this);
};

Template.prototype = Object.create(Phaser.State.prototype);
Template.prototype.constructor = Template.Loading;

Template.Loading.prototype.init = function (data) {
    this.data = data;
};

Template.Loading.prototype.preload = function () {
    var assets = this.data.assets;

    for (var assetKey in assets) {
        if (assets.hasOwnProperty(assetKey)) {
            var asset = assets[assetKey];
            switch (asset.type) {
                case "image":
                    this.load.image(assetKey, asset.source);
                    break;
                case "spritesheet":
                    this.load.image.spritesheet(assetKey, asset.source, asset.frameWidth, asset.frameHeight, asset.frames, asset.margin, asset.spacing);
                    break;
            }
        }
    }
};

Template.Loading.prototype.create = function () {
    this.game.state.start("level", true, false, this.data);
};