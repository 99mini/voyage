import { useHealthQuery } from '@/apis';

const ApiCondition = ({ endpoint, status, timestamp }: { endpoint: string; status: string; timestamp: string }) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 shadow-sm bg-white">
      <code className="text-sm font-medium text-gray-800 mb-2 block bg-gray-50 p-2">{endpoint}</code>
      <p className="mb-1">
        <span className="font-semibold">상태: </span>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-semibold">시간: </span>
        {timestamp}
      </p>
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
      <details open>
        <summary>REST API 상태</summary>
        <ApiCondition
          endpoint="/v1/health"
          status={restHealthData?.ok ? 'success' : 'failure'}
          timestamp={restHealthData?.timestamp || 'unknown'}
        />
      </details>

      <details open>
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
