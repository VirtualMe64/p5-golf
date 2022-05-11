let b = null;
let map = null;
let fr = 30;
let maxPower = 200;

let mouseXStart = 0;
let mouseYStart = 0

let dragging = false;

function setup() {
    createCanvas(500, 500);

    map = new Map();
    b = new Ball(250, 250, 10, map);
    map.addEdge(new Line(5, 5, 400, 50));
    map.addEdge(new Line(400, 50, 440, 400));

    frameRate(30);
}

function draw() {
    background(220);
    b.updateAll(deltaTime);
    map.draw();

    if (dragging) {
        let dX = mouseX - mouseXStart;
        let dY = mouseY - mouseYStart
        line(b.x, b.y, b.x + dX, b.y + dY);
    }
}

function updateBallVel(dX, dY) {
    let power = Math.sqrt((dX * dX) + (dY * dY));
    multiplier = Math.min(maxPower / power, 1);
    b.setVel(-dX * multiplier, -dY * multiplier);
}

function mousePressed() {
    mouseXStart = mouseX;
    mouseYStart = mouseY;
    dragging = true;
  }
  
function mouseReleased() {
    dragging = false;
    updateBallVel(mouseX - mouseXStart, mouseY - mouseYStart);
}
