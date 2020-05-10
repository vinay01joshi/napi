const http = require('http');
var debug = require('debug')('http')
const utils = require('./utils');
const app = require('./index');

const port = utils.normalizePort(process.env.PORT || '9000');
const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);
console.log(`Server is currently running on port: ${port}`);

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        'pipe' + addr :
        'port' + addr.port;
    debug('Listening on ' + bind)
}
