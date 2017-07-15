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

## Used assets

* [Robot pack](http://kenney.nl/assets/robot-pack)
* [Tanks](http://kenney.nl/assets/tanks)
* [Platformer Art Deluxe](http://kenney.nl/assets/platformer-art-deluxe)

## License

This game is available as open source under the termns of the [MIT License](https://opensource.org/licenses/MIT)