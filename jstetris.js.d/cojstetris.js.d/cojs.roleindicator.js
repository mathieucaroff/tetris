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

var roleIndicator = crd.roleIndicator = {};
roleIndicator.show = new Hook();
crd.board.rend.execution.unshift(roleIndicator.show.run);

roleIndicator.rotat = new Hook();
roleIndicator.rotat.core = function () {
  crd.ctx.fillStyle = roleIndicator.rotat.fillColor;
  crd.ctx.strokeStyle = roleIndicator.rotat.strokeColor;
  crd.ctx.lineWidth = roleIndicator.rotat.lineWidth;
  crd.drawCircle(crd.board.xcenter,
                 crd.board.ycenter,
                 crd.board.incircleDiameter/2 - crd.board.pps);
  crd.ctx.fill();
  crd.ctx.stroke();
};
roleIndicator.rotat.fillColor = crd.hue["grey-"];
roleIndicator.rotat.strokeColor = crd.hue["grey+"];

roleIndicator.horiz = new Hook();
roleIndicator.horiz.core = function () {
  crd.ctx.fillStyle = roleIndicator.horiz.fillColor;
  crd.ctx.strokeStyle = roleIndicator.horiz.strokeColor;
  crd.ctx.lineWidth = roleIndicator.horiz.lineWidth;
  crd.drawRectangle(
    crd.board.pxoff + 0.080 * crd.board.pwidth,
    crd.board.pyoff + 0.375 * crd.board.pheight,
    (1 - 2 * 0.080) * crd.board.pwidth,
    (1 - 2 * 0.370) * crd.board.pheight
     );
  crd.ctx.fill();
  crd.ctx.stroke();
};
roleIndicator.horiz.fillColor = crd.hue["grey-"];
roleIndicator.horiz.strokeColor = crd.hue["grey+"];

roleIndicator.setRotat = new Hook();
roleIndicator.setRotat.core = function () {
  roleIndicator.show.core = roleIndicator.rotat.run;
};

roleIndicator.setHoriz = new Hook();
roleIndicator.setHoriz.core = function () {
  roleIndicator.show.core = roleIndicator.horiz.run;
};

roleIndicator.setHoriz.core();

roleIndicator.handleResize = new Hook();
roleIndicator.handleResize.core = function () {
  roleIndicator.horiz.lineWidth = crd.pps * 0.625;
  roleIndicator.rotat.lineWidth = crd.pps * 0.625;
};

crd.handleResize.execution.push(roleIndicator.handleResize.run);
roleIndicator.handleResize.core();
}); // End of jst.roleIndicator
