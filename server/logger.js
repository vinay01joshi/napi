'use strict';
const path = require('path');

const now = new Date();
const logStartDate = `${now.getFullYear()}-${(now.getMonth() + 1)}`;
const loggerName = `logs-${logStartDate}`;



let streams = null;

if (process.env.NODE_ENV === 'production' && process.env.MACHINE !== 'heroku') {
    streams = [{ path: 'logs/' + loggerName + '.log' }];
}
///else if (process.env.NODE_ENV === 'production' && process.env.MACHINE === 'heroku') {
//     streams = [
//         { path: 'logs/' + loggerName + '.log' },
//         { stream: process.stdout },
//     ];
// } 
else {
    streams = [
        { stream: process.stdout }
    ];
}

module.exports = require('bunyan').createLogger({
    name: loggerName,
    streams: streams
});
