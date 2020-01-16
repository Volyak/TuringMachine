import express from 'express'
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";
import {
    getAll,
    getSolutionById,
    getAllByAuthorId,
    getAllByTaskId,
    addSolution,
    updateSolution,
    deleteSolution
} from '../mongoose/api/solution'
import {getTaskById, getTaskNameById, getTaskByIdWithoutTests} from "../mongoose/api/task";
import {checkRightByRoleId, getPriority, getRightsByRoleId, checkRightByUserRights} from "../mongoose/api/role"
import {getUserIdByUsername, getUsernameById} from "../mongoose/api/user"
import runTests from '../utils/runTests'
import formatTable from '../utils/formatTableForDB'
import rights from '../const/rights'
import groups from '../const/groups'

const router = express.Router();

router.route('/api/solutions')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {_id, roleId} = req.user;
        (async () => {
            let solutions = await getAll();
            let userRights = await getRightsByRoleId(roleId);
            let data = [];
            for (let i = 0, l = solutions.length; i < l; i++) {
                let isAuthor = solutions[i].authorId === _id.toString();
                let canUpdate = checkRightByUserRights(userRights, groups.Solution, rights.Update, solutions[i].priority);
                let canDelete = checkRightByUserRights(userRights, groups.Solution, rights.Delete, solutions[i].priority);
                if (canUpdate || canDelete || isAuthor) {
                    const task = await getTaskNameById(solutions[i].taskId);
                    const username = await getUsernameById(solutions[i].authorId);
                    data.push({
                        _id: solutions[i]._id,
                        taskName: task.name,
                        taskId: solutions[i].taskId,
                        username,
                        isDone: solutions[i].isDone,
                        priority: solutions[i].priority
                    })
                }
            }
            return res.json({solutions: data});
        })()
    });

router.route('/api/tasks/:taskId/solutions')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        return getAllByTaskId(req.params.taskId).then((solutions, error) => {
            if (error) {
                return res.status(500).end()
            }
            return res.json({solutions})
        })
    })
    .post((req, res) => {
        const {body: {parcel}, user: {_id, roleId}, params: {taskId}} = req;
        (async () => {
            let hasRight = await checkRightByRoleId(roleId, groups.Solution, rights.Add, 1);
            if (!hasRight)
                return res.status(403).end();
            const task = await getTaskById(taskId);
            const numberOfFailedTest = runTests(task.taskType, parcel, task.tests);
            const priority = await getPriority(roleId, groups.Solution, rights.Add);
            parcel.table = formatTable(parcel, task);
            const addedSolution = await addSolution({
                parcel,
                taskId,
                priority,
                isDone: numberOfFailedTest === 0,
                numberOfFailedTest,
                authorId: _id
            });

            if (addedSolution.isDone) {
                return res.json({isDone: addedSolution.isDone});
            } else {
                return res.json({isDone: addedSolution.isDone, numberOfFailureTest: addedSolution.numberOfFailureTest});
            }
        })()
    });

router.route('/api/solutions/:solutionId')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {params: {solutionId}, user: {_id, roleId}} = req;
        (async () => {
            const solution = await getSolutionById(solutionId);
            let isAuthor = solution.authorId === _id.toString();
            let canUpdate = await checkRightByRoleId(roleId, groups.Solution, rights.Update, solution.priority);
            let canDelete = await checkRightByRoleId(roleId, groups.Solution, rights.Delete, solution.priority);
            if (isAuthor || canUpdate ||canDelete) {
                const username = await getUsernameById(solution.authorId);
                const task = await getTaskByIdWithoutTests(solution.taskId);
                return res.json({solution, task, username});
            }
            return res.status(403).end();
        })()
    })
    .post((req, res) => {
        const {body: {solution}, params: {solutionId}, user: {roleId}} = req;
        (async () => {
            const foundedSolution = await getSolutionById(solutionId);
            let hasRight = await checkRightByRoleId(roleId, groups.Solution, rights.Update, foundedSolution.priority);
            if (foundedSolution && hasRight) {
                await updateSolution(solutionId, solution);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    })
    .delete((req, res) => {
        const {params: {solutionId}, user: {roleId}} = req;

        (async () => {
            const foundedSolution = await getSolutionById(solutionId);
            let hasRight = await checkRightByRoleId(roleId, groups.Solution, rights.Delete, foundedSolution.priority);
            if (foundedSolution && hasRight) {
                await deleteSolution(solutionId);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    });

router.route('/api/users/:userId/solutions')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {user:{roleId}, params: {userId}} = req;
        (async () => {
            let solutions = await getAllByAuthorId(userId);
            let userRights = await getRightsByRoleId(roleId);

            let data = [];
            for (let i = 0, l = solutions.length; i < l; i++) {
                let canUpdate = checkRightByUserRights(userRights, groups.Solution, rights.Update, solutions[i].priority);
                let canDelete = checkRightByUserRights(userRights, groups.Solution, rights.Delete, solutions[i].priority);
                if (canUpdate || canDelete) {
                    const task = await getTaskNameById(solutions[i].taskId);
                    const username = await getUsernameById(solutions[i].authorId);
                    data.push({
                        _id: solutions[i]._id,
                        taskName: task.name,
                        taskId: solutions[i].taskId,
                        username,
                        isDone: solutions[i].isDone,
                        priority: solutions[i].priority
                    })
                }
            }
            return res.json({solutions: data});
        })()
    });

export default router;