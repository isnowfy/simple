const serverConfig = require('../src/server/config');

describe('Server Configuration', () => {
  test('should have sslCertPath and sslKeyPath defined', () => {
    expect(serverConfig.sslCertPath).toBe('/path/to/ssl/cert.pem');
    expect(serverConfig.sslKeyPath).toBe('/path/to/ssl/key.pem');
  });

  test('should throw error if sslCertPath or sslKeyPath is missing', () => {
    const originalConfig = { ...serverConfig };
    delete serverConfig.sslCertPath;
    expect(() => require('../src/server/config')).toThrow();
    serverConfig.sslCertPath = originalConfig.sslCertPath;
    delete serverConfig.sslKeyPath;
    expect(() => require('../src/server/config')).toThrow();
    serverConfig.sslKeyPath = originalConfig.sslKeyPath;
  });
});