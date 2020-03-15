import * as bcrypt from 'bcryptjs';
import {
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';

export interface FuncionarioAttributes {
  id?: string;
  nomeCompleto: string;
  cpf: string;
  senha: string;
  dtUltimoAcesso?: Date;
  readonly dtCadastro?: Date;
  readonly dtEdicao?: Date;
}

@Table({
  tableName: 'funcionarios'
})
export default class FuncionarioModel extends Model<FuncionarioModel> implements FuncionarioAttributes {
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
  public nomeCompleto: string;

  @Column({
    allowNull: false
  })
  public cpf: string;

  @Column({
    allowNull: false
  })
  public senha: string;

  @Column
  public dtUltimoAcesso: Date;

  @Column
  @CreatedAt
  public dtCadastro: Date;

  @Column
  @UpdatedAt
  public dtEdicao: Date;

  @BeforeCreate
  public static async hashPassword(funcionarioModel: FuncionarioModel): Promise<void> {
    try {
      const hash = await bcrypt.hash(funcionarioModel.senha, 10);
      funcionarioModel.senha = hash;
    } catch (error) {
      throw error;
    }
  }

  public validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.senha);
  }
}
