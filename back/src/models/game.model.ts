import { Table, Model, Column } from 'sequelize-typescript'

interface GameModel {
    id: number,
    current_status: "waiting" | "playing" | "finished",
    max_players: number,
    dices_number: number,
    players?: number
}

@Table
export default class game extends Model<GameModel> {
  
  @Column
  declare current_status: "waiting" | "playing" | "finished"
  
  @Column
  declare max_players: number

  @Column
  declare dices_number: number 

  players?: number
  
}