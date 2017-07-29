/**
 * Created by s.neidig on 16/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.TileSprite = function (state, name, position, properties) {
    Phaser.TileSprite.call(this, state.game, position.x, position.y, properties.size.width, properties.size.height, properties.key);

    this.state = state;
    this.name = name;
    this.properties = properties;
    this.state.prefabs[name] = this;
    this.fixedToCamera = !!properties.fixedToCamera;

    if (properties.group) {
        this.state.groups[properties.group].add(this);
    }

    if (properties.frame) {
        this.frame = properties.frame;
    }

    if (properties.anchor) {
        this.anchor.setTo(properties.anchor.x, properties.anchor.y);
    }
};

Bots.TileSprite.prototype = Object.create(Phaser.TileSprite.prototype);
Bots.TileSprite.prototype.constructor = Bots.TileSprite;

Bots.TileSprite.prototype.update = function () {
    if (this.properties.fixedToCamera) {
        this.tilePosition.x = -this.game.camera.x;
        this.tilePosition.y = -this.game.camera.y;
    }
}