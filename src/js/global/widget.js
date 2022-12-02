// noinspection HtmlUnknownTarget

const pagesWidget = pages => {
  const $widget = $('<div class="widget"><ul class="widget__list"></ul></div>')

  $widget.prependTo('body')

  $(`
    <li class='widget__item'>
      <a class='widget__link' href='/media/sprite/symbol/sprite.symbol.html' target='_blank'>Sprite</a>
    </li>
    <li class='widget__item'>
      <a class='widget__link' href='/ui.html' target='_blank'>UI Kit</a>
    </li>
    <hr>
  `).appendTo('.widget__list')

  pages.forEach(page => {
    $(`
      <li class='widget__item'>
        <a class='widget__link' href='/${page}.html'>${page}</a>
      </li>
    `).appendTo('.widget__list')
  })
}

pagesWidget([
  'index',
  'news',
  'articles',
])
