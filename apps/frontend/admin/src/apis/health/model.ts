export interface HealthResponse {
  ok: boolean;
  timestamp: string;
  service: 'rest-api' | 'functions';
}

export type HealthRequest = {
  type: 'rest' | 'webhooks';
};
