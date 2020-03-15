import { Router } from 'express';

import ChecklistCtrl from './ChecklistCtrl';

const checklistRoutes = Router();

checklistRoutes
  .get('/', ChecklistCtrl.buscaChecklists)
  .get('/respostas', ChecklistCtrl.buscaChecklistRespostas)
  .get('/:atividadeId', ChecklistCtrl.buscaChecklistsAtividade)
  .put('/responder', ChecklistCtrl.respondeChecklists)
  .post('/', ChecklistCtrl.cadastraChecklist);

export default checklistRoutes;
