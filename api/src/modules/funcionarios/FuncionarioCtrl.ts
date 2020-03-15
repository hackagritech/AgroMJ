import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';

import { onErrorCtrl } from '../../helpers/handlers';
import FuncionarioModel from './FuncionarioModel';

export default class FuncionarioCtrl {
  public static async buscaFuncionarios(req: Request, res: Response): Promise<void> {
    try {
      const funcionarios = await FuncionarioModel.findAll();
      res.status(HTTPStatus.OK).json(funcionarios);
    } catch (error) {
      onErrorCtrl(error, req, res);
    }
  }

  public static async cadastraFuncionario(req: Request, res: Response): Promise<void> {
    try {
      await FuncionarioModel.create(req.body);
      res.status(HTTPStatus.CREATED).json({ message: 'Funcionário cadastrado com sucesso!' });
    } catch (error) {
      onErrorCtrl(error, req, res);
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const funcionario: FuncionarioModel = await FuncionarioModel.findOne({
        where: {
          cpf: req.body.cpf
        }
      });

      if (!funcionario?.validatePassword(req.body.senha)) {
        res.status(HTTPStatus.BAD_REQUEST).json({ message: 'CPF e/ou senha inválido(s)!' });
        return;
      }

      res.status(HTTPStatus.OK).json({
        id: funcionario.id,
        message: 'Usuário autenticado com sucesso!',
        nomeCompleto: funcionario.nomeCompleto
      });
      return;
    } catch (error) {
      onErrorCtrl(error, req, res);
    }
  }
}
