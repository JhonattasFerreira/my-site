---
title: GIFs e Mais
date: "2024-09-01"
gif: /gifs-and-more/cat.gif
altTextGif: Um GIF sobre um gato branco.
---

Frutas esquecidas apodrecem.

O mesmo acontece com código, por isso que o blog passou por mais uma reforma. Dessa vez, com muitos GIFs.

A ideia com meu site pessoal era criar algo interativo, onde as coisas não parecessem tão chatas. Então decidi:

_Por que não deixar o blog mais visual?_

## Listagem de Postagens

A listagem antiga era chata, nada convidativa e não despertava curiosidade:

![Imagem da antiga listagem de blog posts](/gifs-and-more/oldList.png)

Então, para resolver isso, decidi que cada postagem teria seu própio GIF, que também apareceria na listagem de postagens. A primeira coisa que fiz foi adicionar dois novos atributos no arquivo **Markdown** de cada post:

```md
---
title: A Random Walker
date: "2024-07-26"
gif: /a-random-walker/walking.webp
altTextGif: A GIF of a girl walking with a static colorful background.
---
```

Os atributos **_gif_** e **_altTextGif_** podem então ser utilizados na listagem de postagens. Agora, podemos começar a nos divertir com o CSS.

### CSS

A ideia é criar uma caixa de tamanho fixo para cada post, que seja clicável e contenha um GIF ocupando toda a caixa, além do título e da data do post.

A estrutura do **_HTML_** para cada post na listagem é a seguinte:

```jsx
<article className={styles.articleBox}>
  <Link href={url}>
    <Image
      width={0}
      height={0}
      src={post.gif}
      alt={post.altTextGif}
      className={styles.gif}
      priority={true}
    />
    <div className={styles.articleContent}>
      <p className={styles.articleTitleText}>{post.title}</p>
      <em>
        <time dateTime={post.date} className={styles.articleDate}>
          {formatDate(post.date, language)}
        </time>
      </em>
    </div>
  </Link>
</article>
```

A classe **_.articleBox_** cria a caixa, assim:

```css
.articleBox {
  width: 100%;
  height: 25vw;
  position: relative;
  overflow: hidden;
}
```

Essa caixa ocupa toda a largura do elemento pai e 25% da largura da tela em altura.

Já o GIF é estilizado com a seguinte classe:

```css
.gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.6;
}
```

O GIF ocupa toda a caixa definida pela classe **_.articleBox_** e, com a propriedade **_object-fit: cover;_**, o GIF é cortado para preencher a área da caixa completamente.

Repare que também coloquei uma opacidade de **0.6** para o GIF. Fiz isso para criar um efeito de nitidez quando o mouse é colocado sobre a postagem, utilizando a seguinte classe:

```css
.articleBox a:hover .gif {
  opacity: 1;
}
```

O restante foi simples: posicionei o título e a data dentro da caixa e adicionei um fundo mais escuro atrás do texto para aumentar o contraste. A classe ficou assim:

```css
.articleContent {
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  transition: background-color 0.2s ease;
}
```

Algo bem legal foi a propriedade **_transition: background-color 0.2s ease;_**, que cria um efeito de _fade-in_ quando a opacidade é alterada.

Dessa forma, o resultado final da listagem de postagens ficou assim:

![Um GIF mostrando a nova listagem de blog posts](/gifs-and-more/newList.gif)

Essa mudança trouxe um frescor à listagem e, particulamente, achei que ficou bem convidativa.

A ideia para o futuro é tornar o blog mais interativo, permitindo que o leitor interaja diretamente com o conteúdo, seja por meio de comentários, reações ou até minigames.

Além disso, fiz outros pequenos ajustes.

## Pequenos Ajustes

Fiz alguns ajustes menores que, embora não sejam visualmente impactantes, melhoram a qualidade geral do blog.

As mudanças foram:

- Alterei todos os paddings, margens e tamanhos de fonte para usar a unidade **_rem_** em vez de **_vw/vh_**.
- Diminui o texto da página inicial e adicionei mais um link para o blog, aumentando o número de cliques na página do blog.
- Usei **_flexbox_** para organizar todas as centralizações das páginas.
- Integrei todos os códigos **_p5.js_** diretamente no projeto, em vez de usar um iframe para o site do **_p5.js_**.

Sinto que agora o blog está mais parrudo e preparado para suportar futuras mudanças.
