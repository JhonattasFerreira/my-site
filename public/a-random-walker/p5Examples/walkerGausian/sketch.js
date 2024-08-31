class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
  }

  show() {
    stroke(0);
    point(this.x, this.y);
  }

  step() {
    let r = random(1);

    let xStepSize = randomGaussian();
    let yStepSize = randomGaussian();

    if (r < 0.25) {
      this.x = this.x + xStepSize;
    } else if (r < 0.5) {
      this.x = this.x - xStepSize;
    } else if (r < 0.75) {
      this.y = this.y + yStepSize;
    } else {
      this.y = this.y - yStepSize;
    }
  }
}

let walker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}
