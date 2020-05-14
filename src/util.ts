export default function (jst: Jst) {
    jst.util = {} as any;

    var doNothing = (jst.util.doNothing = function (...args) {});

    var range = (jst.util.range = function* (start, stop = null, step = 1) {
        if (stop === null) {
            stop = start;
            start = 0;
        }
        var length = Math.ceil((stop - start) / step);
        for (let i = 0; i < length; i++) {
            yield start + i * step;
        }
    });

    var Matrix = (jst.util.Matrix = function <TF, TR extends TF | Array<any>>(
        filler_value: TF,
        dimensionList: number[]
    ) {
        if (!dimensionList || dimensionList.length == 0) {
            return (filler_value as any) as TR;
        } else if (dimensionList.length == 1) {
            return (Array(dimensionList[0]).fill(filler_value) as any) as TR;
        } else if (dimensionList.length > 1) {
            var a: any = Array(dimensionList[0]).fill(undefined);
            var dim = dimensionList.slice(1);
            for (let i in a) {
                a[i] = Matrix(filler_value, dim);
            }
            return a as TR;
        }
    });

    let square = function (x: number) {
        return x * x;
    };

    var Vector = (jst.util.Vector = {
        scale: function (vect, factor) {
            return vect.map((el) => factor * el);
        },
        add: function (vectA, vectB) {
            let sum = Array(Math.max(vectA.length, vectB.length));
            function addToSum(el, i) {
                sum[i] += el;
            }
            vectA.forEach(addToSum);
            vectB.forEach(addToSum);
            return sum;
        },
        subtract: function (vectA, vectB) {
            return Vector.add(vectA, Vector.scale(vectB, -1));
        },
    });

    var Color = (jst.util.Color = {
        black: [0, 0, 0],
        white: [255, 255, 255],
        textFromTriplet: function (triplet) {
            let text = "#";
            for (let i of range(3)) {
                text += (256 + triplet[i]).toString(16).slice(1);
            }
            return text;
        },
        tripletFromText: function (text) {
            if (text[0] !== "#") throw "Given text-color not recognized.";
            let triplet: [number, number, number] = [0, 0, 0];
            for (let i of range(3)) {
                triplet[i] = parseInt(text.slice(2 * i + 1, 2 * i + 3), 16);
            }
            return triplet;
        },
        avg: function (col1, col2) {
            return Vector.add(col1.map(square), col2.map(square)).map(
                Math.sqrt
            );
        },
    });

    jst.util.Hook = class {
        core?: () => void;
        before: (() => void)[];
        execution: (() => void)[];
        after: (() => void)[];
        enabled: boolean;
        run: () => void;

        constructor(...args) {
            this.before = [];
            this.execution = Array.from(args);
            this.after = [];
            this.enabled = true;
            var me = this;
            this.run = function () {
                if (me.enabled) {
                    for (let func of me.wholeExecution) {
                        if (typeof func == "function") {
                            func();
                        } else {
                            console.log(new Error().stack);
                            console.log(
                                `Error - cannot execute it since it is not a function - ${func}`
                            );
                        }
                    }
                }
            };
        }
        get length() {
            return (
                +!!this.core +
                this.before.length +
                this.execution.length +
                this.after.length
            );
        }
        used() {
            return !!this.length;
        }
        get wholeExecution() {
            var coreExecution = this.core ? [this.core] : [];
            return this.before.concat(
                coreExecution,
                this.execution,
                this.after
            );
        }
    };

    jst.util.update = function (oA, oB) {
        for (let name in oB) {
            oA[name] = oB[name];
        }
        return oA as any;
    };

    var deepUpdate = (jst.util.deepUpdate = function (oA, oB) {
        for (let name in oB) {
            let val = oB[name];
            if (typeof val == "object") {
                if (typeof oA[name] != "object") {
                    oA[name] = {} as any;
                }
                deepUpdate(oA[name], val);
            } else {
                // The simple case:
                oA[name] = val;
            }
        }
        return oA;
    }); // OVERWRITE values of oA with those of oB
} // End of jst.util.js
