/**
 * Created by s.neidig on 22/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.Button = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.inputEnabled = true;
    this.input.priorityId = 999; // ui
    this.input.useHandCursor = true;

    this.events.onInputDown.add(this.onButtonPressed, this);
    this.events.onInputUp.add(this.onButtonReleased, this);

    this.shadow = this.game.add.sprite(this.x, this.y + 2, this.properties.key);
    this.shadow.tint = 0x000000;
    this.shadow.anchor.setTo(0.5);

    this.state.groups.hud.addAt(this.shadow, 0);
};

Bots.Button.prototype = Object.create(Bots.Prefab.prototype);
Bots.Button.prototype.constructor = Bots.Button;

Bots.Button.prototype.onButtonPressed = function () {
    this.scale.setTo(1.1);
    this.shadow.scale.setTo(1.1);
}

Bots.Button.prototype.onButtonReleased = function () {
    this.scale.setTo(1);
    this.shadow.scale.setTo(1);

    this.state.onButtonPressed(this);
}
