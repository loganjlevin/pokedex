let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    // if pokemon is an object and the keys match...
    if (
      typeof pokemon === 'object' &&
      typeof pokemon.name === 'string' &&
      typeof pokemon.detailsUrl === 'string'
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
    loadDetails(pokemon).then(() => {
      console.log(pokemon);
    });
  }

  function loadList() {
    showLoadMessage();
    return fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
        hideLoadingMessage();
      })
      .catch((err) => {
        hideLoadingMessage();
        console.error(err);
      });
  }

  function loadDetails(item) {
    showLoadMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((details) => {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        hideLoadingMessage();
      })
      .catch((err) => {
        hideLoadingMessage();
        console.error(err);
      });
  }

  function showLoadMessage() {
    let message = document.querySelector('.load-message');
    message.classList.remove('hidden');
  }

  function hideLoadingMessage() {
    let message = document.querySelector('.load-message');
    message.classList.add('hidden');
  }

  return {
    getAll,
    add,
    search,
    addListItem,
    loadList,
    loadDetails,
  };
})();

let list = document.querySelector('ul');

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
