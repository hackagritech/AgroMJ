import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response
} from 'express';
import * as HTTPStatus from 'http-status';

export function onErrorCtrl(error: any, req: Request, res: Response): void {
  if (error.name === 'ValidationError') {
    res.status(HTTPStatus.BAD_REQUEST).json({
      message: error.message
    });
  } else {
    console.log('Ctrl Request: ', req);
    console.log('Ctrl Error: ', error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
    });
  }
}

export function onErrorServer(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction): void {
  console.log('Server Request: ', req);
  console.log('Server Error: ', err);
  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
    message: 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.'
  });
}
