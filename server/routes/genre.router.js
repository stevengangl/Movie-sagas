const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  console.log('in router')
  const query = `
  SELECT movies.title, genres.name, movies.id
  FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON genres.id = movies_genres.genre_id
  WHERE movies.id = $1;`
  pool.query(query, [])
    .then(result => {
      console.log('in genreRouter')
      res.send(result.rows);
    })
    .catch(error => {
      res.sendStatus(500)

    })
});

module.exports = router;


// router.get('/', (req, res) => {

//   const query = `SELECT * FROM movies ORDER BY "title" ASC`;
//   pool.query(query)
//     .then( result => {
//       console.log('hello')
//       res.send(result.rows);
//     })
//     .catch(err => {
//       console.log('ERROR: Get all movies', err);
//       res.sendStatus(500)
//     })

// });
