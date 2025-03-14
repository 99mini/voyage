import { cn } from '@packages/vds';

const ApiCondition = ({
  endpoint,
  status,
  timestamp,
}: {
  endpoint: string;
  status: 'success' | 'failure' | 'loading';
  timestamp: string;
}) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 shadow-sm bg-white">
      <code className="text-sm font-medium text-gray-800 mb-2 block bg-gray-50 p-2">{endpoint}</code>
      <p className="mb-1">
        <span className="font-semibold">상태: </span>
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            status === 'success' && 'bg-green-100 text-green-800',
            status === 'failure' && 'bg-red-100 text-red-800',
            status === 'loading' && 'bg-blue-100 text-blue-800',
          )}
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

export default ApiCondition;
