/**
 * Created by s.neidig on 15/07/17.
 */

var Bots = Bots || {};

Bots.TextSpawner = function (state, name, position, properties) {
    Bots.Spawner.call(this, state, name, position, properties);

    this.texts = [];
    this.maximumRows = this.properties.maximumRows || 5;
    this.fontSize = this.properties.fontSize || 8;
};

Bots.TextSpawner.prototype = Object.create(Bots.Spawner.prototype);
Bots.TextSpawner.prototype.constructor = Bots.TextSpawner;

Bots.TextSpawner.prototype.spawn = function (text) {
    const position = new Phaser.Point(Bots.screenSize.x / 2, 100);

    let textPrefab = this.pool.getFirstDead();
    if (textPrefab) {
        textPrefab.reset(position.x, position.y);
    } else {
        const name = `textPrefab_${this.pool.countLiving()}`;
        const textPrefabOrNull = this.createObject(name, position, text);

        if (textPrefabOrNull) {
            textPrefab = textPrefabOrNull;
        }
    }
}

Bots.TextSpawner.prototype.createObject = function (name, position, text) {
    position = this.nextPosition();

    const result = new Bots.TextPrefab(this.state, name, position, {
        group: 'hud',
        text: text,
        fixedToCamera: true,
        style: {
            font: `${this.fontSize}pt Arial`,
            fill: '#ffffff',
            align: 'left'
        },
        anchor: {
            x: 0,
            y: 0.5
        }
    });

    const indexOfPlayer = text.indexOf('Player');

    if (indexOfPlayer >= 0) {
        result.addColor('#0000ff', indexOfPlayer);
        result.addColor('#ffffff', indexOfPlayer + 6);
    }

    this.texts.push(result);
    return result;
}

Bots.TextSpawner.prototype.nextPosition = function () {
    if (this.texts.length >= this.maximumRows) {
        this.texts.forEach(text => {
            text.cameraOffset.y -= this.fontSize * 1.6;

        });
        killFromGroup(this.texts[0], this.state.groups.hud);
        this.texts.shift();
    }

    return new Phaser.Point(48, 18 + this.texts.length * this.fontSize * 1.6);
}