import { Express } from 'express';
import 'express-async-errors';
import users from '../routes/users';
import auth from '../routes/auth';
import home from '../routes/home';
import error from '../middleware/error';

const createRoutes = (app: Express) => {
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/', home);
    app.use(error);
};

export default createRoutes;