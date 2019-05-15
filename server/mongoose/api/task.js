import mongoose from 'mongoose'
import {TaskSchema} from "../schemas";

export const Task = mongoose.model('Task', TaskSchema, 'tasks');

export const getTaskById = async (taskId) => {
    return Task.findOne({_id: taskId}).exec();
};

export const getTaskByIdWithoutTests = async (taskId) => {
    return Task.findOne({_id: taskId}).select("name description alphabet");
};

export const getAllTasksWithoutTests = async () => {
    return Task.find({}).select("_id name description alphabet");
};

export const getTaskNameById = async (taskId) => {
    return Task.findOne({_id: taskId}).select("name");
};

export const getAll = async () => {
    return Task.find({});
};

export const addTask = async (newTask) => {
    return Task.create(newTask);
};

export const updateTask = async (taskId, taskNewState) => {
    await Task.updateOne({_id: taskId}, {
        $set: {
            ...taskNewState
        }
    }).exec();
};

export const deleteTask = async (taskId) => {
    return Task.findByIdAndRemove(taskId).exec();
};