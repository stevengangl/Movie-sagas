const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Add query to get all genres
  console.log('in router req.params')
  const query = `
  SELECT movies.title, genres.name AS genre, movies.id, genres.id AS genres_id
  FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON genres.id = movies_genres.genre_id
  WHERE movies.id = $1;`
  pool.query(query, [req.params.id])
    .then(result => {
      // console.log('in genreRouter', result.rows)
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error in get')
      res.sendStatus(500)

    })
});

module.exports = router;



