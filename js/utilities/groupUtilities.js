/**
 * Created by s.neidig on 19/07/17.
 */

const getMemberByName = (group, name) => {
    if (!!group && !!name) {
        return group.filter(item => item.name === name).list[0];
    }
}

const getCleanRobotGroup = (group) => {
} 