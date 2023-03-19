import { Table, Model, Column, AllowNull } from 'sequelize-typescript'

interface GameStatusModel {
    user_id: number,
    game_id: number,
    game_ended: boolean,
    clicked_start: boolean,
    dices: number,
    score: number,
}

@Table
export default class game_status extends Model<GameStatusModel> {
  
  @AllowNull(false) @Column 
  declare user_id: number
  
  @AllowNull(false) @Column 
  declare game_id: number

  @Column 
  declare game_ended: boolean

  @Column 
  declare clicked_start: boolean

  @AllowNull(false) @Column 
  declare dices: number

  @Column
  declare score: number
  
}