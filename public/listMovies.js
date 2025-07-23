let currentList = []
let movies = []
let alphabetically = []
let reverseAlphabetically = []
let directorAlphabetically = []
let releaseYear = [];

/**
 * this function returns all movies in the sqlite database unordered
 */
async function loadMovies() {

  const response = await fetch('../movies');
  movies = await response.json();
  console.log(movies)

  loadOrderAlphabetically();
  loadOrderReverseAlphabetically();
  loadOrderDirectorAlphabetically();
  loadOrderDirectorReverseAlphabetically();
  loadOrderReleaseYear();
  loadOrderReverseReleaseYear();

  populateGenreDropDown(movies);

  currentList = alphabetically
  displayMovies(currentList)


}


/*orders alphabetically (A-Z)  */
function loadOrderAlphabetically() {
  alphabetically = [...movies].sort((a, b) => a.title.localeCompare(b.title));
  console.log(alphabetically);
}


/*orders reverse (Z-A)  */
function loadOrderReverseAlphabetically() {
  reverseAlphabetically = [...alphabetically].reverse();
  console.log(reverseAlphabetically);
}


/*load by director*/

function loadOrderDirectorAlphabetically() {
  directorAlphabetically = [...movies].sort((a, b) => a.director.localeCompare(b.director))
  console.log(directorAlphabetically);
}

function loadOrderDirectorReverseAlphabetically() {
  directorReverse = [...directorAlphabetically].reverse();
  console.log(directorReverse)
}

function loadOrderReleaseYear() {
  releaseYear = [...movies].sort((a, b) => a.release_year - b.release_year)
  console.log(releaseYear)
}

function loadOrderReverseReleaseYear() {
  reverseReleaseYear = [...releaseYear].reverse();
  console.log(reverseReleaseYear)
}





/*function to display the movies onto the html*/

function displayMovies(list) {
  const container = document.getElementById('movieContainer');
  container.innerHTML = '';

  list.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movieCard';

    card.innerHTML = `
      <h2>${movie.title}</h2>
      <p><strong>Director:</strong> ${movie.director || 'Unknown'}</p>
      <p><strong>Year:</strong> ${movie.release_year}</p>
      <p><strong>Genre:</strong> ${movie.genre}</p>
    `;

    container.appendChild(card);
  });
}




function populateGenreDropDown(movies) {
  const genreSelect = document.getElementById('genreSelect');
  const genres = [...new Set(movies.map(movie => movie.genre))].sort();

  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });
}

/*EVENT LISTENERS*/

/*function to handle the sorting changes*/

document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.getElementById('sortSelect');
  const genreSelect = document.getElementById('genreSelect');

  genreSelect.addEventListener('change', applyGenreFilterAndDisplay);

  sortSelect.addEventListener('change', () => {
    switch (sortSelect.value) {
      case 'alphabetical':
        currentList = alphabetically;
        break;
      case 'reverseAlphabetical':
        currentList = reverseAlphabetically;
        break;
      case 'director':
        currentList = directorAlphabetically;
        break;
      case 'directorReverse':
        currentList = directorReverse;
        break;
      case 'year':
        currentList = releaseYear;
        break;
      case 'yearReverse':
        currentList = reverseReleaseYear;
        break;
    }

    applyGenreFilterAndDisplay();



  })
})

function applyGenreFilterAndDisplay() {
  const selectedGenre = document.getElementById('genreSelect').value

  if (selectedGenre === 'all') {
    displayMovies(currentList);
  } else {
    const filtered = currentList.filter(movie => movie.genre === selectedGenre);
    displayMovies(filtered);
  }
}


/*run*/
loadMovies();





