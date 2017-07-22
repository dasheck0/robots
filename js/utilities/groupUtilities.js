/**
 * Created by s.neidig on 19/07/17.
 */

const getMemberByName = (group, name) => {
    if (!!group && !!name) {
        return group.filter(item => item.name === name).list[0];
    }
}

const getHumanRobot = (robotsGroup) => {
    return robotsGroup.filter(item => item.human).list[0];
}

const killFromGroup = (item, group) => {
    item.kill();
    item.destroy();
    group.remove(item);
}