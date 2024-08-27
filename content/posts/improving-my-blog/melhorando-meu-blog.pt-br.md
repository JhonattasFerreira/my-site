---
title: Melhorando Meu Blog com Gray-matter e React-markdown
date: "2024-06-14"
---

![Um GIF de um fluxo de imagens que remete a algo digital.](/digital.webp)

Grandes mudanças aconteceram no Blog 🎉🎉🎉

Antes de explicar o que mudou, é importante explicar como o blog estava estruturado.

O blog tinha 3 rotas: a listagem de posts, o post em inglês e o post em português brasileiro.

Sempre que eu fazia um novo post, precisava criar uma nova rota para a postagem em Inglês e outra rota para a postagem em Português, além de copiar e colar todas as tags **_HTML_** que usei em um post para o outro.

Isso não escalava e dava um trabalhão 😔

![A imagem de um gato branco, triste com lágrimas nos olhos](/sadCat.jpg)

Eu precisava melhorar o blog para que meu foco ficasse apenas em escrever novas postagens e não em me preocupar com rotas, tags **_HTML_** e coisas do tipo.

Seria legal se eu pudesse escrever um arquivo Markdown, o blog convertesse isso para uma página **_HTML_** e criasse uma rota, tudo de forma automática.

Pesquisando na internet, descobri o **_gray-matter_** e então tudo mudou.

## Gray-matter

O **_gray-matter_** é uma biblioteca inspirada no sistema de blog do **_Jekyll_**. Basicamente, ela consegue extrair o conteúdo e os metadados de um arquivo Markdown.

Vamos imaginar um arquivo chamado **_firstPost.md_** com este conteúdo:

```md
# A Title For The First Post

This is the normal content, just a few things.

Another normal content to complete the blog post.
```

Agora, basta lermos o arquivo com o **_gray-matter_**, desta forma:

```javascript
import fs from "fs";
import matter from "gray-matter";

const file = fs.readFileSync("content/firstPost.md");
const matterResult = matter(file);
```

A variável **_matterResult_** terá este valor:

```javascript
{
  content: '# A Title For The First Post\n' +
    '\n' +
    'This is the normal content, just a few things.\n' +
    '\n' +
    'Another normal content to complete the blog post.\n',
  data: {},
  isEmpty: false,
  excerpt: ''
}
```

Todo o conteúdo do **_firstPost.md_** fica na chave **_content_** e você consegue manipulá-lo normalmente. Vamos ajustar nosso arquivo para ficar no padrão [Front Matter](https://jekyllrb.com/docs/front-matter/).

```md
---
title: A Title For The First Post
date: "2024-06-09"
---

This is the normal content, just a few things.

Another normal content to complete the blog post.
```

O resultado será:

```javascript
{
  content: '\n' +
    'This is the normal content, just a few things.\n' +
    '\n' +
    'Another normal content to complete the blog post.\n',
  data: { title: 'A Title For The First Post', date: '2024-06-09' },
  isEmpty: false,
  excerpt: ''
}
```

Com isso, conseguimos segmentar e recuperar o conteúdo de um arquivo Markdown 😊

Mas como conseguimos converter isso para tags **_HTML_**?

## React-markdown

O **_react-markdown_** é uma biblioteca que converte o conteúdo de um arquivo Markdown em tags **_HTML_**. Um parágrafo em Markdown vira uma tag **_<p>_**, um link em Markdown vira uma tag **_<a>_**, etc.

Para usar, é simples:

```jsx
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const file = fs.readFileSync("content/firstPost.md");
const matterResult = matter(file);

const PostComponent = () => (
  <div>
    <h1>{matterResult.data.title}</h1>
    <ReactMarkdown>{matterResult.content}</ReactMarkdown>
  </div>
);
```

O resultado vai ser algo parecido com isso:

```html
<h1>A Title For The First Post</h1>

<p>This is the normal content, just a few things.</p>

<p>Another normal content to complete the blog post.</p>
```

Dessa forma, tudo que preciso fazer para criar novos posts é criar arquivos Markdown com os conteúdos.

## #Bônus: Inserindo blocos de código

Para inserir em nosso blog trechos de código de forma elegante, basta usarmos a biblioteca **_react-syntax-highlighter_**. Ela oferece Syntax highlighting e formatação de código.

Mas como conseguimos integrar isso ao **_react-markdown_**?

Simples, basta usarmos a propriedade **_components_**. Imagine nosso arquivo **_firstPost.md_**, porém com esse trecho de código:

````md
---
title: A Title For The First Post
date: "2024-06-09"
---

This is the normal content, just a few things.

Another normal content to complete the blog post.

```
const dogName = "Cacau";
console.log(dogName);
```
````

```

```

Agora precisamos ajustar o **_react-markdown_** para lidar com blocos de código:

```jsx
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const file = fs.readFileSync("content/firstPost.md");
const matterResult = matter(file);

const CodeBlock = ({ children }) => {};

const PostComponent = () => (
  <div>
    <h1>{matterResult.data.title}</h1>
    <ReactMarkdown components={{ code: CodeBlock }}>
      {matterResult.content}
    </ReactMarkdown>
  </div>
);
```

Neste momento, sempre que o **_ReactMarkdown_** se deparar com um trecho de código ele vai chamar a função **_CodeBlock_**. Agora, podemos usar o **_react-syntax-highlighter_** dentro da nossa nova função:

```jsx
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const file = fs.readFileSync("content/firstPost.md");
const matterResult = matter(file);

const CodeBlock = ({ children }) => {
  return (
    <SyntaxHighlighter language={"javascript"} style={atomDark}>
      {children}
    </SyntaxHighlighter>
  );
};

const PostComponent = () => (
  <div>
    <h1>{matterResult.data.title}</h1>
    <ReactMarkdown components={{ code: CodeBlock }}>
      {matterResult.content}
    </ReactMarkdown>
  </div>
);
```

A propriedade **_language_** indica a linguagem de programação utilizada e o **_style_** é o tema usado, no meu caso estou utilizando o **_atomDark_**.

Você pode verificar os temas disponíveis no próprio [repositório](https://github.com/react-syntax-highlighter/react-syntax-highlighter) do **_react-syntax-highlighter_**.

O código gerado vai se parecer com isso:

```javascript
const dogName = "Cacau";

console.log(dogName);
```

## Conclusão

Tudo isso foi uma grande mudança no blog que me possibilitou ser mais produtivo para escrever novos conteúdos. Agora não preciso mais me preocupar em criar tags **_HTML_**, tudo o que preciso fazer é apenas escrever um arquivo Markdown.

Em breve vou explicar como fiz para criar rotas dinâmicas utilizando **_Next_**.

Se quiser se aprofundar mais, o incrível [post](https://dev.to/joserfelix/how-to-make-a-static-blog-with-next-js-2bd6) do **Jose Felix** explica em detalhes outros pontos.
