class Map {
    constructor() {
        this.lines = []
    }

    addEdge(line) {
        this.lines.push(line);
    }

    getLineCollision(ball) {
        for (const l of this.lines) {
            if (l.intersectsWithCircle(ball.x, ball.y, ball.d / 2)) {
                return l;
            }
        }
        return null;
    }

    draw() {
        this.lines.forEach(l => {
            l.draw();
        })
    }
}