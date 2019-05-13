const express = require('express');
const movies = require('./routes/movies')
const home = require('./routes/home')
const app = express();

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
.then((res) => {
    console.log('Connected do MongoDB...');
})    
.catch(err => console.log('Could not connect to mongoDB', err));

app.use(express.json());
app.use('/api/movies', movies);
app.use('/', home);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));