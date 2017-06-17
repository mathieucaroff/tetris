var jst = {}; document.title = jst.title = "jsTetris 0.0.5"; jst.load = function () {
  jst.debug = false;
  jst.context = jst.debug ? window : {};
  var i = 0;
  jst.moduleCodeList = [];
  
  jst.pushModuleCode = function (module) {
    jst.moduleCodeList.push(module);
    return module;
  }
  
  function loadNextScript () {
    var script = document.createElement("script");
    script.src = jst.moduleFilenames[i];
    if (++i < jst.moduleFilenames.length) {
      script.onload = loadNextScript;
    }
    document.body.appendChild(script);
  }
  
  // EDITIING
  jst.moduleNames = [
"errors", "util", "jst", "time", "zone", "grid-gameOver",
"trisBank", "tris", "crd", "acq", "uact", "linedeletion",
"hold", "preview", "shadow",
"cojsTetris/jst.cojsLock",
"run"
  ];
  jst.moduleFilenames = jst.moduleNames.map(x => `jstetris.js.d/jst.${x}.js`);
  loadNextScript();
}; // End of jst.load

jst.load();
