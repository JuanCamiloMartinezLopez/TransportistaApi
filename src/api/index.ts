import { Settings } from '@settings';
import Logger from '@middleware/logger';
import app from './app';

const server = app.build();
server.listen(Settings.port, () => {
  Logger.info(`server started at http://localhost:${Settings.port}`);
});
