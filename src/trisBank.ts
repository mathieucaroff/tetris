export default function (jst: Jst) {
    var trisBank: TrisBank = (this.trisBank = jst.trisBank = {
        shapes: {
            O: [0, 1, 0, 2, 1, 1, 1, 2],
            I: [1, 0, 1, 1, 1, 2, 1, 3],
            L: [0, 0, 0, 1, 0, 2, 1, 2],
            J: [1, 1, 0, 1, 0, 2, 0, 3],
            T: [0, 1, 0, 2, 0, 3, 1, 2],
            S: [0, 1, 0, 2, 1, 2, 1, 3],
            Z: [1, 0, 1, 1, 0, 1, 0, 2],
        },
        rotationCenter: {
            O: [0.5, 1.5],
            I: [0.5, 1.5],
            L: [0.5, 1.5],
            J: [0.5, 1.5],
            T: [0, 2],
            S: [0, 2],
            Z: [0, 1],
        },
        colors: {
            O: 6,
            I: 8,
            L: 5,
            J: 9,
            T: 3,
            S: 7,
            Z: 4,
        },
    } as any);
    trisBank.types = Object.keys(trisBank.shapes);

    trisBank.randomType = function () {
        var type =
            trisBank.types[Math.floor(trisBank.types.length * Math.random())];
        return type;
    };
} // End of jst.trisBank.js
