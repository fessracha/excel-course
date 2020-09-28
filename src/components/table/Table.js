import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import resizeHandler from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions';

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
    }
  }

  toHTML() {
    return createTable(10)
  }
}
