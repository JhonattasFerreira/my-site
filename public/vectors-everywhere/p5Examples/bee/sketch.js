let widthFormat;
let heightFormat;
let bee;
let beePosition;
let mover;

function setup() {
  widthFormat = windowWidth;
  heightFormat = windowHeight;

  beePosition = createVector(widthFormat / 2, heightFormat / 2);

  bee = new Bee(widthFormat, heightFormat, beePosition);

  mover = new Mover(widthFormat, heightFormat, beePosition);

  createCanvas(widthFormat, heightFormat);

  background(144, 238, 144);
}

function draw() {
  background(144, 238, 144);
  bee.step();
  bee.show();

  mover.update();
  mover.show();
}
