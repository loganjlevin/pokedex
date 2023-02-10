let pokemonList = [];

let pokemon = {
  name: 'Bulbasaur',
  height: 0.7,
  weight: 6.9,
  type: ['grass', 'poison'],
};
pokemonList[0] = pokemon;

pokemon = {
  name: 'Charmander',
  height: 0.6,
  weight: 8.5,
  type: ['fire'],
};
pokemonList[1] = pokemon;

pokemon = {
  name: 'Squirtle',
  height: 0.5,
  weight: 9,
  type: ['water'],
};
pokemonList[2] = pokemon;

console.log(pokemonList);
