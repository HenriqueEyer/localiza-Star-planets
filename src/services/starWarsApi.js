const STARWARS_API = 'https://swapi.co/api/planets/';

const getStarWarsPlanets = () => (
  fetch(`${STARWARS_API}`)
    .then((response) => (
      response.json().then((json) => response && Promise.resolve(json)))));

export default getStarWarsPlanets;
