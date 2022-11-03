import * as express from 'express';
import helmet from 'helmet';
import * as compression from 'compression';
import * as xss from 'xss-clean';
import * as cors from 'cors';
import routes from './routes';

const app = express();

// Set security HTTP headers.
app.use(helmet());

// Parse json request body.
app.use(express.json({ limit: '10mb' }));

// Parse urlencoded request body.
app.use(express.urlencoded({ extended: true }));

// Sanitize request data.
app.use(xss());

// Gzip compression.
app.use(compression());

// Enable cors.
app.use(cors());
app.options('*', cors());

// V1 api routes.
app.use('/', routes);

const PORT = 9999;
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
