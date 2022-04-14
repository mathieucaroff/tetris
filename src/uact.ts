import { horizontalFingerMoveManager } from "./lib/horizontalFingerMoveManager";

export default function (jst: Jst) {
    // User Action
    var uact: Uact = (this.uact = jst.uact = {} as any);

    horizontalFingerMoveManager({
        element: document.documentElement,
        callback: (kind) => {
            console.log("Kind", kind);
            if (kind === "left") {
                uact.moveLeft.run();
            } else if (kind === "right") {
                uact.moveRight.run();
            } else if (kind === "tap") {
                uact.rotate.run();
            }
        },
    });

    uact.basicHookNames =
        "moveLeft moveRight rotate moveDown quickfall overground".split(" ");
    for (let hookName of uact.basicHookNames) {
        uact[hookName] = new Hook();
    }
    uact.toogleSuspend = new Hook();

    uact.enable = function () {
        for (let hookName of uact.basicHookNames) {
            uact[hookName].enabled = true;
        }
    };
    time.resume.execution.push(uact.enable);

    uact.disable = function () {
        for (let hookName of uact.basicHookNames) {
            uact[hookName].enabled = false;
        }
    };
    time.pause.execution.push(uact.disable);

    // Settings
    {
        let kd = jst.acq.keyDown;

        kd.pgdown.execution.push(uact.overground.run);

        kd.left.execution.push(uact.moveLeft.run);
        kd.right.execution.push(uact.moveRight.run);
        kd.down.execution.push(uact.moveDown.run);

        kd.up.execution.push(uact.rotate.run);

        kd.spacebar.execution.push(uact.quickfall.run);

        kd.escape.execution.push(uact.toogleSuspend.run);
        kd.p.execution.push(uact.toogleSuspend.run);
    }
    //

    var tris = jst.tris;
    uact.moveDown.execution.push(tris.down.run);
    uact.moveLeft.core = function () {
        tris.move.x = -1;
        tris.move.run();
    };
    uact.moveRight.core = function () {
        tris.move.x = 1;
        tris.move.run();
    };
    uact.rotate.core = function () {
        tris.rotate.rot = 1; // Clockwise
        tris.rotate.run();
    };
    uact.quickfall.execution.push(tris.quickfall.run);
    uact.overground.execution.push(tris.overground.run);

    uact.toogleSuspend.execution.push(time.toogleSuspend.run);
} // End of jst.acq.js
