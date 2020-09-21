import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom.js'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  $resizeEl = null
  isResizible = false

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mouseup', 'mousemove']
    });
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target)
      this.$resizeEl = $resizer.closest('[data-type=resizable]')
      this.isResizible = true
    }
  }

  onMouseup() {
    console.log('onmouseup')
    this.isResizible = false
  }

  onMousemove(event) {
    if (this.isResizible) {
      const delta = event.pageX - this.$resizeEl.getCoords().x
      this.$resizeEl.$el.style.minWidth = `${delta}px`
    }
  }

  toHTML() {
    return createTable(20)
  }
}
