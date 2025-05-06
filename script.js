let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

function newGame() {
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) board[i][j] = 0
  spawn()
  spawn()
  render()
}

function spawn() {
  const empty = []
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (board[i][j] === 0) empty.push([i, j])
  if (empty.length === 0) return
  const [x, y] = empty[Math.floor(Math.random() * empty.length)]
  board[x][y] = Math.random() < 0.9 ? 2 : 4
}

function render() {
  const grid = document.getElementById('grid')
  grid.innerHTML = ''
  for (let i = 0; i < 4; i++) {
    const row = document.createElement('div')
    row.className = 'grid-row'
    for (let j = 0; j < 4; j++) {
      const cell = document.createElement('div')
      const value = board[i][j]
      cell.className = 'grid-cell'
      if (value !== 0) {
        cell.textContent = value
        cell.classList.add(`filled-${value}`)
      }
      row.appendChild(cell)
    }
    grid.appendChild(row)
  }
}

function moveLeft() {
  let moved = false
  for (let i = 0; i < 4; i++) {
    let row = board[i].filter(v => v !== 0)
    for (let j = 0; j < row.length - 1; j++) {
      if (row[j] === row[j + 1]) {
        row[j] *= 2
        row[j + 1] = 0
        moved = true
      }
    }
    row = row.filter(v => v !== 0)
    while (row.length < 4) row.push(0)
    if (row.join() !== board[i].join()) moved = true
    board[i] = row
  }
  if (moved) {
    spawn()
    render()
  }
}

function moveRight() {
  let moved = false
  for (let i = 0; i < 4; i++) {
    let row = board[i].filter(v => v !== 0)
    for (let j = row.length - 1; j > 0; j--) {
      if (row[j] === row[j - 1]) {
        row[j] *= 2
        row[j - 1] = 0
        moved = true
      }
    }
    row = row.filter(v => v !== 0)
    while (row.length < 4) row.unshift(0)
    if (row.join() !== board[i].join()) moved = true
    board[i] = row
  }
  if (moved) {
    spawn()
    render()
  }
}

function moveUp() {
  let moved = false
  for (let j = 0; j < 4; j++) {
    let col = []
    for (let i = 0; i < 4; i++) col.push(board[i][j])
    col = col.filter(v => v !== 0)
    for (let i = 0; i < col.length - 1; i++) {
      if (col[i] === col[i + 1]) {
        col[i] *= 2
        col[i + 1] = 0
        moved = true
      }
    }
    col = col.filter(v => v !== 0)
    while (col.length < 4) col.push(0)
    for (let i = 0; i < 4; i++) {
      if (board[i][j] !== col[i]) moved = true
      board[i][j] = col[i]
    }
  }
  if (moved) {
    spawn()
    render()
  }
}

function moveDown() {
  let moved = false
  for (let j = 0; j < 4; j++) {
    let col = []
    for (let i = 0; i < 4; i++) col.push(board[i][j])
    col = col.filter(v => v !== 0)
    for (let i = col.length - 1; i > 0; i--) {
      if (col[i] === col[i - 1]) {
        col[i] *= 2
        col[i - 1] = 0
        moved = true
      }
    }
    col = col.filter(v => v !== 0)
    while (col.length < 4) col.unshift(0)
    for (let i = 0; i < 4; i++) {
      if (board[i][j] !== col[i]) moved = true
      board[i][j] = col[i]
    }
  }
  if (moved) {
    spawn()
    render()
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') moveLeft()
  else if (e.key === 'ArrowRight') moveRight()
  else if (e.key === 'ArrowUp') moveUp()
  else if (e.key === 'ArrowDown') moveDown()
})

window.onload = newGame
