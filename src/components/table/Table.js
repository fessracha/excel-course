import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import resizeHandler from '@/components/table/table.resize'
import {shouldResize, isCell} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  onMousedown = e => {
    if (shouldResize(e)) {
      // eslint-disable-next-line no-invalid-this
      resizeHandler(this.$root, e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        // eslint-disable-next-line no-invalid-this
        this.selection.selectGroup($target)
      } else {
        // eslint-disable-next-line no-invalid-this
        this.selection.select($target)
      }
    }
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $initCell = this.$root.find(`[data-id="0:0"]`)
    this.selection.select($initCell)
  }

  toHTML() {
    return createTable(10)
  }
}
