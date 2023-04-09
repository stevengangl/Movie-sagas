import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
function MovieDetails() {

    const history = useHistory();

    const movieId = useSelector(store => store.single)
    // const movies = useSelector(store => store.movies)
    const movieGenre = useSelector(store => store.genres)

    console.log('movie info ', movieId);
    // console.log('movies', movies);
    
    function goBack(){
        history.push('/movielist')
    }

return (
<>
<br></br>
    <button onClick={goBack} >Back</button>
<div>
    <p>{movieId.title}</p>
    <img src={movieId.poster}/>
    <p>{movieId.description}</p>
    {/* movie genres here, need to join tables to do this  */}
    {movieGenre.map(genre => (
        <div key={genre.genres_id}>{genre.genre}</div>
    ))}
</div>
</>
)
}

export default MovieDetails;