import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';

import { onErrorCtrl } from '../../helpers/handlers';
import ChecklistModel from './ChecklistModel';
import ChecklistGrupoModel from './ChecklistGrupoModel';
import ChecklistRespostaModel from './ChecklistRespostaModel';

export default class ChecklistCtrl {
  public static async buscaChecklists(req: Request, res: Response): Promise<void> {
    try {
      const checklists: ChecklistGrupoModel[] = await ChecklistGrupoModel.findAll({
        include: [
          {
            all: true
          },
        ],
        raw: true
      });
      res.status(HTTPStatus.OK).json(checklists);
    } catch (error) {
      onErrorCtrl(error, req, res);
    }
  }

  public static async buscaChecklistsAtividade(req: Request, res: Response): Promise<void> {
    try {
      const { atividadeId } = req.params;
      const checklists: ChecklistGrupoModel[] = await ChecklistGrupoModel.findAll({
        where: {
          atividadeId
        },
        include: [
          {
            all: true
          }
        ]
      });
      res.status(HTTPStatus.OK).json(checklists);
    } catch (error) {
      onErrorCtrl(error, req, res);
    }
  }

  public static async buscaChecklistRespostas(req: Request, res: Response): Promise<void> {
    try {
      const respostas: ChecklistModel[] = await ChecklistModel.sequelize.query(`
        SELECT
          respostas.dtCadastro,
          respostas.funcionarioId,
          funcionario.nomeCompleto,
          checklist_grupo.atividadeId,
          checklist_grupo.posAtividade,
          atividade.descricao,
          checklist.id,
          checklist.checklist,
          respostas.simNao,
          respostas.observacao
        FROM checklists AS checklist
        LEFT OUTER JOIN checklist_grupos AS checklist_grupo ON checklist.checklistGrupoId = checklist_grupo.id
        LEFT OUTER JOIN checklist_respostas AS respostas ON checklist.id = respostas.checklistId
        LEFT OUTER JOIN funcionarios AS funcionario ON respostas.funcionarioId = funcionario.id
        LEFT OUTER JOIN atividades AS atividade ON checklist_grupo.atividadeId = atividade.id
      `);
      res.status(HTTPStatus.OK).json(respostas[0]);
    } catch (error) {
      onErrorCtrl(error, req, res);
    }
  }

  public static async cadastraChecklist(req: Request, res: Response): Promise<void> {
    try {
      const checklists = [];
      req.body.checklists.forEach((checklist: string) => {
        checklists.push({ checklist });
      });
      await ChecklistGrupoModel.create({
        ...req.body,
        checklists
      }, {
        include: [ChecklistModel]
      });
      res.status(HTTPStatus.CREATED).json({ message: 'Checklist\'s cadastrado com sucesso!' });
    } catch (error) {
      onErrorCtrl(error, req, res);
    }
  }

  public static async respondeChecklists(req: Request, res: Response): Promise<void> {
    try {
      const { respostas } = req.body;
      const checklistsResposta = respostas.map(((resposta: any) => {
        return ChecklistRespostaModel.create({
          checklistId: resposta.id,
          funcionarioId: resposta.funcionarioId,
          observacao: resposta.observacao,
          simNao: resposta.simNao
        });
      }));
      await Promise.all(checklistsResposta);
      res.status(HTTPStatus.CREATED).json({ message: 'Checklists completado com sucesso!' });
    } catch (error) {
      onErrorCtrl(error, req, res);
    }
  }
}
