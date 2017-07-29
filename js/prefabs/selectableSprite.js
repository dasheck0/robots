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
        if (!this.game.paused || this.properties.force) {
            this.state.prefabs.clickSound.safelyPlay();
            this.isSelected = true;
            properties.parent.onTileSelected(this);
        }
    }, this);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    if (this.properties.shadow) {
        this.shadowGraphic = this.game.add.graphics(0, 0);
        this.state.groups[properties.group].addAt(this.shadowGraphic, 0);
    }
};

Bots.SelectableSprite.prototype = Object.create(Bots.Prefab.prototype);
Bots.SelectableSprite.prototype.constructor = Bots.SelectableSprite;

Bots.SelectableSprite.prototype.update = function () {
    this.frameGraphic.clear();

    if (this.properties.shadow) {
        this.shadowGraphic.clear();
        this.shadowGraphic.beginFill(0x000000);
        this.shadowGraphic.drawRect(this.x - this.width * this.scale.x + 2, this.y - this.height * this.scale.y + 2, this.width, this.height);
        this.shadowGraphic.endFill();
    }

    this.frameGraphic.lineStyle(1, 0x000000, 1);
    this.frameGraphic.beginFill(0x000000, this.isSelected ? 0 : 0.25);
    this.frameGraphic.drawRect(-this.width / 2 / this.scale.x, -this.height / 2 / this.scale.y, this.width / this.scale.x, this.height / this.scale.y);
    this.frameGraphic.endFill();
}