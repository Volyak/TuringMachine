import express from 'express'
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";
import {
    getAll,
    getSolutionById,
    getAllByAuthorId,
    getAllByTaskId,
    addSolution,
    updateSolution
} from '../mongoose/api/solution'
import {getUserIdByUsername} from "../mongoose/api/user";
import {getTaskById, getTaskNameById, getTaskByIdWithoutTests} from "../mongoose/api/task";
import runTests from '../utils/runTests'
import formatTable from '../utils/formatTableForDB'

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
                    id: solutions[i]._id,
                    taskName: task.name,
                    taskId: solutions[i].taskId,
                    username: solutions[i].username,
                    isDone: solutions[i].isDone
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
        const {body: {solution}, user: {username}, params: {taskId}} = req;

        (async () => {
            const task = await getTaskById(taskId);
            const numberOfFailedTest = runTests(solution, task.tests);
            const table = formatTable(solution, task.alphabet);

            const addedSolution = await addSolution({
                table,
                taskId,
                username,
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
        const {body: {solution}, params: {solutionId}} = req;
        (async () => {
            const foundSolution = await getSolutionById(solutionId);
            if (foundSolution) {
                await updateSolution(solutionId, solution);
                return res.status(200).end();
            }
            else {
                return res.status(500).end();
            }
        })()
    });

router.route('/api/users/:username/solutions')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {params: {username}} = req;
        (async () => {
            const userId = await getUserIdByUsername(username)
            const solutions = await getAllByAuthorId(userId)
            return res.json({solutions})
        })()
    });

export default router;