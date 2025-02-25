import EsFileClient from './es-file-client';

test('EsFileClient should be defined', () => {
  expect(EsFileClient).toBeDefined();
});

test('EsFileClient should load', async () => {
  const client = new EsFileClient();
  await client.load();
  expect(client.instance).toBeDefined();
});

test('video to gif', async () => {
  const client = new EsFileClient();
  await client.load();
  const blob = await client.convertGifToVideo(new File([], 'test.gif'));
  expect(blob).toBeDefined();
});
