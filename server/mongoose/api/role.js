import mongoose from 'mongoose'
import {RoleSchema} from "../schemas"
import {User} from "./user";
import {Task} from "./task";

export const Role = mongoose.model('Role', RoleSchema, 'roles');

export const checkRight = async (role, group, right, priority) => {
    const groups = (await Role.findOne({name: role}).select("groups")).groups;
    const foundedGroup = await groups.find((g) => g.name === group);
    const foundedRight = await foundedGroup.rights.find((r) => r.name === right);
    return foundedRight.priority >= priority;
};

export  const getAll = async () => {
    return Role.find({});
};

export const getRoleById = async (roleId) => {
    return Role.findOne({_id: roleId}).exec();
};

export const getRightsByRoleName = (roleName) => {
    return Role.findOne({name: roleName}).select("groups");
};

export const getPriority = async (role, group, right) => {
    const groups = (await Role.findOne({name: role}).select("groups")).groups;
    const foundedGroup = await groups.filter((g) => g.name === group)[0];
    const foundedRight = await foundedGroup.rights.filter((r) => r.name === right)[0];
    return foundedRight.priority;
};

export const getUserPriority = async (role) => { //change
    const foundedRole = await Role.findOne({name: role}).select("groups");
    let rights = foundedRole.rights;
    let maxPriority = 0;
    for (let length = rights.length, i = 0; i < length; i++)
        maxPriority = rights[i].priority > maxPriority ? rights[i].priority : maxPriority;
    return maxPriority;
};