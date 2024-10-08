let nameH1;
let releaseDate;
let director;
let episode;
let planetsUl;
let charactersUl;
let producer;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#film');
    releaseDate = document.querySelector('span#release_date');
    director = document.querySelector('span#director');
    producer = document.querySelector('span#producer');
    episode = document.querySelector('span#episode');
    planetsUl = document.querySelector('#planets>ul');
    charatersUl = document.querySelector('#characters>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });

  async function getFilm(id) {
    let film;
    try {
      film = await fetchFilm(id)
      film.planets = await fetchPlanets(film.id)
      film.characters = await fetchCharacters(film.id)
    }
    catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
  }

  async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    return await fetch(filmUrl)
      .then(res => res.json())
  }

  async function fetchCharacters(id) {
    let charactersUrl = `${baseUrl}/films/${id}/characters`;
    return await fetch(charactersUrl)
      .then(res => res.json())
  }

  async function fetchPlanets(id) {
    let planetsUrl = `${baseUrl}/films/${id}/planets`;
    return await fetch(planetsUrl)
      .then(res => res.json())
  }

  const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
    nameH1.textContent = film?.title;
    releaseDate.textContent = film?.release_date;
    director.textContent = film?.director;
    episode.textContent = film?.episode_id;
    producer.textContent = film?.producer;

    const planets = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`);
    console.log(planets);
    planetsUl.innerHTML = planets.join("");

    const characters = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`);
    charatersUl.innerHTML = characters.join("");
  }

