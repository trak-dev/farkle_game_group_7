import Game from '../models/game.model';
import Game_Core from '../core/game';
import User_Core from '../core/user';


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

    static async joinGame(gameId: number, userToken: string) {
        try {
            const user = await User_Core.getByToken(userToken);
            if (!user) throw "User not found";
            const game = await Game_Core.getGameById(gameId);
            if (!game) throw "Game not found";
            if (game.current_status !== "waiting") throw "Game already started";
            const playersLength = await Game_Core.countPlayers(gameId);
            if (playersLength >= game.max_players) throw "Game is full";
            console.log("GameId: " + gameId + " UserId: " + user.id + " Dices: " + game.dices_number, "playersLength: " + playersLength + " max_players: " + game.max_players);
            await Game_Core.addPlayer(gameId, user.id, game.dices_number);
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async sendStart(gameId: number, userToken: string) {
        try {
            const user = await User_Core.getByToken(userToken);
            const game = await Game_Core.sendStart(gameId, user.id);
            const isGameAbleToStart = await Game_Core.isGameAbleToStart(game);
            if (isGameAbleToStart) {
                await Game_Core.startGame(gameId);
            }
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}