/**
 * Created by s.neidig on 11/07/17.
 */


let Template = Template || {};

Template.Prefab = function (state, name, position, properties) {
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

    this.fixedToCamera = properties.fixedToCamera;
};

Template.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
Template.Prefab.prototype.constructor = Template.Prefab;