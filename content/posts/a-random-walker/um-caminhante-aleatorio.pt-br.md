---
title: Um Caminhante Aleatório
date: "2024-07-26"
---

![Um GIF de uma menina caminhando com um fundo colorido estático.](/a-random-walker/walking.webp)

Era uma noite de sábado, chovia, quando descobri o incrível canal [The Coding Train](https://www.youtube.com/@TheCodingTrain) do **Daniel Shiffman** e, devorando vários vídeos em sequência, senti uma empolgação com programação que há tempos não sentia.

Em um vídeo, ele mencionou seu livro, [The Nature of Code](https://natureofcode.com/). O nome despertou minha curiosidade; como pode natureza e código estarem juntos? Então, comecei a lê-lo.

## The Nature of Code

A proposta deste livro é simples: como simular, com código, fenômenos do mundo físico.

[Minha triste tentativa de criar uma abelha em um campo verde](https://editor.p5js.org/jhocore/full/DODgq6suN)

Pelo que entendi, a ideia de **The Nature of Code (NOC)** é dividir o mundo natural em partes menores e transformá-las em código usando JavaScript.

O livro está lotado de conceitos físicos e matemáticos, o que me assustou, pois eu odiava essas matérias na escola. Porém, todos os conceitos são mostrados de forma visual através da biblioteca **_p5.js_**.

Como é incrível o **_p5.js_**, ele é ótimo para criar arte, permitindo fazer desenhos através de código. É simples, rápido e pode ser executado diretamente no navegador através do editor. Todos os códigos do livro utilizam o **_p5.js_**.

O código base do **_p5.js_** é:

```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
```

A função **_setup_** é executada apenas uma vez quando o programa começa; neste caso, ela cria uma tela de **400x400** pixels.

A função **_draw_** roda tudo que está dentro em loop e é onde desenhamos na tela que foi criada pelo **_setup_**. Eu disse, é simples.

Enfim, chegamos ao capítulo 0: **Aleatoriedade**.

## Aleatoriedade

A aleatoriedade na computação é uma **mentira**. Na verdade, os computadores geram números pseudoaleatórios, ou seja, com o tempo, os números começam a se repetir. Esse período é tão longo que, geralmente, os números gerados são suficientes na maioria das coisas.

Com isso somos introduzidos ao conceito do **_Walker_** (caminhante). Um ponto no canvas que se move de forma aleatória:

[Um **_Walker_** simples](https://editor.p5js.org/jhocore/full/dBdk-VWmu)

Como algo tão simples pode ser tão legal?

É apenas um pontinho que, a cada a loop do draw, escolhe um lado para ir e depois recomeça. Eu achei isso tão incrível que, a partir deste ponto, já não conseguia parar de ler o **_NOC_**.

O problema, segundo o que entendi do autor, é que **aleatoriedade pura não é um bom design para criar uma simulação orgânica**; precisamos de alguma forma de produzir números aleatórios onde alguns resultados são mais provavéis que outros. É aí que entra a **distribuição Gaussiana**.

### Distribuição Gaussiana

A distribuição Gaussiana é uma forma onde os números se agrupam em torno de um valor médio. E através de algo chamado desvio padrão, a aleatoriedade pode se acumular perto dessa média ou não.

Podemos ver isso neste desenho:

[Pontos que aperecem seguindo a distribuição Gaussiana](https://editor.p5js.org/jhocore/full/z1KDRMB32)

Se você deslizar o **_slider_** para direita, os pontos ficam mais aleatório, mas para a esquerda, os pontos tendem a se concentrar no meio.

Dessa forma, o **_Walker_** utilizando a distribuição Gaussiana fica assim:

[O **_Walker_** utilizando distribuição Gaussiana](https://editor.p5js.org/jhocore/full/5NaMxvyjs)

Porém, existe um problema com o **_Walker_** que utiliza a aleatoriedade pura e a distribuição Gaussiana: eles retornam várias vezes para posições ja visitadas (**_oversampling_**). O **_NOC_** apresenta uma solução: os **Voos de Lévy**

### Voos de Lévy

Achei esse nome muito legal, daria um bom filme, eu acho.

Enfim uma das formas de evitar o **_oversampling_** é fazer com que nosso **_Walker_** pule grandes distâncias de vez quando, reduzindo quantidade de vezes que o **_Walker_** passou pelo mesmo lugar.

Um forma simples de implementar os Voos de Lévy é: quanto maior passo, menor a chance de ser escolhido e quanto menor o passo, maior a chance.

Ficando assim dessa forma:

[Um **_Walker_** com uma implementação simples dos Voos de Lévy](https://editor.p5js.org/jhocore/full/_TVeoYjAw)

O problema é que os Voos de Lévy não são tão suaves, é aí que entra os **Ruídos de Perlin**.

### Ruidos de Perlin

Já que a aleatoriedade não é algo tão natural assim, precisamos gerar números aleatórios de forma mais fluída. O algoritimo conhecido como Ruído de Perlin faz isso. Ele gera números pseudo-aleatórios, onde cada número é próximo do número anterior.

_Fun-fact: O ruído de Perlin foi criado por Ken Perlin para ser usado no filme Tron._

Uma das melhores partes deste livro é quando Daniel Shiffman mostra visualmente a diferença entre a função **_random_** e a função **_noise_**(Perlin Noise).

Ele mostra isso através da função vertex que cria vértices, basta você passar um valor **_x_** (largura) e um **_y_** (altura).

Nesse caso o valor de **_y_** (altura) é gerado por **_random_**:

[Vértices com alturas geradas a partir da função **_random_**](https://editor.p5js.org/jhocore/full/0020FfYPA)

Já neste outro caso, **_y_** (altura) é gerado pelo **_noise_**:

[Vértices com alturas geradas a partir da função **_noise_**](https://editor.p5js.org/jhocore/full/V07H-n-bT)

Eu não sei você, mas eu achei isso incrível, o jeito que a linha é desenhada de forma orgânica porém é tudo gerado de forma aleatória. Isso me encantou.

Por fim, o **_Walker_** com Ruído de Perlin:

[Um **_Walker_** simples com Ruído de Perlin](https://editor.p5js.org/jhocore/full/0lEbvMagJ)

O livro continua explicando mais assuntos, e eu recomendo muitíssimo a leitura dele. É totalmente **_grátis_**.

Vou continuar lendo, e o próximo capítulo será sobre **_vetores_**. Eu estou super empolgado e talvez eu comente sobre ele em algum outro post.
