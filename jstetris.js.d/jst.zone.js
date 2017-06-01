jst.zoneCode = jst.pushModuleCode(function () {
  jst.zone = {};
  jst.zone.NewZone = function (height, width) {
    var zone = Array(height);
    zone.height = height;
    zone.width = width;
    zone.genVoidLine = function () {
      var line = Array(width+1).fill(0);
      line[-1] = line[width] = -1;
      return line;
    }
    for (let y of range(height+1)) {
      zone[y] = zone.genVoidLine();
    };
    zone[-1] = Array(width).fill(-1);
    zone[-2] = zone[-1];
    zone[height+1] = zone[-1];
    return zone;
  }

height = 20;
width = 10;
this.grid =
jst.grid = jst.zone.NewZone(height, width);  
}); // End of jst.zone
