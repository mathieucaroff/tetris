export default function (jst) {
    jst.init = new Hook();
    jst.start = new Hook();
    jst.gameOver = new Hook();

    jst.init.core = function () {
        var canvas = (jst.canvas = document.createElement("canvas"));
        canvas.id = "jsTetrisCanvas";
        document.body.appendChild(canvas);
    };
} // End of jst.jst.js
