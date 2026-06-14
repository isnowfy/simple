const fs = require('fs');
const https = require('https');
const app = require('../src/server/app');
const serverConfig = require('../src/server/config');

jest.mock('fs');

describe('HTTPS Server Setup', () => {
  beforeEach(() => {
    fs.readFileSync.mockImplementation((path) => {
      if (path === serverConfig.sslCertPath) return 'fake-cert';
      if (path === serverConfig.sslKeyPath) return 'fake-key';
      throw new Error('File not found');
    });
  });

  test('should create an HTTPS server with correct options', () => {
    const createServerSpy = jest.spyOn(https, 'createServer');
    require('../src/server/server');
    expect(createServerSpy).toHaveBeenCalledWith(expect.objectContaining({
      cert: 'fake-cert',
      key: 'fake-key'
    }), app);
  });

  test('should throw error if SSL files are not found', () => {
    fs.readFileSync.mockImplementation(() => { throw new Error('File not found'); });
    expect(() => require('../src/server/server')).toThrow('File not found');
  });
});