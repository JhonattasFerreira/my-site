---
title: Vectors Everywhere
date: "2024-08-16"
---

![A vaporwave-style GIF with a camera moving through a checkered road under rain, palm trees on the sides, mountains in the background, and a large moon in the sky.](/vector.webp)

I thought I would never use Cartesian planes again in my life.

Don't get me wrong, but when I was still in school, some subjects were difficult for me, like organic chemistry, Cartesian planes and cloud names.

But here I am, normalizing vectors, discovering their magnitudes, and doing basic arithmetic with them. All of this is thanks to the amazing book [The Nature of Code](https://natureofcode.com/vectors/) by **Daniel Shiffman**. This post is my attempt to share what I’ve learned.

_You can check out the previous chapter's post [here](/blog/en/a-random-walker)._

## Vectors

[My sad attempt to create a bee (yellow circle) being chased by a bird (blue triangle) in a green field](https://editor.p5js.org/jhocore/full/g7rDGS_wN)

The term "vector" can have various definitions, but let's focus on the Euclidean vector, an entity with size and direction. Mathematically, this _size_ is called **magnitude**.

Vectors appear in many contexts, such as 2D, 3D, machine learning, and data analysis. But here, we will stick to 2D (two dimensions).

Typically, we can represent a vector using an arrow:

![An image containing an arrow representing a vector. The arrow is black, and the background is white.](/vectorEuclid.png)

_But, how can we position these points in a two-dimensional space?_

By using a Cartesian plane. The representation looks like this: (3,5), where 3 is the coordinate on the X-axis and 5 on the Y-axis.

![An image containing a vector (3,5) on a Cartesian plane](/vectorCartesian.png)

The vector provides the instructions to move from the origin (0,0) to the desired point, in this case, (3,5).

_But, how can we represent vectors in **p5.js**?_

The difference is that the origin (0,0) in **_p5.js_** is represented in the top-left corner:

![An image containing a vector (3,5) in p5.js](/vectorP5.png)

The idea in **_p5.js_** is that with each frame of the animation (**_draw_**), we can move our object a certain vertical and horizontal distance. This is a vector, with magnitude (size of the distance) and direction. In other words, a vector defines the velocity of the object.

If you didn't understand anything I said, I recommend you read the [previous chapter's](/blog/en/a-random-walker) post or consult **Daniel Shiffman's** book, [The Nature of Code (NOC)](https://natureofcode.com/), directly.

_But, how can we modify the speed of an object using a vector?_

Through vector operations.

## Vector Operations

We can perform the main arithmetic operations with vectors: addition, subtraction, division, and multiplication. The **_NOC_** already explains these operations in detail, so I'll just summarize.

The addition of two vectors results in a new vector with the sum of their magnitudes. Subtraction returns the difference between two vectors.

[Ball moving using vectors](https://editor.p5js.org/jhocore/full/gn-p7IYIT)

First, we create two vectors, one for **position** and another for **velocity**:

```js
function setup() {
  position = createVector(100, 100);
  velocity = createVector(3, 3);

  createCanvas(widthFormat, heightFormat);
  background(255);
}
```

Then, we add the **velocity** to the **position** and draw the ellipse on the screen:

```js
function draw() {
  position.add(velocity);
  circle(position.x, position.y, ballSize);
}
```

These two steps together form the basic concept of motion, called **_Motion 101_**.

However, this movement doesn't do much; let's add some acceleration.

## Acceleration

Acceleration is the rate of **change of velocity**. It’s a vector that changes the **velocity**, which in turn changes the **position**, like a cascade effect:

```js
velocity.add(acceleration);
position.add(velocity);
```

Finally, the code below creates an ellipse that accelerates toward the mouse:

[Ball accelerating toward the mouse](https://editor.p5js.org/jhocore/full/KZEsoXh4-)

We've reached the end of vectors, and I often find myself thinking about how a bunch of simple code can create such amazing things.

Now that I understand a little about **randomness** and **motion**, things are starting to get interesting.
