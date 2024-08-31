let position;
let velocity;

let widthFormat;
let heightFormat;

const ballSize = 50;
const ballRadius = ballSize / 2;

function setup() {
  widthFormat = windowWidth;
  heightFormat = windowHeight;

  position = createVector(100, 100);
  velocity = createVector(3, 3);

  createCanvas(widthFormat, heightFormat);
  background(255);
}

function draw() {
  background(255);

  position.add(velocity);

  if (position.x + ballRadius > width || position.x - ballRadius < 0) {
    velocity.x *= -1;
  }

  if (position.y + ballRadius > height || position.y - ballRadius < 0) {
    velocity.y *= -1;
  }

  stroke(0);
  fill(120);
  circle(position.x, position.y, ballSize);
}
