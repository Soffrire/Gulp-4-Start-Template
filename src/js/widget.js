function pageWidget(pages) {
  const widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>')

  widgetWrap.prependTo('body')

    $(
      `
        <li class='widget_item'><a class='widget_link' href='/img/sprite/symbol/sprite.symbol.html' target='_blank'>sprite</a></li>
        <li class='widget_item'><a class='widget_link' href='/ui.html' target='_blank'>UI Kit</a></li>
        <hr>
      `
    ).appendTo('.widget_list')

  for (let i = 0; i < pages.length; i++)
    $(
      `
        <li class='widget_item'><a class='widget_link' href='/${pages[i]}.html'>${pages[i]}</a></li>
      `
    ).appendTo('.widget_list')

  const widgetStyle = $(
    '<style>body {position:relative} .widget_list{padding-left: 0; list-style: none} .widget_wrap{position:fixed;top:0;left:0;z-index:999999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;display: flex; width: 100%;}.widget_link:hover{text-decoration:underline}.widget_list{max-height: 95vh; overflow-y: auto} </style>'
  )
  widgetStyle.prependTo('.widget_wrap')
}

pageWidget(['index'])
