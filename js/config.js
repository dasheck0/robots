/**
 * Created by s.neidig on 16/07/17.
 */

let Template = Template || {};

Template.scale = 0.5;
Template.worldSize = new Phaser.Point(4000, 4000);
Template.screenSize = new Phaser.Point(640, 360);
Template.cameraPadding = 100;
Template.minimapWidth = Template.screenSize.x * 0.25;
Template.minimapHeight = (Template.minimapWidth * Template.worldSize.y) / Template.worldSize.x;
Template.minimapPadding = new Phaser.Point(16, 16);