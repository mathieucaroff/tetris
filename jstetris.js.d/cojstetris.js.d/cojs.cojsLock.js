jst.cojsLockCode = jst.pushModuleCode(function () {
// Lock
cojsLock = jst.uact.cojsLock = {};
locklib = cojsLock.locklib = {};
locklib.lock = function (hook) {
  hook.locked = true;
};
locklib.unlock = function (hook) {
  hook.locked = false;
};


cojsLock.horizHooks = "moveRight moveLeft moveDown overground quickfall".split(" ").map((name) => jst.uact[name]);
cojsLock.rotatHooks = "rotate hold toogleSuspend".split(" ").map((name) => jst.uact[name]);

cojsLock.affectedHooks = cojsLock.horizHooks.concat( cojsLock.rotatHooks);

// Horiz
cojsLock.unlockHoriz = function () {
  cojsLock.horizHooks.forEach(locklib.unlock);
};
cojsLock.lockHoriz = function () {
  cojsLock.horizHooks.forEach(locklib.lock);
};
// Rotat
cojsLock.unlockRotat = function () {
  cojsLock.rotatHooks.forEach(locklib.unlock);
};
cojsLock.lockRotat = function () {
  cojsLock.rotatHooks.forEach(locklib.lock);
}
}); // End of jst.cojsLockCode
