var jst = {}; document.title = jst.title = "jsTetris 0.0.5"; jst.load = function () {
  'use strict';
  jst.debug = true;
  {
    let nothing = jst.nothing = function () {};
    let log = jst.debug ? console.log : nothing;
    let logOnce = (...args) => {
      let id = args.toString()
      if (logOnce[id] === undefined) {
        logOnce[id] = 1;
        log.apply(this, args);
      }
    };
    jst.log = log;
    jst.llog = nothing; // loader log
    jst.connectionLog = (...args) => {
      log.apply(this, ["cx: "].concat(args));
    }; // connexion log
    jst.requestLog = (...args) => {
      log.apply(this, ["req: "].concat(args));
    }; // request log
    jst.httpLog = (...args) => {
      log.apply(this, ["h: "].concat(args));
    }; // request log
    jst.warn = jst.debug ? console.warn : nothing;
    jst.error = jst.debug ? console.error : nothing;
  }
  
  jst.moduleShortFilenamearray = [];
  jst.moduleCodeList = [];

  jst.pushModuleCode = function (module) {
    jst.moduleCodeList.push(module);
    return module;
  };
  
  jst.myModules = {};
  jst.myModules.pathFromName = (x => `jstetris.js.d/jst.${x}.js`);
  jst.myModules.namearray = [
"errors", "util", "jst", "time", "zone", "grid-gameOver",
"trisBank", "tris", "crd", "acq", "uact", "linedeletion",
"hold", "queue", "shadow",
"score"
  ];
  jst.myModules.title = "jst.myModules";
  jst.myModules.mode = "module";
  
  /**
   * A gate is a script loading modules.
   * They are used as sub-projects delimiters
   */
  jst.myGates = {};
  jst.myGates.pathFromName = (x => `jstetris.js.d/${x}.js`)
  jst.myGates.namearray = [
"cojstetris",
"run"
  ];
  jst.myGates.title = "jst.myGates";
  jst.myGates.mode = "gate";
  
  /**
   * jst.scriptLoader
   * Loads a list of scripts.
   * @param my {object} Object holding different values.
   *   @attr my.namearray {array: strings} Names of the modules to be loaded.
   *   @attr my.pathFromName {function: (string) => string} How to get the path of a file from it's name.
   *   @attr my.title {string} Name of the `my` object (for debugging purpose).
   *   @attr my.mode {string} "module" or "gate". Defines the way things are loaded.
   *   @optional @attr my.callback {string} Callback to use once everything is loaded.
   * @return undefined
   * @sets my.filenames
   * @sets my.loadNextScript
   */
  jst.scriptLoader = function (my) {
    var i = 0;
    my.filenames = my.namearray.map(my.pathFromName);
    /**
     * my.loadNextScript
     * Loads the i-th script.
     * If there are more to load, sets itself as callback of the onload event of the script.
     * If there aren't more to load but a callback has been specified, set the callbask on the onload event of the script.
     */
    my.loadNextScript = function () {
      jst.llog("lns:", my.title, i, my.filenames[i]);
      var script = document.createElement("script");
      script.scriptName = my.namearray[i];
      script.src = my.filenames[i];
      if (i < my.filenames.length - 1) {
        jst.setMyCallback(my, script, my.loadNextScript);
      } else {
        jst.llog("Last script of this serie");
        if (my.callback !== undefined) {
          jst.setMyCallback(my, script, my.callback);
          jst.llog("Callback set");
        }
      }
      if (my.mode === "module") {
        jst.moduleShortFilenamearray.push(my.filenames[i].replace(/^jstetris\.js\.d[/]/,""));
      }
      i++;
      document.body.appendChild(script);
    };
    my.loadNextScript();
  };
  
  /**
   * jst.setMyCallback
   * Set the given callback on theScript or as jst.scriptLoaderCallback depending on whether my.mode is "module or "gate". This is part of the script loading system.
   * @param my {object}
   * @param theScript {DOMelement: script}
   * @param theCallback {function: _ => _}
   */
  jst.setMyCallback = function (my, theScript, theCallback) {
    if (my.mode === "module") {
      theScript.onload = theCallback;
    } else if (my.mode === "gate") {
      jst.scriptLoaderCallback = theCallback;
      // The gate script will have to run jst.scriptLoaderCallback the call it back (or rather, set it as callback).
    } else throw `jst.setMyCallback: my.mode wrong value: ${my.mode}`;
  };
  
  jst.myModules.callback = (_ => jst.scriptLoader(jst.myGates));
  
  jst.scriptLoader(jst.myModules);

}; // End of jst.load

jst.load();
