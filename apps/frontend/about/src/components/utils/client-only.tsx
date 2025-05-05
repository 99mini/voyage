import { useEffect, useState } from 'react';

const ClientOnly = ({ children }: React.PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
