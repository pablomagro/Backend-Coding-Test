import { NextFunction, Request, Response } from 'express';
import { OK } from 'http-status';
import { test1Service } from '../services';

class Test1Controller {
  public async writeDivisibleList(req: Request, res: Response, next: NextFunction) {
    console.info('GET Test 1 write division list request received.');

    test1Service
      .getDivisibleString()
      .then(outputString => res.status(OK).end(outputString))
      .catch(next);
  }
}

export default new Test1Controller();
