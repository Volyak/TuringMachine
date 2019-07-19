import express from 'express'
import authenticationCheckMiddleware from '../middlewares/authenticationCheck'
import {
    getUserById,
    getAll,
    addUser,
    updateUser,
    deleteUser
} from '../mongoose/api/user'
import {deleteAllByUsername} from "../mongoose/api/solution";
import {checkRight, getUserPriority} from "../mongoose/api/role"
import rights from '../const/rights'
import groups from '../const/groups'

const router = express.Router();

router.route('/api/users/:userId')
.all(authenticationCheckMiddleware)
.get((req,res) => {
    const {params: {userId}} = req;
    return getUserById(userId)
        .then((user, error) => {
            if(error)
                return res.status(500).end();
            return res.json({user});
        })
})
.post((req,res) => {
    const {body: {user}, params: {userId}, user: {role}} = req;

    (async () => {
        const foundedUser = await getUserById(userId);
        const foundedUserPriority = await getUserPriority(foundedUser.role);
        let hasRight = await checkRight(role, groups.User, rights.Update, foundedUserPriority);
        if (foundedUser && hasRight) {
            await updateUser(userId, user);
            return res.status(200).end();
        } else {
            return res.status(403).end();
        }
    })()
})
.delete((req,res) => {
    const {params: {userId}, user: {role}} = req;

    (async () => {
        const foundedUser = await getUserById(userId);
        const foundedUserPriority = await getUserPriority(foundedUser.role);
        let hasRight = await checkRight(role, groups.User, rights.Delete, foundedUserPriority);
        if (foundedUser && hasRight) {
            await deleteAllByUsername(foundedUser.username);
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
        return getAll()
            .then((users, error) => {
                if (error) {
                    return res.status(500).end();
                }
                return res.json({users});
            })
    });

export default router;