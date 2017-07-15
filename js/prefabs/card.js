/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

let Template = Template || {};

Template.Card = function (state, name, position, properties) {
    Phaser.Sprite.call(this, state.game, position.x, position.y, 'cardFront');

    this.state = state;
    this.name = name;
    this.anchor.setTo(0.5);

    this.state.groups[properties.group].add(this);
    this.state.prefabs[name] = this;

    /* Add caption */

    this.cardText = this.game.add.text(0, -this.height / 2 + 2, properties.name, this.textStyle(12, '#000'));
    this.cardText.anchor.setTo(0.5, 0);
    this.addChild(this.cardText);

    /* Make card movable */

    this.inputEnabled = true;
    this.input.enableDrag();

    this.events.onInputDown.add(context => context.animateScale(true));
    this.events.onInputUp.add(context => context.animateScale(false));
    
};

Template.Card.prototype = Object.create(Phaser.Sprite.prototype);
Template.Card.prototype.constructor = Template.Card;

Template.Card.prototype.textStyle = function (size, color) {
    return {
        font: 'lighter ' + size + 'px Montserrat',
        fill: color,
        align: 'center',
        wordWrap: false
    };
}

Template.Card.prototype.flip = function () {

}

Template.Card.prototype.animateScale = function (scaleUp) {
    var factor = scaleUp ? 1.1 : 1.0;
    this.game.add.tween(this.scale).to({ x: factor, y: factor }, 150, Phaser.Easing.Quadratic.Out, true);
}