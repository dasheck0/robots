"use strict";var Bots=Bots||{};Bots.Level=function(){Phaser.State.call(this),this.prefabClasses={sprite:Bots.Prefab.prototype.constructor,tileSprite:Bots.TileSprite.prototype.constructor,robot:Bots.Robot.prototype.constructor,enemyRobot:Bots.EnemyRobot.prototype.constructor,spawner:Bots.Spawner.prototype.constructor,robotSpawner:Bots.RobotSpawner.prototype.constructor,enemyRobotSpawner:Bots.EnemyRobotSpawner.prototype.constructor,bossRobotSpawner:Bots.BossRobotSpawner.prototype.constructor,chestSpawner:Bots.ChestSpawner.prototype.constructor,chest:Bots.Chest.prototype.constructor,meteoritSpawner:Bots.MeteoritSpawner.prototype.constructor,meteorit:Bots.Meteorit.prototype.constructor,minimap:Bots.Minimap.prototype.constructor,text:Bots.TextPrefab.prototype.constructor,lootSpawner:Bots.LootSpawner.prototype.constructor,loot:Bots.Loot.prototype.constructor,explosionSpawner:Bots.ExplosionSpawner.prototype.constructor,smokeSpawner:Bots.SmokeSpwaner.prototype.constructor,earthQuakeSpawner:Bots.EarthQuakeSpawner.prototype.constructor,textSpawner:Bots.TextSpawner.prototype.constructor,soundSpawner:Bots.SoundSpawner.prototype.constructor,explosion:Bots.Explosion.prototype.constructor,dust:Bots.Dust.prototype.constructor,dustSpawner:Bots.DustSpawner.prototype.constructor,statisticsPanel:Bots.StatisticsPanel.prototype.constructor,oilSpawner:Bots.OilSpawner.prototype.constructor,track:Bots.Track.prototype.constructor,trackSpawner:Bots.TrackSpawner.prototype.constructor,button:Bots.Button.prototype.constructor,dpad:Bots.DPad.prototype.constructor,control:Bots.Control.prototype.constructor,pauseDialogSpawner:Bots.PauseDialogSpawner.prototype.constructor,messageSpawner:Bots.MessageSpawner.prototype.constructor,sound:Bots.SoundPrefab.prototype.constructor}},Bots.Level.prototype=Object.create(Phaser.State.prototype),Bots.Level.prototype.constructor=Bots.Level,Bots.Level.prototype.init=function(t){this.data=t,this.game.physics.startSystem(Phaser.Physics.ARCADE)},Bots.Level.prototype.create=function(){var t=this;this.game.time.advancedTiming=!0,this.game.stage.backgroundColor="#212A31",this.groups={},this.prefabs={},this.data.groups.forEach(function(o){return t.groups[o]=t.game.add.group()},this);for(var o in this.data.prefabs)this.data.prefabs.hasOwnProperty(o)&&this.createPrefab(o,this.data.prefabs[o]);this.game.world.setBounds(-Bots.worldSize.x/2,-Bots.worldSize.y/2,Bots.worldSize.x,Bots.worldSize.y),Bots.killCount=0,Bots.deathCount=0},Bots.Level.prototype.createPrefab=function(t,o){if(this.prefabClasses.hasOwnProperty(o.type)){var e=new Phaser.Point(o.position.x,o.position.y),r=new this.prefabClasses[o.type](this,t,e,o.properties);this.prefabs[t]=r}},Bots.Level.prototype.update=function(){this.game.physics.arcade.collide(this.groups.chests,this.groups.robots),this.game.physics.arcade.collide(this.groups.robots,this.groups.robots,function(t,o){!t.boss||o.isDead||t.isDead||(t.killedOtherRobot(o),o.animateDeath()),!o.boss||t.isDead||o.isDead||(o.killedOtherRobot(t),t.animateDeath())},null,this);var t=getMemberByName(this.groups.panel,"statisticsPanel");t&&t.show(this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))},Bots.Level.prototype.onButtonPressed=function(t){if("menuButton"===t.name){var o=this.game.cache.getText("menu"),e=JSON.parse(o);e.prefabs.background.properties.key=Bots.background,this.game.state.start("loading",!0,!1,e,"menu")}};