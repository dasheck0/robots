"use strict";var Bots=Bots||{};Bots.EnemyRobotSpawner=function(e,t,n,o){Bots.Spawner.call(this,e,t,n,o)},Bots.EnemyRobotSpawner.prototype=Object.create(Bots.Spawner.prototype),Bots.EnemyRobotSpawner.prototype.constructor=Bots.EnemyRobotSpawner,Bots.EnemyRobotSpawner.prototype.createObject=function(e,t){var n=this.state.game.rnd.integerInRange(90,120);return new Bots.EnemyRobot(this.state,e,t,{group:"robots",key:sample(["robot3Dred","robot3Dblue","robot3Dgreen","robot3Dyellow"]),friction:10,rotationSpeed:10,attack:this.state.game.rnd.integerInRange(30,38),defense:this.state.game.rnd.integerInRange(40,48),speed:this.state.game.rnd.integerInRange(40,60),health:n,maxHealth:n,displayName:getRandomName(),shootRange:this.state.game.rnd.integerInRange(200,300),stopRange:this.state.game.rnd.integerInRange(150,200),accuracy:this.state.game.rnd.realInRange(.75,.98),scaleMultiplier:1})};