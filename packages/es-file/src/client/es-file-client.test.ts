import EsFileClient from './es-file-client';

jest.mock('@ffmpeg/ffmpeg', () => ({
  createFFmpeg: jest.fn(() => ({
    load: jest.fn().mockResolvedValue(undefined),
    isLoaded: jest.fn().mockReturnValue(false),
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

  test('load should be called', async () => {
    const client = new EsFileClient();

    const spy = jest.spyOn(client, 'load');
    await client.load();

    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
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

  test('isLoaded should return false if instance not initialized', async () => {
    const client = new EsFileClient();
    expect(await client.isLoaded()).toBe(false);

    client.destroy();
    expect(await client.isLoaded()).toBe(false);
  });
});

describe('video-to-gif', () => {
  test('should return a blob', async () => {
    const client = new EsFileClient();
    await client.load();

    const blob = await client.convertVideoToGif(new File([], 'test.gif'));
    expect(blob).toBeInstanceOf(Blob);
  });

  test('should throw error if convertVideoToGif called without initializing FFmpeg', () => {
    const client = new EsFileClient();
    client.destroy();

    expect(client.convertVideoToGif(new File([], 'test.gif'))).rejects.toThrow('FFmpeg is not initialized');
  });
});
