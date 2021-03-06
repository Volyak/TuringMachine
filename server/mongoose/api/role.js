import mongoose from 'mongoose'
import {RoleSchema} from "../schemas"

export const Role = mongoose.model('Role', RoleSchema, 'roles');

export const checkRightByRoleId = async (roleId, group, right, priority) => {
    const groups = (await Role.findOne({_id: roleId}).select("groups")).groups;
    const foundedGroup = groups.find((g) => g.name === group);
    const foundedRight = foundedGroup.rights.find((r) => r.name === right);
    return (foundedRight.priority > 0) && (foundedRight.priority >= priority);
};

export const checkRightByUserRights = (groupsOfRights, group, right, priority) => {
    let groupRights;
    for (let i = 0; i < groupsOfRights.length; i++)
        if (groupsOfRights[i].name === group) {
            groupRights = groupsOfRights[i].rights;
        }
    if (!groupRights)
        return false;

    let foundedRight;
    for (let i = 0; i < groupRights.length; i++)
        if (groupRights[i].name === right) {
            foundedRight = groupRights[i];
        }
    if (!foundedRight)
        return false;

    return (foundedRight.priority > 0) && (foundedRight.priority >= priority);
};
export const getAll = async () => {
    return Role.find({});
};

export const getRoleById = async (roleId) => {
    return Role.findOne({_id: roleId}).exec();
};

export const getRoleByName = async (name) => {
    return Role.findOne({name}).exec();
};

export const addRole = async (newRole) => {
    return Role.create(newRole);
};

export const updateRole = async (roleId, roleNewState) => {
    await Role.updateOne({_id: roleId}, {
        $set: {
            ...roleNewState
        }
    }).exec();
};

export const deleteRole = async (roleId) => {
    return Role.findByIdAndRemove(roleId).exec();
};

export const getRightsByRoleId = async (roleId) => {
    return (await Role.findOne({_id: roleId}).select("groups")).groups;

};

export const getPriority = async (roleId, group, right) => {
    const groups = (await Role.findOne({_id: roleId}).select("groups")).groups;
    const foundedGroup = groups.filter((g) => g.name === group)[0];
    const foundedRight = foundedGroup.rights.filter((r) => r.name === right)[0];
    return foundedRight.priority;
};

export const getUserPriority = async (roleId) => {
    const groups = (await Role.findOne({_id: roleId}).select("groups")).groups;
    let maxPriority = 0;
    for (let l = groups.length, i = 0; i < l; i++) {
        let rights = groups[i].rights;
        for (let k = rights.length, j = 0; j < k; j++)
            maxPriority = rights[j].priority > maxPriority ? rights[j].priority : maxPriority;
    }
    return maxPriority;
};

export const getNewRolePriority = (newRole) => {
    let maxPriority = 0;
    const groups = newRole.groups;
    for (let i = 0; i < groups.length; i++) {
        let rights = groups[i].rights;
        for(let j = 0; j< rights.length; j++){
            maxPriority = rights[j].priority > maxPriority ? rights[j].priority : maxPriority;
        }
    }
    return maxPriority;
};