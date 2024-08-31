class Mover {
  constructor(widthFormat, heightFormat) {
    this.widthFormat = widthFormat;
    this.heightFormat = heightFormat;
    this.ballSize = 50;
    this.ballRadius = this.ballSize / 2;
    this.topSpeed = 5;

    this.position = createVector(widthFormat / 2, heightFormat / 2);
    this.velocity = createVector();

    this.acceleration = createVector();
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let direction = p5.Vector.sub(mouse, this.position);
    direction.normalize();
    direction.mult(1);
    this.acceleration = direction;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
  }

  show() {
    stroke(0);
    fill(175);

    circle(this.position.x, this.position.y, this.ballSize);
  }

  checkEdges() {
    if (this.position.x + this.ballRadius > this.widthFormat) {
      this.position.x = 0 + this.ballRadius;
    } else if (this.position.x + this.ballRadius < 0) {
      this.position.x = this.widthFormat - this.ballRadius;
    }

    if (this.position.y + this.ballRadius > this.heightFormat) {
      this.position.y = 0 + this.ballRadius;
    } else if (this.position.y + this.ballRadius < 0) {
      this.position.y = this.heightFormat - this.ballRadius;
    }
  }
}
