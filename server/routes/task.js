import express from 'express'
import authenticationCheckMiddleware from '../middlewares/authenticationCheck'
import {
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    getAll
} from '../mongoose/api/task'

const router = express.Router();

router.route('/api/tasks/:taskId')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {params: {taskId}} = req;
        (async () => {
            const task = await getTaskById(taskId);
            return res.json({task})
        })()
    })
    .post((req, res) => {
        const {body: {task}, params: {taskId}} = req;
        (async () => {
            const foundTask = await getTaskById(taskId);
            if (foundTask) {
                await updateTask(taskId, task);
                return res.status(200).end();
            } else {
                return res.status(422).end();
            }
        })()
    })
    .delete((req, res) => {
        return deleteTask(req.params.taskId)
            .then(() => {
                return res.status(200).end();
            })
    });

router.route('/api/tasks')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        return getAll()
            .then((tasks, error) => {
            if (error) {
                return res.status(500).end();
            }
            return res.json({tasks});
        })
    })
    .post((req, res) => {
    let { body: {task}} = req;

    return addTask(task)
        .then(() => {
            res.status(200).end();
        });
});

/*router.route('')
    .get()
    .post()
    */
export default router;