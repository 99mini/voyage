function main(event: any, context: any) {
  console.log(JSON.stringify(event, null, 2));
  console.log(JSON.stringify(context, null, 2));

  return {
    status: 200,
    body: {
      ok: true,
      timestamp: new Date().toISOString()
    }
  };
}