/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.PauseDialogSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.PauseDialogSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.PauseDialogSpawner.prototype.constructor = Bots.PauseDialogSpawner;

Bots.PauseDialogSpawner.prototype.spawn = function (offset = new Phaser.Point(0, 0)) {
    console.log("PausE!", offset, getHumanRobot(this.state.groups.robots).position);
    console.log("fdmk", new Phaser.Point(Bots.screenSize.x / 2 + offset.x, Bots.screenSize.y / 2 + offset.y));


    if (!getMemberByName(this.state.groups[this.properties.pool], 'pauseDialog')) {
        return new Bots.PauseDialog(this.state, 'pauseDialog', new Phaser.Point(Bots.screenSize.x / 2 + offset.x, Bots.screenSize.y / 2 + offset.y), {
            group: this.properties.pool,
            size: this.properties.size,
            anchor: {
                x: 0.5,
                y: 0.5
            }
        });
    }
}