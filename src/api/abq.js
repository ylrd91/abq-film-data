const ENDPOINT_URL = 'https://c2t-cabq-open-data.s3.amazonaws.com/film-locations-json-all-records_03-19-2020.json';

const convertData = (data) => {
  const moviesTitles = [];

  const moviesWithLocations = data.features
    .filter((feature) => feature.attributes.Type === 'Movie')
    .reduce((accum, current) => {
      const { Title: movieTitle } = current.attributes;
      if (!accum[movieTitle]) {
        moviesTitles.push(movieTitle);
        Object.assign(accum, {
          [movieTitle]: { title: movieTitle, locations: [] },
        });
      }
      accum[movieTitle].locations.push({
        id: current.attributes.OBJECTID,
        address: current.attributes.Address,
        site: current.attributes.Site,
        originalDetais: current.attributes.OriginalDetails,
        shootDate: new Date(current.attributes.ShootDate).toLocaleDateString(),
        geometry: { lat: current.geometry.y, lng: current.geometry.x },
      });
      return accum;
    }, {});

  return { moviesTitles, moviesWithLocations };
};

const fetchData = () => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  return fetch(proxy + ENDPOINT_URL)
    .then((response) => response.json())
    .then((data) => convertData(data));
};

export default fetchData;
