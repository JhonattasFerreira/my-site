---
title: Criando Um Site Estático Com Next
date: "2024-06-15"
---

Este post é uma continuação das melhorias implementadas no blog. Para saber mais, confira o primeiro artigo sobre [como melhorei meu blog](/blog/pt-br/melhorando-meu-blog).

Após automatizar a criação de posts no blog usando arquivos Markdown, percebi que também precisava automatizar a criação de rotas.

Antes para cada novo post, eu tinha que criar manualmente uma nova rota. Isso era muito chato, pois tinha que copiar e colar repetidamente, além de criar muitas pastas no projeto.

Como seria bom se tivesse uma maneira de gerar rotas dinâmicas automaticamente, sem ter de fazer isso manualmente...

![Um gif da Alice de Alice no País das Maravilhas. Um gif onde ela está esperando pacientemente](/alice.gif)

Senhoras e senhores, lhes apresento o **_Slug_**.

## Slug

Antes de explicar o **_Slug_** é preciso explicar como funciona o sistema de rotas do **_Next_**.

O sistema de rotas do **_Next_** é baseado em arquivos, onde cada arquivo na pasta **_app_** corresponde a uma rota acessível. Se eu tivesse que criar uma rota para cada novo post (Inglês e Português) manualmente eu estaria muito triste (eu realmente estava, pois era exatamente isso que eu estava fazendo 😔).

É aqui que entra o **_Slug_**. O **_Slug_** é uma forma dinâmica para criação de rotas no **_Next_**. Em vez de criar uma rota estática para cada post, podemos utilizar **_Slug_**. Por exemplo, ao invés de ter uma rota como **_/posts/my-new-post_**, podemos usar **_/posts/[slug]_**, onde **_[slug]_** é substituído dinamicamente pelo identificador único do post.

Ok, mas como fazemos isso?

## Estrutura do blog

Meu blog tem algumas pastas importantes. A primeira é a **_./content/posts_**, onde estão os arquivos Markdown que serão convertidos em páginas **_HTML_**. Um exemplo de como essa estrutura é:

**_./content/post/creating-my-personal-site/_**

Dentro da pasta **_creating-my-personal-site_** eu tenho dois arquivos Markdown, um em Inglês e outro em Português:

- **_creating-my-personal-site.en.md_**
- **_criando-meu-site-pessoal.pt-br.md_**

Cada post do blog terá sua própria pasta dentro de **_./content/posts_**, contendo dois arquivos. O nome de cada arquivo será usado como o **_Slug_** e o título da página.

## Rotas

Dentro da pasta **_app_** temos algumas rotas:

- **_/_** é a rota index do site
- **_/blog/en_** é a rota das listagens de posts em Inglês
- **_/blog/pt-br_** é a rota das listagens de posts em Português
- **_/blog/en/[slug]_** é a rota dinâmica para o post em Inglês
- **_/blog/pt-br/[slug]_** é a rota dinâmica para o post em Português

O que acontece de forma simples é: a listagem de postagens itera sobre todos os arquivos na pasta **_./content/posts_** correspondente ao idioma da página. De cada arquivo, são recuperados o **título**, a **data da postagem** e o **nome do arquivo**.

O código que eu uso para buscar esses dados é:

```js
import fs from "fs";
import matter from "gray-matter";
import { ENCODING_UTF8 } from "@/utils/constants";

export default function getPostMetadata(basePath, language) {
  const folder = basePath + "/";
  const postFolders = fs.readdirSync(folder);

  const posts = postFolders.map((postFolder) => {
    const files = fs.readdirSync(`${basePath}/${postFolder}/`);

    const filename = files.find((file) => file.includes(`.${language}.md`));

    const fileContent = fs.readFileSync(
      `${basePath}/${postFolder}/${filename}`,
      ENCODING_UTF8
    );

    const { title, date } = matter(fileContent).data;

    return {
      title,
      date,
      slug: filename.replace(`.${language}.md`, ""),
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

O retorno dessa função é esse array:

```js
[
  {
    title: "Creating a Static Site with Next",
    date: "2024-06-15",
    slug: "static-site-generation-with-next",
  },
  {
    title: "Improving My Blog with Gray-matter and React-markdown",
    date: "2024-06-14",
    slug: "improving-my-blog",
  },
  {
    title: "How to Host a Website",
    date: "2024-05-08",
    slug: "how-to-hosting-a-website",
  },
  {
    title: "Creating My Personal Site",
    date: "2024-04-23",
    slug: "creating-my-personal-site",
  },
];
```

Com essas três informações, podemos exibir uma lista de postagens, ordenadas da mais recente para a mais antiga. O nome do arquivo é o **_Slug_**, permitindo que possamos criar um link usando o **_Slug_** correspondente.

Mas, se há 4 posts no exemplo acima, como o **_Next_** associa cada **_Slug_** ao respectivo post? Em outras palavras, como o **_Next_** recupera o conteúdo e associa ao **_Slug_** correspondente?

Simples, usando o **_Static Site Generation_**.

## Static Site Generation (SSG)

O **_Static Site Generation (SSG)_** é um recurso do **_Next_** que permite pré-renderizar páginas **_HTML_** no momento do **_build_**, ao invés de fazer isso a cada requisição.

Mas como fazemos isso?

Para ilustrar, vamos utilizar a rota em Inglês para as postagens: **_app/blog/en/[slug]/page.js_**

Dentro do **_page.js_**, precisamos exportar uma função assíncrona chamada **_generateStaticParams_** para definirmos os parâmetros que serão pré-renderizados. Essa função define quais URLs dinâmicas devem ser pré-renderizadas no momento do **_build_**.

O exemplo utilizado aqui no Blog:

```js
export const generateStaticParams = async () => {
  const posts = getPostMetadata(CONTENT_FOLDER, EN_LANGUAGE);

  return posts.map((post) => ({ slug: post.slug }));
};
```

Repare que eu uso a mesma função da listagem de postagem, porém retornando apenas o **_Slug_**. Dessa forma, todos os **_Slugs_** em Inglês vão ser pré renderizados. O mesmo processo acontece no caminho **_app/blog/pt-br/[slug]/page.js_**, só que para o idioma Português.

Assim, o **_Slug_** pode ser acessado como uma propriedade do próprio componente **_page.js_**.

Lembra que o **_Slug_** é o nome do arquivo Markdown que contém o conteúdo da postagem? Para recuperar esse conteúdo, basta usar o **_Gray-matter_** que explicamos no post anterior.

```jsx
const DynamicPost = (props) => {
  const slug = props.params.slug;
  const { data, content } = getPostContent(slug);

  return <Post data={data} content={content} />;
};

export default DynamicPost;
```

Usando essa estratégia todas as páginas do blog são pré renderizadas no **_build_**, por isso que é tão rápido.

Outro ponto é que o blog fica bastante otimizado, como podemos ver no **_lighthouse_**:

![A imagem do report feito pela ferramenta do Google chamada lighthouse. Na imagem é mostrado os parâmetros Performance, Accessibility, Best Practices e SEO. Todos com o valor de 100](/lighthouse.png)

Essas foram todas as mudanças que foram feitas no blog. Sim, deu bastante trabalho pra fazer esses ajustes, mas agora sinto que o blog está ficando cada vez mais robusto.

Se quiser se aprofundar mais, o incrível [vídeo](https://www.youtube.com/watch?v=QIIc5EYSZpw) do **Smoljames** explica em detalhes o uso de **_SSG_**. Utilizei bastante o [código](https://github.com/jamezmca/static-recipe-blog/tree/main) dele como referência.
