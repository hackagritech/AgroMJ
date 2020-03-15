import { Router } from 'express';

import app from './app';
import sequelize from './sequelize';

const port = process.env.port || 5000;
const router = Router();

(async () => {
  await sequelize.sync();
  router.use('/api', app);
  app.use(router);
  app.listen(port, () => console.log(`Listening... http://localhost:${port}/api`));
})();
