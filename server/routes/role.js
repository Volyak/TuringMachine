import express from 'express'
import authenticationCheckMiddleware from "../middlewares/authenticationCheck";
import {
    checkRight,
    getAll,
    getRoleById,
    addRole,
    updateRole,
    deleteRole
} from '../mongoose/api/role'
import rights from '../const/rights'
import {getTaskById} from "../mongoose/api/task";

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
        (async () => {
        })()
    })
    .delete((req, res) => {
        (async () => {
        })()
    });

export default router;