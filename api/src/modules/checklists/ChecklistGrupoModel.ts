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

import AtividadeModel from '../atividades/AtividadeModel';
import ChecklistModel, { ChecklistAttributes } from './ChecklistModel';

export interface ChecklistGrupoAttributes {
  id?: string;
  atividadeId: string;
  posAtividade: boolean;
  checklists: ChecklistAttributes[];
  readonly dtCadastro?: Date;
  readonly dtEdicao?: Date;
}

@Table({
  tableName: 'checklist_grupos'
})
export default class ChecklistGrupoModel extends Model<ChecklistGrupoModel> implements ChecklistGrupoAttributes {
  @Column({
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
    unique: true
  })
  public id: string;

  @BelongsTo(() => AtividadeModel, {
    onDelete: 'CASCADE'
  })
  public atividade: AtividadeModel;

  @ForeignKey(() => AtividadeModel)
  @Column({
    allowNull: false
  })
  public atividadeId: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  public posAtividade: boolean;

  @HasMany(() => ChecklistModel)
  public checklists: ChecklistModel[];

  @Column
  @CreatedAt
  public dtCadastro: Date;

  @Column
  @UpdatedAt
  public dtEdicao: Date;
}
