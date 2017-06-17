jst.cojsLockCode = jst.pushModuleCode(function () {
// Lock
cojsLock = jst.uact.cojsLock = {};
locklib = cojsLock.locklib = {};
locklib.lock = function (hook) {
  hook.locked = true;
}
locklib.unlock = function (hook) {
  hook.locked = false;
}
locklib.addLock = function (hook) {
  let basicRun = hook.run;
  hook.locked = true;
  hook.run = function () {
    if (hook.locked) {
    } else {
      basicRun();
    }
  }
}

cojsLock.horizHooks = "moveRight moveLeft moveDown overground quickfall".split(" ").map((name) => jst.uact[name]);
cojsLock.rotatHooks = "rotate hold".split(" ").map((name) => jst.uact[name]);

cojsLock.affectedHooks = cojsLock.horizHooks + cojsLock.rotatHooks;

cojsLock.affectedHooks.forEach(locklib.addLock);

// Horiz
cojsLock.unlockHoriz = function () {
  cojsLock.horizHooks.forEach(locklib.unlock);
}
cojsLock.lockHoriz = function () {
  cojsLock.horizHooks.forEach(locklib.lock);
}
// Rotat
cojsLock.unlockRotat = function () {
  cojsLock.rotatHooks.forEach(locklib.unlock);
}
cojsLock.lockRotat = function () {
  cojsLock.rotatHooks.forEach(locklib.lock);
}
}); // End of jst.cojsLockCode
