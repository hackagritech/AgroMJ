import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';

import { onErrorCtrl } from '../../helpers/handlers';
import AtividadeModel from './AtividadeModel';

export default class AtividadeCtrl {
  public static async buscaAtividades(req: Request, res: Response): Promise<void> {
    try {
      const atividades: AtividadeModel[] = await AtividadeModel.findAll();
      res.status(HTTPStatus.OK).json(atividades);
    } catch (error) {
      onErrorCtrl(error, req, res);
    }
  }

  public static async cadastraAtividade(req: Request, res: Response): Promise<void> {
    try {
      await AtividadeModel.create(req.body);
      res.status(HTTPStatus.CREATED).json({ message: 'Atividade cadastrada com sucesso!' });
    } catch (error) {
      onErrorCtrl(error, req, res);
    }
  }
}
