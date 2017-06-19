jst.execModuleCodes = function () {
  for (let moduleIndex in jst.moduleCodeList) {
    try {
      var suffix = `\n//# sourceURL=${jst.moduleShortFilenamearray[moduleIndex]}.js\n`;
      jst.llog(moduleIndex, jst.moduleShortFilenamearray[moduleIndex]);
      eval(jst.moduleCodeList[moduleIndex].toString().slice(13,-1)+suffix);
    } catch (err) {
      jst.llog(jst.moduleShortFilenamearray[moduleIndex]);
      throw err;
    }
  }
};

var func = jst.execModuleCodes;
if (jst.debug) {
  var suffix = `\n//# sourceURL=jst.${"run"}.js\n`;
  eval(func.toString().slice(13,-1)+suffix);
} else {
  func();
}

jst.init.run();
jst.start.run();
