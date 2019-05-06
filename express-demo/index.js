const startupDebugger = require('debug')('app:startup');
const dbDebugger = require ('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('app', app.get('env'))

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // aceita objetos na url da request
app.use(express.static('public')); // define onde fincarao os arquivos estaticos do projeto, como imagens, css, etc
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
console.log(`Application name: ${config.get('name')}`)
console.log(`Mail server: ${config.get('mail.host')}`)
console.log(`Mail passowrd: ${config.get('mail.password')}`)

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...')
}

// Db work
dbDebugger('Connected to database...')

app.use(logger);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});