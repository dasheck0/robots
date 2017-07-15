/**
 * Created by s.neidig on 11/07/17.
 */


let Template = Template || {};

Template.Prefab = function (state, name, position, properties) {
    console.log(state, name, position, properties);
    Phaser.Sprite.call(this, state.game, position.x, position.y, properties.key);

    this.state = state;
    this.name = name;
    this.properties = properties;
    this.state.prefabs[name] = this;

    if (properties.group) {
        this.state.groups[properties.group].add(this);
    }

    if (properties.frame) {
        this.frame = properties.frame;
    }
};

Template.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
Template.Prefab.prototype.constructor = Template.Prefab;