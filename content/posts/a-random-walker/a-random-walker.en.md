---
title: A Random Walker
date: "2024-07-26"
gif: /a-random-walker/walking.webp
altTextGif: A GIF of a girl walking with a static colorful background.
---

It was a rainy Saturday night when I discovered the incredible YouTube channel [The Coding Train](https://www.youtube.com/@TheCodingTrain) by **Daniel Shiffman**. As I devoured several videos in a row, I felt an excitement for programming that I hadn't experienced in a long time.

In one video, he mentioned his book, [The Nature of Code](https://natureofcode.com/). The name piqued my curiosity; how could nature and code be together? So, I started reading it.

## The Nature of Code

The purpose of this book is simple: how to simulate physical phenomena with code.

![My sad attempt to create a bee in a green field $ https://editor.p5js.org/jhocore/sketches/DODgq6suN](/a-random-walker/p5Examples/bee)

From what I understand, the idea behind **The Nature of Code (NOC)** is to break down the natural world into smaller parts and transform them into code using JavaScript.

The book is packed with physical and mathematical concepts, which intimidated me since I hated these subjects in school. However, all the concepts are presented visually through the **_p5.js_** library.

How amazing **_p5.js_** is; it’s great for creating art, allowing you to draw through code. It’s simple, fast, and can be run directly in the browser through the editor. All the code in the book uses **_p5.js_**.

The base code for **_p5.js_** is:

```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
```

The **_setup_** function is executed only once when the program starts; in this case, it creates a **400x400** pixel canvas.

The **_draw_** function runs everything inside it in a loop and is where we draw on the canvas created by the **_setup_**. I said, it's simple.

Finally, we arrive at Chapter 0: **Randomness**.

## Randomness

Randomness in computing is a **lie**. In reality, computers generate pseudo-random numbers, meaning that over time, the numbers start to repeat. This period is so long that usually the generated numbers are sufficient for most things.

With this, we are introduced to the concept of the **_Walker_**. A point on the canvas that moves randomly:

![A simple Walker $ https://editor.p5js.org/jhocore/sketches/dBdk-VWmu](/a-random-walker/p5Examples/simpleWalker)

How can something so simple be so cool?

It's just a little dot that, in each loop of draw, chooses a direction to go and then starts again. I found this so amazing that from this point on, I couldn't stop reading **_NOC_**.

The problem, according to what I understood from the author, is that **pure randomness is not a good design for creating an organic simulation**; we need some way to produce random numbers where some results are more likely than others. That's where the **Gaussian distribution** comes in.

### Gaussian Distribution

The Gaussian distribution is a way where numbers cluster around a mean value. And through something called standard deviation, the randomness can accumulate near this mean or not.

We can see this in this drawing:

![Points that appear following the Gaussian distribution $ https://editor.p5js.org/jhocore/sketches/z1KDRMB32](/a-random-walker/p5Examples/gaussianDistribution)

If you slide the **_slider_** to the right, the points become more random, but to the left, the points tend to concentrate in the middle.

Thus, the **_Walker_** using the Gaussian distribution looks like this:

![The Walker using Gaussian distribution $ https://editor.p5js.org/jhocore/sketches/5NaMxvyjs](/a-random-walker/p5Examples/walkerGausian)

However, there is a problem with the **_Walker_** that uses pure randomness and Gaussian distribution: they return multiple times to already visited positions (**_oversampling_**). The **_NOC_** presents a solution: **Lévy Flight**.

### Lévy Flight

I found this name really cool; it would make a good movie title, I think.

Anyway, one way to avoid **_oversampling_** is to make our **_Walker_** jump large distances occasionally, reducing the number of times the **_Walker_** passes through the same place.

A simple way to implement Lévy Flight is: the larger the step, the smaller the chance of being chosen, and the smaller the step, the greater the chance.

So it looks like this:

![A Walker with a simple implementation of Lévy Flight $ https://editor.p5js.org/jhocore/sketches/_TVeoYjAw](/a-random-walker/p5Examples/walkerLevy)

The problem is that Lévy Flight are not so smooth; that's where **Perlin Noise** comes in.

### Perlin Noise

Since randomness isn't that natural, we need to generate random numbers in a smoother way. The algorithm known as Perlin Noise does this. It generates pseudo-random numbers, where each number is close to the previous number.

_Fun fact: Perlin Noise was created by Ken Perlin to be used in the movie Tron._

One of the best parts of this book is when Daniel Shiffman visually shows the difference between the **_random_** function and the **_noise_** (Perlin Noise) function.

He shows this through the vertex function, which creates vertices; you just need to pass an **_x_** (width) and a **_y_** (height) value.

In this case, the **_y_** (height) value is generated by **_random_**:

![Vertices with heights generated from the random function $ https://editor.p5js.org/jhocore/sketches/0020FfYPA](/a-random-walker/p5Examples/randomVertices)

In this other case, **_y_** (height) is generated by **_noise_**:

![Vertices with heights generated from the noise function $ https://editor.p5js.org/jhocore/sketches/V07H-n-bT](/a-random-walker/p5Examples/noiseVertices)

I don't know about you, but I found this amazing, the way the line is drawn organically, yet everything is generated randomly. It fascinated me.

Finally, the **_Walker_** with Perlin Noise:

![A Simple **_Walker_** with Perlin Noise $ https://editor.p5js.org/jhocore/sketches/0lEbvMagJ](/a-random-walker/p5Examples/walkerNoise)

The book continues explaining more topics, and I highly recommend reading it. It is completely **_free_**.

I will continue reading, and the next chapter will be about **_vectors_**. I am super excited and might comment on it in another post.
