import { Router } from 'express';

import atividadeRoutes from './modules/atividades/atividadeRoutes';
import checklistRoutes from './modules/checklists/checklistRoutes';
import funcionarioRoutes from './modules/funcionarios/funcionarioRoutes';

const routes = Router();

routes.use('/atividades', atividadeRoutes);
routes.use('/checklists', checklistRoutes);
routes.use('/funcionarios', funcionarioRoutes);

export default routes;
