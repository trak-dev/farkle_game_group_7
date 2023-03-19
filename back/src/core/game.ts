import Game from '../models/game.model';

export default class Game_Core {
    static async createGame(game: Game) {
        try {
            const newGame = await game.save();
            return newGame.id as number;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllGames() {
        try {
            const games = await Game.findAll();
            if (!games) throw "No games found";
            return games;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getGameById(gameId: number) {
        try {
            const game = await Game.findByPk(gameId);
            if (!game) throw "Game not found";
            return game;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}