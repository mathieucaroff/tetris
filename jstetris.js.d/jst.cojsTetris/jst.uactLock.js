jst.uactLockCode = jst.pushModuleCode(function () {
// Lock
cojsLock = jst.uact.cojsLock = {};
cojsLock.lock = function (hookNamearray) {
  for (let hookName of hookNamearray) {
    jst.uact[hookName].enabled = false;
  }
}

cojsLock.unlock = function (hookNamearray) {
  for (let hookName of hookNamearray) {
    jst.uact[hookName].enabled = true;
  }
}

}); // End of jst.uactLockCode
