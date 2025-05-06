export function healthCheck(event: any) {
  return {
    ok: true,
    timestamp: new Date().toISOString(),
    service: 'functions',
    body: { ...event },
  };
}
