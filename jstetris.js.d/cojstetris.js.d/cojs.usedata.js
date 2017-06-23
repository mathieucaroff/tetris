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

var usedata = jst.usedata = {};
  
usedata.sharable = [
"tris",
  "pos", "x", "y",
  "rot",
  "color",
  "type",
  "shape",
"hold",
"queue", "boxList", "zone",
"time", "suspended",
"grid",
"usedata", "dataid",
"randomValue"];

usedata.id = 0; // Default value
usedata.getData = function () {
  jst.usedata.dataid = usedata.id + Math.random();
  let filter = usedata.sharable;
  return usedata.lastDatastring = JSON.stringify(jst, filter);
};

usedata.setData = function (JSONdatastring) {
  if (!usedata.differentFrom(JSONdatastring))
    return;
  usedata.lastDatastring = JSONdatastring;
  jdata = JSON.parse(JSONdatastring);
  deepUpdate({src:jdata, dest:jst});
  crd.board.rend.run();
};
  
usedata.differentFrom = function (JSONdatastring) {
  return JSONdatastring !== usedata.lastDatastring;
};

}); // End of jst.useData
