export default (groups, group, right, priority) => {
    const foundedGroup = groups.find((g) => g.name === group);
    if (!foundedGroup) return false;
    const userPriority = foundedGroup.rights.find((r) => r.name === right).priority;
    return userPriority >= priority;
}