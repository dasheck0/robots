/**
 * Created by s.neidig on 15/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.CreditsItem = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    const factor = 0.4;

    this.graphics = this.game.add.graphics(0, 0);
    this.addChild(this.graphics);

    this.sprite = this.game.add.sprite(0, 0, properties.dummyKey);
    this.sprite.anchor.setTo(0.5);

    const scaleX = (factor * this.properties.size.width) / this.sprite.width;
    const scaleY = (factor * this.properties.size.height) / this.sprite.height;

    this.sprite.scale.setTo((scaleX < scaleY) ? scaleX : scaleY);
    this.sprite.x = -this.properties.size.width / 2 + this.sprite.width / 2 + 8;
    this.addChild(this.sprite);

    this.caption = this.game.add.text(this.sprite.x + this.sprite.width / 2 + 8, this.sprite.y - this.sprite.height / 2, shortenName(properties.title, 15), this.captionTextStyle());
    this.addChild(this.caption);

    this.author = this.game.add.text(this.sprite.x + this.sprite.width / 2 + 8, this.sprite.y - this.sprite.height / 2 + 16, `by ${shortenName(properties.author, 12)}`, this.regularTextStyle());
    this.addChild(this.author);

    this.linkIcon = this.game.add.sprite(this.properties.size.width / 2 - 8, this.properties.size.height / 2 - 8, 'uiLink');
    this.linkIcon.anchor.setTo(1);
    this.addChild(this.linkIcon);

    this.linkIcon.inputEnabled = true;
    this.linkIcon.events.onInputUp.add(() => {
        if (this.game.device.iPad) {
            location.href = properties.link;
        } else {
            var newWindow = window.open(properties.link, '_blank');
            if (newWindow) {
                newWindow.focus();
            } else {
                location.href = properties.link;
            }
        }
    }, this);
};

Bots.CreditsItem.prototype = Object.create(Bots.Prefab.prototype);
Bots.CreditsItem.prototype.constructor = Bots.CreditsItem;

Bots.CreditsItem.prototype.update = function () {
    this.graphics.clear();
    this.graphics.beginFill(0x000000, 0.5);
    this.graphics.drawRect(-this.properties.size.width / 2, -this.properties.size.height / 2, this.properties.size.width, this.properties.size.height);
    this.graphics.endFill();
}

Bots.CreditsItem.prototype.captionTextStyle = function () {
    return {
        font: '10pt bold Helvetica, sans-serif',
        fill: '#ffffff',
        align: 'left'
    }
}

Bots.CreditsItem.prototype.regularTextStyle = function (fontSize = 8) {
    return {
        font: `${fontSize}pt Helvetica, sans-serif`,
        fill: '#ffffff',
        align: 'left'
    }
}
