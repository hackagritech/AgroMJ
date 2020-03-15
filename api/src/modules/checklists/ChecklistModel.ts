import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

import ChecklistGrupoModel from './ChecklistGrupoModel';
import ChecklistRespostaModel from './ChecklistRespostaModel';

export interface ChecklistAttributes {
  id?: string;
  checklistGrupoId: string;
  checklist: string;
  respostas?: ChecklistRespostaModel[];
  readonly dtCadastro?: Date;
  readonly dtEdicao?: Date;
}

@Table({
  tableName: 'checklists'
})
export default class ChecklistModel extends Model<ChecklistModel> implements ChecklistAttributes {
  @Column({
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
    unique: true
  })
  public id: string;

  @BelongsTo(() => ChecklistGrupoModel, {
    onDelete: 'CASCADE'
  })
  public checklistGrupo: ChecklistGrupoModel;

  @ForeignKey(() => ChecklistGrupoModel)
  @Column({
    allowNull: false
  })
  public checklistGrupoId: string;

  @Column({
    allowNull: false
  })
  public checklist: string;

  @HasMany(() => ChecklistRespostaModel)
  public respostas: ChecklistRespostaModel[];

  @Column
  @CreatedAt
  public dtCadastro: Date;

  @Column
  @UpdatedAt
  public dtEdicao: Date;
}
