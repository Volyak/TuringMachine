import express from 'express'
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";
import {
    checkRight,
    getAll,
    getRoleById,
    addRole,
    updateRole,
    deleteRole,
} from '../mongoose/api/role'
import rights from '../const/rights'
import groups from "../const/groups";

const router = express.Router();

router.route('/api/roles')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        return getAll()
            .then((roles, error) => {
                if (error) {
                    return res.status(500).end();
                }
                return res.json({roles});
            })
    })
    .post((req, res) => {
        let {body: {newRole}, user: {role}} = req;

        let maxRolePriority = 0;
        for (let i = 0, l = newRole.groups.length; i < l; i++) {
            let currentGroupRights = newRole.groups[i].rights;
            for (let j = 0, k = currentGroupRights.length; j < k; j++) {
                if (maxRolePriority < currentGroupRights[j].priority)
                    maxRolePriority = currentGroupRights[j].priority;
            }
        }

        let hasRight = checkRight(role, groups.Role, rights.Add, maxRolePriority);
        if (!hasRight) return res.status(403).end();
        return addRole(newRole)
            .then(() => {
                res.status(200).end();
            });
    });

router.route('/api/roles/:roleId')
    .all(authenticationCheckMiddleware)
    .get((req, res) => {
        const {params: {roleId}} = req;

        (async () => {
            const role = await getRoleById(roleId);
            return res.json({role})
        })()
    })
    .post((req, res) => {
        const {body: {newRole}, params: {roleId}, user: {role}} = req;

        (async () => {
            const foundedRole = await getRoleById(roleId);
            let hasRight = await checkRight(role, groups.Role, rights.Update, foundedRole.priority);
            if (foundedRole && hasRight) {
                await updateRole(roleId, newRole);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    })
    .delete((req, res) => {
        const {params: {roleId}, user: {role}} = req;
        (async () => {
            const foundedRole = await getRoleById(roleId);
            let hasRight = await checkRight(role, groups.Role, rights.Delete, foundedRole.priority);
            if (foundedRole && hasRight) {
                await deleteRole(roleId);
                return res.status(200).end();
            } else {
                return res.status(403).end();
            }
        })()
    });

export default router;