# Robots

This is my contribution to the [2017 Zenva Phaser Hackathon](https://gamedevacademy.org/first-zenva-phaser-hackathon/?a=13). 
The competion is held from July 6th to July 30th 2017 with the goal to create
a game only by using phaser. However there were some rules each contestant 
had to respect. The most notably onews were that only predefined assets 
could be used and that the complete game must not exceed 500 KB of disk space.

## Game

### Installation

To create the games distributin folder you have to setup the build
pipeline. This is as easy as running `npm install` on the projects 
directory. This will install required dependencies (i.e. gulp). Then 
run `gulp transpile minify` to create the `dist` directory, which will
contain the games sources. You can verify that the required space does not
exceed 500 KB by running `gulp calculateSize`. Then open the `index.html`
and the game should start.

### Objective

Robots is a game where you control a robot and try to survive as long as
you can. Other robots will spawn and attack you. But fear not! Dodge 
their bullets and fire your own to destroy them and gain loot and other 
goodies. These will help to upgrade your robot. 

### Features

#### Comprehensive battle system

Your robot has 4 main states, namely attack, defense, speed and health.
Attack and defense are used for damage calculation once your robot is hit. 
The formula is quite complex and tweaked, such that you last at least a few 
hits before you die. Speed controls not only your translation speed but 
also how fast you can rotate. And health is the most important stat you 
need to focus on. Once it drops below zero you are dead. Don't worry!
Your health is replenished after killing an enemy robot.

### Loots

There are several possibilities to gain loot within the game. The most 
obvious one is to open chests by destroying them. Once they are opened
you get a persistent boost of one of your main stats. So do not focus 
that much on killing robots and get some chests too!

### Bosses

Every once in a while there spawns a boss robot. There will be a special 
notification for this event. The boss will be displayed as a red dot on 
the minimap. But be careful the boss has way better stats than any other
robot including yourself (probably). Also the boss has special attacks
like the stun jump and a periodic meteor hail. Each robot will explode
instantaneously upon boss collision. Boss fights are only for the best
of the best. But believe me it is worth it. According to the legend one
will receive its power when a boss dies!

### Environment

The world of Bots is dangerous by itself. But pay attention to your 
surroundings. There are random events, which you should avoid. This can 
randomly placed oil on the road, which will slow you down or even 
meteors dropping from the sky, which will likely kill you instantly. 
Sometimes the earth shatters for no reason, stunning each robot nearby
for a certain time.

## Road map

### Crucial

* Add ~~menu~~, settings, credits, options
* Statistics per TAB Button (With points, ranks, history, etc)

### Important

* Add randomly placed obstacles (destroyable and not destroyable)
* Add mines as secondary weapons and add camera shake for explosion
* Drop loot after killing another robot
* Add more robot ai types (timid, circeling, random) -> https://loonride.com/learn/phaser/slither-io-part-3 ?
* Add sounds
* Add temps special loot (e.g. invincible, super speed, mirror, ...)

### Nice to have

* Animate gaining loots and stat boosts

### Not for hackathon

* Scrolling message window (like a ticker)
* Add more weapon graphics
* Increase size of robot for the minimap based on kill counter
* Add temp stat boosts for special actions
* Add task systems, which give medals and stat boosts
* Add stats for controlling weapon system
* Add randomly placed structures (like a maze/labyrinth)
* Add pause mode in game

### Done

* ~~Add start button in menu~~
* ~~Add bosses (Can jump and stun robots within distance, can drop missiles, yield medals uopn defeat)~~
* ~~Add more crate graphics~~
* ~~Add robot shadows~~
* ~~Kill notification like in CS:GO~~
* ~~Funny names for bots~~
* ~~Draw human robot in another color for the minimap~~
* ~~Respawn player after death~~
* ~~Add support for mobile~~
* ~~Add explosion tweens and scorch marks after killing a robot~~
* ~~Add tracks to robot for the last 100 meters~~


## Used assets

* [Robot pack](http://kenney.nl/assets/robot-pack)
* [Tanks](http://kenney.nl/assets/tanks)
* [Platformer Art Deluxe](http://kenney.nl/assets/platformer-art-deluxe)
* [Hand Painted Texture - Sandstone](https://opengameart.org/content/hand-painted-texture-sandstone)
* [Hand Painted Mountain Texture](https://opengameart.org/content/hand-painted-mountain-texture)
* [Hand Painted Texture - Floor Tile](https://opengameart.org/content/hand-painted-texture-floor-tile)
* [Hand Painted Grass Texture](https://opengameart.org/content/hand-painted-grass-texture)
* [Hand Painted Sand Texture](https://opengameart.org/content/hand-painted-sand-texture-0)
* [95 Game icons](https://opengameart.org/content/95-game-icons)
* [Bomb Explosion Animation](https://opengameart.org/content/bomb-explosion-animation)
* [Smoke Particle Assets](https://opengameart.org/content/smoke-particle-assets)
* [Topdown Tanks](https://kenney.nl/assets/topdown-tanks)
* [Game icons](https://opengameart.org/content/game-icons)
* [Cloud set](https://opengameart.org/content/cloud-set)
* [Onscreen - Controls](http://kenney.nl/assets/onscreen-controls)
* [Sokoban (100+ Tiles)](https://opengameart.org/content/sokoban-100-tiles)
* [LCP Terrain Pack](https://opengameart.org/content/lpc-terrain-repack)
* [Space Shooter Redux](https://opengameart.org/content/space-shooter-redux)
* [FREE UI ASSET PACK 1](https://opengameart.org/content/free-ui-asset-pack-1)
* [2d Lost Garden Zelda style tiles resized to 32x32 with additions](https://opengameart.org/content/2d-lost-garden-zelda-style-tiles-resized-to-32x32-with-additions)

## License

This game is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT)