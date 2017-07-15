/**
 * Created by s.neidig on 15/07/17.
 */

var Template = Template || {};

Template.ChestSpawner = function (state, name, position, properties) {
    Template.Spawner.call(this, state, name, position, properties);
};

Template.ChestSpawner.prototype = Object.create(Template.Spawner.prototype);
Template.ChestSpawner.prototype.constructor = Template.ChestSpawner;

Template.ChestSpawner.prototype.createObject = function (name, position) {
    return new Template.Chest(this.state, name, position, {
        "group": "chests",
        "key": "crateWood"
    });
}