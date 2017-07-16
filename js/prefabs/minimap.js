/**
 * Created by s.neidig on 16/07/17.
 */

"use strict";

var Template = Template || {};

Template.Minimap = function (state, name, position, properties) {
    const x = state.game.width - Template.minimapPadding.x - Template.minimapWidth;
    const y = Template.minimapPadding.y;

    Phaser.Graphics.call(this, state.game, x, y);

    this.state = state;
    this.name = name;
    this.alpha = properties.alpha;
    this.fixedToCamera = true;
    this.properties = properties;
    this.state.prefabs[name] = this;

    if (properties.group) {
        this.state.groups[properties.group].add(this);
    }
};

Template.Minimap.prototype = Object.create(Phaser.Graphics.prototype);
Template.Minimap.prototype.constructor = Template.Minimap;

Template.Minimap.prototype.update = function () {
    this.clear();

    this.drawRectangle(0, 0, Template.minimapWidth, Template.minimapHeight);
    this.state.groups.robots.forEachAlive((robot) => this.drawMinimapObject(robot));
    this.state.groups.chests.forEachAlive((chest) => this.drawMinimapObject(chest, 0x00ff00));
}

Template.Minimap.prototype.drawRectangle = function (x, y, w, h, color = 0x000000) {
    this.beginFill(color);
    this.drawRect(x, y, w, h);
    this.endFill();
}

Template.Minimap.prototype.drawMinimapObject = function (object, color = 0xffffff) {
    console.log("Object", object);

    const x = object.world.x + Template.worldSize.x / 2;
    const y = object.world.y + Template.worldSize.y / 2;

    const mapX = (x / (1.0 * Template.worldSize.x)) * Template.minimapWidth;
    const mapY = (y / (1.0 * Template.worldSize.y)) * Template.minimapHeight;

    this.drawRectangle(mapX - 1, mapY - 1, 3, 3, color);
}