export function healthCheck() {
  return {
    ok: true,
    timestamp: new Date().toISOString(),
    service: 'functions',
  };
}
