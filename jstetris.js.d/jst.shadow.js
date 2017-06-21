jst.shadowCode = jst.pushModuleCode(function () {
// Beware dirty code in this module
var shadow = jst.shadow = Object.create(jst.tris);

shadow.color = 13;
shadow.crd = {};
jst.initTris(shadow, jst.grid);
shadow.pos = update({}, jst.tris.default.pos);
crd.initTris(shadow.crd, shadow, crd.grid);

shadow.update = new Hook();
shadow.update.core = function () {
  shadow.pos.x = tris.pos.x;
  shadow.pos.y = tris.pos.y;
  tris.erease.core();
  while (!shadow.collision()) {
    shadow.pos.y -= 1;
  }
  shadow.pos.y += 1;
  tris.rend.core();
};
shadow.update.after.push(shadow.rend.run);

tris.move.before.push(shadow.erease.run);
tris.rotate.before.push(shadow.erease.run);
tris.enter.before.push(shadow.erease.run);

tris.move.execution.push(shadow.update.run);
tris.rotate.execution.push(shadow.update.run);
tris.enter.execution.unshift(shadow.update.run);

});