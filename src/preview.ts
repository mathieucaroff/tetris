export default function (jst: Jst) {
    var preview: Preview = (this.preview = jst.preview = {} as any);

    preview.length = 3;

    preview.boxlist = [];

    // zone
    var zoneHeight = 2;
    var zoneWidth = 4;

    function TBox(index: number) {
        var me: TBox = this;
        me.index = index;
        var tris: Tris = (me.tris = {} as any);
        var deepUpdate = jst.util.deepUpdate;
        deepUpdate(tris, jst.tris.default);
        tris.type = jst.trisBank.randomType();
        me.crdtris = {} as any;
        me.zone = jst.zone.NewZone(zoneHeight, zoneWidth) as any;
        var bo = (me.board = Object.create(jst.crd.board));
        bo.width = zoneWidth;
        bo.height = zoneHeight;
        me.zone.yoff = -2.25 * index;
        me.zone.xoff = jst.grid.xoff + jst.grid.width + 0.25;

        jst.initTris(tris, me.zone);
        jst.crd.initTris(me.crdtris, tris, me.zone);
        jst.crd.initZone(me.zone, me.zone, bo);

        me.enter = new Hook();
        me.enter.core = function () {
            var type = (tris.type = me.input());
            tris.shape = jst.trisBank.shapes[type];
            tris.color = jst.trisBank.colors[type];
        };
        me.enter.before.push((tris as any).erease.run);
        me.enter.after.push((tris as any).rend.run);

        me.input = undefined;
        me.output = function () {
            let trisTypeSav = me.tris.type;
            me.enter.run();
            return trisTypeSav;
        };
    }

    var range = jst.util.range;

    for (let i of range(preview.length)) {
        preview.boxlist.push(new TBox(i));
    }
    for (let i of range(preview.length - 1)) {
        preview.boxlist[i].input = preview.boxlist[i + 1].output;
    }

    preview.lastbox = preview.boxlist[preview.length - 1];
    preview.lastbox.input = jst.trisBank.randomType;

    preview.firstbox = preview.boxlist[0];
    jst.tris.getType.core = function () {
        if (!jst.tris.enter.trisType) {
            jst.tris.enter.trisType = preview.firstbox.output();
        }
    }; // FUNCTION OVERWRITE
} // End of jst.preview.js
