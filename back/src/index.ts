import express from 'express';
import { Sequelize } from 'sequelize';
const app = express();
import config from './config';
import userRoutes from './routes/users.routes';


const dbuser = config.database.user;
const host = config.database.host;
const database = config.database.name;
const password = config.database.password;
const portdb = config.database.port;
const port = config.port;

const sequelize = new Sequelize(database, dbuser, password, {
    host: host,
    dialect: 'postgres',
    port: portdb,
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// create a middleware to parse the request body    

app.listen(port, async() => {
  return console.log(`Express is listening at http://localhost:${port}`);
});