import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>   

        {/* LINKS */}

        {/* link to home page */}
        <Router>
          <Link to='/movielist'>Movie List</Link>
        </Router>

        <Router>
          <Link to='/moviedetails'>Movie Details</Link>
        </Router>

            {/*PATHS*/}

          {/* Path to movie details */}
        <Route path='/moviedetails'>
          <MovieDetails />
        </Route>

        {/* Path to Movie List page */}
        <Route path="/movielist" exact>
          <MovieList />
        </Route>
        
        

        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
