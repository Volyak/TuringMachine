import express from 'express'
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";
import {
    getAll,
    getSolutionById,
    getAllByUsername,
    getAllByTaskId,
    addSolution,
    updateSolution,
    deleteSolution
} from '../mongoose/api/solution'
import {getTaskById, getTaskNameById, getTaskByIdWithoutTests} from "../mongoose/api/task";
import {checkRight, getPriority} from "../mongoose/api/role"
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
                data.push({
                    _id: solutions[i]._id,
                    taskName: task.name,
                    taskId: solutions[i].taskId,
                    username: solutions[i].username,
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
        const {body: {solution}, user: {username, role}, params: {taskId}} = req;
        (async () => {
            let hasRight = await checkRight(role, groups.Task, rights.SendSolution, 1);
            if (!hasRight)
                return res.status(403).end();


            const task = await getTaskById(taskId);
            const numberOfFailedTest = runTests(solution, task.tests);
            const table = formatTable(solution, task.alphabet);
            const priority = await getPriority(role, "task", "sendSolution");
            const addedSolution = await addSolution({
                table,
                taskId,
                username,
                priority,
                isDone: numberOfFailedTest === 0,
                numberOfFailedTest
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
            const task = await getTaskByIdWithoutTests(solution.taskId);
            return res.json({solution, task});
        })()
    })
    .post((req, res) => {
        const {body: {solution}, params: {solutionId}, user: {role}} = req;
        (async () => {
            const foundedSolution = await getSolutionById(solutionId);
            let hasRight = await checkRight(role, groups.Solution, rights.Update, foundedSolution.priority);
            if (foundedSolution && hasRight) {
                await updateSolution(solutionId, solution);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    })
    .delete((req, res) => {
        const {params: {solutionId}, user: {role}} = req;

        (async () => {
            const foundedSolution = await getSolutionById(solutionId);
            let hasRight = await checkRight(role, groups.Solution, rights.Delete, foundedSolution.priority);
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
            const solutions = await getAllByUsername(username);
            return res.json({solutions})
        })()
    });

export default router;