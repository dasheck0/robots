"use strict";var Bots=Bots||{};Bots.MenuRobot=function(t,s,e,i){Bots.Prefab.call(this,t,s,e,i),this.anchor.setTo(.5),this.scale.setTo(Bots.scale),this.currentDestination=null,this.game.physics.enable(this,Phaser.Physics.ARCADE),this.body.maxVelocity.setTo(100),this.currentSpeed=this.game.rnd.integerInRange(50,100),this.body.mass=1,this.speedMultiplier=1,this.shadow=this.game.add.sprite(this.x,this.y,i.key),this.shadow.scale.x=1.2*this.scale.x,this.shadow.scale.y=1.2*this.scale.y,this.shadow.alpha=.25,this.shadow.anchor.setTo(.5),this.shadow.tint=0,this.shadow.name=s+"_shadow",this.state.groups.shadows.add(this.shadow)},Bots.MenuRobot.prototype=Object.create(Bots.Prefab.prototype),Bots.MenuRobot.prototype.constructor=Bots.MenuRobot,Bots.MenuRobot.prototype.reset=function(t,s){Bots.Prefab.prototype.reset.call(this,t,s)},Bots.MenuRobot.prototype.update=function(){this.speedMultiplier=1,this.shadow.x=this.x,this.shadow.y=this.y,this.shadow.angle=this.angle,(!this.currentDestination||this.game.physics.arcade.distanceToXY(this,this.currentDestination.x,this.currentDestination.y)<=50)&&(this.currentDestination=new Phaser.Point(randomInteger(2*Bots.screenSize.x)-Bots.screenSize.x/2,randomInteger(2*Bots.screenSize.y)-Bots.screenSize.y/2)),this.currentDestination&&(this.rotation=this.game.physics.arcade.angleToXY(this,this.currentDestination.x,this.currentDestination.y,!0),this.game.physics.arcade.moveToObject(this,this.currentDestination,this.currentSpeed))};