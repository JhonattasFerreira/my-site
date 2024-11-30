---
title: The Linux Command CCWC
date: "2024-11-30"
gif: /linux-command-ccwc/linux_terminal.webp
altTextGif: A GIF of a Linux terminal with a black background and green text.
---

Ah, nothing like redoing the Linux **_wc_** command on a Friday night.

Using **_Python_**. Now we're talking about the good life.

Using **_Vim_**, yikes.

This post is a compilation of my joys and tragedies in this endeavor.

Speaking of tragedy, let's start with my Romeo and Juliet.

## Vim

Man, using **_Vim_** is hard. It's so hard it actually hurts. How can something in the virtual world cause physical pain? I ask myself that question every day.

Before continuing, a bit of context: **_Vim_** is a text editor released in the 90s, quite popular among programmers, Linux users, and... _sufferers_. It is highly customizable and has numerous shortcuts, in addition to enabling something quite powerful called **_Vim Motions_**.

**_Vim Motions_** are how you move around in **_Vim_**, allowing you to move the cursor with speed and precision. And yes, it's an amazing feature, but the learning curve is colossal. I lost count of how many times I gave up on using **_Vim_**.

But there was a voice in my head that said, _"Are you really going to let a 90s text editor defeat you? Seriously? How pathetic!"_

I gathered the pieces of courage scattered on the floor and went into battle.

_"Let's go, time to code something with **Vim**."_

## CodingChallenges

I’ve always wanted to do a challenge from [CodingChallenges](https://codingchallenges.fyi/challenges/intro/), a series of programming challenges created by [John Crickett](https://github.com/JohnCrickett) that help developers practice programming. The idea is simple: recreate existing tools from the real world.

What I like most about the challenges is the freedom. You choose how to solve them following your own style, which is very different from _Tutorial Hell_.

The first challenge is to recreate the Linux **_wc_** (word count) command, which counts words, lines, characters, and file sizes of text files or standard input.

Our version of **_wc_** will be called **_ccwc_**.

## CCWC

Alright, let's go. The initial idea was to be able to run the **_ccwc_** command from any folder on the operating system and get just a print with **_"Hello World"_**.

Right from the start, I learned about the **_shebang_**, those two characters **_#!_** at the beginning of a script, followed by the path of the interpreter needed to run the script, in my case, **_Python_**.

My **_shebang_** ended up looking like this:

```js
#!/usr/bin/env Python3
```

With the operating system already configured to run the script, the next step is to make **_ccwc_** a command recognized anywhere on the system. To do this, we need to add it to the machine's **_PATH_**.

On Linux, there is a specific folder for user-created scripts: **_/usr/local/bin_**. Just create a symbolic link (a shortcut) of the script to this folder using the following command:

```js
sudo ln -s script/path /usr/local/bin/ccwc
```

Cool. Now we can run our script from anywhere on the operating system, and it already knows it should be run with **_Python_**.

But how do we capture the arguments passed to the script?

### Argparse

**_argparse_** is a **_Python_** module specifically designed to capture command-line arguments. It allows you to define the necessary arguments and add descriptions about what each one does.

If you want to see the details of how I implemented this, check out my code on [GitHub](https://github.com/JhonattasFerreira/ccwc).

At this point, my fingers were already _"bleeding"_, not because of the difficulty of the code, but because of **_Vim_**. Switching between **_insert_** and **_normal_** modes, combined with the unintuitive movement, turned a simple task into something complicated.

That's when I decided to organize the folders in a more logical way, to navigate more easily.

### Folder Organization

The idea behind this organization was to divide the files into small, well-defined responsibilities. So, I created three main files:

- **_cli.py_**: exclusively responsible for capturing the arguments.
- **_helper.py_**: contains the specific functions to handle each argument.
- **_ccwc.py_**: acts as the main orchestrator of the program.

In addition, I created a separate file for the tests, using the **_unittest_** module.

I could have divided the files even further, but I believe that simplicity and ease of modifying the code are much more important.

A simple code is much easier to understand and adjust for another developer who may work on it.

The complexity is already in **_Vim_**. And speaking of **_Vim_**...

### A little bit of joy

After the initial difficulty with **_Vim_** passes, you're rewarded with even more difficulty. However, curiously, you end up liking using it.

Nothing is more satisfying than executing a _"combo"_ of shortcuts and making multiple changes to your code. As strange as it may seem, you feel a pleasure in doing this.

Yes, I’m one of the suffering **_Vim_** users.

Don’t get me wrong, it’s still quite hard for me to use, but at the same time, it's very addictive.

## Final Considerations

The rest of the code was developed in a quite intuitive way. If you want to take a closer look, the project is available on my [GitHub](https://github.com/JhonattasFerreira/ccwc) — feel free to suggest improvements.

Overall, I really enjoyed this challenge. It took me about two days to complete it, and I already plan to do more. See you next time!
