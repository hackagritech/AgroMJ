import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

import ChecklistModel from './ChecklistModel';
import FuncionarioModel from '../funcionarios/FuncionarioModel';

export interface ChecklistRespostaAttributes {
  id?: string;
  funcionarioId: string;
  checklistId: string;
  simNao: boolean;
  observacao?: string;
  readonly dtCadastro?: Date;
  readonly dtEdicao?: Date;
}

@Table({
  tableName: 'checklist_respostas'
})
export default class ChecklistRespostaModel extends Model<ChecklistRespostaModel> implements ChecklistRespostaAttributes {
  @Column({
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
    unique: true
  })
  public id: string;

  @BelongsTo(() => FuncionarioModel, {
    onDelete: 'CASCADE'
  })
  public funcionario: FuncionarioModel;

  @ForeignKey(() => FuncionarioModel)
  @Column({
    allowNull: false
  })
  public funcionarioId: string;

  @BelongsTo(() => ChecklistModel, {
    onDelete: 'CASCADE'
  })
  public checklist: ChecklistModel;

  @ForeignKey(() => ChecklistModel)
  @Column({
    allowNull: false
  })
  public checklistId: string;

  @Column({
    allowNull: false
  })
  public simNao: boolean;

  @Column
  public observacao: string;

  @Column
  @CreatedAt
  public dtCadastro: Date;

  @Column
  @UpdatedAt
  public dtEdicao: Date;
}
