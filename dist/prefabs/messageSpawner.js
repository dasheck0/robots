"use strict";var Bots=Bots||{};Bots.MessageSpawner=function(e,t,s,o){Bots.Spawner.call(this,e,t,s,o)},Bots.MessageSpawner.prototype=Object.create(Bots.Spawner.prototype),Bots.MessageSpawner.prototype.constructor=Bots.MessageSpawner,Bots.MessageSpawner.prototype.spawn=function(e,t){var s="textPrefab_"+this.pool.countLiving();this.createObject(s,e,t)},Bots.MessageSpawner.prototype.createObject=function(e,t,s){return new Bots.MessagePrefab(this.state,e,new Phaser.Point(0,0),{group:this.properties.pool,text:t,key:s,style:{font:"12pt Arial",fill:"#ffffff",align:"left"},imageScale:{x:.75,y:.75}})};