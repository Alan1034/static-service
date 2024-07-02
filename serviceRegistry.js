const app = require('./app');
const authApp = require('./subsystem/auth/app');

const serviceRegistry = {
  //Express 中心服务器代码
  "express-server": {
    app,
    host: 'localhost',
    port: 3001
  },
  //Express 登录鉴权服务器代码
  auth: {
    app: authApp,
    host: 'localhost',
    port: 4000
  }
}
exports.serviceRegistry = serviceRegistry
exports.setPort = (serviceName, port) => {
  serviceRegistry[serviceName].port = port
}
// exports.main = () => {
//   const serviceName = 'my_service';

//   await registerService(serviceName, 'instance_1', { host: 'localhost', port: 3000 });
//   await registerService(serviceName, 'instance_2', { host: 'localhost', port: 3002 });

//   const instances = await discoverService(serviceName);
//   console.log('所有服务节点:', instances);

//   watchService(serviceName, updatedInstances => {
//     console.log('服务节点有变动:', updatedInstances);
//   });

// }