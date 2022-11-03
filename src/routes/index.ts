import * as express from 'express';
import test1Route from './test1Route';
import test2Route from './test2Route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: test1Route
  },
  {
    path: '/test2',
    route: test2Route
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
