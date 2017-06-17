jst.cojs = {}; jst.cosj.load = function () {
// Loads other files from the cojstetris sub-project.
  
  cojs.modulePathFromName = (x => `jstetris.js.d/jst.cojstetris.d/cojs.${x}.js`);
  cojs.moduleNames = [
"cojsLock", "useData"
  ];
  cojs.scriptsLoadedCallback = jst.loadNextScript;
  delete jst.loadingScript.onload;
  jst.scriptLoader(cojs);

}; // End of jst.cojs.load

jst.cojs.load();
