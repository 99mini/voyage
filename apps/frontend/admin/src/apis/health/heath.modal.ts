export interface Health {
  ok: boolean;
  timestamp: string;
  service: 'rest-api' | 'functions';
}
