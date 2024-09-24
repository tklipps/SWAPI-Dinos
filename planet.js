let nameH1;
let climateSpan;
let terrainSpan;
let diameterSpan;
let filmDiv;
let characterDiv;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#planetName');
  climateSpan = document.querySelector('span#climate');
  diameterSpan = document.querySelector('span#diameter');
  terrainSpan = document.querySelector('span#terrain');
  characterSpan = document.querySelector('span#character');
  filmsUl = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchCharacter(id)
    planet.character = await fetchChar(planet)
    planet.films = await fetchFilms(planet)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);

}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planet/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchChar(planet) {
  const url = `${baseUrl}/character/${planet?.character}`;
  const character = await fetch(url)
    .then(res => res.json())
  return character;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planet/${planet?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  terrainSpan.textContent = planet?.mass;
  diameterSpan.textContent = planet?.diameter;
  characterSpan.innerHTML = `<a href="/character.html?id=${planet?.character.id}">${planet?.character.name}</a>`;
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
}
