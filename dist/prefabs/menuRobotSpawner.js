"use strict";var Bots=Bots||{};Bots.MenuRobotSpawner=function(o,e,t,r){Bots.Spawner.call(this,o,e,t,r)},Bots.MenuRobotSpawner.prototype=Object.create(Bots.Spawner.prototype),Bots.MenuRobotSpawner.prototype.constructor=Bots.MenuRobotSpawner,Bots.MenuRobotSpawner.prototype.createObject=function(o,e){return e=new Phaser.Point(randomInteger(2*Bots.screenSize.x)-Bots.screenSize.x/2,randomInteger(2*Bots.screenSize.y)-Bots.screenSize.y/2),new Bots.MenuRobot(this.state,o,e,{group:"robots",key:sample(["robot3Dred","robot3Dblue","robot3Dgreen","robot3Dyellow"]),friction:10,rotationSpeed:10})};