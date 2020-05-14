export default function (jst: Jst) {
    // Beware dirty code in this module
    var shadow: Shadow = (jst.shadow = Object.create(jst.tris));
    shadow.pos = jst.util.update({}, jst.tris.default.pos);
    shadow.color = 12;
    shadow.crd = {} as any;
    jst.initTris(shadow, jst.grid);
    jst.crd.initTris(shadow.crd, shadow, jst.crd.grid);

    var tris = jst.tris;

    shadow.update = new Hook();
    shadow.update.core = function () {
        shadow.pos.x = tris.pos.x;
        shadow.pos.y = -1;
        while (shadow.pos.y <= 18 && shadow.collision()) {
            shadow.pos.y += 1;
        }
    };
    shadow.update.after.push(shadow.rend.run);
    //shadow.update.after.push(crd.grid.rend);

    shadow.setWillUpdate = function () {
        shadow.willUpdate = jst.tris.move.x != 0;
    };
    tris.move.before.push(shadow.setWillUpdate);

    shadow.moveConditionalErease = () =>
        shadow.willUpdate ? shadow.erease.run() : null;

    tris.move.before.push(shadow.moveConditionalErease);
    tris.rotate.before.push(shadow.erease.run);
    tris.enter.before.push(shadow.erease.run);

    shadow.moveConditionalUpdate = () =>
        shadow.willUpdate ? shadow.update.run() : null;

    tris.move.execution.push(shadow.moveConditionalUpdate);
    tris.rotate.execution.push(shadow.update.run);
    tris.enter.execution.push(shadow.update.run);
} // End of jst.shadow.js
