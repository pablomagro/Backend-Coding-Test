import { NextFunction, Request, Response } from 'express';
import { OK } from 'http-status';
import { test2Service } from '../services';

class Test2Controller {
  public async submitTest2Result(req: Request, res: Response, next: NextFunction) {
    console.info('POST Test 2 submit find occurrences request received.');

    test2Service
      .submitTest2Result()
      .then(data => res.status(OK).json(data))
      .catch(next);
  }
}

export default new Test2Controller();
