import { createServer } from 'http';
import { getPACFileContent } from './gfwlistUtils';

const NAME = 'pac_server';

export function createPACServer(config, logger) {
  return getPACFileContent(config)
  .then(pacFileContent => {
    const HOST = `${config.localAddr}:${config.pacServerPort}`;

    const server = createServer((req, res) => {
      res.write(pacFileContent);
      res.end();
    });

    server.on('error', err => {
      logger.error(`${NAME} got error: ${err.stack}`);
    });

    server.listen(config.pacServerPort);

    if (logger) {
      logger.verbose(`${NAME} is listening on ${HOST}`);
    }
    return server
  });
}
