/**
 * Created by s.neidig on 21/07/17.
 */

let Bots = Bots || {};

Bots.PauseDialog = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    // this.fixedToCamera = true;

    this.tl = this.game.add.sprite(-this.properties.size.x / 2, -this.properties.size.y / 2, 'uiWindowTL');
    this.tl.anchor.setTo(0, 0);
    this.tr = this.game.add.sprite(this.properties.size.x / 2, -this.properties.size.y / 2, 'uiWindowTR');
    this.tr.anchor.setTo(1, 0);
    this.t = this.game.add.sprite(0, -this.properties.size.y / 2, 'uiWindowT');
    this.t.anchor.setTo(0.5, 0);
    this.t.scale.x = (this.properties.size.x - this.tl.width - this.tr.width) / (this.t.width - 5);

    this.bl = this.game.add.sprite(-this.properties.size.x / 2, this.properties.size.y / 2, 'uiWindowBL');
    this.bl.anchor.setTo(0, 1);
    this.br = this.game.add.sprite(this.properties.size.x / 2, this.properties.size.y / 2, 'uiWindowBR');
    this.br.anchor.setTo(1, 1);
    this.b = this.game.add.sprite(0, this.properties.size.y / 2, 'uiWindowB');
    this.b.anchor.setTo(0.5, 1);
    this.b.scale.x = (this.properties.size.x - this.bl.width - this.br.width) / (this.b.width - 5);

    this.ml = this.game.add.sprite(-this.properties.size.x / 2, 0, 'uiWindowL');
    this.ml.anchor.setTo(0, 0.5);
    this.ml.scale.y = (this.properties.size.y - this.bl.height - this.bl.height) / (this.ml.height - 5);

    this.mr = this.game.add.sprite(this.properties.size.x / 2, 0, 'uiWindowR');
    this.mr.anchor.setTo(1, 0.5);
    this.mr.scale.y = (this.properties.size.y - this.br.height - this.br.height) / (this.mr.height - 5);

    this.m = this.game.add.sprite(0, 0, 'uiWindow');
    this.m.anchor.setTo(0.5, 0.5);
    this.m.scale.x = (this.properties.size.x - this.ml.width - this.mr.width) / (this.m.width - 5);
    this.m.scale.y = (this.properties.size.y - this.br.height - this.br.height) / (this.m.height - 5);

    this.graphics = this.game.add.graphics(0, 0);
    this.graphics.beginFill(0x000000, 0.5);
    this.graphics.drawRect(-Bots.screenSize.x / 2, -Bots.screenSize.y / 2, Bots.screenSize.x, Bots.screenSize.y);
    this.graphics.endFill();

    this.cross = new Bots.Button(this.state, 'crossButton', new Phaser.Point(properties.size.x / 2 - 24, -properties.size.y / 2 + 24), {
        anchor: {
            x: 0.5,
            y: 0.5
        },
        scale: {
            x: 0.5,
            y: 0.5
        },
        key: 'uiCross',
        group: properties.group,
        force: true
    });

    this.caption = new Bots.TextPrefab(this.state, 'pauseDialogCaption', new Phaser.Point(0, -properties.size.y / 2 + 24), {
        text: 'Pause',
        group: properties.group,
        style: {
            font: "20pt Arial",
            fill: "#ffffff",
            align: "center"
        },
        anchor: {
            x: 0.5,
            y: 0.5
        }
    });

    this.addChild(this.graphics);
    this.addChild(this.ml);
    this.addChild(this.mr);
    this.addChild(this.tr);
    this.addChild(this.br);
    this.addChild(this.tl);
    this.addChild(this.bl);
    this.addChild(this.b);
    this.addChild(this.t);
    this.addChild(this.m);
    this.addChild(this.caption);
    this.addChild(this.cross);

    this.game.paused = true;
};

Bots.PauseDialog.prototype = Object.create(Bots.Prefab.prototype);
Bots.PauseDialog.prototype.constructor = Bots.PauseDialog;