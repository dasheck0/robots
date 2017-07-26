/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.CreditsItemSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);

    this.currentRow = 0;
};

Bots.CreditsItemSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.CreditsItemSpawner.prototype.constructor = Bots.CreditsItemSpawner;

Bots.Spawner.prototype.spawn = function () {
    this.properties.items.forEach((item, index) => {
        const name = `object_${this.pool.countLiving()}`;
        const object = this.createObject(name, item, index);
    });
}

Bots.CreditsItemSpawner.prototype.createObject = function (name, properties, index) {
    const modIndex = mod(index, this.properties.columnCount);
    if (modIndex === 0 && index !== 0) {
        this.currentRow += 1;
    }

    const width = (Bots.screenSize.x - (this.properties.columnCount - 1 ) * this.properties.spacing - 2 * this.properties.margin) / this.properties.columnCount
    const height = width / 1.61803398875;

    const position = new Phaser.Point(this.properties.margin + modIndex * (width + this.properties.spacing) + width / 2, this.y + this.currentRow * (height + this.properties.spacing) + height / 2);
    return new Bots.CreditsItem(this.state, name, position, {
        dummyKey: properties.key,
        title: properties.title,
        author: properties.author,
        link: properties.link,
        group: this.properties.pool,
        size: { width, height },
        anchor: {
            x: 0.5,
            y: 0.5
        },
        fixedToCamera: true
    });
}