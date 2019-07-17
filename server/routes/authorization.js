import express from 'express'
import {updateUser, User} from '../mongoose/api/user'
import {getRightsByRoleName} from '../mongoose/api/role'
import passport from 'passport'
import {serverConfig} from '../config/serverConfig'
import rights from "../const/rights";

const router = express.Router();

router.route('/signin')
    .get((req, res) => {
        const {user} = req;
        if (req.isAuthenticated()) {
            return getRightsByRoleName(user.role)
                .then(rights => {
                    return res.json({_id: user._id, username: user.username, role: user.role, groups: rights.groups});
                })
        }
        return res.json()
    })
    .post((req, res) => {
        const allowedLogins = serverConfig.authorization.allowedLogins;
        if (allowedLogins && allowedLogins.length > 0 && !allowedLogins.includes(req.body.username)) {
            return res.status(403).end()
        }
        return User.findOne({username: req.body.username}, (error, user) => {
            if (error) {
                return res.status(500).end()
            }
            if (user) {
                return getRightsByRoleName(user.role)
                    .then(rights => {
                        passport.authenticate('local')(req, res, () => {
                            return res.json({_id: user._id, username: user.username, role: user.role, groups: rights.groups});
                        })
                    })
            } else {
                return res.status(422).end();
            }
        })
    });

router.route('/signup')
    .post((req, res) => {
        const {username, password} = req.body;
        const role = 'student';

        return User.findOne({username}, (error, user) => {
            if (error) {
                return res.status(422).end()
            }
            if (!user) {

                User.register(new User({username}), password, (error) => {
                    if (error) {
                        return res.status(500).end()
                    }
                    User.findOne({username}, (error, createdUser) => {
                        if (error) {
                            return res.status(500).end()
                        }
                        if (createdUser) {
                            updateUser(createdUser._id, {role})
                        }
                    });
                    passport.authenticate('local')(req, res, () => {
                        res.json({username, role});
                    })
                })
            }
            else {
                return res.status(422).end();
            }
        })
    });

router.route('/signout')
    .get((req, res) => {
        req.logout();
        return req.session.destroy(() => {
            return res.status(200).end();
        })
    });

export default router