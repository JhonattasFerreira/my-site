import Post from "../../../../../../../components/Post";
import ImageResponsive from "../../../../../../../components/ImageResponsive";

import photo from "../firstBlogScketch.jpg";

const BlogPost = () => {
  return (
    <Post title={"Criando Meu Site Pessoal"} date={"2024-04-23"}>
      <>
        <p>
          Olá, meu nome é Jhonattas e depois de procrastinar bastante, resolvi
          criar meu Blog 🎉🎉🎉
        </p>

        <p>
          Esse é o "Hello World" do meu blog (o primeiro post). vou explicar
          melhor como surgiu a ideia e como foi feito.
        </p>

        <h2>Por que criar um blog?</h2>

        <p>
          Sempre quis ter um blog para escrever sobre meus projetos pessoais no
          GitHub, compartilhar o que estou aprendendo e o que não consegui
          aprender 🫠. Geralmente quando descrevo como as coisas funcionam,
          aprendo bastante.
        </p>

        <p>
          Tenho dificuldade de escrever e organizar as ideias, então um blog me
          incentivará a praticar e compartilhar informações. Além disso, cada
          post tem a versão português e inglês.
        </p>
        <p>— Você vai escrever duas vezes?</p>
        <p>— Sim 🙃</p>

        <p>
          Quero treinar meu inglês, então o blog seria uma forma de praticar.
        </p>

        <p>Resumindo, os motivos são:</p>
        <ul>
          <li>Compartilhar conhecimento</li>
          <li>Me expressar melhor</li>
          <li>Treinar inglês</li>
        </ul>

        <h2>Como foi feito?</h2>

        <p>
          Utilizei três bibliotecas: <strong>React</strong>,{" "}
          <strong>React-DOM</strong> e <strong>Next</strong>. A ideia é começar
          simples, porém sei que a complexidade do código vai escalar (a
          entropia na programação é forte 😅). O site pode ser dividido em duas
          partes principais: a Home e o Blog.
        </p>

        <h3>Home</h3>

        <p>
          Na home, defini o estilo do site, como a cor do background e do texto,
          fonte, etc. Neste momento, não tinha noção de que acabaria criando um
          blog. Meu primeiro rascunho do site foi patético, como pode ser visto
          abaixo:
        </p>

        <ImageResponsive
          src={photo}
          alt={
            "Uma imagem de um bloco de nota com um desenho de um site genérico. Existem poucas informações e o design é bem simples."
          }
        />

        <p>
          O site não tinha alma, eu tentei copiar algo que vi na internet. No
          fim, removi as imagens, mudei para texto e fiz uma animação de cursor
          do terminal. Eu curti bastante porque aprendi sobre animação no CSS.
          Aliás, o código da animação foi esse:
        </p>

        <pre>
          <code>
            @keyframes blink {"{\n"}
            &nbsp;50% {"{ "}opacity: 0;{" }\n"}
            &nbsp;80% {"{ "}opacity: 0.5;{" }\n"}
            {"}\n"}
            .rectangle {"{\n"}
            &nbsp;width: 2.8vw; {"\n"}
            &nbsp;height: inherit; {"\n"}
            &nbsp;background: white; {"\n"}
            &nbsp;animation: blink 1.5s {"\n"}
            &nbsp;linear infinite;{"\n"}
            {"}\n"}
          </code>
        </pre>

        <h3>Blog</h3>

        <p>Depois de terminar a Home, pensei: e se eu fizer um blog?</p>
        <p>
          Comecei criando a página de listagem dos posts, utilizando um{" "}
          <code>JSON</code> para salvar e exibir os posts, e o{" "}
          <code>useContext</code> do React para salvar o idioma escolhido.
        </p>

        <p>
          Em seguida, veio o bom e velho CSS. Parece simples, porém a
          estilização deu um trabalhão.
        </p>

        <h2>Fim?</h2>
        <p>
          Existem várias pendências que precisam ser ajustadas no futuro, como a
          criação de um crawler para gerar o <code>JSON</code> das postagens, um
          sistema de busca e tags dos posts.
        </p>

        <p>
          Fico muito feliz de ter colocado tudo isso no ar. Tenho muito a
          melhorar, principalmente na comunicação. Enfim, obrigado pelo seu
          tempo se você chegou até aqui :)
        </p>
      </>
    </Post>
  );
};

export default BlogPost;
