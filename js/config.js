/**
 * Created by s.neidig on 16/07/17.
 */

let Bots = Bots || {};

Bots.debug = true;
Bots.scale = 0.3;
Bots.worldSize = new Phaser.Point(3000, 3000);
Bots.screenSize = new Phaser.Point(640, 360);
Bots.cameraPadding = 100;
Bots.minimapWidth = Bots.screenSize.x * 0.25;
Bots.minimapHeight = (Bots.minimapWidth * Bots.worldSize.y) / Bots.worldSize.x;
Bots.minimapPadding = new Phaser.Point(16, 16);
Bots.killCount = 0;
Bots.deathCount = 0;
Bots.soundsEnabled = false;
Bots.background = '';