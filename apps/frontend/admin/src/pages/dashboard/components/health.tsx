import { useMemo } from 'react';

import { useHealthQuery } from '@/apis';

import Accordion from './accordion';
import ApiCondition from './api-condition';

const HealthCheck = () => {
  const {
    data: restHealthData,
    isLoading: isLoadingRest,
    isSuccess: isSuccessRest,
  } = useHealthQuery({
    type: 'rest',
  });

  const {
    data: webhooksHealthData,
    isLoading: isLoadingWebhooks,
    isSuccess: isSuccessWebhooks,
  } = useHealthQuery({
    type: 'webhooks',
  });

  const statusRest = useMemo(() => {
    if (isLoadingRest) return 'loading';
    if (isSuccessRest) return 'success';
    return 'failure';
  }, [isLoadingRest, isSuccessRest]);

  const statusWebhooks = useMemo(() => {
    if (isLoadingWebhooks) return 'loading';
    if (isSuccessWebhooks) return 'success';
    return 'failure';
  }, [isLoadingWebhooks, isSuccessWebhooks]);

  return (
    <div className="space-y-4">
      <Accordion title="REST API 상태">
        <ApiCondition
          endpoint="/v1/health"
          status={statusRest}
          timestamp={restHealthData?.timestamp || new Date().toISOString()}
        />
      </Accordion>
      <Accordion title="Webhook API 상태">
        <ApiCondition
          endpoint="/v1/webhooks/health"
          status={statusWebhooks}
          timestamp={webhooksHealthData?.timestamp || new Date().toISOString()}
        />
      </Accordion>
    </div>
  );
};

export default HealthCheck;
