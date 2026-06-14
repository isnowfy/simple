const options = {
  cert: fs.readFileSync(serverConfig.sslCertPath),
  key: fs.readFileSync(serverConfig.sslKeyPath)
};
const server = https.createServer(options, app).listen(serverConfig.port, () => {