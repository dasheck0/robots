/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};

Bots.TextPrefab = function (state, name, position, properties) {
    Phaser.Text.call(this, state.game, position.x, position.y, properties.text, properties.style);

    this.state = state;
    this.name = name;
    this.properties = properties;
    this.state.prefabs[name] = this;
    this.game = state.game;

    if (properties.group) {
        this.state.groups[properties.group].add(this);
    }

    if (properties.anchor) {
        this.anchor.setTo(properties.anchor.x, properties.anchor.y);
    }

    if (properties.scale) {
        this.scale.setTo(properties.scale.x, properties.scale.y);
    }

    if (properties.alpha) {
        this.alpha = properties.alpha;
    }

    this.fixedToCamera = properties.fixedToCamera;

    if (properties.size) {
        this.autoSize(properties.size.width, properties.size.height);
    }

    if (properties.lineSpacing) {
        this.lineSpacing = properties.lineSpacing;
    }

    if (properties.shadow) {
        this.setShadow(2, 2, 'rgba(0,0,0,0.5)', 0);
    }
};

Bots.TextPrefab.prototype = Object.create(Phaser.Text.prototype);
Bots.TextPrefab.prototype.constructor = Bots.TextPrefab;

Bots.TextPrefab.prototype.autoSize = function (width, height) {
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