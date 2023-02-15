let pokemonRepository = (function () {
  let pokemonList = [];
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
    let filteredList = [];
    filteredList = pokemonList.filter((pokemon) => {
      // if the search input is at the zero index of pokemon name
      // add it to filtered list (capitalization doesnt matter)
      return !pokemon.name.toLowerCase().indexOf(name.toLowerCase());
    });
    // clear the displayed list
    list.empty();
    // add every pokemon in the filtered list
    filteredList.forEach((pokemon) => addListItem(pokemon));
  }

  function addListItem(pokemon) {
    loadDetails(pokemon).then(() => {
      let button = $(
        `<button><img src='${pokemon.imageUrl}'/>${pokemon.name}</button>`
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
    });
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

  function loadList() {
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

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return $.ajax(url, { dataType: 'json' })
      .then((details) => {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types;
      })
      .catch((err) => {
        console.error(err);
      });
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
