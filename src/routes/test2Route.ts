import { Router } from 'express';
import { test2Controller } from '../controllers';

const test2Router = Router();

test2Router.route('/').post(test2Controller.submitTest2Result);

export default test2Router;
