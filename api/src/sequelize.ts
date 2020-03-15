import { Sequelize } from 'sequelize-typescript';

import AtividadeModel from './modules/atividades/AtividadeModel';
import ChecklistGrupoModel from './modules/checklists/ChecklistGrupoModel';
import ChecklistModel from './modules/checklists/ChecklistModel';
import ChecklistRespostaModel from './modules/checklists/ChecklistRespostaModel';
import UsuarioModel from './modules/funcionarios/FuncionarioModel';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: './agromj.db.sqlite'
});

sequelize.addModels([
  AtividadeModel,
  ChecklistGrupoModel,
  ChecklistModel,
  ChecklistRespostaModel,
  UsuarioModel
]);

export default sequelize;
