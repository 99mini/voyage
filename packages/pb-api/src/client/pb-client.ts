import PocketBase from 'pocketbase';
import env from '@pb-api/_config/env';

function connect(app: 'app' | 'api') {
  let baseUrl = env.PB_URL_APP;
  switch (app) {
    case 'api':
      baseUrl = env.PB_URL_API;
      break;
  }
  return new PocketBase(baseUrl);
}

const pbApp = connect('app');
const pbApi = connect('api');

const batchApp = pbApp.createBatch();
const batchApi = pbApi.createBatch();

export { pbApp, pbApi, batchApp, batchApi };
