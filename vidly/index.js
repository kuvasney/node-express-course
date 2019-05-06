const express = require('express');
const movies = require('./routes/movies')
const home = require('./routes/home')
const app = express();

app.use(express.json());
app.use('/api/movies', movies);
app.use('/', home);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));