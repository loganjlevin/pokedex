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
    let button = $('<button></button>');
    button.text(pokemon.name);
    button.addClass(
      'btn btn-primary btn-lg list-group-item list-group-item-primary col-4 mt-3 ml-3'
    );
    button.attr({
      type: 'button',
      'data-toggle': 'modal',
      'data-target': '#exampleModal',
    });
    button.on('click', () => showDetails(pokemon));
    list.append(button);
  }

  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $('<h2></h2>');
    pokemonName.text(pokemon.name);

    let pokemonImage = $('<img></img>');
    pokemonImage.attr('src', pokemon.imageUrl);

    let pokemonHeight = $('<p></p>');
    pokemonHeight.text(`Height: ${pokemon.height}m`);

    let pokemonWeight = $('<p></p>');
    pokemonWeight.text(`Weight: ${pokemon.weight}kg`);

    let pokemonTypes = $('<p></p>');
    pokemonTypes.text(
      `Type: ${pokemon.types[0].type.name}${
        pokemon.types[1] ? ', ' + pokemon.types[1].type.name : ''
      }`
    );

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
    });
  }

  function loadList() {
    showLoadMessage();
    return $.ajax(apiUrl, { dataType: 'json' })
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
    return $.ajax(url, { dataType: 'json' })
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
    let message = $('.load-message');
    message.removeClass('hidden');
  }

  function hideLoadingMessage() {
    let message = $('.load-message');
    message.addClass('hidden');
  }

  return {
    getAll,
    addListItem,
    loadList,
  };
})();

let list = $('.list-group');

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
