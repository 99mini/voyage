import { analyzeUser } from '@functions/webhooks/github';
import { sendTaskUpdate } from '@server/shared';

export async function main(event: any, context: any) {
  const { username, limit, taskId } = event;

  console.info(`[INFO] body: username=${username}, limit=${limit}, taskId=${taskId}`);

  if (!taskId) {
    return {
      status: 400,
      data: 'taskId is required',
    };
  }

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

  const result = await analyzeUser({ username, limit });

  console.info(`[INFO] Analyzed successfully`);

  await sendTaskUpdate({
    id: taskId,
    result,
    t: 'github',
  });

  console.info(`[INFO] Task updated successfully`);

  return {
    status: 200,
    data: 'success',
  };
}
