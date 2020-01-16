import express from 'express'
import authenticationCheckMiddleware from '../middlewares/authenticationCheck'
import {
    getUserById,
    getAll,
    updateUser,
    deleteUser
} from '../mongoose/api/user'
import {deleteAllByAuthorId} from "../mongoose/api/solution";
import {
    checkRightByRoleId,
    checkRightByUserRights,
    getRightsByRoleId,
    getRoleById,
    getRoleByName,
    getUserPriority
} from "../mongoose/api/role"
import rights from '../const/rights'
import groups from '../const/groups'

const router = express.Router();

router.route('/api/users/:userId')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {params: {userId}, user: {roleId}} = req;
        (async () => {
            const user = await getUserById(userId);
            const userPriority = await getUserPriority(user.roleId);
            let canUpdate = await checkRightByRoleId(roleId, groups.User, rights.Update, userPriority);
            let canDelete = await checkRightByRoleId(roleId, groups.User, rights.Delete, userPriority);
            if (canUpdate || canDelete) {
                const role = await getRoleById(user.roleId);
                return res.json({
                    user: {
                        _id: user._id,
                        username: user.username,
                        role: role.name
                    }
                });
            }
            return res.json();
        })()
    })
    .post((req, res) => {
        const {body: {user}, params: {userId}, user: {roleId}} = req;

        (async () => {
            const foundedUser = await getUserById(userId);
            const foundedUserPriority = await getUserPriority(foundedUser.roleId);
            let hasRight = await checkRightByRoleId(roleId, groups.User, rights.Update, foundedUserPriority);
            if (foundedUser && hasRight) {
                if (user.role) {
                    user.roleId = (await getRoleByName(user.role))._id;
                    user.role = undefined;
                }
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
            const foundedUserPriority = await getUserPriority(foundedUser.roleId);
            let hasRight = await checkRightByRoleId(roleId, groups.User, rights.Delete, foundedUserPriority);
            if (foundedUser && hasRight) {
                await deleteAllByAuthorId(foundedUser._id);
                await deleteUser(userId);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    });

router.route('/api/users')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {user: {roleId}} = req;

        (async () => {
            const users = await getAll();
            const userRights = await getRightsByRoleId(roleId);

            let data = [];
            for (let i = 0, l = users.length; i < l; i++) {
                let userPriority = await getUserPriority(users[i].roleId);
                let canUpdate = await checkRightByUserRights(userRights, groups.User, rights.Update, userPriority);
                let canDelete = await checkRightByUserRights(userRights, groups.User, rights.Delete, userPriority);
                if (canUpdate || canDelete) {
                    const role = await getRoleById(users[i].roleId);
                    data.push({
                        _id: users[i]._id,
                        username: users[i].username,
                        role: role.name
                    })
                }
            }
            return res.json({users: data});
        })()
    });

export default router;