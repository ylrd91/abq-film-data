import React, { useEffect, useState } from 'react';
import Map from './components/Map';
import fetchData from './api/abq';

function App() {
  const [state, setState] = useState({
    isLoading: true,
    selectedLocations: null,
    moviesTitles: null,
    moviesWithLocations: null,
  });

  useEffect(() => {
    fetchData().then(({ moviesTitles, moviesWithLocations }) => {
      setState((s) => ({
        ...s,
        isLoading: false,
        moviesTitles,
        moviesWithLocations,
      }));
    });
  }, []);

  function selectMovie(movieTitle) {
    const movie = state.moviesWithLocations[movieTitle];
    const locations = Object.keys(movie.locations).map((locationId) => ({
      locationId,
      ...movie.locations[locationId],
    }));
    setState({
      ...state,
      selectedLocations: locations,
    });
  }

  if (state.isLoading) {
    return 'Loading ...';
  }

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute left-0 bottom-0 bg-gray-900 z-10 text-white rounded w-full sm:w-auto">
        <select
          className="text-lg bg-gray-900 text-white font-medium h-10 rounded-lg border-white border-2 w-full"
          onChange={(e) => selectMovie(e.currentTarget.value)}
          defaultValue="select-a-movie"
        >
          <option value="select-a-movie" disabled>Select a movie</option>
          {state.moviesTitles.map((movieTitle) => (
            <option key={movieTitle} value={movieTitle}>{movieTitle}</option>
          ))}
        </select>
      </div>
      <Map locations={state.selectedLocations} />
    </div>
  );
}

export default App;
