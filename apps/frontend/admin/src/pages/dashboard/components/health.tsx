import { useHealthQuery } from '@/apis';

import ApiCondition from './api-condition';

const HealthCheck = () => {
  const { data: restHealthData } = useHealthQuery({
    type: 'rest',
  });

  const { data: webhooksHealthData } = useHealthQuery({
    type: 'webhooks',
  });

  return (
    <div className="space-y-4">
      <details open>
        <summary className="mb-2">REST API 상태</summary>
        <ApiCondition
          endpoint="/v1/health"
          status={restHealthData?.ok ? 'success' : 'failure'}
          timestamp={restHealthData?.timestamp || 'unknown'}
        />
      </details>

      <details open>
        <summary className="mb-2">Webhook API 상태</summary>
        <ApiCondition
          endpoint="/v1/webhooks/health"
          status={webhooksHealthData?.ok ? 'success' : 'failure'}
          timestamp={webhooksHealthData?.timestamp || 'unknown'}
        />
      </details>
    </div>
  );
};

export default HealthCheck;
