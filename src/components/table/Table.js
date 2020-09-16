import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  $resizeEl = {}
  isResizible = false

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup']
    });
  }

  onMousedown(event) {
    this.resizeHandler(event);
  }

  onMouseup(event) {
    this.isResizible = false
    console.log('on mouse up')
  }

  onMousemove(event) {
    // console.log(event.target)
    // if (this.isResizible) {
    //   const $parent = event.target.parentElement
    //   $parent.style.width = `${$parent.clientWidth + 1 + event.movementX}px`
    //   console.log('move resize handler')
    // }
    if(this.isResizible) {
      event.target
    }
  }

  resizeHandler(event) {
    this.$resizeEl = event.target
    const resizeType = event.target.dataset.resize

    this.isResizible = true

    if (resizeType === 'row') {
      console.log('resize row')
    } else if (resizeType === 'col') {
      console.log('resize col')
    }
  }

  toHTML() {
    return createTable(20)
  }
}
