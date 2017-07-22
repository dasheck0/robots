/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.TrackSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);
};

Bots.TrackSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.TrackSpawner.prototype.constructor = Bots.TrackSpawner;

Bots.TrackSpawner.prototype.spawn = function (robot) {
    const position = new Phaser.Point(robot.x, robot.y);

    let track = this.pool.getFirstDead();
    if (track) {
        track.reset(position.x, position.y);
    } else {
        const name = `track_${this.pool.countLiving()}`;
        const trackOrNull = this.createObject(name, position, robot);

        if (trackOrNull) {
            track = trackOrNull;
        }
    }
}

Bots.TrackSpawner.prototype.createObject = function (name, position, robot) {
    if (robot) {
        const properties = {
            key: 'tracks',
            group: 'ground',
            angle: robot.angle,
            alpha: 0.5,
            anchor: {
                x: 0.5,
                y: 0.5
            }
        }

        return new Bots.Track(this.state, name, position, properties);
    }

    return null;
}