/**
 * Created by s.neidig on 11/07/17.
 */


let Bots = Bots || {};

Bots.Loot = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.properties.robot.properties[this.properties.type] += this.properties.amount;
    if (this.properties.robot.human) {
        // update hud
        const tweenColor = this.properties.amount >= 0 ? '#00ff00' : '#ff0000';
        this.game.time.events.add(0, function () {
            const text = getMemberByName(this.state.groups.hud, this.properties.hudTextName);
            text.addColor(tweenColor, 0);

            this.game.time.events.add(250, function () {
                const text = getMemberByName(this.state.groups.hud, this.properties.hudTextName);
                text.addColor('#ffffff', 0);
            }, this)
        }, this);

        getMemberByName(this.state.groups.hud, this.properties.hudTextName).text = this.properties.robot.properties[this.properties.type]
    }

    this.game.add.tween(this).to({ y: position.y - 150, alpha: 0 }, 1000, Phaser.Easing.Quadratic.Out, true);
    this.game.add.tween(this.scale).to({
        x: 4,
        y: 4
    }, 1000, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
        this.kill();
        this.destroy();
        this.state.groups.loot.remove(this);
    }, this);
};

Bots.Loot.prototype = Object.create(Bots.Prefab.prototype);
Bots.Loot.prototype.constructor = Bots.Loot;
