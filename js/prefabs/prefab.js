/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};

Bots.Prefab = function (state, name, position, properties) {
    Phaser.Sprite.call(this, state.game, position.x, position.y, properties.key);

    this.state = state;
    this.name = name;
    this.properties = properties;
    this.state.prefabs[name] = this;
    this.game = state.game;

    if (properties.group) {
        this.state.groups[properties.group].add(this);
    }

    if (properties.frame) {
        this.frame = properties.frame;
    }

    if (properties.anchor) {
        this.anchor.setTo(properties.anchor.x, properties.anchor.y);
    }

    if (properties.scale) {
        this.scale.setTo(properties.scale.x, properties.scale.y);
    }

    if (properties.alpha) {
        this.alpha = properties.alpha;
    }

    if (properties.angle) {
        this.angle = properties.angle;
    }

    this.fixedToCamera = properties.fixedToCamera;
};

Bots.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
Bots.Prefab.prototype.constructor = Bots.Prefab;