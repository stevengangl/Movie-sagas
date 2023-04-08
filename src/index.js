import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    //getting movie info from client side 
    yield takeEvery('POST_MOVIE_INFO', postMovieInfo)

    //getting movieGenre info
    yield takeEvery('MOVIE_GENRE', postMovieGenre)
}

//need to get movie genre relations
function* postMovieGenre(action){
    try{
        const genres = yield axios.get('api/genre');
        console.log('trying to get genres', genres.data)
        yield put({ type: 'SET_GENRES', payload: genres.data})
    }catch(error){
        console.log('error in index')
    }
};

//need to get movie id from client side movielist
function* postMovieInfo(action){
    try{                     //action.payload is the id
        console.log('looking at action.payload:', action.payload)
        yield put ({ type: 'SET_SINGLE', payload: action.payload })
    }catch(error) {
        console.log(error)
    }
}

function* fetchAllMovies() {
    // get all movie from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to individual movie 
const single = (state = [], action) => {
    switch (action.type) {
        case 'SET_SINGLE':
            return action.payload;
        default:
            return state;
    }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            console.log('state:',state)
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        single,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
