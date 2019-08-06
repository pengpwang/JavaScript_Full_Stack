const log4js = require('./lib/log4js');

const logger = log4js.getLogger('test');
logger.level = 'debug';
logger.error(`${Date.now()} ops~`);