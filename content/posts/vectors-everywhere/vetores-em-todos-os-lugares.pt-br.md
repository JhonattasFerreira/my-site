---
title: Vetores Em Todos Os Lugares
date: "2024-08-16"
gif: /vectors-everywhere/vector.webp
altTextGif: Um GIF em estilo vaporwave com uma câmera se movendo por uma estrada quadriculada sob chuva, coqueiros nas laterais, montanhas ao fundo e uma grande lua no céu.
---

Eu pensei que nunca mais usaria planos cartesianos na vida.

Não me leve a mal, mas quando ainda estava no colégio alguns assuntos eram díficies para mim, como química orgânica, planos cartesianos e nomes de nuvem.

Mas aqui estou, fazendo normalização de vetores, descobrindo suas magnitudes e fazendo aritmética básica com eles. Tudo isso é _culpa_ do incrível livro [The Nature of Code](https://natureofcode.com/vectors/) de **Daniel Shiffman**. Este post é minha tentativa de passar o que aprendi.

_Você pode conferir a [postagem do capítulo anterior](/blog/pt-br/um-caminhante-aleatorio)._

## Vetores

![Minha triste tentativa de criar uma abelha (círculo amarelo) sendo perseguida por um pássaro (triângulo azul) em um campo verde $ https://editor.p5js.org/jhocore/sketches/g7rDGS_wN](/vectors-everywhere/p5Examples/bee)

O termo vetor pode ter várias definições, mas vamos focar no vetor euclidiano, uma entidade com um tamanho e uma direção. Matematicamente, esse _tamanho_ é chamado de **magnitude**.

Vetores aparecem em muitos contextos, como 2D, 3D, machine learning e análise de dados. Mas aqui vamos nos restringir ao 2D (duas dimensões).

Tipicamente podemos representar um vetor através de uma seta:

![Uma imagem que contém uma seta representando um vetor. A seta é preta e o fundo é branco.](/vectors-everywhere/vectorEuclid.png)

_Mas, como podemos posicionar esses pontos em um espaço bidimensional?_

Usando um plano cartesiano. A representação é assim: (3,5), onde 3 é a coordenada no eixo X e 5 no eixo Y.

![Uma imagem que contém um vetor (3,5) em um plano cartesiano](/vectors-everywhere/vectorCartesian.png)

O vetor fornece as instruções para sair da origem (0,0) e chegar ao ponto desejado, neste caso, (3,5).

_Mas, como podemos representar vetores no **p5.js**?_

A diferença é que a origem (0,0) no **_p5.js_** é representada no canto superior esquerdo:

![Uma imagem que contém um vetor (3,5) em p5.js](/vectors-everywhere/vectorP5.png)

A ideia no **_p5.js_** é que, a cada quadro da animação (**_draw_**), possamos mover nosso objeto uma certa distância vertical e horizontal. Isso é um vetor, com magnitude (tamanho da distância) e direção. Em outras palavras, um vetor define a velocidade do objeto.

Se você não entendeu nada do que eu disse, recomendo que você leia o post do [capítulo anterior](/blog/pt-br/um-caminhante-aleatorio) ou consulte diretamente o livro [The Nature of Code (NOC)](https://natureofcode.com/) de **Daniel Shiffman**.

_Mas, como podemos modificar a velocidade de um objeto através de um vetor?_

Através de operações com vetores.

## Operações com Vetores

Podemos realizar as principais operações aritméticas com vetores: adição, subtração, divisão e multiplicação. O **_NOC_** já explica essas operações em detalhes, então vou apenas resumir.

A adição de dois vetores resulta em um novo vetor com a soma das magnitudes. A subratração, retorna a diferença entre dois vetores.

![Bola se movimentando através de vetores $ https://editor.p5js.org/jhocore/sketches/gn-p7IYIT](/vectors-everywhere/p5Examples/ballWithVector)

Primeiro, criamos dois vetores, um para **posição** e outro para a **velocidade**:

```js
function setup() {
  position = createVector(100, 100);
  velocity = createVector(3, 3);

  createCanvas(widthFormat, heightFormat);
  background(255);
}
```

Depois, somamos a **velocidade** à **posição** e desenhamos a elipse na tela:

```js
function draw() {
  position.add(velocity);
  circle(position.x, position.y, ballSize);
}
```

Esses dois passos juntos formam o conceito básico de movimento, chamado **_Motion 101_**.

Porém, essa movimentação não faz muita coisa, vamos acelerar.

## Aceleração

A aceleração é a taxa de **mudança da velocidade**. É um vetor que altera a **velocidade**, que por sua vez altera a **posição**, como um efeito cascata:

```js
velocity.add(acceleration);
position.add(velocity);
```

Por fim, o código abaixo cria uma elipse que acelera na direção do mouse:

![Bola acelerando na direção do mouse $ https://editor.p5js.org/jhocore/sketches/KZEsoXh4-](/vectors-everywhere/p5Examples/ballFollowMouse)

Chegamos ao fim dos vetores, por diversas vezes me peguei pensando em como um punhado de códigos simples pode gerar coisas tão incriveis.

Agora que entendo um pouco sobre **aleatoriedade** e **movimento**, as coisas estão começando a ficar interessantes.
