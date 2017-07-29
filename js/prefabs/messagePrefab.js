/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};

Bots.MessagePrefab = function (state, name, position, properties) {
    this.messageHeight = 36;
    Phaser.Graphics.call(this, state.game, Bots.screenSize.x / 2, 100, properties.text, properties.style);

    this.state = state;
    this.name = name;
    this.properties = properties;
    this.state.prefabs[name] = this;
    this.game = state.game;
    this.anchor.setTo(0.5);
    this.fixedToCamera = true;

    if (properties.group) {
        this.state.groups[properties.group].add(this);
    }

    this.beginFill(0x000000, 0.75);
    this.drawRect(-Bots.screenSize.x / 2, -this.messageHeight / 2, Bots.screenSize.x, this.messageHeight);
    this.endFill();

    this.text = this.game.add.text(0, 2, properties.text, properties.style);
    this.text.anchor.setTo(0.5);
    this.addChild(this.text);

    this.sprite = this.game.add.sprite(0, 0, properties.key);
    this.sprite.anchor.setTo(0.5)
    this.sprite.scale.setTo(properties.imageScale.x, properties.imageScale.y);
    this.addChild(this.sprite);

    this.sprite.x = -this.text.width / 2 - this.sprite.width / 2 - 8;


    this.game.time.events.add(2000, () => {
        this.game.add.tween(this).to({ alpha: 0 }, 3000, Phaser.Easing.Quadratic.Out, true)
            .onComplete.add(() => {
            killFromGroup(this, this.state.groups[properties.group]);
        }, this);
    }, this);
};

Bots.MessagePrefab.prototype = Object.create(Phaser.Graphics.prototype);
Bots.MessagePrefab.prototype.constructor = Bots.MessagePrefab;

Bots.MessagePrefab.prototype.autoSize = function (width, height) {
    if (!this.defaultFontSize) {
        this.defaultFontSize = this.fontSize;
    }

    if (width > 0 && height > 0) {
        this.fontSize = 64;
        let size = this.fontSize;
        while (this.fontSize > 4) {
            if (this.width < width && this.height < height) {
                return size;
            }

            this.fontSize = --size;
        }
    }
}