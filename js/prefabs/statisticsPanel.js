/**
 * Created by s.neidig on 24/07/17.
 */

"use strict";

var Bots = Bots || {};

Bots.StatisticsPanel = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.fixedToCamera = true;
    this.alpha = 0;

    this.topLeft = new Phaser.Point(50, 50);
    this.bottomRight = new Phaser.Point(Bots.screenSize.x - 50, Bots.screenSize.y - 50);
    this.panelSize = new Phaser.Point(this.bottomRight.x - this.topLeft.x, this.bottomRight.y - this.topLeft.y);

    this.graphics = this.game.add.graphics(0, 0);
    this.graphics.beginFill(0x000000, 0.75);
    this.graphics.drawRect(this.topLeft.x, this.topLeft.y, this.panelSize.x, this.panelSize.y);
    this.graphics.endFill();
    this.addChild(this.graphics);

    this.rankText = this.game.add.text(this.topLeft.x + 16, this.topLeft.y + 16, 'Rank', this.captionTextStyle());
    this.addChild(this.rankText);

    this.rankTexts = [];
    for (let i = 0; i < 12; i++) {
        const rankText = this.game.add.text(this.topLeft.x + 16, this.topLeft.y + 48 + i * 16, '', this.regularTextStyle());
        this.addChild(rankText);

        this.rankTexts.push(rankText);
    }

    this.playerText = this.game.add.text(this.topLeft.x + 16 + 100, this.topLeft.y + 16, 'Player', this.captionTextStyle());
    this.addChild(this.playerText);

    this.player = this.game.add.sprite(this.topLeft.x + 100 + 40, this.topLeft.y + 48 + 40, Bots.humanRobotKey);
    this.player.anchor.setTo(0.5);
    this.player.scale.x = Bots.scale * 0.9;
    this.player.scale.y = Bots.scale * 0.9;
    this.game.add.tween(this.player).to({ angle: 360 }, 30000, Phaser.Easing.Linear.None, true, 0, -1);
    this.addChild(this.player);

    this.attackText = this.game.add.text(this.topLeft.x + 16 + 100, this.topLeft.y + 48 + 64 + 32, 'Atl\t120', this.regularTextStyleWithTabs(48));
    this.addChild(this.attackText);

    this.defenseText = this.game.add.text(this.topLeft.x + 16 + 100, this.topLeft.y + 48 + 64 + 48, 'Def\t120', this.regularTextStyleWithTabs(48));
    this.addChild(this.defenseText);

    this.healthText = this.game.add.text(this.topLeft.x + 16 + 100, this.topLeft.y + 48 + 64 + 64, 'HP\t4800', this.regularTextStyleWithTabs(48));
    this.addChild(this.healthText);

    this.speedText = this.game.add.text(this.topLeft.x + 16 + 100, this.topLeft.y + 48 + 64 + 80, 'Spd\t120', this.regularTextStyleWithTabs(48));
    this.addChild(this.speedText);

    this.killsText = this.game.add.text(this.topLeft.x + 16 + 100, this.topLeft.y + 48 + 64 + 96, 'Kills\t120', this.regularTextStyleWithTabs(48));
    this.addChild(this.killsText);

    this.deathsText = this.game.add.text(this.topLeft.x + 16 + 100, this.topLeft.y + 48 + 64 + 112, 'Deaths\t120', this.regularTextStyleWithTabs(48));
    this.addChild(this.deathsText);

    this.helpText = this.game.add.text(this.topLeft.x + 200, this.topLeft.y + 16, 'Help', this.captionTextStyle());
    this.addChild(this.helpText);

    ['Up\tMove forwards', 'Down\tMove backwards', 'Left\tTurn left', 'Right\tTurn right', 'Space\tShoot', 'Shift\tShow info dialog'].forEach((item, index) => {
        const text = this.game.add.text(this.topLeft.x + 200, this.topLeft.y + 48 + index * 16, item, this.regularTextStyleWithTabs(52));
        this.addChild(text);
    });

    this.objectiveText = this.game.add.text(this.topLeft.x + 360, this.topLeft.y + 16, 'Objective', this.captionTextStyle());
    this.addChild(this.objectiveText);

    this.player1 = this.game.add.sprite(this.topLeft.x + 16 + 400, this.topLeft.y + 64, Bots.humanRobotKey);
    this.player1.anchor.setTo(0.5);
    this.player1.scale.setTo(Bots.scale * 0.7);
    this.player1.angle = 355;
    this.addChild(this.player1);

    this.player2 = this.game.add.sprite(this.topLeft.x + 16 + 484, this.topLeft.y + 64, sample(['robot3Dgreen', 'robot3Dred', 'robot3Dyellow', 'robot3Dblue'], Bots.humanRobotKey));
    this.player2.anchor.setTo(0.5);
    this.player2.scale.setTo(Bots.scale * 0.7);
    this.player2.angle = 95;
    this.addChild(this.player2);

    this.rocket1 = this.game.add.sprite(this.topLeft.x + 16 + 442, this.topLeft.y + 64, 'logoBulletRight');
    this.rocket1.anchor.setTo(0.5);
    this.rocket1.scale.setTo(Bots.scale);
    this.rocket1.angle = 355;
    this.addChild(this.rocket1);

    this.player3 = this.game.add.sprite(this.topLeft.x + 16 + 400, this.topLeft.y + 128, Bots.humanRobotKey);
    this.player3.anchor.setTo(0.5);
    this.player3.scale.setTo(Bots.scale * 0.7);
    this.player3.angle = 350;
    this.addChild(this.player3);

    this.chest = this.game.add.sprite(this.topLeft.x + 16 + 484, this.topLeft.y + 118, 'crate_45');
    this.chest.anchor.setTo(0.5);
    this.chest.scale.setTo(Bots.scale * 0.7);
    this.chest.angle = 95;
    this.addChild(this.chest);

    this.rocket2 = this.game.add.sprite(this.topLeft.x + 16 + 442, this.topLeft.y + 128, 'logoBulletRight');
    this.rocket2.anchor.setTo(0.5);
    this.rocket2.scale.setTo(Bots.scale);
    this.rocket2.angle = 350;
    this.addChild(this.rocket2);

    this.player4 = this.game.add.sprite(this.topLeft.x + 16 + 400, this.topLeft.y + 192, Bots.humanRobotKey);
    this.player4.anchor.setTo(0.5);
    this.player4.scale.setTo(Bots.scale * 0.7);
    this.player4.angle = 190;
    this.addChild(this.player4);

    this.player5 = this.game.add.sprite(this.topLeft.x + 16 + 484, this.topLeft.y + 192, sample(['robot3Dgreen', 'robot3Dred', 'robot3Dyellow', 'robot3Dblue'], Bots.humanRobotKey));
    this.player5.anchor.setTo(0.5);
    this.player5.scale.setTo(Bots.scale * 0.7);
    this.player5.angle = 170;
    this.addChild(this.player5);

    this.rocket3 = this.game.add.sprite(this.topLeft.x + 16 + 442, this.topLeft.y + 192, 'logoBulletRight');
    this.rocket3.anchor.setTo(0.5);
    this.rocket3.scale.setTo(Bots.scale);
    this.rocket3.angle = 170;
    this.addChild(this.rocket3);

    this.checkmark1 = this.game.add.sprite(this.topLeft.x + 16 + 360, this.topLeft.y + 64, 'uiCheckmark');
    this.checkmark1.anchor.setTo(0.5);
    this.checkmark1.scale.setTo(0.5);
    this.checkmark1.tint = 0x00ff00;
    this.addChild(this.checkmark1);

    this.checkmark2 = this.game.add.sprite(this.topLeft.x + 16 + 360, this.topLeft.y + 128, 'uiCheckmark');
    this.checkmark2.anchor.setTo(0.5);
    this.checkmark2.scale.setTo(0.5);
    this.checkmark2.tint = 0x00ff00;
    this.addChild(this.checkmark2);

    this.cross1 = this.game.add.sprite(this.topLeft.x + 16 + 360, this.topLeft.y + 192, 'uiCross');
    this.cross1.anchor.setTo(0.5);
    this.cross1.scale.setTo(0.5);
    this.cross1.tint = 0xff0000;
    this.addChild(this.cross1);
};

