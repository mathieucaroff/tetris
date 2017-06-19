jst.timeCode = jst.pushModuleCode(function () {
this.time =
jst.time = {
  suspended: 1
};

this.tick =
time.tick = new Hook();
tick.period = 900;
tick.core = function () {
  if (time.suspended) {
    time.resume.run();
  } else {
    window.clearTimeout(tick.schedule);
    tick.schedule = window.setTimeout(tick.run, tick.period);
  }
};

time.pause = new Hook();
time.pause.core = function () {
  window.clearTimeout(tick.schedule);
  time.suspended = 1;
};
jst.gameOver.execution.push(time.pause.run);

time.resume = new Hook();
time.resume.core = function () {
  time.suspended = 0;
  tick.core();
}

time.toogleSuspend = new Hook();
time.toogleSuspend.core = function () {
  if (time.suspended) {
    time.resume.run();
  } else {
    time.pause.run();
  }
};

time.start = new Hook(time.resume.core);
jst.start.after.push(time.start.run);
}); // End of jst.time
