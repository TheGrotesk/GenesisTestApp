import AppFactory    from './lib/AppFactory';
import * as config   from './config/config';
import * as dbConfig from './config/db';

const app = new AppFactory(config, dbConfig);

app.run();

