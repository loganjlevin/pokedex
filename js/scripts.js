let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      weight: 6.9,
      type: ['grass', 'poison'],
    },
    {
      name: 'Ivysaur',
      height: 1,
      weight: 13,
      type: ['grass', 'poison'],
    },
    {
      name: 'Venusaur',
      height: 2,
      weight: 100,
      type: ['grass', 'poison'],
    },
    {
      name: 'Charmander',
      height: 0.6,
      weight: 8.5,
      type: ['fire'],
    },
    {
      name: 'Charmeleon',
      height: 1.1,
      weight: 19,
      type: ['grass', 'poison'],
    },
    {
      name: 'Charizard',
      height: 1.7,
      weight: 90.5,
      type: ['grass', 'poison'],
    },
    {
      name: 'Squirtle',
      height: 0.5,
      weight: 9,
      type: ['water'],
    },
    {
      name: 'Wartortle',
      height: 1,
      weight: 22.5,
      type: ['water'],
    },
    {
      name: 'Blastoise',
      height: 1.6,
      weight: 85.5,
      type: ['water'],
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    // if pokemon is an object and the keys match...
    if (
      typeof pokemon === 'object' &&
      typeof pokemon.name === 'string' &&
      typeof pokemon.height === 'number' &&
      typeof pokemon.weight === 'number' &&
      Array.isArray(pokemon.type)
    ) {
      // then push the pokemon on the list
      pokemonList.push(pokemon);
    } else {
      console.log('Not a valid pokemon');
    }
  }

  function search(name) {
    return pokemonList.filter((pokemon) => pokemon.name === name);
  }

  function addListItem(pokemon) {
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('poke-button');
    listItem.appendChild(button);
    list.appendChild(listItem);
    button.addEventListener('click', () => showDetails(pokemon));
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }
  return {
    getAll,
    add,
    search,
    addListItem,
  };
})();

// create new pokemon object
let weedle = {
  name: 'Weedle',
  height: 0.3,
  weight: 3.2,
  type: ['bug', 'poison'],
};
// add weedle to the repository
pokemonRepository.add(weedle);

let list = document.querySelector('ul');
// Write pokemon list to the browser
pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});

// Search for Charmander by name and print to console
console.log(pokemonRepository.search('Charmander'));
