let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  $(window).on('keydown', (event) => {
    if (event.key === 'Escape' && !$('.modal-container').hasClass('hidden')) {
      hideModal();
    }
  });

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
    let listItem = $('<li></li>');
    let button = $('<button></button>');
    button.text(pokemon.name);
    button.addClass('poke-button');
    button.addClass('group-list-item');
    listItem.append(button);
    list.append(listItem);
    button.on('click', () => {
      showDetails(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalContainer = $('.modal-container');
    modalContainer.removeClass('hidden');

    modalContainer.html = '';

    let modal = $('<div></div>');
    modal.addClass('modal');

    let closeButton = $('<button></button');
    closeButton.addClass('modal-close');
    closeButton.text('Close');
    closeButton.on('click', hideModal);

    let pokemonName = $('<h2></h2>');
    pokemonName.text(
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    );

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

    modal.append(closeButton);
    modal.append(pokemonName);
    modal.append(pokemonImage);
    modal.append(pokemonHeight);
    modal.append(pokemonWeight);
    modal.append(pokemonTypes);
    modalContainer.append(modal);

    modalContainer.on('click', (event) => {
      if (event.target === event.currentTarget) {
        hideModal();
      }
    });
  }

  function hideModal() {
    $('.modal-container').addClass('hidden');
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

let list = $('ul');

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
