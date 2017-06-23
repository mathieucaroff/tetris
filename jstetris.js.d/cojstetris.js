jst.myGates.cojs = {}; jst.myGates.cojs.load = _ => {
'use strict';
/**
 * jst.myGates.cojs
 * This gate loads other files from the cojstetris sub-project.
 */
  // jst.pushModuleCode(_=>0); Useless now
  var cojs = jst.myGates.cojs;
  cojs.pathFromName = (x => `jstetris.js.d/cojstetris.js.d/cojs.${x}.js`);
  cojs.namearray = [
"cojsLock", "usedata", "roleindicator", "http", "request", "connection", "superviser"
  ];
  cojs.mode = "module";
  cojs.title = "cojs";
  cojs.callback = jst.scriptLoaderCallback;
  
  jst.scriptLoader(cojs);
}; // End of jst.cojs.load

jst.myGates.cojs.load();
