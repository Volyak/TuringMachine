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
import {checkRight, getPriority} from "../mongoose/api/role"
import {getUserIdByUsername, getUsernameById} from "../mongoose/api/user"
import runTests from '../utils/runTests'
import formatTable from '../utils/formatTableForDB'
import rights from '../const/rights'
import groups from '../const/groups'

const router = express.Router();

router.route('/api/solutions')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        (async () => {
            let solutions = await getAll();
            let data = [];
            for (let i = 0, l = solutions.length; i < l; i++) {
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
        const {body: {solution}, user: {_id, roleId}, params: {taskId}} = req;
        (async () => {
            let hasRight = await checkRight(roleId, groups.Solution, rights.Add, 1);
            if (!hasRight)
                return res.status(403).end();

            const task = await getTaskById(taskId);
            const numberOfFailedTest = runTests(task.type, solution, task.tests);
            const table = formatTable(solution, task.alphabet);
            const priority = await getPriority(roleId, groups.Solution, rights.Add);
            const addedSolution = await addSolution({
                table,
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
        const {params: {solutionId}} = req;
        (async () => {
            const solution = await getSolutionById(solutionId);
            const username = await getUsernameById(solution.authorId);
            const task = await getTaskByIdWithoutTests(solution.taskId);
            return res.json({solution, task, username});
        })()
    })
    .post((req, res) => {
        const {body: {solution}, params: {solutionId}, user: {roleId}} = req;
        (async () => {
            const foundedSolution = await getSolutionById(solutionId);
            let hasRight = await checkRight(roleId, groups.Solution, rights.Update, foundedSolution.priority);
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
            let hasRight = await checkRight(roleId, groups.Solution, rights.Delete, foundedSolution.priority);
            if (foundedSolution && hasRight) {
                await deleteSolution(solutionId);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    });

router.route('/api/users/:username/solutions')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {params: {username}} = req;
        (async () => {
            const id = await getUserIdByUsername(username);
            const solutions = await getAllByAuthorId(id);
            return res.json({solutions})
        })()
    });

export default router;