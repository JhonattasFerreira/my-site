let widthFormat;
let heightFormat;
let mover;

function setup() {
  widthFormat = windowWidth;
  heightFormat = windowHeight;
  mover = new Mover(widthFormat, heightFormat);

  createCanvas(widthFormat, heightFormat);

  background(255);
}

function draw() {
  background(255);

  mover.update();
  mover.checkEdges();
  mover.show();
}
