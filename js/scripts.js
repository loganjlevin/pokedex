let pokemonRepository = (function () {
  let pokemonList = [];
  let pokemonDetailsArray = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=493';

  // prevent submit on search form
  let form = $('.form-inline');
  form.on('submit', (event) => {
    event.preventDefault();
  });

  // setup listener for search to filter pokemon list
  let searchInput = $('.form-control');
  searchInput.on('input', (event) => {
    search(event.target.value);
  });

  // returns all pokemon
  function getAll() {
    return pokemonList;
  }

  function search(name) {
    showLoadSpinner();
    let filteredList = [];
    filteredList = pokemonList.filter((pokemon) => {
      // if the search input is at the zero index of pokemon name
      // add it to filtered list (capitalization doesnt matter)
      return !pokemon.name.toLowerCase().indexOf(name.toLowerCase());
    });
    // clear the displayed list
    list.empty();
    // add every pokemon in the filtered list

    displayList(filteredList);
  }

  function addListItem(pokemon) {
    let button = $(
      `<button><img src='${pokemon.sprites.front_default}'/>${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      } #${pokemon.id}</button>`
    );
    button.addClass(
      'btn btn-primary btn-lg list-group-item list-group-item-primary col-xs-6 col-sm-4 col-md-3 col-xl-2 m-3 poke-button'
    );
    button.attr({
      type: 'button',
      'data-toggle': 'modal',
      'data-target': '#exampleModal',
    });
    button.on('click', () => showModal(pokemon));
    list.append(button);
  }

  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $('<h2></h2>');
    pokemonName.text(
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    );

    let pokemonId = $('<h2></h2>');
    pokemonId.text(`#${pokemon.id}`);

    let pokemonImage = $('<img></img>');
    pokemonImage.attr('src', pokemon.sprites.front_default);

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
    modalTitle.append(pokemonId);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
  }

  function loadList() {
    showLoadSpinner();
    // fetch all pokemon (name, details Url)
    return $.ajax(apiUrl, { dataType: 'json' })
      .then((json) => {
        json.results.forEach((item) => {
          // assign name, details Url and image Url to pokemon object
          let pokemon = {
            name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            detailsUrl: item.url,
          };
          // push pokemon object to the pokemon list
          pokemonList.push(pokemon);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function displayList(list) {
    Promise.all(
      list.map((pokemon) => {
        return $.ajax(pokemon.detailsUrl, { dataType: 'json' }).catch((err) =>
          console.log(err)
        );
      })
    ).then((details) => {
      pokemonDetailsArray = details;
      pokemonDetailsArray.forEach((pokemon) => addListItem(pokemon));

      hideLoadSpinner();
    });
  }

  function showLoadSpinner() {
    $('.spinner-border').removeClass('hidden');
  }
  function hideLoadSpinner() {
    $('.spinner-border').addClass('hidden');
  }
  return {
    getAll,
    displayList,
    loadList,
  };
})();

let list = $('.list-group');

pokemonRepository.loadList().then(() => {
  pokemonRepository.displayList(pokemonRepository.getAll());
});
