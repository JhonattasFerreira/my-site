import Post from "../../../../../../../components/Post";
import ImageResponsive from "../../../../../../../components/ImageResponsive";

import photo1 from "../whereIsSite.png";
import photo2 from "../allTheProcess.png";

const BlogPost = () => {
  return (
    <Post title={"Como Hospedar um Website"} date={"2024-05-08"}>
      <>
        <p>
          Comprar um domínio/hospedar um site é uma tarefa trivial, algumas
          configurações aqui e ali, e pronto, um site novinho no ar. Mas você
          sabe como fazer isso?
        </p>
        <h2>Onde o site está?</h2>

        <p>
          Você abre seu navegador, digita o site www.google.com e aperta Enter.
          Mas como o navegador sabe onde encontrar o IP que está hospedado o
          Google?
        </p>
        <p>
          O seu servidor de internet tem algo chamado Recursive Resolver que se
          encarrega de descobrir o IP. Quando você acessa uma URL é feita uma
          requisição para esse Recursive Resolver.
        </p>
        <p>O Recursive Resolver pergunta a um dos 13 root-server:</p>

        <p>— Hey root-server, qual o IP do site www.google.com?</p>
        <p>— Cara, não sei, mas sei o IP do TLD dele.</p>
        <p>— Perfeito!</p>

        <p>Mas, o que é um TLD?</p>

        <h3>TLD</h3>

        <p>
          Cada site possui um 'nome completo' chamado de Fully Qualified Domain
          Name (FQDN), que termina com um ponto. No caso do Google, o FQDN é{" "}
          <strong>www.google.com.</strong>. O root-server lê o site de trás para
          frente procurando por esse '.' do FQDN. Após o ponto, encontra-se o
          Top-Level Domain (TLD), que no caso do Google é o '.com'.
        </p>

        <p>Os TLDs são separados em três categorias:</p>
        <ul>
          <li>
            ccTLDs (Country Code Top-Level Domains) que é reservado a países.
            ex: .br, .ca…
          </li>
          <li>
            gTLDs (Generic Top-Level Domains), que são utilizados de forma
            geral. ex: .com, .net…
          </li>
          <li>
            sTLDs (Sponsored Top-Level Domains), destinados a comunidades
            específicas e geridos por organizações designadas. ex: .aero,
            .museum…
          </li>
        </ul>

        <p>
          O root-server devolve para o Recursive Resolver o IP do TLD .com. O
          Recursive Resolver pergunta ao TLD do .com:
        </p>

        <p>— Hey TLD do .com, qual o IP do site www.google.com?</p>
        <p>— Cara, não sei, mas sei o IP do Authoritative Server dele.</p>
        <p>— Perfeito!</p>

        <p>Mas, o que é um Authoritative Server?</p>

        <h3>Authoritative Server</h3>

        <p>
          O Authoritative Server, como o nome diz, é o servidor que tem a
          autoridade do site. Ele possui os registros DNS específicos para o
          domínio, incluindo os registros de endereços IP. No fim, ele sabe onde
          o IP final está localizado.
        </p>

        <p>Então o Recursive Resolver pergunta ao Authoritative Server:</p>

        <p>— Hey Authoritative Server, qual o IP do site www.google.com?</p>
        <p>— Cara, EU SEI!! É o 216…</p>
        <p>— Finalmente!!</p>

        <p>Com o IP final o navegador consegue acessar o Google.</p>

        <ImageResponsive
          src={photo1}
          alt={
            "A imagem de um diagrama onde mostra a sequência do root server, para o TLD e terminando no Authoritative Server."
          }
        />

        <h2>Mas, como isso se relaciona com Hospedagem de Site?</h2>

        <p>
          Tudo! Você compra um domínio de um Registrar, como o GoDaddy e ele é
          responsável por repassar essas informações para o Registry (cada país
          tem seu Registry). O Registry é responsável por colocar seu domínio lá
          na TLD. Com isso, no Registrar você pode escolher apontar para o
          Authoritative Server de sua escolha (ex: vercel).
        </p>

        <ImageResponsive
          src={photo2}
          alt={
            "A imagem de uma diagrama onde mostra a sequência do Registrant, para o Registrar, para o Registry e finalizando no TLD."
          }
        />

        <p>
          No fim, para ter um site basta comprar um domínio e nas configurações
          do domínio, escolher o servidor autoritativo que você quer usar.
        </p>
      </>
    </Post>
  );
};

export default BlogPost;
