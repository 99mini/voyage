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

  console.info(`[INFO] Analyzing user: ${username} with limit ${limit ?? 10}`);

  try {
    const result = await analyzeUser({ username, limit });

    console.info(`[INFO] Analyzed successfully`);

    await sendTaskUpdate({
      id: taskId,
      result,
      status: 'success',
      t: 'github',
    });

    console.info(`[INFO] Task updated successfully`);

    return {
      status: 200,
      data: 'success',
    };
  } catch (error) {
    console.error(`[ERR] Analyze user failed: ${error}`);

    await sendTaskUpdate({
      id: taskId,
      result: null,
      error,
      status: 'failed',
      t: 'github',
    });

    return {
      status: 500,
      data: 'failed',
    };
  }
}
