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
import {checkRightByRoleId, getPriority, getRightsByRoleId, checkRightByUserRights} from "../mongoose/api/role"
import rights from '../const/rights'
import groups from '../const/groups'

const router = express.Router();

router.route('/api/tasks/:taskId')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {params: {taskId}, user: {roleId}} = req;

        (async () => {
            const task = await getTaskById(taskId);

            let hasAddSolutionRight = await checkRightByRoleId(roleId, groups.Solution, rights.Add, 1);
            if (hasAddSolutionRight)
                return res.json({task});

            let canUpdateTask = await checkRightByRoleId(roleId, groups.Task, rights.Update, task.priority);
            let canDeleteTask = await checkRightByRoleId(roleId, groups.Task, rights.Delete, task.priority);
            if (canUpdateTask || canDeleteTask)
                return res.json({task});

            return res.status(403).end();
        })()
    })
    .post((req, res) => {
        const {body: {task}, params: {taskId}, user: {roleId}} = req;
        (async () => {
            const foundedTask = await getTaskById(taskId);
            let hasRight = await checkRightByRoleId(roleId, groups.Task, rights.Update, foundedTask.priority);
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
            let hasRight = await checkRightByRoleId(roleId, groups.Task, rights.Delete, foundedTask.priority);
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
        const {roleId} = req.user;
        (async () => {
            const tasks = await getAll();
            const userRights = await getRightsByRoleId(roleId);

            const hasAddSolutionRight =  checkRightByUserRights(userRights, groups.Solution, rights.Add, 1);
            if (hasAddSolutionRight)
                return res.json({tasks});

            let data = [];
            for (let i = 0; i < tasks.length; i++) {
                let canUpdate = checkRightByUserRights(userRights, groups.Task, rights.Update, tasks[i].priority);
                let canDelete = checkRightByUserRights(userRights, groups.Task, rights.Delete, tasks[i].priority);
                if (canUpdate || canDelete)
                    data.push(tasks[i]);
            }
            return res.json({tasks: data});
        })()
    })
    .post((req, res) => {
        let {body: {task}, user: {roleId, _id}} = req;
        (async () => {
            let hasRight = await checkRightByRoleId(roleId, groups.Task, rights.Add, 1);
            if (!hasRight) return res.status(403).end();
            task.priority = await getPriority(roleId, groups.Task, rights.Add);
            task.authorId = _id;

            return addTask(task)
                .then(() => {
                    res.status(200).end();
                });
        })()
    });

export default router;