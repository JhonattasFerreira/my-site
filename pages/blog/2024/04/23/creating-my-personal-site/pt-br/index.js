import Post from "../../../../../../../components/Post";

const BlogPost = () => {
  return (
    <Post title={"Criando Meu Site Pessoal"} date={"2024-04-23"}>
      <>
        <p>
          Recentemente, decidi criar meu site pessoal. Eu queria ter um lugar
          onde pudesse compartilhar um pouco sobre mim, meus projetos e
          experiências. Eu também queria ter um lugar onde pudesse escrever
          sobre coisas que estou aprendendo e compartilhar com os outros.
        </p>

        <p>
          Decidi usar o Next.js para criar meu site, pois ele é uma ótima
          ferramenta para criar aplicativos da web modernos. Ele tem uma ótima
          documentação e uma comunidade ativa, o que facilita muito o
          aprendizado e o desenvolvimento.
        </p>
      </>
    </Post>
  );
};

export default BlogPost;
