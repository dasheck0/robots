"use strict";var Bots=Bots||{};Bots.SelectableSprite=function(t,e,i,s){var h=this;Bots.Prefab.call(this,t,e,i,s),this.isSelected=!1,this.frameGraphic=this.game.add.graphics(0,0),this.addChild(this.frameGraphic),this.inputEnabled=!0,this.events.onInputUp.add(function(){h.game.paused&&!h.properties.force||(Bots.soundsEnabled&&h.state.prefabs.clickSound.safelyPlay(),h.isSelected=!0,s.parent.onTileSelected(h))},this),this.game.physics.enable(this,Phaser.Physics.ARCADE),this.properties.shadow&&(this.shadowGraphic=this.game.add.graphics(0,0),this.state.groups[s.group].addAt(this.shadowGraphic,0))},Bots.SelectableSprite.prototype=Object.create(Bots.Prefab.prototype),Bots.SelectableSprite.prototype.constructor=Bots.SelectableSprite,Bots.SelectableSprite.prototype.update=function(){this.frameGraphic.clear(),this.properties.shadow&&(this.shadowGraphic.clear(),this.shadowGraphic.beginFill(0),this.shadowGraphic.drawRect(this.x-this.width*this.scale.x+2,this.y-this.height*this.scale.y+2,this.width,this.height),this.shadowGraphic.endFill()),this.frameGraphic.lineStyle(1,0,1),this.frameGraphic.beginFill(0,this.isSelected?0:.25),this.frameGraphic.drawRect(-this.width/2/this.scale.x,-this.height/2/this.scale.y,this.width/this.scale.x,this.height/this.scale.y),this.frameGraphic.endFill()};