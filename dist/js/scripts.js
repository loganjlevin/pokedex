let pokemonRepository = (function () {
    let t = [],
      e = [];
    $('.form-inline').on('submit', (t) => {
      t.preventDefault();
    });
    function a() {
      return t;
    }
    function o(t) {
      let e = $(
        `<button><img src='${t.sprites.front_default}'/>${
          t.name.charAt(0).toUpperCase() + t.name.slice(1)
        } #${t.id}</button>`
      );
      e.addClass(
        'btn btn-primary btn-lg list-group-item list-group-item-primary col-xs-6 col-sm-4 col-md-3 col-xl-2 m-3 poke-button'
      ),
        e.attr({
          type: 'button',
          'data-toggle': 'modal',
          'data-target': '#exampleModal',
        }),
        e.on('click', () => {
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
        list.append(e);
    }
    return (
      $('.form-control').on('input', (t) => {
        var a;
        let p;
        (a = t.target.value),
          (p = []),
          (p = e.filter((t) => !t.name.toLowerCase().indexOf(a.toLowerCase()))),
          list.empty(),
          p.forEach((t) => o(t));
      }),
      {
        getAll: a,
        displayList: function t(a) {
          Promise.all(
            a.map((t) =>
              $.ajax(t.detailsUrl, { dataType: 'json' }).catch((t) =>
                console.log(t)
              )
            )
          ).then((t) => {
            (e = t).forEach((t) => o(t)),
              $('.spinner-border').addClass('hidden');
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
  })(),
  list = $('.list-group');
pokemonRepository.loadList().then(() => {
  pokemonRepository.displayList(pokemonRepository.getAll());
});
