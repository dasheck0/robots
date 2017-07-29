/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};

Bots.Loading = function () {
    Phaser.State.call(this);
};

Bots.prototype = Object.create(Phaser.State.prototype);
Bots.prototype.constructor = Bots.Loading;

Bots.Loading.prototype.init = function (data, nextState) {
    this.data = data;
    this.nextState = nextState;
};

Bots.Loading.prototype.preload = function () {
    var assets = this.data.assets;

    for (var assetKey in assets) {
        if (assets.hasOwnProperty(assetKey)) {
            var asset = assets[assetKey];

            switch (asset.type) {
                case "image":
                    this.load.image(assetKey, asset.source);
                    break;
                case "spritesheet":
                    this.load.spritesheet(assetKey, asset.source, asset.frameWidth, asset.frameHeight, asset.frames, asset.margin || 0, asset.spacing || 0);
                    break;
                case "sound":
                    this.load.audio(assetKey, asset.source);
                    break;
            }
        }
    }
};

Bots.Loading.prototype.create = function () {
    this.game.state.start(this.nextState, true, false, this.data);
};