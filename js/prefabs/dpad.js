/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};

Bots.DPad = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.isPressed = false;
    this.pointer = null;

    this.inputEnabled = true;
    this.events.onInputDown.add(function (dpad, pointer) {
        this.isPressed = true;
        this.pointer = pointer;
    }, this);
    this.events.onInputUp.add(function () {
        this.isPressed = false;
        this.pointer = null;
    }, this);
};

Bots.DPad.prototype = Object.create(Bots.Prefab.prototype);
Bots.DPad.prototype.constructor = Bots.DPad;

Bots.DPad.prototype.dpadAngle = function () {
    if (this.pointer) {
        return this.game.physics.arcade.angleToPointer(this, this.pointer) * 180 / 3.141592654;
    }
}
