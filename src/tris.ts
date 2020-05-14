export default function (jst: Jst) {
    var tris: TrisModule = (jst.tris = {} as any);
    jst.tris.default = {
        type: "",
        shape: [0, 0, 0, 0, 0, 0, 0, 0],
        rot: 0,
        color: 2,
        pos: {
            y: 0,
            x: 0,
        },
    };
    (jst.tris.default as any).sav = {
        pos: {} as any,
    };
    jst.util.deepUpdate(tris, tris.default);
    tris.pos = {
        y: 18,
        x: 5,
    };

    jst.solid = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
    jst.solid[-1] = 1;

    jst.initTris = function (tris: any, zone) {
        tris.rend = new Hook();
        tris.rend.core = function () {
            for (let i of range(0, 8, 2)) {
                var y = tris.pos.y + tris.shape[i];
                var x = tris.pos.x + tris.shape[i + 1];
                zone[y][x] = tris.color;
            }
        };

        tris.erease = new Hook();
        tris.erease.core = function () {
            for (let i of range(0, 8, 2)) {
                var y = tris.pos.y + tris.shape[i];
                var x = tris.pos.x + tris.shape[i + 1];
                if (zone[y][x] == tris.color) {
                    zone[y][x] = 0;
                }
            }
        };

        tris.collision = function () {
            for (let i of range(0, 8, 2)) {
                var y = tris.pos.y + tris.shape[i];
                var x = tris.pos.x + tris.shape[i + 1];
                if (jst.solid[zone[y][x]]) return true;
            }
            return false;
        };
    };

    jst.initTris(tris, jst.grid);

    tris.savetris = function () {
        var sav = tris.sav;
        sav.type = tris.type;
        sav.shape = tris.shape;
        sav.rot = tris.rot;
        sav.color = tris.color;
        sav.pos.x = tris.pos.x;
        sav.pos.y = tris.pos.y;
    };

    tris.restoretris = function () {
        var sav = tris.sav;
        tris.type = sav.type;
        tris.shape = sav.shape;
        tris.rot = sav.rot;
        tris.color = sav.color;
        tris.pos.x = sav.pos.x;
        tris.pos.y = sav.pos.y;
    };

    tris.move = new Hook() as any;
    tris.move.before.push(tris.erease.run);
    tris.move.after.push(tris.rend.run);
    tris.move.x = 0;
    tris.move.y = 0;
    tris.move.core = function () {
        tris.pos.x += tris.move.x;
        tris.pos.y += tris.move.y;
        if ((tris.move.collision = tris.collision())) {
            tris.pos.x -= tris.move.x;
            tris.pos.y -= tris.move.y;
        }
        tris.move.x = 0;
        tris.move.y = 0;
    };

    tris.rotate = new Hook() as any;
    tris.rotate.before.push(tris.erease.run);
    tris.rotate.after.push(tris.rend.run);
    tris.rotate.core = function () {
        var yrc, xrc;
        {
            let rotCenter = trisBank.rotationCenter[tris.type];
            yrc = rotCenter[0];
            xrc = rotCenter[1];
        }
        var oldShape = tris.shape;
        var sh = (tris.shape = Array(8));
        for (let i of range(0, 8, 2)) {
            let dy = oldShape[i] - yrc;
            let dx = oldShape[i + 1] - xrc;
            switch (tris.rotate.rot % 4) {
                case 0:
                    sh[i] = yrc + dy;
                    sh[i + 1] = xrc + dx;
                    break;
                case 1:
                    sh[i] = yrc - dx;
                    sh[i + 1] = xrc + dy;
                    break;
                case 2:
                    sh[i] = yrc - dy;
                    sh[i + 1] = xrc - dx;
                    break;
                case 3:
                    sh[i] = yrc + dx;
                    sh[i + 1] = xrc - dy;
                    break;
            }
        }
        tris.rot = (tris.rot + tris.rotate.rot) % 4;
        var collision = tris.collision();
        for (let x of [-2, -1, 1, 2]) {
            // Trying to avoid the collision
            if (collision) {
                tris.move.x = x;
                tris.move.core();
                collision = tris.move.collision;
            }
        }
        tris.rotate.collision = collision;
        if (collision) {
            // Cancel:
            tris.shape = oldShape;
            tris.rot = (tris.rot - tris.rotate.rot) % 4;
        }
        tris.rotate.rot = 0;
    };

    tris.fall = new Hook() as any;
    tris.fall.collision = new Hook();
    tris.fall.core = function () {
        tris.move.y = -1;
        tris.move.run();
        if (tris.move.collision) {
            tris.fall.collision.run();
        }
    };
    jst.time.tick.after.push(tris.fall.run);

    tris.down = new Hook();
    tris.down.execution.push(tris.fall.core);
    tris.down.execution.push(jst.time.tick.core);

    tris.quickfall = new Hook();
    tris.quickfall.before.push(tris.erease.run);
    tris.quickfall.after.push(tris.rend.run);
    tris.quickfall.after.push(jst.time.tick.run);
    tris.genQuickfallCore = function (tris) {
        return function () {
            do {
                tris.pos.y -= 1;
            } while (!tris.collision());
            tris.pos.y += 1;
        };
    };
    tris.quickfall.core = tris.genQuickfallCore(tris);

    tris.overground = new Hook() as any;
    tris.overground.float = 1;
    tris.overground.before.push(tris.erease.run);
    tris.overground.after.push(tris.rend.run);
    tris.overground.core = function () {
        var oldy = tris.pos.y;
        tris.pos.y -= 1;
        if (tris.collision()) {
            tris.pos.y += 1;
            return;
        }
        tris.quickfall.core();
        tris.pos.y += tris.overground.float;
        if (tris.pos.y < oldy) {
            time.tick.core();
        }
        return;
    };

    var trisBank = jst.trisBank;

    tris.enter = new Hook() as any;
    tris.enter.core = function () {
        tris.savetris();
        var type = (tris.type = tris.enter.trisType);
        tris.shape = trisBank.shapes[type].slice(0);
        tris.rot = 0;
        tris.color = trisBank.colors[type];
        tris.pos.y = 18;
        tris.pos.x = 3;
        if (tris.collision()) {
            tris.restoretris();
            jst.gameOver.run();
        }
        tris.enter.trisType = "";
    };

    tris.enter.execution.push(tris.rend.run);
    jst.init.after.push(tris.enter.run);
    tris.fall.collision.after.push(tris.enter.run);

    tris.getType = new Hook();
    tris.enter.before.push(tris.getType.run);
    tris.getType.core = function () {
        if (!tris.enter.trisType)
            tris.enter.trisType = jst.trisBank.randomType();
    };
} // End of jst.tris.js
