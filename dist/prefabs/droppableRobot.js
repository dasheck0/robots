"use strict";var Bots=Bots||{};Bots.DroppableRobot=function(t,e,s,o){var a=this;Bots.Droppable.call(this,t,e,s,o),this.anchor.setTo(.5),this.human=!1,this.isDead=!1,this.isJumping=!1,this.kills=0,this.deaths=0,this.scale.setTo(Bots.scale),this.game.physics.enable(this,Phaser.Physics.ARCADE),this.currentSpeed=0,this.body.maxVelocity.setTo(this.properties.speed),this.body.mass=1,this.body.collideWorldBounds=!0,this.speedMultiplier=1,this.weapon=this.game.add.weapon(10+this.game.rnd.integerInRange(-2,2),"bullet",0,this.state.groups.bullets),this.weapon.bullets.forEach(function(t){t.scale.setTo(Bots.scale)},this),this.weapon.bulletKillType=Phaser.Weapon.KILL_DISTANCE,this.weapon.bulletKillDistance=1e3,this.weapon.bulletSpeed=600+this.game.rnd.integerInRange(-50,50),this.weapon.fireRate=300+this.game.rnd.integerInRange(-30,30),this.weapon.bulletAngleVariance=5+this.game.rnd.integerInRange(-5,5),this.weapon.trackSprite(this,0,0,!0),this.weapon.onFire.add(function(){getMemberByName(a.state.groups.spawners,"soundSpawner").spawn(a,"shotSound")},this),this.killCounter=this.game.add.text(0,0,"1",{font:"10pt Arial",fill:"#ffffff",align:"right"}),this.killCounter.anchor.setTo(1,0),this.state.groups.hud.add(this.killCounter),this.nameText=this.game.add.text(0,0,o.displayName||"Player",{font:"10pt Arial",fill:"#ffffff",align:"center"}),this.nameText.anchor.setTo(.5),this.state.groups.hud.add(this.nameText),this.healthBar=this.game.add.graphics(0,0,t.groups.hud),this.shadow=this.game.add.sprite(this.x,this.y,o.key),this.shadow.scale.x=1.2*this.scale.x,this.shadow.scale.y=1.2*this.scale.y,this.shadow.alpha=.25,this.shadow.anchor.setTo(.5),this.shadow.tint=0,this.shadow.name=e+"_shadow",this.state.groups.shadows.add(this.shadow),this.spawnProtect=!0},Bots.DroppableRobot.prototype=Object.create(Bots.Droppable.prototype),Bots.DroppableRobot.prototype.constructor=Bots.DroppableRobot,Bots.DroppableRobot.prototype.initializeObject=function(t){t.alpha=.5,t.spawnProtect=!0,t.game.time.events.add(2e3,function(){t.alpha=1,t.spawnProtect=!1},t)},Bots.DroppableRobot.prototype.reset=function(t,e){Bots.Droppable.prototype.reset.call(this,t,e)},Bots.DroppableRobot.prototype.dealDamage=function(t){return!this.spawnProtect&&(this.boss&&t<0&&(t=0),this.properties.health=Math.ceil(this.properties.health-t),this.properties.health>this.properties.maxHealth&&(this.properties.health=this.properties.maxHealth),this.human&&(getMemberByName(this.state.groups.hud,"healthText").text=this.properties.health<0?0:this.properties.health),this.properties.health<0&&(this.animateDeath(),!0))},Bots.DroppableRobot.prototype.killedOtherRobot=function(t){this.dealDamage(-this.properties.maxHealth),this.human&&(Bots.killCount+=1),t.human&&(Bots.deathCount+=1),this.killCounter.text=parseInt(this.killCounter.text)+parseInt(t.killCounter.text),this.game.time.events.repeat(50,parseInt(t.killCounter.text),function(){getMemberByName(this.state.groups.spawners,"lootSpawner").spawn(t,this)},this)},Bots.DroppableRobot.prototype.animateDeath=function(){this.isDead=!0,this.game.add.tween(this).to({x:this.x-10},25,Phaser.Easing.Quadratic.InOut,!0,0,5,!0).onComplete.add(function(){getMemberByName(this.state.groups.spawners,"dustSpawner").spawn(this),getMemberByName(this.state.groups.spawners,"explosionSpawner").spawn(this),getMemberByName(this.state.groups.spawners,"earthQuakeSpawner").spawn(this,4),killFromGroup(this.shadow,this.state.groups.shadows),this.game.add.tween(this.scale).to({x:4,y:4},500,Phaser.Easing.Quadratic.Out,!0),this.game.add.tween(this).to({alpha:0},500,Phaser.Easing.Quadratic.Out,!0).onComplete.add(function(){this.trackTimer&&(this.game.time.events.remove(this.trackTimer),this.trackTimer=null),this.checkSurroundingsTimer&&(this.game.time.events.remove(this.checkSurroundingsTimer),this.checkSurroundingsTimer=null),this.jumpTimer&&(this.game.time.events.remove(this.jumpTimer),this.jumpTimer=null),this.meteoritTimer&&(this.game.time.events.remove(this.meteoritTimer),this.meteoritTimer=null),this.smokeTimer&&(this.game.time.events.remove(this.smokeTimer),this.smokeTimer=null),killFromGroup(this.killCounter,this.state.groups.hud),killFromGroup(this.healthBar,this.state.groups.hud),killFromGroup(this.nameText,this.state.groups.hud),killFromGroup(this,this.state.groups.hud),this.human?getMemberByName(this.state.groups.spawners,"robotSpawner").spawn("robot"):this.boss&&getMemberByName(this.state.groups.spawners,"bossRobotSpawner").spawn(!0)},this)},this)},Bots.DroppableRobot.prototype.update=function(t){if(t.speedMultiplier=1,t.body&&(t.game.physics.arcade.overlap(t.weapon.bullets,t.state.groups.chests,this.onBulletChestCollide,null,t),t.game.physics.arcade.overlap(t.weapon.bullets,t.state.groups.robots,this.onBulletRobotCollide,this.onBulletRobotCollideProcess,t),t.game.physics.arcade.overlap(t.state.groups.oil,t.state.groups.robots,this.onOilRobotOverlap,null,t)),t.healthBar&&(t.healthBar.clear(),t.properties.health>0)){var e=65280;t.properties.health<.5*t.properties.maxHealth&&(e=16756224),t.properties.health<.25*t.properties.maxHealth&&(e=16711680),t.healthBar.beginFill(e),t.healthBar.lineStyle(0),t.healthBar.drawRect(t.x-t.width/2+16,t.y+t.height/2+4,(t.width-16)*(t.properties.health/t.properties.maxHealth),4),t.healthBar.endFill(),t.healthBar.lineStyle(1,0,.8),t.healthBar.drawRect(t.x-t.width/2+16,t.y+t.height/2+4,t.width-16,4)}t.killCounter&&(t.killCounter.x=t.x-t.width/2+12,t.killCounter.y=t.y+t.height/2-2),t.nameText&&(t.nameText.x=t.x,t.nameText.y=t.y-t.height/2-4),t.shadow.x=t.x,t.shadow.y=t.y,t.shadow.angle=t.angle},Bots.DroppableRobot.prototype.onBulletChestCollide=function(t,e){t.kill(),getMemberByName(this.state.groups.spawners,"soundSpawner").spawn(e,"plingSound"),e.hit()&&(killFromGroup(e.shadow,this.state.groups.shadows),killFromGroup(e,this.state.groups.chests),getMemberByName(this.state.groups.spawners,"explosionSpawner").spawn(e),getMemberByName(this.state.groups.spawners,"dustSpawner").spawn(e),getMemberByName(this.state.groups.spawners,"earthQuakeSpawner").spawn(this,2),getMemberByName(this.state.groups.spawners,"lootSpawner").spawn(e,this))},Bots.DroppableRobot.prototype.onBulletRobotCollide=function(t,e){e===this||e.isDead||(t.kill(),e.dealDamage(calculateDamage2(this.properties.attack,e.properties.defense))&&(getMemberByName(this.state.groups.spawners,"textSpawner").spawn(this.properties.displayName+" ("+this.killCounter.text+") killed "+e.properties.displayName+" ("+e.killCounter.text+")"),this.killedOtherRobot(e)))},Bots.DroppableRobot.prototype.onOilRobotOverlap=function(t,e){e.speedMultiplier=.5},Bots.DroppableRobot.prototype.onBulletRobotCollideProcess=function(t,e){return e!==this},Bots.DroppableRobot.prototype.fire=function(){this.isDead||this.spawnProtect||this.weapon.fire()},Bots.DroppableRobot.prototype.applySpeedIncrease=function(){this.properties.rotationSpeed=this.properties.speed/17,this.properties.maxSpeed=2.5*this.properties.speed,this.body&&this.body.maxVelocity.setTo(this.boss?100:this.properties.maxSpeed)};