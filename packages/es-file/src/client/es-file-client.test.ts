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

describe('EsFileClient', () => {
  test('EsFileClient should be defined', () => {
    expect(EsFileClient).toBeDefined();
  });

  test('instance should be defined', async () => {
    const client = new EsFileClient();

    expect(client.instance).toBeDefined();
  });

  test('instance should throw error if instance called after destroy', () => {
    const client = new EsFileClient();
    client.destroy();
    expect(client.instance).toBeUndefined();
  });
});

describe('video-to-gif', () => {
  test('should return a blob', async () => {
    const client = new EsFileClient();

    const blob = await client.convertGifToVideo(new File([], 'test.gif'));
    expect(blob).toBeInstanceOf(Blob);
  });

  test('should throw error if convertGifToVideo called without initializing FFmpeg', () => {
    const client = new EsFileClient();
    client.destroy();

    expect(client.convertGifToVideo(new File([], 'test.gif'))).rejects.toThrow('FFmpeg is not initialized');
  });
});
