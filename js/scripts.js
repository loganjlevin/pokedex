let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    // if pokemon is an object and the keys match...
    if (
      pokemon &&
      pokemon.name &&
      pokemon.detailsUrl &&
      pokemon.name.trim().length !== 0 &&
      pokemon.detailsUrl.trim().length !== 0
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
    button.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector('.modal-container');

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', hideModal);

    let pokemonName = document.createElement('h1');
    pokemonName.innerHTML =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let pokemonHeight = document.createElement('p');
    pokemonHeight.innerHTML = `Height: ${pokemon.height}m`;

    let pokemonWeight = document.createElement('p');
    pokemonWeight.innerHTML = `Weight: ${pokemon.weight}kg`;

    let pokemonTypes = document.createElement('p');
    pokemonTypes.innerHTML = `Types: ${pokemon.types[0]}`;

    modal.appendChild(closeButton);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonWeight);
    modal.appendChild(pokemonTypes);
    modalContainer.appendChild(modal);

    modalContainer.classList.remove('hidden');
    modalContainer.addEventListener('click', (event) => {
      if (event.target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    document.querySelector('.modal-container').classList.add('hidden');
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
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
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
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
    addListItem,
    loadList,
  };
})();

let list = document.querySelector('ul');

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
