/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};

Bots.SelectableSprite = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.isSelected = false;
    this.frameGraphic = this.game.add.graphics(0, 0);
    this.addChild(this.frameGraphic);

    this.inputEnabled = true;
    this.events.onInputUp.add(() => {
        this.isSelected = true;
        properties.parent.onTileSelected(this);
    }, this);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
};

Bots.SelectableSprite.prototype = Object.create(Bots.Prefab.prototype);
Bots.SelectableSprite.prototype.constructor = Bots.SelectableSprite;

Bots.SelectableSprite.prototype.update = function () {
    this.frameGraphic.clear();
    this.frameGraphic.lineStyle(1, 0x000000, 0.8);

    if (this.isSelected) {
        this.frameGraphic.beginFill(0xffffff, 0.25);
        this.frameGraphic.drawRect(-this.width / 2 / this.scale.x, -this.height / 2 / this.scale.y, this.width / this.scale.x, this.height / this.scale.y);
        this.frameGraphic.endFill();
    } else {
        this.frameGraphic.drawRect(-this.width / 2 / this.scale.x, -this.height / 2 / this.scale.y, this.width / this.scale.x, this.height / this.scale.y);
    }
}