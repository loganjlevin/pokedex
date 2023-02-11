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
    // if pokemon is an object...
    if (typeof pokemon === 'object') {
      const pokemonKeys = Object.keys(pokemon);
      // and the keys match...
      if (
        pokemonKeys[0] === 'name' &&
        pokemonKeys[1] === 'height' &&
        pokemonKeys[2] === 'weight' &&
        pokemonKeys[3] === 'type'
      ) {
        // push the pokemon on the list
        pokemonList.push(pokemon);
      } else {
        console.log('Not a valid pokemon');
      }
    } else {
      console.log('Not a valid pokemon');
    }
  }

  function search(name) {
    return pokemonList.filter((pokemon) => pokemon.name === name);
  }
  return {
    getAll,
    add,
    search,
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

// Write pokemon list to the browser
pokemonRepository.getAll().forEach((pokemon) => {
  document.write(`${pokemon.name} (height: ${pokemon.height} m)`);
  // If height is greater than 1.9 m then output "Wow, that's big!"
  pokemon.height > 1.9
    ? document.write(` - Wow, that's big!<br /><br />`)
    : document.write(`<br /><br />`);
});

// Search for Charmander by name and print to console
console.log(pokemonRepository.search('Charmander'));
