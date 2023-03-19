import { Table, Model, Column } from 'sequelize-typescript'

interface UserModel {
    id: number,
    current_status?: "waiting" | "playing" | "finished",
    max_players?: number,
    dices_number?: number,
}

@Table
export default class game extends Model<UserModel> {
  
  @Column
  declare current_status: "waiting" | "playing" | "finished"
  
  @Column
  declare max_players: number

  @Column
  declare dices_number: number 
  
}