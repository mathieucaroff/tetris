jst.queueCode = jst.pushModuleCode(function () {

this.queue =
jst.queue = {};

queue.length = 3;

queue.boxlist = [];

// zone
var zoneHeight = 2;
var zoneWidth = 4;

function TBox (index) {
  var me = this;
  this.index = index;
  var tris = this.tris = {}
  deepUpdate(tris, jst.tris.default);
  tris.type = trisBank.randomType();
  this.crdtris = {};
  this.zone = jst.zone.NewZone(zoneHeight, zoneWidth);
  bo = this.board = Object.create(crd.board);
  bo.width = zoneWidth;
  bo.height = zoneHeight;
  this.zone.yoff = -2.25 * index;
  this.zone.xoff = jst.grid.xoff + grid.width + 0.25;
  
  jst.initTris(tris, this.zone);  
  crd.initTris(this.crdtris, tris, this.zone);
  crd.initZone(this.zone, this.zone, bo);
  
  this.enter = new Hook();
  this.enter.core = function () {
    var type = tris.type = me.input();
    tris.shape = jst.trisBank.shapes[type];
    tris.color = jst.trisBank.colors[type];
  }
  this.enter.before.push(tris.erease.run);
  this.enter.after.push(tris.rend.run);

  this.input = undefined;
  this.output = this.fulsh = function () {
    let trisTypeSav = me.tris.type;
    me.enter.run();
    return trisTypeSav;
  };
}

for (let i of range(queue.length)) {
  queue.boxlist.push(new TBox(i));
}
for (let i of range(queue.length - 1)) {
  queue.boxlist[i].input = queue.boxlist[i+1].output
}

queue.lastbox = queue.boxlist[queue.length - 1];
queue.lastbox.input = jst.trisBank.randomType;

queue.firstbox = queue.boxlist[0];
tris.getType.core = function () {
  if (!tris.enter.trisType)
    tris.enter.trisType = queue.firstbox.output();
} // FUNCTION OVERWRITE

}); // End of jst.queue
