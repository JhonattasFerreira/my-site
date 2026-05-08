---
title: Criando Meu Site Pessoal
date: "2024-04-23"
gif: /creating-my-personal-site/fireworks.webp
altTextGif: Um GIF com fogos de atírifico colorido
description: "Uma visão geral de como e por que criei este blog pessoal — as decisões, a stack e o que aprendi no processo."
---

Olá, meu nome é Jhonattas e depois de procrastinar bastante, resolvi criar meu Blog 🎉🎉🎉

Esse é o "Hello World" do meu blog. Vou explicar melhor como surgiu a ideia e como foi feito.

## Por que criar um blog?

Sempre quis ter um blog para escrever sobre meus projetos pessoais no GitHub, compartilhar o que estou aprendendo e o que não consegui aprender 🫠. Geralmente quando descrevo como as coisas funcionam, aprendo bastante.

Tenho dificuldade de escrever e organizar as ideias, então um blog me incentivará a praticar e compartilhar informações. Além disso, cada post tem a versão português e inglês.

— Você vai escrever duas vezes?

— Sim 🙃

Quero treinar meu inglês, então o blog seria uma forma de praticar.

Resumindo, os motivos são:

- Compartilhar conhecimento
- Me expressar melhor
- Treinar inglês

## Como foi feito?

Utilizei três bibliotecas: **React**, **React-DOM** e **Next**. A ideia é começar simples, porém sei que a complexidade do código vai escalar (a entropia na programação é forte 😅). O site pode ser dividido em duas partes principais: a Home e o Blog.

### Home

Na home, defini o estilo do site, como a cor do background e do texto, fonte, etc. Neste momento, não tinha noção de que acabaria criando um blog. Meu primeiro rascunho do site foi patético, como pode ser visto abaixo:

![firstBlogScketch](/creating-my-personal-site/firstBlogScketch.jpg)

O site não tinha alma, eu tentei copiar algo que vi na internet. No fim, removi as imagens, mudei para texto e fiz uma animação de cursor do terminal. Eu curti bastante porque aprendi sobre animação no CSS. Aliás, o código da animação foi esse:

```css
@keyframes blink {
  50% {
    opacity: 0;
  }

  80% {
    opacity: 0.5;
  }
}

.rectangle {
  width: 2.8vw;
  height: inherit;
  background: white;
  animation: blink 1.5s linear infinite;
}
```

### Blog

Depois de terminar a Home, pensei: e se eu fizer um blog?

Comecei criando a página de listagem dos posts, utilizando um `JSON` para salvar e exibir os posts; e o `useContext` do React para salvar o idioma escolhido.

Em seguida, veio o bom e velho CSS. Parece simples, porém a estilização deu um trabalhão.

## Fim?

Existem várias pendências que precisam ser ajustadas no futuro, como a criação de um crawler para gerar o `JSON` das postagens, um sistema de busca e tags dos posts.

Fico muito feliz de ter colocado tudo isso no ar. Tenho muito a melhorar, principalmente na comunicação. Enfim, obrigado pelo seu tempo se você chegou até aqui :)
