import serverless from 'serverless-http';
import App from './App'

module.exports.handler = serverless(App);
