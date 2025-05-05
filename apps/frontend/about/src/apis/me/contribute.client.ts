import type { ContributeResponse } from './contribute.type';

export const getWakatimeContribute = async (): Promise<ContributeResponse> => {
  try {
    const response = await fetch(`https://api.zerovoyage.com/v1/me/contribute/wakatime`);
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
