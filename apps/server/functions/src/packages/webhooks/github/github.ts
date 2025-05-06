import { analyzeUser } from '@functions/webhooks/github';

export async function main(event: any, context: any) {
  const { username, limit } = event;

  console.info(`[INFO] body: username=${username}, limit=${limit}`);

  if (!username) {
    return {
      status: 400,
      data: 'username is required',
    };
  }

  if (limit && limit > 5) {
    // TODO: temp limit
    return {
      status: 400,
      data: 'limit is too high',
    };
  }

  console.info(`[INFO] Analyzing user: ${username} with limit ${limit ?? 10}`);

  return {
    status: 200,
    data: await analyzeUser({ username, limit }),
  };
}
