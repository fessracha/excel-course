import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from '@/components/table/table.template'
import resizeHandler from '@/components/table/table.resize'
import {shouldResize, isCell, nextSelector} from './table.functions'
import {TableSelection} from '@/components/table/TableSelection'
export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(this.$root, e)
      this.$dispatch({type: 'TABLE_RESIZE', data})
    } catch (e) {
      console.warn(e.message)
    }
  }

  onMousedown = e => {
    if (shouldResize(e)) {
      this.resizeTable(e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        this.selection.selectGroup($target)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown = e => {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]

    const {key} = e

    // TODO исправь проблему no-invalid-this
    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next)
    }
  }

  onInput = e => {
    this.$emit('table:input', $(e.target))
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    this.$dispatch({ type: 'TEST'})
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', (keyCode) => {
      this.selection.current.focus()
    })
    const $initCell = this.$root.find(`[data-id="0:0"]`)
    this.selectCell($initCell)

    this.$subscribe( state => {
      console.log('TableState', state)
    })
  }

  toHTML() {
    return createTable(10)
  }
}

