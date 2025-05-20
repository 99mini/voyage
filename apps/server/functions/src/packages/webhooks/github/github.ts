import { analyzeUser } from '@functions/webhooks/github';
import { sendTaskUpdate } from '@server/shared';

export async function main(event: any, context: any) {
  const { username, limit, taskId } = event;

  console.info(`[INFO] body: username=${username}, limit=${limit}, taskId=${taskId}`);

  if (!taskId) {
    console.error(`[ERR] taskId is required`);
    return {
      status: 400,
      data: 'taskId is required',
    };
  }

  if (!username) {
    console.error(`[ERR] username is required`);
    return {
      status: 400,
      data: 'username is required',
    };
  }

  // if (limit && limit > 20) {
  //   console.error(`[ERR] limit is too large: ${limit}`);
  //   return {
  //     status: 403,
  //     data: 'limit is too large',
  //   };
  // }

  console.info(`[INFO] Analyzing user: ${username} with limit ${limit ?? 10}`);

  try {
    // TODO: 주석 해제
    // const result = await analyzeUser({ username, limit });

    // wait 5 minutes
    await new Promise((resolve) => setTimeout(resolve, 5 * 60 * 1000));

    const result = {
      username,
      totalSize: 35874,
      languageCount: 12,
      repoCount: 10,
      languageDetail: {
        markdown: { size: 280, repo: 9 },
        etc: { size: 15542, repo: 9 },
        python: { size: 4688, repo: 2 },
        html: { size: 394, repo: 4 },
        json: { size: 8491, repo: 6 },
        css: { size: 1187, repo: 3 },
        javascript: { size: 980, repo: 3 },
        'c/c++': { size: 1402, repo: 2 },
        yaml: { size: 375, repo: 4 },
        typescript: { size: 2324, repo: 2 },
        'objective-c': { size: 190, repo: 2 },
        java: { size: 21, repo: 1 },
      },
    };

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
