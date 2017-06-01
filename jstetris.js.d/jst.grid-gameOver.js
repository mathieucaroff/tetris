jst.grid_gameOverCode = jst.pushModuleCode(function () {

grid.gameOver = new Hook();
grid.gameOver.symbol =`
o        o
 o      o
  o    o
   o  o


   o  o
  o    o
 o      o
o        o
`.split("\n").slice(1,-1);
grid.gameOver.color = {
  g: 13,
  o: 2,
  b: 1
};
grid.gameOver.core = function () {
  for (let y of range(10)) {
    for (let x of range(10)) {
      let letter = grid.gameOver.symbol[9-y][x] || " ";
      if (letter != " ") {
        grid[y+5][x] = grid.gameOver.color[letter];
      }
    }
  }
}
jst.gameOver.execution.push(grid.gameOver.run);
}); // End of jst.grid-gameOver
