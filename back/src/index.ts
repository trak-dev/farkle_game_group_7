import fastify from 'fastify';
import cors from '@fastify/cors'
import { Sequelize } from 'sequelize-typescript'; 
import config from './config';
import user from './models/user.model';
import game from './models/game.model';

const dbuser = config.database.user;
const host = config.database.host;
const database = config.database.name;
const password = config.database.password;
const portdb = config.database.port;
const port = config.port;

const sequelize = new Sequelize(database, dbuser, password, {
  host,
  port: portdb,
  dialect: 'postgres',
  models: [user, game],  
  define: {
    timestamps: false
  },
},
);

const routesWithoutAuth = [
    '/users/login',
    '/users/register',
];

const router = fastify({
    // logger: true
});

router.register(cors, { 
    // put options here
});

router.addHook('onRequest', (request, reply, done) => {
    // no auth needed for some routes
    if (routesWithoutAuth.includes(request.raw.url!)) return done();
    // check auth
    if (request.headers.authorization) {
      // check if token is valid
      if (request.headers.authorization.split(' ')[0] && 'Bearer' === request.headers.authorization.split(' ')[0] && request.headers.authorization.split(' ')[1]) {
        request.headers.authorization = request.headers.authorization.split(' ')[1];
        return done();
      } else {
        console.error('Invalid token');
        reply.status(403).send({error: "Invalid token"});
      }
    } else {
      console.error('No token');
      reply.status(401).send({error: "Please provide a token"});
    }
});

// register the routes

router.register(require('./routes/users.routes'), { prefix: '/users' });
router.register(require('./routes/games.routes'), { prefix: '/games' });

// start the server
router.listen({port}, async (err, address) => {

    if (err) {
      console.error(err);
      process.exit(1);
    }
    
    console.log(`Server listening at ${address}`);
  
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  
});