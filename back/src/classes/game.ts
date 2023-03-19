import Game from '../models/game.model';
import Game_Core from '../core/game';


export default class Game_Classe {
    
    static async createGame(dices_number: number, max_players: number) {
        try {
            const newGame = new Game({
                dices_number,
                max_players,
                current_status: "waiting"
            });
            const newGameId = await Game_Core.createGame(newGame);
            return newGameId;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllGames() {
        try {
            const games = await Game_Core.getAllGames();
            return games;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getById(gameId: number) {
        try {
            const game = await Game_Core.getGameById(gameId);
            return game;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}