class Mover {
  constructor(widthFormat, heightFormat, beePosition) {
    this.widthFormat = widthFormat;
    this.heightFormat = heightFormat;
    this.position = createVector(this.widthFormat / 2, this.heightFormat / 2);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topspeed = 5;

    this.beePosition = beePosition;
  }

  update() {
    let bee = createVector(this.beePosition.x, this.beePosition.y);
    let dir = p5.Vector.sub(bee, this.position);

    dir.normalize();

    dir.mult(0.1);

    this.acceleration = dir;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(0, 0, 255);
    triangle(
      this.position.x,
      this.position.y - 16,
      this.position.x - 16,
      this.position.y + 16,
      this.position.x + 16,
      this.position.y + 16
    );
  }
}
