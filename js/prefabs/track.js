/**
 * Created by s.neidig on 21/07/17.
 */

let Template = Template || {};

Template.Track = function (state, name, position, properties) {
    Template.Prefab.call(this, state, name, position, properties);

    this.game.add.tween(this).to({ alpha: 0 }, 1000, Phaser.Easing.Quartic.In, true).onComplete.add(function () {
        this.kill();
        this.destroy();
        this.state.groups[this.properties.group].remove(this);
    }, this);
};

Template.Track.prototype = Object.create(Template.Prefab.prototype);
Template.Track.prototype.constructor = Template.Track;