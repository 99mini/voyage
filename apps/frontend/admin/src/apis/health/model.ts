export interface HealthResponse {
  ok: boolean;
  timestamp: string;
  service: 'rest-api' | 'functions';
}
