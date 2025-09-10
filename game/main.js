const tiles = ["🀄", "🀇", "🀈", "🀉", "🀄", "🀇", "🀈", "🀉"]; // 4種×2ペア
let opened = [];
let matched = [];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function restartGame() {
  opened = [];
  matched = [];
  let board = [...tiles];
  shuffle(board);
  const gameDiv = document.getElementById("game");
  gameDiv.innerHTML = "";
  board.forEach((tile, idx) => {
    const tileDiv = document.createElement("div");
    tileDiv.className = "tile";
    tileDiv.dataset.index = idx;
    tileDiv.dataset.value = tile;
    tileDiv.onclick = () => openTile(tileDiv, board);
    tileDiv.textContent = "";
    gameDiv.appendChild(tileDiv);
  });
}
function openTile(tileDiv, board) {
  if (tileDiv.classList.contains("open") || tileDiv.classList.contains("matched") || opened.length === 2) return;
  tileDiv.classList.add("open");
  tileDiv.textContent = tileDiv.dataset.value;
  opened.push(tileDiv);
  if (opened.length === 2) {
    const [a, b] = opened;
    if (a.dataset.value === b.dataset.value) {
      a.classList.add("matched");
      b.classList.add("matched");
      matched.push(a, b);
      opened = [];
      if (matched.length === board.length) {
        setTimeout(() => alert("クリア！"), 300);
      }
    } else {
      setTimeout(() => {
        a.classList.remove("open");
        b.classList.remove("open");
        a.textContent = "";
        b.textContent = "";
        opened = [];
      }, 800);
    }
  }
}
window.onload = restartGame;
