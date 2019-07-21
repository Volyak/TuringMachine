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

export const getAllByAuthorId = async (authorId) => {
    return Solution.find({ authorId: authorId});
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

export const deleteAllByAuthorId = async (authorId) => {
    return Solution.deleteMany({ authorId: authorId});
};

export const deleteAllByTaskId = async (taskId) => {
    return Solution.deleteMany({ taskId: taskId});
};