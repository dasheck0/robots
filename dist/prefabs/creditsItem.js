"use strict";var Bots=Bots||{};Bots.CreditsItem=function(t,i,s,e){var h=this;Bots.Prefab.call(this,t,i,s,e);this.graphics=this.game.add.graphics(0,0),this.addChild(this.graphics),this.sprite=this.game.add.sprite(0,0,e.dummyKey),this.sprite.anchor.setTo(.5);var r=.4*this.properties.size.width/this.sprite.width,o=.4*this.properties.size.height/this.sprite.height;this.sprite.scale.setTo(r<o?r:o),this.sprite.x=-this.properties.size.width/2+this.sprite.width/2+8,this.addChild(this.sprite),this.caption=this.game.add.text(this.sprite.x+this.sprite.width/2+8,this.sprite.y-this.sprite.height/2,shortenName(e.title,15),this.captionTextStyle()),this.addChild(this.caption),this.author=this.game.add.text(this.sprite.x+this.sprite.width/2+8,this.sprite.y-this.sprite.height/2+16,"by "+shortenName(e.author,12),this.regularTextStyle()),this.addChild(this.author),this.linkIcon=this.game.add.sprite(this.properties.size.width/2-8,this.properties.size.height/2-8,"uiLink"),this.linkIcon.anchor.setTo(1),this.addChild(this.linkIcon),this.linkIcon.inputEnabled=!0,this.linkIcon.events.onInputUp.add(function(){if(h.game.device.iPad)location.href=e.link;else{var t=window.open(e.link,"_blank");t?t.focus():location.href=e.link}},this)},Bots.CreditsItem.prototype=Object.create(Bots.Prefab.prototype),Bots.CreditsItem.prototype.constructor=Bots.CreditsItem,Bots.CreditsItem.prototype.update=function(){this.graphics.clear(),this.graphics.beginFill(0,.5),this.graphics.drawRect(-this.properties.size.width/2,-this.properties.size.height/2,this.properties.size.width,this.properties.size.height),this.graphics.endFill()},Bots.CreditsItem.prototype.captionTextStyle=function(){return{font:"10pt bold Helvetica, sans-serif",fill:"#ffffff",align:"left"}},Bots.CreditsItem.prototype.regularTextStyle=function(){return{font:(arguments.length>0&&void 0!==arguments[0]?arguments[0]:8)+"pt Helvetica, sans-serif",fill:"#ffffff",align:"left"}};