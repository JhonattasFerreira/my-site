import Post from "../../../../../../../components/Post";
import Image from "next/image";
import photo from "../firstBlogScketch.jpg";

const BlogPost = () => {
  return (
    <Post title={"Criando Meu Site Pessoal"} date={"2024-04-23"}>
      <>
        <p>
          Olá, meu nome é Jhonattas e depois de muito tempo procrastinando
          resolvi criar meu site pessoal 🎉🎉🎉 Esse é basicamente o "Hello
          World" do meu blog então vou explicar melhor como surgiu a ideia dele
          e também como foi feito.
        </p>

        <h2>Por que criar um site pessoal (blog)?</h2>

        <p>
          Sempre quis ter um blog para escrever mais sobre meus projetos
          pessoais no GitHub, minhas experiências e também compartilhar um pouco
          sobre o que estou aprendendo (e coisas que não consegui aprender 🙃).
        </p>

        <p>
          Acredito que escrever sobre como fiz as coisas me ajuda a fixar melhor
          na mente. Além do que, vai fazer com que eu me expresse de forma
          melhor(sempre tive dificuldade de me expressar).
        </p>

        <p>
          Um outro ponto é que em cada post vai existir a versão em português e
          inglês. Sim, sempre vão existir duas versões. O motivo disso é que eu
          queria compartilhar informações com a comunidade em português mesmo. O
          outro motivo é para treinar meu inglês já que realmente vou escrever
          em inglês (não vou jogar um Google Tradutor 😝😝😝).
        </p>

        <p>Resumindo, os motivos são:</p>
        <ul>
          <li>Compartilhar minhas experiências</li>
          <li>Compartilhar conhecimento</li>
          <li>Me expressar melhor</li>
          <li>Treinar inglês</li>
        </ul>

        <h2>Como foi feito?</h2>

        <p>
          Utilizei apenas três bibliotecas: React, React-DOM e Next. Por
          enquanto, todo o site foi feito apenas no Front-End. A ideia foi
          deixar o mais simples possível, porém sei que em algum momento a
          complexidade vai escalar (a entropia na programação é muito forte).
          Todo o site pode ser dividido em duas grandes partes: a home e o Blog.
        </p>

        <h3>Home</h3>

        <p>
          Foi na home onde eu defini grande parte do que o site seria, como por
          exemplo, a cor do background, cor do texto, fonte, etc. Neste momento
          eu ainda não tinha noção de que acabaria criando um blog. Meu primeiro
          rascunho de como seria o site foi patético, como pode ser visto
          abaixo:
        </p>

        <Image
          src={photo}
          alt="Uma imagem de um bloco de nota com um desenho de um site genérico. Existem poucas informações e o design é bem simples."
          sizes="100vw"
          style={{
            width: "40%",
            height: "auto",
          }}
        />

        <p>
          Basicamente, não tinha a minha cara, pois estava tentando copiar algo
          que havia visto na internet. No fim, mudei apenas para texto e decidi
          fazer uma animação de cursor, algo que parecesse com um cursor do
          terminal. Eu curti bastante porque aprendi sobre animação no CSS.
          Aliás, o código da animação no CSS foi esse:
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

        <p>
          Depois que terminei a Home, pensei comigo: e se eu fizer um blog?
          Voilà, comecei a fazer a página de listagem dos posts. Basicamente,
          faço uma iteração em um JSON que guarda o link e o título (em
          português e inglês). Depois disso, utilizei o <code>useContext</code>{" "}
          do React para salvar o contexto da língua escolhida.
        </p>

        <p>
          Em seguida, foi apenas o bom e velho CSS. Parece simples, porém essa
          parte de estilização deu um trabalhão.
        </p>

        <h2>Fim?</h2>
        <p>
          Existem várias pendências (o famoso débito técnico) que precisam ser
          ajustadas no futuro. Preciso criar uma espécie de crawler que navega
          pelo texto e gera o JSON utilizado na lista de postagens. No futuro,
          vou precisar criar algum sistema de busca. Também preciso criar tags.
          Enfim, vão existir várias coisas.
        </p>

        <p>
          Por fim, fico muito feliz de ter colocado tudo isso no ar. Tenho muito
          a melhorar, principalmente na comunicação. Enfim, se você chegou até
          aqui, obrigado pelo seu tempo :)
        </p>
      </>
    </Post>
  );
};

export default BlogPost;
