/**
 * Created by s.neidig on 16/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.Minimap = function (state, name, position, properties) {
    const x = state.game.width - Bots.minimapPadding.x - Bots.minimapWidth;
    const y = Bots.minimapPadding.y;

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

Bots.Minimap.prototype = Object.create(Phaser.Graphics.prototype);
Bots.Minimap.prototype.constructor = Bots.Minimap;

Bots.Minimap.prototype.update = function () {
    this.clear();

    this.drawRectangle(0, 0, Bots.minimapWidth, Bots.minimapHeight);

    this.state.groups.robots.forEachAlive((robot) => this.drawMinimapObject(robot, this.getRobotMinimapColor(robot), robot.boss ? 5 : 3));
    this.state.groups.chests.forEachAlive((chest) => this.drawMinimapObject(chest, 0x00ff00));
    // this.state.groups.oil.forEachAlive((oil) => this.drawMinimapObject(oil, 0xff0000));
}

Bots.Minimap.prototype.drawRectangle = function (x, y, w, h, color = 0x000000) {
    this.beginFill(color);
    this.drawRect(x, y, w, h);
    this.endFill();
}

Bots.Minimap.prototype.drawMinimapObject = function (object, color = 0xffffff, size = 3) {
    const x = object.world.x + Bots.worldSize.x / 2;
    const y = object.world.y + Bots.worldSize.y / 2;

    const mapX = (x / (1.0 * Bots.worldSize.x)) * Bots.minimapWidth;
    const mapY = (y / (1.0 * Bots.worldSize.y)) * Bots.minimapHeight;

    this.drawRectangle(mapX - (size - 1) / 2, mapY - (size - 1) / 2, size, size, color);
}

Bots.Minimap.prototype.getRobotMinimapColor = function (robot) {
    if (robot) {
        if (robot.human) {
            return 0x0000ff;
        }

        if (robot.boss) {
            return 0xff0000;
        }

        return 0xffffff;
    }
}