var jst = {}; document.title = jst.title = "jsTetris 0.0.5"; jst.load = function () {
  jst.debug = false;
  jst.moduleCodeList = [];
  
  jst.pushModuleCode = function (module) {
    jst.moduleCodeList.push(module);
    return module;
  }
  
  jst.modulePathFromName = (x => `jstetris.js.d/jst.${x}.js`);
  jst.moduleNames = [
"errors", "util", "jst", "time", "zone", "grid-gameOver",
"trisBank", "tris", "crd", "acq", "uact", "linedeletion",
"hold", "preview", "shadow",
"cojstetris",
"run"
  ];
  
  jst.scriptLoader = function (my) {
    var i = 0;
    my.moduleFilenames = my.moduleNames.map(my.modulePathFromName);
    my.loadNextScript = function () {
      var script = my.loadingScript = document.createElement("script");
      script.src = my.moduleFilenames[i];
      if (++i < my.moduleFilenames.length) {
        script.onload = my.loadNextScript;
      } else {
        if (my.scriptsLoadedCallback !== undefined) {
          script.onload = my.scriptsLoadedCallback;
        }
      }
      document.body.appendChild(script);
    };
    my.loadNextScript();
  };
  jst.scriptLoader(jst);

}; // End of jst.load

jst.load();
