"use strict";function _defineProperty(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}var Bots=Bots||{};Bots.Menu=function(){Phaser.State.call(this),this.prefabClasses=_defineProperty({sprite:Bots.Prefab.prototype.constructor,text:Bots.TextPrefab.prototype.constructor,animatedSprite:Bots.AnimatedSprite.prototype.constructor,tileSprite:Bots.TileSprite.prototype.constructor,button:Bots.Button.prototype.constructor,menuRobotChooser:Bots.MenuRobotChooser.prototype.constructor,menuBackgroundChooser:Bots.MenuBackgroundChooser.prototype.constructor,selectableSprite:Bots.SelectableSprite.prototype.constructor,sound:Bots.SoundPrefab.prototype.constructor,menuRobotSpawner:Bots.MenuRobotSpawner.prototype.constructor},"sound",Bots.SoundPrefab.prototype.constructor)},Bots.Menu.prototype=Object.create(Phaser.State.prototype),Bots.Menu.prototype.constructor=Bots.Menu,Bots.Menu.prototype.create=function(){this.game.time.advancedTiming=!0},Bots.Menu.prototype.init=function(e){this.data=e,this.game.physics.startSystem(Phaser.Physics.ARCADE)},Bots.Menu.prototype.create=function(){var e=this;this.game.time.advancedTiming=!0,this.game.stage.backgroundColor="#212A31",this.groups={},this.prefabs={},this.data.groups.forEach(function(o){return e.groups[o]=e.game.add.group()},this);for(var o in this.data.prefabs)this.data.prefabs.hasOwnProperty(o)&&this.createPrefab(o,this.data.prefabs[o]);this.game.add.tween(getMemberByName(this.groups.logo,"middleCloud")).to({alpha:1},500,Phaser.Easing.Circular.InOut,!0),this.game.add.tween(getMemberByName(this.groups.logo,"leftCloud")).to({x:35},550,Phaser.Easing.Circular.InOut,!0,500).onComplete.add(function(){getMemberByName(e.groups.logo,"leftCloud").x=35,e.game.add.tween(getMemberByName(e.groups.logo,"leftCloud")).to({x:getMemberByName(e.groups.logo,"leftCloud").x+10},5e3,Phaser.Easing.Linear.None,!0,25,-1,!0),e.game.add.tween(getMemberByName(e.groups.logo,"leftCloud")).to({y:getMemberByName(e.groups.logo,"leftCloud").y+8},7200,Phaser.Easing.Linear.None,!0,75,-1,!0)},this),this.game.add.tween(getMemberByName(this.groups.logo,"rightCloud")).to({x:500},550,Phaser.Easing.Circular.InOut,!0,500).onComplete.add(function(){getMemberByName(e.groups.logo,"rightCloud").x=500,e.game.add.tween(getMemberByName(e.groups.logo,"rightCloud")).to({x:getMemberByName(e.groups.logo,"rightCloud").x-8},4500,Phaser.Easing.Linear.None,!0,50,-1,!0),e.game.add.tween(getMemberByName(e.groups.logo,"rightCloud")).to({y:getMemberByName(e.groups.logo,"rightCloud").y+4},9e3,Phaser.Easing.Linear.None,!0,82,-1,!0)},this),this.game.add.tween(getMemberByName(this.groups.logo,"logoRobotGreen")).to({alpha:1,x:442},500,Phaser.Easing.Circular.InOut,!0,500),this.game.add.tween(getMemberByName(this.groups.logo,"logoRobotRed")).to({alpha:1,x:274},500,Phaser.Easing.Circular.InOut,!0,500),this.game.add.tween(getMemberByName(this.groups.logo,"logoBulletRight")).to({alpha:1,x:510,y:42},500,Phaser.Easing.Circular.InOut,!0,500),this.game.add.tween(getMemberByName(this.groups.logo,"logoBulletLeft")).to({alpha:1,x:194,y:36},500,Phaser.Easing.Circular.InOut,!0,500),getMemberByName(this.groups.chooser,"redRobotMoving").play("driving"),getMemberByName(this.groups.chooser,"greenRobotMoving").play("driving"),getMemberByName(this.groups.chooser,"greyRobotMoving").play("driving"),getMemberByName(this.groups.chooser,"yellowRobotMoving").play("driving"),this.chooser=getMemberByName(this.groups.spawners,"menuChooser"),this.chooser.showRobot(0,!0),this.backgroundChooser=getMemberByName(this.groups.spawners,"menuBackgroundChooser"),getMemberByName(this.groups.hud,"soundButton").loadTexture(Bots.soundsEnabled?"uiMusicOn":"uiMusicOff")},Bots.Menu.prototype.createPrefab=function(e,o){if(this.prefabClasses.hasOwnProperty(o.type)){var t=new Phaser.Point(o.position.x,o.position.y),s=new this.prefabClasses[o.type](this,e,t,o.properties);this.prefabs[e]=s}},Bots.Menu.prototype.update=function(){this.game.physics.arcade.collide(this.groups.robots)},Bots.Menu.prototype.onButtonPressed=function(e){if("leftButton"===e.name&&this.chooser.showPrevious(),"rightButton"===e.name&&this.chooser.showNext(),"startButton"===e.name){var o=this.game.cache.getText("level"),t=JSON.parse(o);Bots.background=this.backgroundChooser.selectedTile.properties.key,t.prefabs.robotSpawner.properties.spawnKey=this.chooser.getChosenRobot().properties.secondKey,t.prefabs.background.properties.key=this.backgroundChooser.selectedTile.properties.key,Bots.humanRobotKey=this.chooser.getChosenRobot().properties.secondKey,this.chooser.chooseRobot(500),this.fadeOutUI("level",t)}if("informationButton"===e.name){var s=this.game.cache.getText("credits"),r=JSON.parse(s);Bots.background=this.backgroundChooser.selectedTile.properties.key,r.prefabs.background.properties.key=this.backgroundChooser.selectedTile.properties.key,Bots.humanRobotKey=this.chooser.getChosenRobot().properties.secondKey,this.fadeOutUI("credits",r)}"soundButton"===e.name&&(Bots.soundsEnabled=!Bots.soundsEnabled,e.loadTexture(Bots.soundsEnabled?"uiMusicOn":"uiMusicOff"))},Bots.Menu.prototype.fadeOutUI=function(e,o){this.game.add.tween(this.groups.logo).to({y:-200},500,Phaser.Easing.Elastic.In,!0),this.game.add.tween(this.groups.hud).to({alpha:0},500,Phaser.Easing.Quintic.Out,!0).onComplete.add(function(){this.game.state.start("loading",!0,!1,o,e)},this)};