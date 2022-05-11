class Ball {
    constructor(x, y, r, map) {
        this.x = x;
        this.y = y;
        this.map = map;
        this.d = 2 * r;
        this.fricLoss = 70; // negative acceleration in un/s^2
        this.vel = createVector(0, 0);
    }

    updateAll(deltaTime) {
        this.updatePhysics(deltaTime / 1000);
        this.draw();
    }

    draw() {
        ellipse(this.x, this.y, this.d, this.d);
    }

    updatePhysics(deltaTime) {
        this.x += this.vel.x * deltaTime;
        this.y += this.vel.y * deltaTime;

        let xSign = Math.sign(this.vel.x);
        this.vel.x = xSign * Math.max(0, Math.abs(this.vel.x) - this.fricLoss * deltaTime);
        let ySign = Math.sign(this.vel.y);
        this.vel.y = ySign * Math.max(0, Math.abs(this.vel.y) - this.fricLoss * deltaTime);
        
        let collision = this.map.getLineCollision(this);

        if (collision) {
            this.handleBounce(this.vel.x, this.vel.y, Math.atan2(this.y2 - this.y1, this.x2 - this.x1))
        }
    }

    handleBounce(vX, vY, lineAngle) {
        let velAngle = Math.atan2(vX, vY);

        if (lineAngle < 0) {
            lineAngle = Math.PI + lineAngle;
        }
        if (velAngle < 0) {
            velAngle = Math.PI + velAngle;
        }

        let diff1 = Math.abs(velAngle - lineAngle);
        let diff2 = Math.abs(diff1 - Math.PI);

        let realNewAngle = 0;

        if (diff1 < diff2) {
            let newAngle = diff2;
            let change = 2 * ((Math.PI / 2) - newAngle)
            realNewAngle = Math.atan2(vX, vY) + change;
        }
        else {
            let newAngle = diff1;
            let change = 2 * ((Math.PI / 2) - newAngle)
            realNewAngle = Math.atan2(vX, vY) + change;
        }

        let magnitude = Math.sqrt((vX * vX) + (vY * vY));
        this.vel.x = magnitude * Math.sin(realNewAngle);
        this.vel.y = magnitude * Math.cos(realNewAngle);
    }
    
    setVel(vX, vY) {
        this.vel.set(vX, vY);
    }
}