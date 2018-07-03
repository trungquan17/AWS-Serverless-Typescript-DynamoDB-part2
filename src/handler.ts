import * as serverless from 'serverless-http';
import App from './App';

console.log('typeof serverless(App)');

module.exports.handler = serverless(App);
