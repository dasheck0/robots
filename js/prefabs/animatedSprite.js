/**
 * Created by s.neidig on 22/07/17.
 */

let Bots = Bots || {};

Bots.AnimatedSprite = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    (properties.animations || []).forEach((animation) => {
        this.animations.add(animation.name, properties.frames, properties.frameRate, properties.loop, properties.killOnComplete);
    })
};

Bots.AnimatedSprite.prototype = Object.create(Bots.Prefab.prototype);
Bots.AnimatedSprite.prototype.constructor = Bots.AnimatedSprite;

Bots.AnimatedSprite.prototype.play = function (name) {
    const animation = this.properties.animations.filter(animation => animation.name === name)[0];
    if (animation) {
        this.animations.play(animation.name, animation.frameRate, animation.loop, animation.killOnComplete);
    }
}