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
    type: ['grass', 'poison'],
  },
  {
    name: 'Blastoise',
    height: 1.6,
    weight: 85.5,
    type: ['grass', 'poison'],
  },
];

// Write pokemon list to the browser
for (let i = 0; i < pokemonList.length; i++) {
  document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height} m)`);
  // If height is greater than 1.9 m then output "Wow, that's big!"
  pokemonList[i].height > 1.9
    ? document.write(` - Wow, that's big!<br /><br />`)
    : document.write(`<br /><br />`);
}
