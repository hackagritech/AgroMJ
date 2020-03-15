import { Router } from 'express';

import AtividadeCtrl from './AtividadeCtrl';

const atividadeRoutes = Router();

atividadeRoutes
  .get('/', AtividadeCtrl.buscaAtividades)
  .post('/', AtividadeCtrl.cadastraAtividade);

export default atividadeRoutes;
