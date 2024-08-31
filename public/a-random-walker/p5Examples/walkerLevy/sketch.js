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
    let step = 10;
    let stepx = this.customStep(step);
    let stepy = this.customStep(step);
    this.x += stepx;
    this.y += stepy;
  }

  customStep(maxStep) {
    while (true) {
      let r1 = random(-maxStep, maxStep);
      let probability = sq(map(abs(r1), 0, maxStep, 0, 1));
      let r2 = random(1);
      if (r2 < probability) {
        return r1;
      }
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
