import { useHealthQuery } from '@/apis';

const ApiCondition = ({ endpoint, status, timestamp }: { endpoint: string; status: string; timestamp: string }) => {
  return (
    <div>
      <p>{endpoint}</p>
      <p>Status: {status}</p>
      <p>Timestamp: {timestamp}</p>
    </div>
  );
};

const HealthCheck = () => {
  const { data: restHealthData } = useHealthQuery({
    type: 'rest',
  });

  const { data: webhooksHealthData } = useHealthQuery({
    type: 'webhooks',
  });

  return (
    <div className="space-y-4">
      <details>
        <summary>REST API 상태</summary>
        <ApiCondition
          endpoint="/v1/health"
          status={restHealthData?.ok ? 'success' : 'failure'}
          timestamp={restHealthData?.timestamp || 'unknown'}
        />
      </details>

      <details>
        <summary>Webhook API 상태</summary>
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
