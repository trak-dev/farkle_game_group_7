import { Table, Model, Column, AllowNull  } from 'sequelize-typescript'

interface UserModel {
    id: number,
    email: string,
    password: string,
    pseudo: string,
}

@Table
export default class user extends Model<UserModel> {
  
  @AllowNull(false) @Column
  declare email: string
  
  @AllowNull(false) @Column
  declare password: string

  @AllowNull(false) @Column
  declare pseudo: string 
  
}