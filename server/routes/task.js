import express from 'express'
import authenticationCheckMiddleware from '../middlewares/authenticationCheck'
import {
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    getAll
} from '../mongoose/api/task'
import {checkRight, getPriority} from "../mongoose/api/role"
import rights from '../const/rights'
import groups from '../const/groups'

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
        const {body: {task}, params: {taskId}, user: {role}} = req;
        (async () => {
            const foundedTask = await getTaskById(taskId);
            if (foundedTask && checkRight(role, groups.Task, rights.Update, foundedTask.priority)) {
                await updateTask(taskId, task);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    })
    .delete((req, res) => {
        const {params: {taskId}, user:{role}} = req;
        (async () => {
            const foundedTask = await getTaskById(taskId);
            if(foundedTask && checkRight(role, groups.Task, rights.Delete, foundedTask.priority)) {
                await deleteTask(taskId);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
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
        let {body: {task}, user: {role}} = req;

        let hasRight = checkRight(role, groups.Task, rights.Add, 1);
        if (!hasRight) return res.status(403).end();
        task.priority = getPriority(role, groups.Task, rights.Add);
        return addTask(task)
            .then(() => {
                res.status(200).end();
            });
    });

export default router;