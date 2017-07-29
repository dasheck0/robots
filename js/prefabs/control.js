/**
 * Created by s.neidig on 21/07/17.
 */

let Bots = Bots || {};

Bots.Control = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.isPressed = false;

    this.inputEnabled = true;
    this.events.onInputDown.add(() => (this.isPressed = true), this);
    this.events.onInputUp.add(() => {
        this.isPressed = false;
    }, this);
};

Bots.Control.prototype = Object.create(Bots.Prefab.prototype);
Bots.Control.prototype.constructor = Bots.Control;