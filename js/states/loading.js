/**
 * Created by s.neidig on 11/07/17.
 */


let Template = Template || {};

Template.Loading = function () {
    Phaser.State.call(this);
};

Template.prototype = Object.create(Phaser.State.prototype);
Template.prototype.constructor = Template.Loading;

Template.Loading.prototype.init = function (data, nextState) {
    this.data = data;
    this.nextState = nextState;
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
                    console.log("Loaing spritesheet");
                    this.load.spritesheet(assetKey, asset.source, asset.frameWidth, asset.frameHeight, asset.frames, asset.margin || 0, asset.spacing || 0);
                    break;
            }
        }
    }
};

Template.Loading.prototype.create = function () {
    this.game.state.start(this.nextState, true, false, this.data);
};