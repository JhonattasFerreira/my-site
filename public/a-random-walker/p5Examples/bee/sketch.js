let walker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  walker = new Walker();
  background(144, 238, 144);
}

function draw() {
  background(144, 238, 144);
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.tx = 0;
    this.ty = 10000;
  }

  step() {
    this.x = map(noise(this.tx), 0, 1, 0, width);
    this.y = map(noise(this.ty), 0, 1, 0, height);

    this.tx += 0.01;
    this.ty += 0.01;
  }

  show() {
    strokeWeight(2);
    fill(255, 204, 0);
    stroke(0);
    circle(this.x, this.y, 48);
  }
}
