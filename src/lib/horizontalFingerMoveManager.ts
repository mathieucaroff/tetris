export interface HorizontalFingerMoveManagerProp {
    element: HTMLElement;
    callback: (kind: "left" | "right" | "tap") => void;
}

export let horizontalFingerMoveManager = ({
    element,
    callback,
}: HorizontalFingerMoveManagerProp) => {
    let getTouches = (event: any): MouseEvent => {
        return (
            // browser API ?? jQuery
            event.touches?.[0] ?? event.originalEvent?.touches?.[0] ?? event
        );
    };

    let hasMoved = false;
    let xDown = 0;

    let handleTouchStart = (evt) => {
        hasMoved = false;
        let touch = getTouches(evt);

        xDown = touch.clientX;
    };

    let handleTouchMove = (evt) => {
        hasMoved = true;
        if (!xDown) {
            return;
        }

        let touch = getTouches(evt);

        let currentX = touch.clientX;

        let dx = currentX - xDown;

        if (Math.abs(dx) < 80) {
            return;
        }

        xDown = currentX;

        if (dx < 0) {
            callback("left");
        } else {
            callback("right");
        }
    };
    let handleTouchEnd = () => {
        if (!hasMoved) {
            callback("tap");
            hasMoved = true;
        }
    };

    let mouseIsDown = false;
    let handleMouseDown = (ev: Event) => {
        mouseIsDown = true;
        handleTouchStart(ev);
    };

    let handleMouseMove = (ev) => {
        if (mouseIsDown) {
            handleTouchMove(ev);
        }
    };

    let handleMouseUp = () => {
        mouseIsDown = false;
    };

    element.addEventListener("touchstart", handleTouchStart, false);
    element.addEventListener("touchmove", handleTouchMove, false);
    element.addEventListener("touchend", handleTouchEnd, false);
    element.addEventListener("mousedown", handleMouseDown, false);
    element.addEventListener("mousemove", handleMouseMove, false);
    element.addEventListener("mouseup", handleMouseUp, false);

    let removeAll = () => {
        element.removeEventListener("touchstart", handleTouchStart, false);
        element.removeEventListener("touchmove", handleTouchMove, false);
    };

    let me = {
        removeAll,
    };

    return me;
};
