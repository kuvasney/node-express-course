const Joi = require('joi');
const express = require('express');
const router = express.Router();

const movies = [
    { id: 1, "name": 'Clerks', 'genre': 'comedy' },
    { id: 2, "name": 'Watchmen', 'genre': 'drama' },
    { id: 3, "name": 'Rambo', 'genre': 'action' },
    { id: 4, "name": 'South Park', 'genre': 'comedy' }
];

router.get('/', (req, res) => {
    res.send(movies)
});

router.get('/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Nao existe esse filme na base de dados')
    res.send(movie)
});

router.post('/', (req, res) => {
    const { error } = validatemovie(res.body);

    if (error) return res.status(400).send(result.error.details)

    const movie = {
        id: movies.length + 1,
        name: req.body.name
    };
    movies.push(movie);
    res.send(movie);
})

router.put('/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Nao existe esse curso na base de dados')

    const { error } = validatemovie(res.body);

    if (error) return res.status(400).send(result.error.details)

    movie.name = req.body.name;

    res.send(movie);

})

router.delete('/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Nao existe esse curso na base de dados')

    const index = movies.indexOf(movie);
    movies.splice(index, 1)

    res.send(movie);
})

function validatemovie(movie) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(movie, schema);
}

module.exports = router;