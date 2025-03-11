export interface HealthEntity {
  ok: boolean;
  timestamp: string;
  service: 'rest-api' | 'functions';
}
