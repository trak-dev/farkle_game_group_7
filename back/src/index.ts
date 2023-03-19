import fastify from 'fastify';
import cors from '@fastify/cors'
import { Sequelize } from 'sequelize-typescript'; 
import config from './config';
import user from './models/user.model';
import game from './models/game.model';
import game_status from './models/game_status.model';
import User_Core from './core/user';

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
  models: [user, game, game_status],  
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

// hook to check auth on every request except the ones in routesWithoutAuth
router.addHook('onRequest', async (request, reply) => {
    try {    
      // no auth needed for some routes
      if (routesWithoutAuth.includes(request.raw.url!)) return;
      // check auth
      if (request.headers.authorization) {
        // check if token is valid
        if (request.headers.authorization.split(' ')[0] && 'Bearer' === request.headers.authorization.split(' ')[0] && request.headers.authorization.split(' ')[1]) {
          request.headers.authorization = request.headers.authorization.split(' ')[1];
            const user = await User_Core.getByToken(request.headers.authorization);
        } else {
          console.error('Invalid token');
          reply.status(403).send({error: "Invalid token"});
        }
      }
    } catch (error) {
      console.error(error);
      reply.status(500).send({error});
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