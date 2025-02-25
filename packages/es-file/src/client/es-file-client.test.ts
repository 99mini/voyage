import createEsFileClient from './es-file-client';

test('createEsFileClient should return true', () => {
  expect(createEsFileClient()).toBeTruthy();
});
