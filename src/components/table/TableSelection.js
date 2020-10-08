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
    $el.addClass(TableSelection.className)
  }

  selectGroup($to) {
    // Определяем размерность матрицы
    const rowMin = Math.min(this.current.id(true).row, $to.id(true).row)
    const rowMax = Math.max(this.current.id(true).row, $to.id(true).row)
    const colMin = Math.min(this.current.id(true).col, $to.id(true).col)
    const colMax = Math.max(this.current.id(true).col, $to.id(true).col)

    // Заполняем матрицу
    const matrix = []

    for (let i = rowMin; i <= rowMax; i++) {
      const row = []
      for (let j = colMin; j <= colMax; j++) {
        const col = [i, j]
        row.push(col)
      }
      matrix.push(row)
    }

    this.clearSelected()

    // Заполняем массив group
    for (let row = 0; row <= matrix.length - 1; row++) {
      for (let cell = 0; cell <= matrix[row].length - 1; cell++) {
        const $el =
          $(`[data-id="${matrix[row][cell][0]}:${matrix[row][cell][1]}"]`)
        $el.addClass(TableSelection.className)
        this.group.push($el)
      }
    }
    console.log(this.group)
  }
}