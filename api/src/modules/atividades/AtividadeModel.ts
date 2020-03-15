import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

export interface AtividadeAttributes {
  id?: string;
  descricao: string;
  observacao: string;
  readonly dtCadastro?: Date;
  readonly dtEdicao?: Date;
}

@Table({
  tableName: 'atividades'
})
export default class AtividadeModel extends Model<AtividadeModel> implements AtividadeAttributes {
  @Column({
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
    unique: true
  })
  public id: string;

  @Column({
    allowNull: false
  })
  public descricao: string;

  @Column
  public observacao: string;

  @Column
  @CreatedAt
  public dtCadastro: Date;

  @Column
  @UpdatedAt
  public dtEdicao: Date;
}
