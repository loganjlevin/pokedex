let pokemonRepository = (function () {
  let t = [],
    e = $('.list-group'),
    a = [];
  $('.form-inline').on('submit', (t) => {
    t.preventDefault();
  });
  function o() {
    return t;
  }
  function p(t) {
    let a = $(
      `<button><img src='${t.sprites.front_default}'/>${
        t.name.charAt(0).toUpperCase() + t.name.slice(1)
      } #${t.id}</button>`
    );
    a.addClass(
      'btn btn-primary btn-lg list-group-item list-group-item-primary col-xs-6 col-sm-4 col-md-3 col-xl-2 m-3 poke-button'
    ),
      a.attr({
        type: 'button',
        'data-toggle': 'modal',
        'data-target': '#exampleModal',
      }),
      a.on('click', () => {
        var e;
        let a, o, p, n, r, i, l, s;
        return (
          (e = t),
          (a = $('.modal-title')),
          (o = $('.modal-body')),
          a.empty(),
          o.empty(),
          (p = $('<h2></h2>')),
          p.text(e.name.charAt(0).toUpperCase() + e.name.slice(1)),
          (n = $('<h2></h2>')),
          n.text(`#${e.id}`),
          (r = $('<img></img>')),
          r.addClass('opacity0'),
          r.on('load', () => setTimeout(() => r.removeClass('opacity0'), 500)),
          r.attr('src', e.sprites.front_default),
          (i = $('<p></p>')),
          i.text(`Height: ${e.height}m`),
          (l = $('<p></p>')),
          l.text(`Weight: ${e.weight}kg`),
          (s = $('<p></p>')),
          void (s.text(
            `Type: ${e.types[0].type.name}${
              e.types[1] ? ', ' + e.types[1].type.name : ''
            }`
          ),
          a.append(p),
          a.append(n),
          o.append(r),
          o.append(i),
          o.append(l),
          o.append(s))
        );
      }),
      e.append(a);
  }
  return (
    $('.form-control').on('input', (t) => {
      var o;
      let n;
      (o = t.target.value),
        (n = []),
        (n = a.filter((t) => !t.name.toLowerCase().indexOf(o.toLowerCase()))),
        e.empty(),
        n.forEach((t) => p(t));
    }),
    {
      getAll: o,
      displayList: function t(e) {
        Promise.all(
          e.map((t) =>
            $.ajax(t.detailsUrl, { dataType: 'json' }).catch((t) =>
              console.log(t)
            )
          )
        ).then((t) => {
          (a = t).forEach((t) => p(t)), $('.spinner-border').addClass('hidden');
        });
      },
      loadList: function e() {
        return (
          $('.spinner-border').removeClass('hidden'),
          $.ajax('https://pokeapi.co/api/v2/pokemon/?limit=493', {
            dataType: 'json',
          })
            .then((e) => {
              e.results.forEach((e) => {
                let a = {
                  name: e.name.charAt(0).toUpperCase() + e.name.slice(1),
                  detailsUrl: e.url,
                };
                t.push(a);
              });
            })
            .catch((t) => {
              console.error(t);
            })
        );
      },
    }
  );
})();
pokemonRepository.loadList().then(() => {
  pokemonRepository.displayList(pokemonRepository.getAll());
});
