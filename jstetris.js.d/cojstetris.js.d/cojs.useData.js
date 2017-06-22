jst.useDataCode = jst.pushModuleCode(function () {
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

let usedata = jst.useData = {};
usedata.getData = function () {
  jst.randomValue = usedata.id + Math.random();
  filter = ["tris",
              "pos", "x", "y",
              "rot",
              "color",
              "type",
              "shape",
            "hold",
            "queue", "boxList",
            "time", "suspended",
            "grid",
            "randomValue"];
  return usedata.saved = JSON.stringify(jst, filter);
}
usedata.setData = function (JSONdatastring) {
  jdata = JSON.parse(JSONdatastring);
  deepUpdate({src:jdata, dest:jst});
  crd.board.rend.run();
}
usedata.id = 0;
}); // End of jst.useData
