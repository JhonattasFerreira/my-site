class Bee {
  constructor(widthFormat, heightFormat, beePosition) {
    this.widthFormat = widthFormat;
    this.heightFormat = heightFormat;
    this.tx = 0;
    this.ty = 10000;

    this.position = beePosition;
  }

  step() {
    this.position.x = map(noise(this.tx), 0, 1, 0, this.widthFormat);
    this.position.y = map(noise(this.ty), 0, 1, 0, this.heightFormat);

    this.tx += 0.01;
    this.ty += 0.01;
  }

  show() {
    strokeWeight(2);
    fill(255, 204, 0);
    stroke(0);
    circle(this.position.x, this.position.y, 48);
  }
}
