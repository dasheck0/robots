/**
 * Created by s.neidig on 22/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.Button = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.fixedToCamera = true;

    this.inputEnabled = true;
    this.input.priorityId = 999; // ui
    this.input.useHandCursor = true;

    this.events.onInputDown.add(this.onButtonPressed, this);
    this.events.onInputUp.add(this.onButtonReleased, this);

    this.shadow = this.game.add.sprite(this.x, this.y + 2, this.properties.key);
    this.shadow.tint = 0x000000;
    this.shadow.anchor.setTo(0.5);
    this.shadow.fixedToCamera = true;

    this.state.groups.hud.addAt(this.shadow, 0);
};

Bots.Button.prototype = Object.create(Bots.Prefab.prototype);
Bots.Button.prototype.constructor = Bots.Button;

Bots.Button.prototype.onButtonPressed = function () {
    if (!this.game.paused || this.properties.force) {
        this.scale.setTo(1.1);
        this.shadow.scale.setTo(1.1);
    }
}

Bots.Button.prototype.onButtonReleased = function () {
    if (!this.game.paused || this.properties.force) {
        this.scale.setTo(1);
        this.shadow.scale.setTo(1);

        this.state.prefabs.clickSound.safelyPlay();
        this.state.onButtonPressed(this);
    }
}
