"use strict";var Bots=Bots||{};Bots.Button=function(t,s,o,e){Bots.Prefab.call(this,t,s,o,e),this.fixedToCamera=!0,this.inputEnabled=!0,this.input.priorityId=999,this.input.useHandCursor=!0,this.events.onInputDown.add(this.onButtonPressed,this),this.events.onInputUp.add(this.onButtonReleased,this),this.shadow=this.game.add.sprite(this.x,this.y+2,this.properties.key),this.shadow.tint=0,this.shadow.anchor.setTo(.5),this.shadow.fixedToCamera=!0,this.state.groups.hud.addAt(this.shadow,0)},Bots.Button.prototype=Object.create(Bots.Prefab.prototype),Bots.Button.prototype.constructor=Bots.Button,Bots.Button.prototype.onButtonPressed=function(){this.game.paused&&!this.properties.force||(this.scale.setTo(1.1),this.shadow.scale.setTo(1.1))},Bots.Button.prototype.onButtonReleased=function(){this.game.paused&&!this.properties.force||(this.scale.setTo(1),this.shadow.scale.setTo(1),Bots.soundsEnabled&&this.state.prefabs.clickSound.safelyPlay(),this.state.onButtonPressed(this))};