jst.roleIndicatorCode = jst.pushModuleCode(function () {
// Required data:
// - Current tris
//   * Postion
//   * Rotation
//   * Color (type)
//   * Shape
// - Tris queue
// - Game paused
// - Held tris
// - Whole 20x10 grid (colornumbers)

let roleIndicator = crd.roleIndicator = {};
roleIndicator.show = new Hook();
crd.board.rend.execution.unshift(roleIndicator.show.run);

roleIndicator.rotat = function () {
  crd.ctx.fillStyle = roleIndicator.rotat.fillColor;
  crd.ctx.strokeStyle = roleIndicator.rotat.strokeColor;
  crd.ctx.lineWidth = roleIndicator.rotat.lineWidth;
  crd.drawCircle()
};
roleIndicator.horiz = function () {
  crd.ctx.fillStyle = roleIndicator.horiz.fillColor;
  crd.ctx.strokeStyle = roleIndicator.horiz.strokeColor;
  crd.ctx.lineWidth = roleIndicator.horiz.lineWidth;
  crd.drawCircle();
};

roleIndicator.setRotat = function () {
  roleIndicator.show.core = roleIndicator.rotat;
};
  
roleIndicator.setHoriz = function () {
  roleIndicator.show.core = roleIndicator.horiz;
};

roleIndicator.handleResize = new Hook();
roleIndicator.handleResize.core = function () {
  roleIndicator.horiz.lineWidth = crd.pps * 0.625;
}
crd.handleResize.after.push(roleIndicator.handleResize.run);
}); // End of jst.roleIndicator
