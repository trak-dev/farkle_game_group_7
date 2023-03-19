import Game from '../models/game.model';
import GameStatus from '../models/game_status.model';

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
            let games = await Game.findAll({raw: true});
            if (!games) throw "No games found";
            for (let game of games) {
                const playersLength = await this.countPlayers(game.id);
                game.players = playersLength;
            }
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

    static async countPlayers(gameId: number) {
        try {
            const PlayerNumber = await GameStatus.count({
                where: {
                    game_id: gameId
                }
            });
            return PlayerNumber;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async addPlayer(gameId: number, userId: number, dices: number) {
        try {
            const doesPlayerExist = await GameStatus.findOne({
                where: {
                    game_id: gameId,
                    user_id: userId
                }
            });
            if (doesPlayerExist) throw "Player already in game";
            const newGameStatus = new GameStatus({
                game_id: gameId,
                user_id: userId,
                dices,
            });
            await newGameStatus.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}