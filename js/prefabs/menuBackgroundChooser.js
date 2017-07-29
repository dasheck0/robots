/**
 * Created by s.neidig on 22/07/17.
 */

let Bots = Bots || {};

Bots.MenuBackgroundChooser = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.selectedTile = null;
    this.backgrounds = [];
    properties.backgrounds.forEach((key, index) => {
        const spriteProperties = {
            key,
            group: properties.pool,
            anchor: properties.anchor,
            scale: properties.scale,
            parent: this,
            shadow: properties.shadow,
            index: index
        };

        const selectableSprite = new Bots.SelectableSprite(state, key, position, spriteProperties);
        this.backgrounds.push(selectableSprite);
    });

    this.backgrounds.forEach((background, index) => {
        const length = this.backgrounds.length;
        background.x += (background.width + properties.spacing) * mod(index, properties.columns);// - (length * background.width + (length - 1) * properties.spacing) / 2 + background.width / 2;
        background.y -= Math.trunc(index / properties.columns) * (background.width + properties.spacing);
    });

    this.onTileSelected(this.backgrounds[0]);
}

Bots.MenuBackgroundChooser.prototype = Object.create(Bots.Prefab.prototype);
Bots.MenuBackgroundChooser.prototype.constructor = Bots.MenuBackgroundChooser;

Bots.MenuBackgroundChooser.prototype.onTileSelected = function (selectedTile) {
    this.selectedTile = selectedTile;
    this.backgrounds.forEach((tile) => (tile.isSelected = false));
    selectedTile.isSelected = true;
    getMemberByName(this.state.groups.background, 'background').loadTexture(selectedTile.properties.key);
}