/**
 * Created by s.neidig on 21/07/17.
 */

let Template = Template || {};

Template.Explosion = function (state, name, position, properties) {
    Template.Prefab.call(this, state, name, position, properties);

    const explosion = this.animations.add('explosion');
    this.animations.play('explosion', 25, false, true);
};

Template.Explosion.prototype = Object.create(Template.Prefab.prototype);
Template.Explosion.prototype.constructor = Template.Explosion;