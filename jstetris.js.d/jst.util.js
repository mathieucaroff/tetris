jst.utilCode = jst.pushModuleCode(function () {

jst.util = {};

var range =
jst.util.range = function* () {
  if (arguments.length == 1) {
    yield* Array.from(range(0,arguments[0],1));
  } else if  (arguments.length == 2) {
    yield* Array.from(range(arguments[0],arguments[1],1));
  } else if  (arguments.length == 3) {
    var beg = arguments[0];
    var end = arguments[1];
    var step = arguments[2];
    var length = Math.ceil((end - beg)/step);
    for (let i = 0; i < length; i++) {
      yield beg + i * step;
    }
  }
};


var Matrix =
jst.util.Matrix =
function (filler_value, dimensions) {
  if (!dimensions || dimensions.length == 0) {
    return filler_value;
  } else if (dimensions.length == 1) {
    return Array(dimensions[0]).fill(filler_value);
  } else if (dimensions.length > 1) {
    var a = Array(dimensions[0]).fill(undefined);
    var dim = dimensions.slice(1);
    for (let i in a) {
      a[i] = Matrix(filler_value, dim);
    }
    return a;
  }
};

Math.sq = function (x) {
  return x*x;
};

var Vector =
jst.util.Vector = {
  scale: function (vect, factor) {
    return vect.map( (el) => factor * el);
  },
  add: function (vectA, vectB) {
    sum = Array(max(vectA.length, vectB.length));
    function addToSum (el, i) {
      sum[i] += el;
    }
    vectA.forEach(addToSum);
    vectB.forEach(addToSum);
    return sum;
  },
  subtract: function (vectA, vectB) {
    return Vector.add(vectA, Vector.scale(vectB, -1));
  }
};

var Color =
jst.util.Color = {
  black: [0,0,0],
  white: [255,255,255],
  textFromTriplet: function (triplet) {
    text = "#";
    for (let i of range(3)) {
      text += (256+triplet[i]).toString(16).slice(1);
    }
    return text;
  },
  tripletFromText: function (text) {
    if (text[0] !== "#") throw "Given text-color not recognized.";
    triplet = [0, 0, 0];
    for (let i of range(3)) {
      triplet[i] = parseInt(text.slice(2*i+1, 2*i+3), 16);
    }
    return triplet;
  },
  avg: function (col1, col2) {
    return Vector.add(col1.map(Math.sq), col2.map(Math.sq)).map(Math.sqrt);
  }
};

var Hook =
jst.util.Hook = class {
  constructor (...args) {
    this.before = [];
    this.execution = Array.from(args);
    this.after = [];
    this.enabled = true;
    this.locked = false;
    var me = this;
    this.run = function () {
      if (me.enabled && !me.locked) {
        for (let func of me.wholeExecution) {
          if (typeof func == "function") {
            func();
          } else {
            console.warn(`Warning - cannot execute \`${func}\` since it is not a function.`, new Error().stack);
          }
        }
      }
    }
  }
  get length () {
    return (!!this.core) + this.before.length + this.execution.length + this.after.length;
  }
  used () {
    return !!this.length;
  }
  get wholeExecution () {
    var coreExecution = this.core ? [this.core] : [];
    return this.before.reverse().concat(coreExecution, this.execution, this.after)
  }
};


var update =
jst.util.update = function (oA, oB) {
  for (let name in oB) {
    oA[name] = oB[name];
  }
  return oA;
};

var deepUpdate =
jst.util.deepUpdate = function (arg) {
  deepUpdate_(arg.dest, arg.src);
};

var deepUpdate_ =
jst.util.deepUpdate_ = function (oDest, oSrc) {
  for (let name in oSrc) {
    let val = oSrc[name];
    if (typeof(val) === "object") {
      if (typeof(oDest[name]) !== "object") {
        if (oDest[name] !== undefined) {
          jst.warn(`deepUpdate: oSrc:${oSrc}, name:${name}, oSrc[name]:${oSrc[name]}, oDest:${oDest}, oDest[name]:${oDest[name]}. oDest[name] will be overwritten.`);
        }
        oDest[name] = {};
      }
      deepUpdate_(oDest[name], val);
    } else {// The simple case:
      oDest[name] = val;
    }
  }
  return oDest;
};

var arrayExtend =
jst.util.arrayExtend = function (destArray, srcArray) {
  Array.prototype.push.apply(destArray, srcArray);
}

var repeatArray =
jst.util.repeatArray = function (array, n) {
  let copy = [];
  let l = array.length;
  copy.length = n * l;
  for (let i of range(n)) {
    for (let j of range(l)) {
      copy[i*l+j] = array[j];
    }
  }
  return copy;
}

}); // End of jst.util
