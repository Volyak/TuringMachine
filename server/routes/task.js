import express from 'express'
import authenticationCheckMiddleware from '../middlewares/authenticationCheck'
import {
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    getAll
} from '../mongoose/api/task'
import {deleteAllByTaskId} from "../mongoose/api/solution"
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
        const {body: {task}, params: {taskId}, user: {roleId}} = req;
        (async () => {
            const foundedTask = await getTaskById(taskId);
            let hasRight = await checkRight(roleId, groups.Task, rights.Update, foundedTask.priority);
            if (foundedTask && hasRight) {
                await updateTask(taskId, task);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    })
    .delete((req, res) => {
        const {params: {taskId}, user: {roleId}} = req;
        (async () => {
            const foundedTask = await getTaskById(taskId);
            let hasRight = await checkRight(roleId, groups.Task, rights.Delete, foundedTask.priority);
            if (foundedTask && hasRight) {
                await deleteAllByTaskId(taskId);
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
            }).catch(function () {
                console.log("Promise Rejected");
            });
    })
    .post((req, res) => {
        let {body: {task}, user: {roleId, _id}} = req;
        (async () => {
            console.log(1);
            let hasRight = await checkRight(roleId, groups.Task, rights.Add, 1);
            console.log(2);
            if (!hasRight) return res.status(403).end();
            console.log(3);
            task.priority = await getPriority(roleId, groups.Task, rights.Add);
            task.authorId = _id;
            console.log(4);
            return addTask(task)
                .then(() => {
                    res.status(200).end();
                });
        })()
    });

export default router;