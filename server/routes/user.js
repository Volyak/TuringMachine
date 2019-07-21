import express from 'express'
import authenticationCheckMiddleware from '../middlewares/authenticationCheck'
import {
    getUserById,
    getAll,
    updateUser,
} from '../mongoose/api/user'
import {deleteAllByAuthorId} from "../mongoose/api/solution";
import {checkRight, getRoleById, getUserPriority} from "../mongoose/api/role"
import rights from '../const/rights'
import groups from '../const/groups'

const router = express.Router();

router.route('/api/users/:userId')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {params: {userId}} = req;
        (async () => {
            const user = await getUserById(userId);
            const role = await getRoleById(user.roleId);
            return res.json({user: {
                _id: user._id,
                username: user.username,
                role: role.name
            }});
        })()
    })
    .post((req, res) => {
        const {body: {user}, params: {userId}, user: {roleId}} = req;

        (async () => {
            const foundedUser = await getUserById(userId);
            const foundedUserPriority = await getUserPriority(foundedUser.role);
            let hasRight = await checkRight(roleId, groups.User, rights.Update, foundedUserPriority);
            if (foundedUser && hasRight) {
                await updateUser(userId, user);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    })
    .delete((req, res) => {
        const {params: {userId}, user: {roleId}} = req;

        (async () => {
            const foundedUser = await getUserById(userId);
            const foundedUserPriority = await getUserPriority(foundedUser.role);
            let hasRight = await checkRight(roleId, groups.User, rights.Delete, foundedUserPriority);
            if (foundedUser && hasRight) {
                await deleteAllByAuthorId(foundedUser._id);
                //await deleteUser(userId);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    });

router.route('/api/users')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        (async () => {
            const users = await getAll();

            let data = [];
            for (let i = 0, l = users.length; i < l; i++) {
                const role = await getRoleById(users[i].roleId);
                data.push({
                    _id: users[i]._id,
                    username: users[i].username,
                    role: role.name
                })
            }
            return res.json({users: data});
        })()
    });

export default router;