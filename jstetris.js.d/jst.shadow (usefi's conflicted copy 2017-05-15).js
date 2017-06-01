jst.shadowCode = jst.pushModuleCode(function () {
  // Beware dirty code in this module
  var shadow = jst.shadow = Object.create(jst.tris);
  shadow.pos = update({}, jst.tris.default.pos);
  shadow.color = 12;
  shadow.crd = {};
  jst.initTris(shadow, jst.grid);
  crd.initTris(shadow.crd, shadow, crd.grid);
  function conditionalFunction (test, trueCallback, falseCallback) {
    return function () { return test() ? trueCallback() : falseCallback() };
  }
  function horizontalMoveTest () {
    return jst.tris.move.x != 0;
  }
  shadow.quickfallfunction = tris.genQuickfallCore(shadow);
  shadow.update = new Hook();
  shadow.update.core = function () {
    update(shadow.pos, tris.pos);
    shadow.quickfallfunction();
  };
  conditionalUpdate = conditionalFunction(horizontalMoveTest, shadow.update.run, doNothing);
  shadow.willUpdate = new Hook();
  conditionalWillUpdate = conditionalFunction(horizontalMoveTest, shadow.willUpdate.run, doNothing);

  shadow.update.after.push(shadow.rend.run);

  tris.move.before.push(shadow.erease.run);


  tris.move.execution.push(_ => jst.tris.move.x != 0 ? shadow.update.run() : null);
  tris.rotate.execution.push(shadow.update.run);
  tris.enter.execution.push(shadow.update.run);
});