"use strict";var Bots=Bots||{};Bots.MessagePrefab=function(t,e,s,i){var a=this;this.messageHeight=36,Phaser.Graphics.call(this,t.game,Bots.screenSize.x/2,100,i.text,i.style),this.state=t,this.name=e,this.properties=i,this.state.prefabs[e]=this,this.game=t.game,this.anchor.setTo(.5),this.fixedToCamera=!0,i.group&&this.state.groups[i.group].add(this),this.beginFill(0,.75),this.drawRect(-Bots.screenSize.x/2,-this.messageHeight/2,Bots.screenSize.x,this.messageHeight),this.endFill(),this.text=this.game.add.text(0,2,i.text,i.style),this.text.anchor.setTo(.5),this.addChild(this.text),this.sprite=this.game.add.sprite(0,0,i.key),this.sprite.anchor.setTo(.5),this.sprite.scale.setTo(i.imageScale.x,i.imageScale.y),this.addChild(this.sprite),this.sprite.x=-this.text.width/2-this.sprite.width/2-8,this.game.time.events.add(2e3,function(){a.game.add.tween(a).to({alpha:0},3e3,Phaser.Easing.Quadratic.Out,!0).onComplete.add(function(){killFromGroup(a,a.state.groups[i.group])},a)},this)},Bots.MessagePrefab.prototype=Object.create(Phaser.Graphics.prototype),Bots.MessagePrefab.prototype.constructor=Bots.MessagePrefab,Bots.MessagePrefab.prototype.autoSize=function(t,e){if(this.defaultFontSize||(this.defaultFontSize=this.fontSize),t>0&&e>0){this.fontSize=64;for(var s=this.fontSize;this.fontSize>4;){if(this.width<t&&this.height<e)return s;this.fontSize=--s}}};