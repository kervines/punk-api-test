const idEl = document.querySelector('.id');
const nameEl = document.querySelector('.name-beer');

const descriptionEl = document.querySelector('.description .paragraph');
const imageEl = document.querySelector('.bg-image img');

const maltEl = document.querySelector('.malt div');
const hopsEl = document.querySelector('.hops div');
const yeastEl = document.querySelector('.yeast div');
const foodPairingEl = document.querySelector('.beer-pairing div');

const abvEl = document.querySelector('.abv .progress-bar span');
const ibuEl = document.querySelector('.ibu .progress-bar span');
const abvPercentEl = document.querySelector('.abv-percent');
const ibuPercentEl = document.querySelector('.ibu-percent');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let numberId = 1;

nextBtn.addEventListener('click', (event) => {
  numberId++;
  cleanElement();
  apiPunk();
});

prevBtn.addEventListener('click', (event) => {
  if (numberId > 1) {
    numberId--;
    cleanElement();
    apiPunk();
  }
});

async function apiPunk() {
  const punkAPI = await fetch(`https://api.punkapi.com/v2/beers/${numberId}`);
  const beerJSON = (await punkAPI.json())[0];

  idEl.innerText = `#${beerJSON.id}`;
  nameEl.innerText = beerJSON.name;
  imageEl.setAttribute('src', beerJSON.image_url);

  descriptionEl.innerHTML = '';
  const pDescription = beerJSON.description;
  createTag(pDescription, descriptionEl, 'p');

  const maltArray = beerJSON.ingredients.malt;
  for (const malt of maltArray) {
    createTag(malt.name, maltEl, 'span');
  }

  const hopsArray = beerJSON.ingredients.hops;
  const newHopsArray = new Set();
  hopsArray.forEach((hop) => {
    newHopsArray.add(hop.name);
  });
  for (const hop of newHopsArray) {
    createTag(hop, hopsEl, 'span');
  }

  console.log(beerJSON);
  const yeast = beerJSON.ingredients.yeast;
  createTag(yeast, yeastEl, 'span');

  const foodPairing = beerJSON.food_pairing;
  for (const pairing of foodPairing) {
    createTag(pairing, foodPairingEl, 'li');
  }

  abvPercentEl.innerText = `${beerJSON.abv}%`;
  ibuPercentEl.innerText = `${beerJSON.ibu}`;
}
apiPunk();

function createTag(content, element, type) {
  const tag = document.createElement(type);
  tag.innerText = content;
  element.appendChild(tag);
}

function cleanElement() {
  maltEl.innerHTML = '';
  hopsEl.innerHTML = '';
  yeastEl.innerHTML = '';
  foodPairingEl.innerHTML = '';
}
