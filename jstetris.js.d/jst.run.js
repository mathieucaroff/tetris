jst.execModuleCodes = function () {
  for (let moduleIndex in jst.moduleCodeList) {
    try {
      var suffix = `\n//# sourceURL=jst.${jst.moduleNames[moduleIndex]}.js\n`;
      eval(jst.moduleCodeList[moduleIndex].toString().slice(13,-1)+suffix);
    } catch (err) {
      console.log(jst.moduleNames[moduleIndex]);
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
