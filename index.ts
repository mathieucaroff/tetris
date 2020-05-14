/// <reference path="src/type.d.ts"/>

import { default as jstAcq } from "./src/acq";
import { default as jstCrd } from "./src/crd";
import { default as jstGrid } from "./src/grid-gameOver";
import { default as jstHold } from "./src/hold";
import { default as jstJst } from "./src/jst";
import { default as jstLinedeletion } from "./src/linedeletion";
import { default as jstPreview } from "./src/preview";
import { default as jstShadow } from "./src/shadow";
import { default as jstTime } from "./src/time";
import { default as jstTris } from "./src/tris";
import { default as jstTrisBank } from "./src/trisBank";
import { default as jstUact } from "./src/uact";
import { default as jstUtil } from "./src/util";
import { default as jstZone } from "./src/zone";

let jstModuleArray = [
    jstUtil,
    jstJst,
    jstTime,
    jstZone,
    jstGrid,
    jstTrisBank,
    jstTris,
    jstCrd,
    jstAcq,
    jstUact,
    jstLinedeletion,
    jstHold,
    jstPreview,
    jstShadow,
];

var jst: Jst = {} as any;

for (let modu of jstModuleArray) {
    modu.call(jst, jst);
    if (modu == jstUtil) {
        window.Hook = jst.util.Hook;
        window.range = jst.util.range;
    }
    if (modu == jstTime) {
        window.time = jst.time;
    }
}

window.j = jst;

jst.init.run();
jst.start.run();

console.log("JS TETRIS");
