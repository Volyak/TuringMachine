import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import template from './template'
import {serverConfig} from './config/serverConfig'
import {connect} from './mongoose'
import expressSession  from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import { User } from './mongoose/api/user'

import authorizationRouter from './routes/authorization'
import taskRouter from './routes/task'
import solutionRouter from './routes/solution'
import userRouter from './routes/user'
import roleRouter from './routes/role'
const app = express();

app.set('port', serverConfig.port);
app.set('view endine', 'ejs');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(expressSession({ secret: serverConfig.authorization.sessionSecret, resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authorizationRouter);
app.use(taskRouter);
app.use(solutionRouter);
app.use(userRouter);
app.use(roleRouter);

app.get('/*', (req, res) => {
    res.send(template({
        assetsRoot: serverConfig.assetsRoot,
        username: req.isAuthenticated() ? req.user.username : ''
    }))
});

connect();

app.listen(app.get('port'), () => {
    console.log('TuringMachine server is listening on port', app.get('port'))
});