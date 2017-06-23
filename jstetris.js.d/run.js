jst.execModuleCodes = function () {
  for (let moduleIndex in jst.moduleCodeList) {
    try {
      var suffix = `\n//# sourceURL=${jst.moduleShortFilenamearray[moduleIndex]}\n`;
      jst.llog("evaling:", moduleIndex, jst.moduleShortFilenamearray[moduleIndex]);
      let funcCode = jst.moduleCodeList[moduleIndex].toString();
      eval(funcCode.slice(funcCode.indexOf("{")+1,-1) + suffix);
    } catch (err) { jst.error(jst.moduleShortFilenamearray[moduleIndex]);
      throw err;
    }
  }
};

jst.llog("run starting");
var func = jst.execModuleCodes;
if (jst.debug) {
  var suffix = `\n//# sourceURL=${"run"}.js\n`;
  var funcCode = func.toString();
  eval(funcCode.slice(funcCode.indexOf("{")+1,-1)+suffix);
} else {
  func();
}

jst.init.run();
jst.start.run();
