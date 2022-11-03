import { Router } from 'express';
import { test1Controller } from '../controllers';

const test1Router = Router();

test1Router.route('/').get(test1Controller.writeDivisibleList);

export default test1Router;
