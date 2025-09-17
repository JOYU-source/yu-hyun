const stages = [
  {
    map: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,1],
      [1,0,1,1,1,0,1,0,1,1],
      [1,0,1,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,1,1,0,1],
      [1,0,1,0,0,0,0,1,0,1],
      [1,0,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,1,0,1,0,1],
      [1,1,1,1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    start: { x: 1, y: 1 },
    exit: { x: 8, y: 8 }
  },
  {
    map: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0,0,0,1],
      [1,0,1,0,1,1,1,1,0,1],
      [1,0,0,0,1,0,0,1,0,1],
      [1,1,1,0,1,0,1,1,0,1],
      [1,0,0,0,0,0,1,0,0,1],
      [1,0,1,1,1,1,1,0,1,1],
      [1,0,1,0,0,0,0,0,0,1],
      [1,0,1,1,1,1,1,1,0,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    start: { x: 1, y: 1 },
    exit: { x: 8, y: 8 }
  },
  {
    map: [
      [1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,0,0,0,1],
      [1,1,1,0,1,0,1,1,0,1],
      [1,0,1,0,1,0,1,0,0,1],
      [1,0,1,0,0,0,1,0,1,1],
      [1,0,1,1,1,1,1,0,0,1],
      [1,0,0,0,0,0,0,1,0,1],
      [1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,0,0,8,1],
      [1,1,1,1,1,1,1,1,1,1],
    ],
    start: { x: 1, y: 1 },
    exit: { x: 8, y: 8 }
  }
];

let currentStage = 0;
let playerPos = {...stages[currentStage].start};

const mazeElement = document.getElementById('maze');
const message = document.getElementById('message');
const stageInfo = document.getElementById('stage-info');
const nextStageBtn = document.getElementById('next-stage');

function drawMaze() {
  mazeElement.innerHTML = '';
  const map = stages[currentStage].map;

  for(let y=0; y < map.length; y++) {
    for(let x=0; x < map[y].length; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if(map[y][x] === 1) cell.classList.add('wall');
      if(x === playerPos.x && y === playerPos.y) cell.classList.add('player');

      const exit = stages[currentStage].exit;
      if(x === exit.x && y === exit.y) cell.classList.add('exit');

      mazeElement.appendChild(cell);
    }
  }

  stageInfo.textContent = `스테이지 ${currentStage + 1} / ${stages.length}`;
}

function movePlayer(dx, dy) {
  const map = stages[currentStage].map;
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;

  if(map[newY][newX] === 0) {
    playerPos.x = newX;
    playerPos.y = newY;
    drawMaze();

    const exit = stages[currentStage].exit;
    if(newX === exit.x && newY === exit.y) {
      message.textContent = '축하합니다! 미로 탈출 성공! 🎉';
      window.removeEventListener('keydown', keydownHandler);
      nextStageBtn.style.display = (currentStage + 1 < stages.length) ? 'inline-block' : 'none';
    }
  }
}

function keydownHandler(e) {
  if(message.textContent) return;

  switch(e.key) {
    case 'ArrowUp': movePlayer(0, -1); break;
    case 'ArrowDown': movePlayer(0, 1); break;
    case 'ArrowLeft': movePlayer(-1, 0); break;
    case 'ArrowRight': movePlayer(1, 0); break;
  }
}

nextStageBtn.addEventListener('click', () => {
  currentStage++;
  if(currentStage < stages.length) {
    playerPos = {...stages[currentStage].start};
    message.textContent = '';
    nextStageBtn.style.display = 'none';
    window.addEventListener('keydown', keydownHandler);
    drawMaze();
  }
});

// 모바일 버튼 이벤트
document.getElementById('up').addEventListener('click', () => movePlayer(0, -1));
document.getElementById('down').addEventListener('click', () => movePlayer(0, 1));
document.getElementById('left').addEventListener('click', () => movePlayer(-1, 0));
document.getElementById('right').addEventListener('click', () => movePlayer(1, 0));

window.addEventListener('keydown', keydownHandler);
drawMaze();


