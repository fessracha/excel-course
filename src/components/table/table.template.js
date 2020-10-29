const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_COL_WIDTH = 120
const DEFAULT_ROW_HEIGHT = 20

function toCell(row, state) {
  return (_, col) => {
    const width = getWidth(state.colState, col)
    const content = getContent(state.dataState, row, col)
    return `
      <div 
        class="cell" 
        contenteditable
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        style="width: ${width}">
        ${content}
      </div>
    `
  }
}

function getWidth(state = [], idx) {
  return state[idx] ? `${state[idx]}px` : `${DEFAULT_COL_WIDTH}px`
}

function getHeight(state = [], idx) {
  return state[idx] ? `${state[idx]}px` : `${DEFAULT_ROW_HEIGHT}px`
}

function getContent(state, row, col) {
  return state[`${row}:${col}`] ? state[`${row}:${col}`] : ''
}

function withWidthFrom(state) {
  return (col, idx) => {
    return {col, idx, width: getWidth(state.colState, idx)}
  }
}

function toColumn({col, idx, width}) {
  return `
    <div class="column" 
         data-type="resizable" 
         data-col="${idx}"
         style="width: ${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content, state) {
  const height = getHeight(state.rowState, index)
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''
  return `
    <div class="row" data-type="resizable" data-row="${index}" 
        style="min-height: ${height}">
      <div class="row-info">
          ${index ? index : ''}
          ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15, state) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(0, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('')

    rows.push(createRow(row + 1, cells, state))
  }

  return rows.join('')
}
