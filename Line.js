class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.xLen = x2 - x1;
        this.yLen = y2 - y1;
        this.len = Math.sqrt((this.xLen * this.xLen) + (this.yLen * this.yLen));
    }

    draw() {
        line(this.x1, this.y1, this.x2, this.y2);
    }

    intersectsWithCircle(cx, cy, r) {
        // is either end INSIDE the circle?
        // if so, return true immediately
        let inside1 = this.#pointCircle(this.x1, this.y1, cx, cy, r);
        let inside2 = this.#pointCircle(this.x2, this.y2, cx, cy, r);
        if (inside1 || inside2) return true;

        // get dot product of the line and circle
        let dot = (((cx - this.x1) * (this.x2 - this.x1)) + ((cy - this.y1) * (this.y2 - this.y1))) / pow(this.len, 2);

        // find the closest point on the line
        let closestX = this.x1 + (dot * (this.x2 - this.x1));
        let closestY = this.y1 + (dot * (this.y2 - this.y1));

        // is this point actually on the line segment?
        // if so keep going, but if not, return false
        let onSegment = this.#linePoint(closestX, closestY);
        if (!onSegment) return false;

        // get distance to closest point
        let distX = closestX - cx;
        let distY = closestY - cy;
        let distance = sqrt((distX * distX) + (distY * distY));

        if (distance <= r) {
            return true;
        }
        return false;
    }

    dist(x1, y1, x2, y2) {
        let distX = x2 - x1;
        let distY = y2 - y1;
        return Math.sqrt((distX * distX) + (distY * distY));
    }

    // https://www.jeffreythompson.org/collision-detection/line-circle.php
    #pointCircle(px, py, cx, cy, r) {
        let distance = this.dist(px, py, cx, cy);

        return distance < r;
    }

    #linePoint(px, py) {
        // get distance from the point to the two ends of the line
        let d1 = this.dist(px, py, this.x1, this.y1);
        let d2 = this.dist(px, py, this.x2, this.y2);

        // since floats are so minutely accurate, add
        // a little buffer zone that will give collision
        let buffer = 0.1;    // higher # = less accurate

        // if the two distances are equal to the line's
        // length, the point is on the line!
        // note we use the buffer here to give a range,
        // rather than one #
        if (d1 + d2 >= this.len - buffer && d1 + d2 <= this.len + buffer) {
            return true;
        }
        return false;
    }
}