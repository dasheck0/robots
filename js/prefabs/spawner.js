/**
 * Created by s.neidig on 15/07/17.
 */

let Template = Template || {};

Template.Spawner = function (state, name, position, properties) {
    Template.Prefab.call(this, state, name, position, properties);

    this.pool = this.state.groups[properties.pool];

    this.spawnTime = properties.spawnTimeInSeconds;
    this.spawnTimer = this.game.time.create();

    console.log("Hfvjdks");

    this.scheduleSpawn();
}

Template.Spawner.prototype = Object.create(Template.Prefab.prototype);
Template.Spawner.prototype.constructor = Template.Spawner;

Template.Spawner.prototype.scheduleSpawn = function () {
    const time = this.game.rnd.between(this.spawnTime.min, this.spawnTime.max);

    this.spawnTimer.add(Phaser.Timer.SECOND * time, this.spawn, this);
    this.spawnTimer.start();
}

Template.Spawner.prototype.spawn = function () {
    const position = new Phaser.Point(this.game.rnd.between(0, this.game.world.width), this.game.rnd.between(0, this.game.world.height));

    let object = this.pool.getFirstDead();
    if (object) {
        object.reset(position.x, position.y);
    } else {
        const name = `object_${this.pool.countLiving()}`;
        object = this.createObject(name, position);
    }

    if (this.properties.mode === 'infinite') {
        this.scheduleSpawn();
    } else if (this.properties.mode === 'limited' && this.ppol.countLiving() < this.properties.limit) {
        this.scheduleSpawn();
    }
}