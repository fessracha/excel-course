export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col > MIN_VALUE ? col - 1 : col
      break
    case 'ArrowUp':
      row = row > MIN_VALUE ? row - 1 : row
      break
  }

  return `[data-id='${row}:${col}']`
}