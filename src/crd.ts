export default function (jst: Jst) {
    /// Canvas render crd
    var crd: Crd =
        (this.crd =
        jst.crd =
            {
                board: {
                    width: jst.grid.width + 4.5 + 4.5,
                    height: jst.grid.height,
                },
                tris: {},
                grid: {},
                color: {
                    0: "grey",
                    1: "black",
                    2: "white",
                    3: "pink",
                    4: "red",
                    5: "orange",
                    6: "yellow",
                    7: "green",
                    8: "cyan",
                    9: "blue",
                    10: "purple",
                    11: "grey+",
                    12: "grey-",
                    13: "grey",
                },
                hue: {
                    grey: "#808080",
                    "grey+": "#2F2F2F",
                    "grey-": "#262626",
                    black: "#000000",
                    white: "#FFFFFF",
                    pink: "#C529A6",
                    red: "#F72039",
                    orange: "#FF7900",
                    yellow: "#FFC729",
                    green: "#7BCF13",
                    cyan: "#59CCFD",
                    blue: "#2159DE",
                    purple: "#800080",
                },
            } as any);

    window.resizeHook = new Hook();
    document.body.onresize = window.resizeHook.run;

    crd.init = new Hook();
    crd.init.core = function () {
        var style = document.createElement("style");
        style.textContent = `
  * {
    margin: 0;
    padding: 0;
  }
  #tetrisCanvas {
    background-color: yellow;
    position: absolute;
    width: 100% ;
    height: 100%;
  }
`;
        document.head.appendChild(style);
        crd.ctx = jst.canvas.getContext("2d");
        window.resizeHook.after.push(crd.handelResize);
    };
    jst.init.after.push(window.resizeHook.run);
    jst.init.execution.push(crd.init.run);

    crd.handelResize = function () {
        var bo = crd.board;
        var wi = (jst.canvas.width = window.innerWidth);
        var he = (jst.canvas.height = window.innerHeight);

        // Compute pps (pixPerSquare)
        if (wi * bo.height > he * bo.width) {
            // We have more horizontal space than vertical
            // Size is decided according to the height.
            crd.pps = 2 * Math.floor(he / (2 * bo.height));
        } else {
            // Size is decided according to the width.
            crd.pps = 2 * Math.floor(wi / (2 * bo.width));
        }
        crd.outline = Math.ceil(crd.pps / 16);
        crd.wideline = Math.ceil((2 * crd.pps) / 7);
        bo.pwidth = crd.pps * bo.width;
        bo.pheight = crd.pps * bo.height;
        bo.pxoff = Math.ceil((wi - bo.pwidth) / 2);
        bo.pyoff = Math.ceil((he - bo.pheight) / 2);
        bo.rend.run();
    };

    crd.board.rend = new Hook();
    crd.board.rend.core = function () {
        // crd.ctx.fillStyle = crd.hue["black"];
        crd.ctx.fillRect(0, 0, jst.canvas.width, jst.canvas.height);
    };

    // crdzone: zone object to initialize.
    // jstzone: object containing the parameters {width, height} (in square number)
    // bo: object containing the parameters {ppxoff, ppyoff, height}
    crd.initZone = function (crdzone: any, jstzone: any, bo: any) {
        crdzone.rend = function () {
            var ctx = crd.ctx;
            ctx.fillStyle = "#000";
            var l = crd.outline;
            ctx.fillRect(
                bo.pxoff + jstzone.xoff * crd.pps - l,
                bo.pyoff + jstzone.yoff * crd.pps - l,
                crd.pps * jstzone.width + 2 * l,
                crd.pps * jstzone.height + 2 * l
            );
            for (let y of range(jstzone.height)) {
                for (let x of range(jstzone.width)) {
                    crdzone.rendSquare(y, x);
                }
            }
        };
        crd.board.rend.execution.push(crdzone.rend);

        crdzone.rendSquare = function (y, x) {
            if (y >= jstzone.height || y < 0 || x < 0 || x > jstzone.widht) {
                return;
            }
            var pps = crd.pps;
            var ctx = crd.ctx;
            var pyoff = bo.pyoff + (bo.height - 1 - y - jstzone.yoff) * pps;
            var pxoff = bo.pxoff + (x + jstzone.xoff) * pps;
            var colorNum = jstzone[y][x];
            // TODO rather cache each square type first, and use cached data for displaying them after
            var color = crd.hue[crd.color[colorNum || 11 + ((x + y) % 2)]];
            if (colorNum) {
                let darkColor = jst.util.Color.textFromTriplet(
                    jst.util.Vector.scale(
                        jst.util.Color.tripletFromText(color),
                        0.5
                    ).map(Math.round) as any
                );
                ctx.fillStyle = darkColor;
                ctx.fillRect(pxoff, pyoff, pps, pps);
                ctx.fillStyle = color;
                ctx.fillRect(
                    pxoff + crd.outline,
                    pyoff + crd.outline,
                    pps - 2 * crd.outline,
                    pps - 2 * crd.outline
                );
                let semidarkcolor = jst.util.Color.textFromTriplet(
                    jst.util.Vector.scale(
                        jst.util.Color.tripletFromText(color),
                        0.8
                    ).map(Math.round) as any
                );
                ctx.fillStyle = semidarkcolor;
                ctx.fillRect(
                    pxoff + crd.wideline,
                    pyoff + crd.wideline,
                    pps - 2 * crd.wideline,
                    pps - 2 * crd.wideline
                );
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(pxoff, pyoff, pps, pps);
            }
        };
    };

    jst.grid.yoff = 0;
    jst.grid.xoff = 4.5;
    crd.initZone(crd.grid, jst.grid, crd.board);

    crd.initTris = function (crdtris: any, jsttris: any, crdzone: any) {
        crdtris.rend = function () {
            for (let i of jst.util.range(0, 8, 2)) {
                var y = jsttris.pos.y + jsttris.shape[i];
                var x = jsttris.pos.x + jsttris.shape[i + 1];
                crdzone.rendSquare(y, x);
            }
        };
        jsttris.rend.after.push(crdtris.rend);

        crdtris.oldPos = Array(8).fill(0);
        crdtris.savePos = function () {
            var oldp = crdtris.oldPos;
            for (let i of range(0, 8, 2)) {
                oldp[i] = jsttris.pos.y + jsttris.shape[i];
                oldp[i + 1] = jsttris.pos.x + jsttris.shape[i + 1];
            }
        };
        jsttris.erease.execution.push(crdtris.savePos);

        crdtris.clear = function () {
            var oldp = crdtris.oldPos;
            for (let i of range(0, 8, 2)) {
                crdzone.rendSquare(oldp[i], oldp[i + 1]);
            }
        };
        jsttris.rend.execution.push(crdtris.clear);
    };

    // var w: any = window;
    // w.crd = crd;

    crd.initTris(crd.tris, jst.tris, crd.grid);

    jst.grid.gameOver.after.push(crd.grid.rend);
} // End of jst.crd.js
