"use strict";var Bots=Bots||{};Bots.TrackSpawner=function(t,r,e,o){Bots.Spawner.call(this,t,r,e,o)},Bots.TrackSpawner.prototype=Object.create(Bots.Spawner.prototype),Bots.TrackSpawner.prototype.constructor=Bots.TrackSpawner,Bots.TrackSpawner.prototype.spawn=function(t){var r=new Phaser.Point(t.x,t.y),e=this.pool.getFirstDead();if(e)e.reset(r.x,r.y);else{var o="track_"+this.pool.countLiving(),a=this.createObject(o,r,t);a&&(e=a)}},Bots.TrackSpawner.prototype.createObject=function(t,r,e){if(e){var o={key:"tracks",group:"ground",angle:e.angle,alpha:.5,anchor:{x:.5,y:.5}};return new Bots.Track(this.state,t,r,o)}return null};