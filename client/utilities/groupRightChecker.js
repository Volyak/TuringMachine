import groups from "../const/groups";
import rights from "../const/rights";

export default (group, userGroups) => {
    switch (group) {
        case groups.Task:
            return check(group, userGroups) || rightCheck(groups.Solution, rights.Add, userGroups);
        case groups.Solution:
            return rightCheck(groups.Solution, rights.Update, userGroups) ||
                rightCheck(groups.Solution, rights.Delete, userGroups);
        default:
            return check(group, userGroups);
    }
}

function check(group, userGroups) {
    let result = false;

    const userRights = userGroups.find(({name}) => name === group).rights;
    result = userRights.find(({name}) => name === rights.Add).priority > 0 ||
        userRights.find(({name}) => name === rights.Update).priority > 0 ||
        userRights.find(({name}) => name === rights.Delete).priority > 0;
    return result;
}

function rightCheck(group, right, userGroups) {
    let result = false;

    const userRights = userGroups.find(({name}) => name === group).rights;
    result = userRights.find(({name}) => name === right).priority > 0;
    return result;
}