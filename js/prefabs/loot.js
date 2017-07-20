/**
 * Created by s.neidig on 11/07/17.
 */


let Template = Template || {};

Template.Loot = function (state, name, position, properties) {
    Template.Prefab.call(this, state, name, position, properties);

    this.game.add.tween(this).to({ y: position.y - 50, alpha: 0 }, 500, Phaser.Easing.Quadratic.Out, true);
    this.game.add.tween(this.scale).to({ x: 4, y: 4 }, 500, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
        this.properties.robot.properties[this.properties.type] += this.properties.amount;
        if (this.properties.robot.human) {
            // update hud
        }

        this.kill();
        this.destroy();
        this.state.groups.loot.remove(this);
    }, this);
};

Template.Loot.prototype = Object.create(Template.Prefab.prototype);
Template.Loot.prototype.constructor = Template.Loot;
