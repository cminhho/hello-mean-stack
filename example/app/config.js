// Sets the MongoDB Database options
module.exports = {
  mongolab: {
    name: 'hello-express',
    url: '',
    port: 27017
  },
  local: {
    name: 'hello-express',
    url: 'mongodb://localhost/helloExpress',
    port: 27017
  },
  localtest: {
    name: 'hello-express-test',
    url: 'mongodb://localhost/helloExpressTest',
    port: 27017
  }
}
