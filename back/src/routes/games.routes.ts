import { FastifyInstance } from "fastify";
import Game from '../models/game.model';
import Game_Classe from '../classes/game';

async function gameRoutes(router: FastifyInstance) {
    router.put<{Body: Game}>('/', async (req, reply) => {
        try {
            const { dices_number, max_players } = req.body;
            if (dices_number < 1 || dices_number > 6) throw "Invalid dices number";
            if (max_players < 2) throw "Invalid max players number";
            const gameId = await Game_Classe.createGame(dices_number, max_players);
            reply.status(200).send(gameId);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
      });

      router.get('/', async (req, reply) => {
        try {
            const games = await Game_Classe.getAllGames();
            reply.status(200).send(games);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
      });

      router.get<{Params: {id : string}}>('/:id', async (req, reply) => {
        try {
            const gameId = parseInt(req.params.id);
            const games = await Game_Classe.getById(gameId);
            reply.status(200).send(games);
        } catch (error) {
            console.error(error);
            reply.status(500).send(error);
        }
      });

    
}

module.exports = gameRoutes