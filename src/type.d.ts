interface Jst {
    debug: boolean;

    init: Hook;
    start: Hook;
    gameOver: Hook;

    util: Util;
    time: Time;
    zone: {
        NewZone: (height: number, width: number) => Zone;
    };
    grid: Zone & WithGameOver & WithZoneOffset;
    trisBank: TrisBank;
    tris: TrisModule;
    solid: number[];
    initTris: (tris: Tris, zone: Zone) => void;

    crd: Crd;
    canvas: HTMLCanvasElement;
    acq: Acq;
    uact: Uact;

    ld: LineDeletion;
    linedeletion: LineDeletion;

    hold: Hold;
    held: Held;

    preview: Preview;

    shadow: Shadow;
}

declare var Hook: new (core?: () => void) => Hook;
declare var range: Util["range"];
declare var time: Time;
declare var resizeHook: Hook;
declare var j: Jst;

type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? RecursivePartial<U>[]
        : T[P] extends object
        ? RecursivePartial<T[P]>
        : T[P];
};

interface Util {
    doNothing: () => void;
    range: {
        (stop: number): Iterable<number>;
        (start: number, stop: number, step?: number): Iterable<number>;
    };
    Matrix: <TF, TR extends TF | Array<any>>(
        filler_value: TF,
        dimensionList: number[]
    ) => TR;
    Hook: new () => Hook;
    update: <T>(oA: Partial<T>, oB: Partial<T>) => T;
    deepUpdate: <T>(oA: RecursivePartial<T>, oB: RecursivePartial<T>) => void;
    Vector: VectorUtil;
    Color: ColorUtil;
}

interface Hook {
    before: (() => void)[];
    core?: () => void;
    execution: (() => void)[];
    after: (() => void)[];
    enabled: boolean;
    run: () => void;
    length: number;
    used: () => boolean;
}

interface VectorUtil {
    scale: (vect: number[], factor: number) => number[];
    add: (vectA: number[], vectB: number[]) => number[];
    subtract: (vectA: number[], vectB: number[]) => number[];
}

type Color = [number, number, number];

interface ColorUtil {
    black: number[];
    white: number[];
    textFromTriplet: (triplet: Color) => string;
    tripletFromText: (tripletFromText: string) => Color;
    avg: (color1: Color, color2: Color) => number;
}

interface Time {
    suspended: number;
    tick: Tick;
    pause: Hook;
    resume: Hook;
    toogleSuspend: Hook;
    start: Hook;
}

interface Tick extends Hook {
    period: number;
    schedule: number;
}

interface Zone extends Array<Array<number>> {
    height: number;
    width: number;
    genVoidLine: () => Array<number>;
}

interface WithZoneOffset {
    xoff: number;
    yoff: number;
}

interface WithGameOver {
    gameOver: Hook & {
        symbol: string[];
        color: Record<string, number>;
    };
}

interface TrisBank {
    shapes: Record<string, number[]>;
    rotationCenter: Record<string, number[]>;
    colors: Record<string, number>;
    types: string[];
    randomType: () => string;
}

interface TrisModule extends Tris {
    default: Tris;
    rend: Hook;
    erease: Hook;
    collision: () => boolean;
    savetris: () => void;
    restoretris: () => void;
    sav: Tris;
    move: Hook & Pair & { collision: boolean };
    rotate: Hook & { rot: number; collision: boolean };
    fall: Hook & { collision: Hook };
    down: Hook;
    quickfall: Hook;
    genQuickfallCore: (tris: TrisModule) => () => void;
    overground: Hook & { float: number };
    enter: Hook & { trisType: string };
    getType: Hook;
}

interface Tris {
    type: string;
    shape: number[];
    rot: number;
    color: number;
    pos: Pair;
}

interface Pair {
    x: number;
    y: number;
}

interface Crd {
    board: Board;
    tris: Tris;
    grid: Zone & WithRend;
    color: Record<number, string>;
    hue: Record<string, string>;
    init: Hook;
    ctx: CanvasRenderingContext2D;
    handelResize: () => void;
    pps: number;
    outline: number;
    wideline: number;
    initZone: (crdzone: Zone, jstzone: Zone, bo: Board) => void;
    initTris: (crdtris: Tris, jstTris: Tris, crdzone: Zone) => void;
}

interface Board {
    width: number;
    height: number;
    pwidth: number;
    pheight: number;
    pxoff: number;
    pyoff: number;
    rend: Hook;
}

interface WithRend {
    rend: () => void;
}

interface Acq {
    init: Hook;
    handelkeydown: (ev: KeyboardEvent) => void;
    keyDown: KeyDown;
}

interface KeyDown extends Array<Hook> {
    escape: Hook;
    spacebar: Hook;
    pgup: Hook;
    pgdown: Hook;
    end: Hook;
    beginning: Hook;
    left: Hook;
    up: Hook;
    right: Hook;
    down: Hook;
    p: Hook;
    ev: KeyboardEvent;

    shift_: Hook;
}

interface Uact {
    basicHookNames: string[];
    moveLeft: Hook;
    moveRight: Hook;
    rotate: Hook;
    moveDown: Hook;
    quickfall: Hook;
    overground: Hook;
    toogleSuspend: Hook;
    enable: () => void;
    disable: () => void;

    hold: Hook;
}

interface LineDeletion {
    deleteLine: Hook & { y: number };
    checkLines: () => void;
}

interface Hold {
    zone: Zone & WithZoneOffset;
    swap: Hook;
    board: Board;
}

interface Held extends Tris {
    crd: Tris;
    enter: Hook & { trisType: string };
    rend: Hook;
    erease: Hook;
}

interface Preview {
    length: number;
    boxlist: TBox[];
    firstbox: TBox;
    lastbox: TBox;
}

interface TBox {
    index: number;
    tris: Tris;
    crdtris: Tris;
    zone: Zone & WithZoneOffset;
    board: Board;

    enter: Hook;
    input: () => string;

    output: () => string;
}

interface Shadow extends Tris {
    pos: Pair;
    color: number;
    crd: Tris;

    willUpdate: boolean;

    update: Hook;
    rend: Hook;
    erease: Hook;

    setWillUpdate: () => void;
    moveConditionalErease: () => void;
    moveConditionalUpdate: () => void;

    collision: () => boolean;
}
