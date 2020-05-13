import { default as jstErrors } from "./jstetris.js.d/jst.errors.js";
import { default as jstUtil } from "./jstetris.js.d/jst.util.js";
import { default as jstJst } from "./jstetris.js.d/jst.jst.js";
import { default as jstTime } from "./jstetris.js.d/jst.time.js";
import { default as jstZone } from "./jstetris.js.d/jst.zone.js";
import { default as jstGrid } from "./jstetris.js.d/jst.grid-gameOver.js";
import { default as jstTrisBank } from "./jstetris.js.d/jst.trisBank.js";
import { default as jstTris } from "./jstetris.js.d/jst.tris.js";
import { default as jstCrd } from "./jstetris.js.d/jst.crd.js";
import { default as jstAcq } from "./jstetris.js.d/jst.acq.js";
import { default as jstUact } from "./jstetris.js.d/jst.uact.js";
import { default as jstLinedeletion } from "./jstetris.js.d/jst.linedeletion.js";
import { default as jstHold } from "./jstetris.js.d/jst.hold.js";
import { default as jstPreview } from "./jstetris.js.d/jst.preview.js";
import { default as jstShadow } from "./jstetris.js.d/jst.shadow.js";

let jstModuleArray = [
  jstErrors,
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

var jst = {};

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
