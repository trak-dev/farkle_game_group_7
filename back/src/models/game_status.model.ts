import { Table, Model, Column, AllowNull, PrimaryKey } from 'sequelize-typescript'

interface GameStatusModel {
    id?: number,
    user_id: number,
    game_id: number,
    clicked_start: boolean,
    remaining_dices: number,
    total_score: number,
    turn_score: number,
    is_playing: boolean
}

@Table
export default class game_status extends Model<GameStatusModel> {
  
  @AllowNull(false) @Column 
  declare user_id: number
  
  @AllowNull(false) @Column 
  declare game_id: number

  @Column 
  declare clicked_start: boolean

  @AllowNull(false) @Column 
  declare remaining_dices: number

  @Column
  declare total_score: number

  @Column
  declare turn_score: number

  @Column
  declare is_playing: boolean
  
}