import {$} from '@core/dom'

export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  clearSelected() {
    this.group.forEach($item => $item.removeClass(TableSelection.className))
    this.group = []
  }

  select($el) {
    this.clearSelected()
    this.group.push($el)
    this.current = $el
    $el.focus().addClass(TableSelection.className)
  }

  selectGroup($to) {
    const rowMin = Math.min(this.current.id(true).row, $to.id(true).row)
    const rowMax = Math.max(this.current.id(true).row, $to.id(true).row)
    const colMin = Math.min(this.current.id(true).col, $to.id(true).col)
    const colMax = Math.max(this.current.id(true).col, $to.id(true).col)

    this.clearSelected()

    for (let i = rowMin; i <= rowMax; i++) {
      for (let j = colMin; j <= colMax; j++) {
        const $el = $(`[data-id="${i}:${j}"]`)
        $el.addClass(TableSelection.className)
        this.group.push($el)
      }
    }
  }
}