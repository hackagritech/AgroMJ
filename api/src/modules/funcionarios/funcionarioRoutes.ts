import { Router } from 'express';

import FuncionarioCtrl from './FuncionarioCtrl';

const funcionariosRoutes = Router();

funcionariosRoutes
  .get('/', FuncionarioCtrl.buscaFuncionarios)
  .post('/', FuncionarioCtrl.cadastraFuncionario)
  .post('/login', FuncionarioCtrl.login);

export default funcionariosRoutes;
