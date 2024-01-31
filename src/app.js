import express from 'express';
import morgan from 'morgan'

import pkg from '../package.json'
import {createRoles} from './libs/initialSetup.js'
import productsRoute from './routes/products.routes.js'
import authRoute from './routes/auth.routes.js'
import usersRoute from './routes/users.routes.js'

const app = express();
createRoles();

app.set('pkg', pkg);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/products', productsRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute)

export default app;