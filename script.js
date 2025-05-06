let grid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ];
  
  // 빈 셀을 찾아주는 함수
  function getEmptyCells() {
    let emptyCells = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[row][col] === null) {
          emptyCells.push({ row, col });
        }
      }
    }
    return emptyCells;
  }
  
  // 타일을 그리드에 배치하는 함수
  function placeTile(row, col, value) {
    const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
    const inner = cell.querySelector('.tile-inner');
  
    // 타일을 실제로 그리드에 표시
    inner.textContent = value;  // 타일에 값 넣기
    inner.style.fontSize = '4vh';  // 폰트 크기 조정
    inner.style.color = '#776e65';  // 색상 설정
    inner.style.fontWeight = 'bold';  // 두껍게 설정
  
    // 타일 스타일 추가
    cell.classList.add(`tile-${value}`);
  }
  
  // 두 개의 타일을 랜덤한 위치에 생성하는 함수
  function generateTiles() {
    let emptyCells = getEmptyCells(); // 빈 셀 구하기
    if (emptyCells.length > 0) {
      for (let i = 0; i < 2; i++) {  // 두 개의 타일을 배치
        let randomIndex = Math.floor(Math.random() * emptyCells.length); // 랜덤으로 빈 셀 선택
        let randomCell = emptyCells[randomIndex];  // 랜덤 셀
        grid[randomCell.row][randomCell.col] = 2;  // 그리드에 2 삽입
        placeTile(randomCell.row, randomCell.col, 2);  // UI에 2 배치
        emptyCells.splice(randomIndex, 1);  // 배치한 셀은 빈 셀 목록에서 제거
      }
    }
  }
  
  // 페이지가 로드될 때 타일을 랜덤으로 생성
  window.onload = function() {
    generateTiles();  // 게임 시작 시 타일 생성
  };
  