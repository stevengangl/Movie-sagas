import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

function MovieList() {

    const [movieInfo, setMovieInfo] = useState('');
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);


    
    const handleClick = (event, id) => {
        event.preventDefault();
        setMovieInfo(id)
        console.log('looking at movieInfo ID:', movieInfo)
        dispatch({
            type: 'POST_MOVIE_INFO',
            payload:  id
        });
        history.push('/moviedetails')

    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img onClick={(event) => handleClick(event, movie)} src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;