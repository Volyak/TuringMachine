import express from 'express'
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";
import {
    checkRightByRoleId,
    checkRightByUserRights,
    getUserPriority,
    getAll,
    getRoleById,
    addRole,
    updateRole,
    deleteRole,
    getRightsByRoleId, getNewRolePriority
} from '../mongoose/api/role'
import {existUsersWithRole} from '../mongoose/api/user'
import rights from '../const/rights'
import groups from "../const/groups";

const router = express.Router();

router.route('/api/roles')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {roleId} = req.user;

        (async () => {
            const roles = await getAll();
            const userRights = await getRightsByRoleId(roleId);

            let data = [];
            for (let i = 0; i < roles.length; i++) {
                let rolePriority = await getUserPriority(roles[i]._id);
                let canUpdate = checkRightByUserRights(userRights, groups.Role, rights.Update, rolePriority);
                let canDelete = checkRightByUserRights(userRights, groups.Role, rights.Delete, rolePriority);
                if (canUpdate || canDelete) {
                    data.push(roles[i]);
                }
            }
            return res.json({roles: data});
        })()
    })
    .post((req, res) => {
        let {body: {newRole}, user: {roleId}} = req;

        let maxRolePriority = 0;
        for (let i = 0, l = newRole.groups.length; i < l; i++) {
            let currentGroupRights = newRole.groups[i].rights;
            for (let j = 0, k = currentGroupRights.length; j < k; j++) {
                if (maxRolePriority < currentGroupRights[j].priority)
                    maxRolePriority = currentGroupRights[j].priority;
            }
        }
        (async () => {
            let hasRight = await checkRightByRoleId(roleId, groups.Role, rights.Add, maxRolePriority);

            if (!hasRight) return res.status(403).end();
            return addRole(newRole)
                .then(() => {
                    res.status(200).end();
                });
        })()
    });

router.route('/api/roles/:roleId')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {params: {roleId}, user: {roleId: userRoleId}} = req;

        (async () => {
            const role = await getRoleById(roleId);
            const rolePriority = await getUserPriority(roleId);
            let canUpdate = await checkRightByRoleId(userRoleId, groups.Role, rights.Update, rolePriority);
            let canDelete = await checkRightByRoleId(userRoleId, groups.Role, rights.Delete, rolePriority);
            if (canDelete || canUpdate)
                return res.json({role});
            return res.status(403).end();
        })()
    })
    .post((req, res) => {
        const {body: {newRole}, params: {roleId}, user: {roleId: userRoleId}} = req;

        (async () => {
            const role = await getRoleById(roleId);
            const rolePriority = await getUserPriority(roleId);
            const newRolePriority = getNewRolePriority(newRole);
            let canUpdateOldRole = await checkRightByRoleId(userRoleId, groups.Role, rights.Update, rolePriority);
            let canCreateNewRole = await checkRightByRoleId(userRoleId, groups.Role, rights.Update, newRolePriority);
            if (role && canUpdateOldRole && canCreateNewRole) {
                await updateRole(roleId, newRole);
                return res.status(200);
            } else {
                return res.status(403).end();
            }
        })()
    })
    .delete((req, res) => {
        const {params: {roleId}, user: {roleId: userRoleId}} = req;
        (async () => {
            const foundedRole = await getRoleById(roleId);
            const foundedRolePriority = await getUserPriority(roleId);
            const hasRight = await checkRightByRoleId(userRoleId, groups.Role, rights.Delete, foundedRolePriority);
            const existUsers = await existUsersWithRole(roleId);
            if (foundedRole && hasRight && !existUsers) {
                await deleteRole(roleId);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    });

export default router;