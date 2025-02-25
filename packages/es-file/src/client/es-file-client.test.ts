import EsFileClient from './es-file-client';

jest.mock('@ffmpeg/ffmpeg', () => ({
  createFFmpeg: jest.fn(() => ({
    load: jest.fn().mockResolvedValue(undefined),
    isLoaded: jest.fn().mockReturnValue(true),
    FS: jest.fn((...args) => {
      if (args[0] === 'writeFile') {
        return;
        // Handle writeFile operation
      } else if (args[0] === 'readFile') {
        return new Uint8Array();
      } else if (args[0] === 'unlink') {
        return;
      }
    }),
    exit: jest.fn(),
    run: jest.fn(),
    readFile: jest.fn(),
  })),
  fetchFile: jest.fn(() => Promise.resolve(new Uint8Array())),
}));

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
  expect(blob).toBeInstanceOf(Blob);
});
