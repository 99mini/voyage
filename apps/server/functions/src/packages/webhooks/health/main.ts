import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";

export function main() {
  return new HealthController(new HealthService()).checkHealth();
}