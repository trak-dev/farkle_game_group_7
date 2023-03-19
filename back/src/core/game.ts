import Game from '../models/game.model';
import GameStatus from '../models/game_status.model';

export default class Game_Core {
    
    /**
     * Function to create a new game
     * @param {Game} game : Game object created in the controller
     * @returns {number} id : The id of the new game
     */
    static async createGame(game: Game) {
        try {
            const newGame = await game.save();
            return newGame.id as number;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    /**
     * function to get all games
     * @returns {Game} games : All games in the database + the number of players in each game
     */
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
    };

    /**
     * function to get a game by id and throw an error if not found
     * @param {number} gameId : The id of the game
     * @returns {Game} game : The game found
     */
    static async getGameById(gameId: number) {
        try {
            const game = await Game.findByPk(gameId);
            if (!game) throw "Game not found";
            return game;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

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
    };

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
    };

    static async sendStart(gameId: number, userid : number) {
        try {
            const game = await this.getGameById(gameId);
            if (!game) throw "Game not found";
            if (game.current_status !== "waiting") throw "Game already started";
            const isUserInGame = await GameStatus.findOne({
                where: {
                    game_id: gameId,
                    user_id: userid
                }
            });
            if (!isUserInGame) throw "User not in this game";
            await GameStatus.update({
                clicked_start: true
            }, {
                where: {
                    game_id: gameId,
                    user_id: userid
                }
            });
            return game;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    static async isGameAbleToStart(game: Game) {
        try {
            if (game.current_status !== "waiting") throw "Game already started";
            const playersWhoHasntClickedStart = await GameStatus.count({
                where: {
                    game_id: game.id,
                    clicked_start: false
                }
            });
            if (playersWhoHasntClickedStart > 0) return false;
            return true;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    static async startGame(gameId: number) {
        try {
            await Game.update({
                current_status: "playing"
            }, {
                where: {
                    id: gameId
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}