export default function (jst: Jst) {
    /// Acquisition
    var acq: Acq = (this.acq = jst.acq = {} as any);

    acq.init = new Hook();
    acq.init.core = function () {
        /// TODO /// The Hook watcher must be somewhere else than on body. maybe on cavas ? ... If it can be made to work.
        document.body.onkeydown = acq.handelkeydown;
    };
    jst.init.execution.push(acq.init.run);

    acq.keyDown = Array(256) as any;
    for (let i of jst.util.range(256)) {
        acq.keyDown[i] = new Hook();
    }
    acq.handelkeydown = function (ev) {
        acq.keyDown.ev = ev;
        var k = ev.keyCode;
        // acq.keyDown[k].ev = ev;
        if (acq.keyDown[k].used()) {
            acq.keyDown[k].run();
        } else if (jst.debug) {
            console.log(ev.keyCode);
        }
    };

    {
        let kd = acq.keyDown;
        kd.escape = kd[27];
        kd.spacebar = kd[32];
        kd.pgup = kd[33];
        kd.pgdown = kd[34];
        kd.end = kd[35];
        kd.beginning = kd[36];
        kd.left = kd[37];
        kd.up = kd[38];
        kd.right = kd[39];
        kd.down = kd[40];
        kd.p = kd[80];
    }
} // End of jst.acq.js
