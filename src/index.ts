import config from '../config';
import db from './modules/db';
import { connect as discordJSConnect } from './modules/bot';
import consoleListener from './modules/consoleListener';

db.connect(config.MONGODB_URI);
discordJSConnect();
consoleListener();
// require('./modules/db').connect();

export {}