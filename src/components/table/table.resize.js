import {$} from '@core/dom';

export default function resizeHandler($root, event) {
  return new Promise( resolve => {
    const $resizer = $(event.target)
    const resizeType = $resizer.data.resize
    const $resizable = $resizer.closest('[data-type=resizable]')
    const coords = $resizable.getCoords()
    let mousemoveHandler = null
    let resizerOffset = null
    let mouseupHandler = null

    if (resizeType === 'col') {
      let changeCol = null
      $resizer.$el.classList.add('col-resize-active')
      changeCol = $resizable.data.col
      mousemoveHandler = e => {
        resizerOffset = coords.right - e.pageX
        $resizer.css({
          right: `${resizerOffset}px`
        })
      }
      mouseupHandler = () => {
        const value = (resizerOffset * -1) + coords.width
        const $cells = $root.findAll(`[data-col="${changeCol}"]`)
        $cells.forEach($cell => {
          $cell = $($cell)
          $cell.css({
            width: `${value}px`
          })
        })
        $resizer.css({right: '0px'})
        $resizer.$el.classList.remove('col-resize-active', 'row-resize-active')
        resolve({
          value,
          id: $resizable.data.col
        })
        document.onmousemove = null
        document.onmouseup = null
      }
    } else if (resizeType === 'row') {
      $resizer.$el.classList.add('row-resize-active')
      mousemoveHandler = e => {
        resizerOffset = coords.bottom - e.pageY
        $resizer.css({
          bottom: `${resizerOffset}px`
        })
      }
      mouseupHandler = e => {
        const value = (resizerOffset * -1) + coords.height
        $resizable.css({
          height: `${value}px`
        })
        $resizer.css({
          bottom: '0px'
        })
        $resizer.$el.classList.remove('col-resize-active', 'row-resize-active')
        resolve({
          value,
          id: null
        })
        document.onmousemove = null
        document.onmouseup = null
      }
    }

    document.onmousemove = mousemoveHandler
    document.onmouseup = mouseupHandler
  })
}