Bots.StatisticsPanel.prototype = Object.create(Bots.Prefab.prototype);
Bots.StatisticsPanel.prototype.constructor = Bots.StatisticsPanel;

Bots.StatisticsPanel.prototype.captionTextStyle = function () {
    return {
        font: '12pt bold Helvetica, sans-serif',
        fill: '#ffffff',
        align: 'left'
    }
}

Bots.StatisticsPanel.prototype.regularTextStyle = function (fontSize = 10) {
    return {
        font: `${fontSize}pt Helvetica, sans-serif`,
        fill: '#ffffff',
        align: 'left'
    }
}

Bots.StatisticsPanel.prototype.regularTextStyleWithTabs = function (tabWidth, fontsize) {
    const style = Object.assign({}, this.regularTextStyle());
    style.tabs = tabWidth;

    return style;
}

Bots.StatisticsPanel.prototype.show = function (show) {
    this.alpha = show ? 1 : 0;
}

Bots.StatisticsPanel.prototype.update = function () {
    if (this.alpha === 1) {
        const robotNamesWithLevel = [];
        this.state.groups.robots.forEachAlive((robot) => {
            robotNamesWithLevel.push({
                name: robot.properties.displayName,
                level: parseInt(robot.killCounter.text)
            });
        });

        robotNamesWithLevel
            .sort((l, r) => r.level - l.level)
            .slice(0, this.rankTexts.length)
            .forEach((robot, index) => {
                this.rankTexts[index].text = `${robot.level} ${shortenName(robot.name, 8)}`;
            });

        this.attackText.text = `Atk\t${getMemberByName(this.state.groups.hud, 'atkText').text}`;
        this.defenseText.text = `Def\t${getMemberByName(this.state.groups.hud, 'defText').text}`;
        this.healthText.text = `HP\t${getMemberByName(this.state.groups.hud, 'healthText').text}`;
        this.speedText.text = `Spd\t${getMemberByName(this.state.groups.hud, 'speedText').text}`;
        this.killsText.text = `Kills\t${Bots.killCount}`;
        this.deathsText.text = `Deaths\t${Bots.deathCount}`;
    }
}