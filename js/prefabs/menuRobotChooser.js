/**
 * Created by s.neidig on 22/07/17.
 */

let Bots = Bots || {};

Bots.MenuRobotChooser = function (state, name, position, properties) {
    Bots.Prefab.call(this, state, name, position, properties);

    this.index = 0;
    this.robots = [];
    properties.robots.forEach((name, index) => {
        const robot = getMemberByName(this.state.groups[properties.pool], name)
        if (robot) {
            this.robots.push(robot);

            robot.alpha = 0;
            robot.x = position.x;
            robot.y = position.y;

            console.log("fjknsd", `${name}Text`);

            const text = getMemberByName(this.state.groups.robotTexts, `${name}Text`);
            console.log("tet", text);
            if (text) {
                console.log("Adding it");
                robot.addChild(text);
            }
        }
    });
}

Bots.MenuRobotChooser.prototype = Object.create(Bots.Prefab.prototype);
Bots.MenuRobotChooser.prototype.constructor = Bots.MenuRobotChooser;

Bots.MenuRobotChooser.prototype.showNext = function () {
    this.index = mod(this.index + 1, this.robots.length)
    this.showRobot(this.index, true);
}

Bots.MenuRobotChooser.prototype.showPrevious = function () {
    this.index = mod(this.index - 1, this.robots.length)
    this.showRobot(this.index, false);
}

Bots.MenuRobotChooser.prototype.showRobot = function (index, forward) {
    const currentIndex = mod(index, this.robots.length);
    const lastIndex = mod(index + (forward ? -1 : 1), this.robots.length);

    this.robots[lastIndex].x = Bots.screenSize.x / 2;
    this.robots[lastIndex].alpha = 1;
    this.game.add.tween(this.robots[lastIndex])
        .to({ alpha: 0, x: this.robots[lastIndex].x + (forward ? 100 : -100 ) }, 500, Phaser.Easing.Quintic.Out, true);

    this.robots[currentIndex].x = Bots.screenSize.x / 2 + (forward ? -100 : 100);
    this.robots[currentIndex].alpha = 0;
    this.game.add.tween(this.robots[currentIndex])
        .to({
            alpha: 1,
            x: this.robots[currentIndex].x + (forward ? 100 : -100 )
        }, 500, Phaser.Easing.Quintic.Out, true);
}

Bots.MenuRobotChooser.prototype.chooseRobot = function (animationDuration) {
    this.game.add.tween(this.robots[this.index])
        .to({ alpha: 0.5, x: Bots.screenSize.x * 1.5 }, animationDuration, Phaser.Easing.Quintic.Out, true);
}

Bots.MenuRobotChooser.prototype.getChosenRobot = function () {
    return this.robots[this.index];
}