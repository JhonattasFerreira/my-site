let sdSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  sdSlider = createSlider(1, 100, 50);
  sdSlider.position(10, 10);
}

function draw() {
  let sd = sdSlider.value();

  let x = randomGaussian(windowWidth / 2, sd);
  let y = randomGaussian(windowHeight / 2, sd);

  let r = randomGaussian(127, sd / 2);
  let g = randomGaussian(127, sd / 2);
  let b = randomGaussian(127, sd / 2);
  fill(r, g, b);
  noStroke();
  ellipse(x, y, 10, 10);
}
