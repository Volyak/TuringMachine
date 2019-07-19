import mongoose from 'mongoose'
import {SolutionSchema} from "../schemas";

export const Solution = mongoose.model('Solution',SolutionSchema,'solutions');

export const getSolutionById = async (solutionId) => {
    return Solution.findOne({ _id: solutionId }).exec();
};

export const getAll = async () => {
    return Solution.find();
};

export const getAllByTaskId = async (taskId) => {
    return Solution.find({ taskId: taskId});
};

export const getAllByUsername = async (username) => {
    return Solution.find({ username: username});
};

export const addSolution = async (newSolution) => {
    return Solution.create(newSolution);
};

export const updateSolution = async (solutionId, solutionNewState) => {
    await Solution.updateOne({_id: solutionId}, {
        $set: {
            ...solutionNewState
        }
    }).exec();
};

export const deleteSolution = async (solutionId) => {
    return Solution.findByIdAndRemove(solutionId).exec();
};

export const deleteAllByUsername = async (username) => {
    return Solution.deleteMany({ username: username});
};

export const deleteAllByTaskId = async (taskId) => {
    return Solution.deleteMany({ taskId: taskId});
};