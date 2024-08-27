---
title: Como Hospedar Um Website
date: "2024-05-08"
---

![Um GIF de um computador antigo em pixel art.](/how-to-hosting-a-website/computer.webp)

Comprar um domínio/hospedar um site é uma tarefa trivial, algumas configurações aqui e ali, e pronto, um site novinho no ar. Mas você sabe como fazer isso?

## Onde o site está?

Você abre seu navegador, digita o site www.google.com e aperta Enter. Mas como o navegador sabe onde encontrar o IP que está hospedado o Google?

O seu servidor de internet tem algo chamado Recursive Resolver que se encarrega de descobrir o IP. Quando você acessa uma URL é feita uma requisição para esse Recursive Resolver.

O Recursive Resolver pergunta a um dos 13 root-server:

— Hey root-server, qual o IP do site www.google.com?

— Cara, não sei, mas sei o IP do TLD dele.

— Perfeito!

Mas, o que é um TLD?

### TLD

Cada site possui um 'nome completo' chamado de Fully Qualified Domain Name (FQDN), que termina com um ponto. No caso do Google, o FQDN é **www.google.com.**. O root-server lê o site de trás para frente procurando por esse '.' do FQDN. Após o ponto, encontra-se o Top-Level Domain (TLD), que no caso do Google é o '.com'.

Os TLDs são separados em três categorias:

- ccTLDs (Country Code Top-Level Domains) que é reservado a países. ex: .br, .ca…
- gTLDs (Generic Top-Level Domains), que são utilizados de forma geral. ex: .com, .net…
- sTLDs (Sponsored Top-Level Domains), destinados a comunidades específicas e geridos por organizações designadas. ex: .aero, .museum…

O root-server devolve para o Recursive Resolver o IP do TLD .com. O Recursive Resolver pergunta ao TLD do .com:

— Hey TLD do .com, qual o IP do site www.google.com?

— Cara, não sei, mas sei o IP do Authoritative Server dele.

— Perfeito!

Mas, o que é um Authoritative Server?

### Authoritative Server

O Authoritative Server, como o nome diz, é o servidor que tem a autoridade do site. Ele possui os registros DNS específicos para o domínio, incluindo os registros de endereços IP. No fim, ele sabe onde o IP final está localizado.

Então o Recursive Resolver pergunta ao Authoritative Server:

— Hey Authoritative Server, qual o IP do site www.google.com?

— Cara, EU SEI!! É o 216…

— Finalmente!!

Com o IP final o navegador consegue acessar o Google.

![A imagem de um diagrama onde mostra a sequência do root server, para o TLD e terminando no Authoritative Server.](/how-to-hosting-a-website/whereIsSite.png)

## Mas, como isso se relaciona com Hospedagem de Site?

Tudo! Você compra um domínio de um Registrar, como o GoDaddy e ele é responsável por repassar essas informações para o Registry (cada país tem seu Registry). O Registry é responsável por colocar seu domínio lá na TLD. Com isso, no Registrar você pode escolher apontar para o Authoritative Server de sua escolha (ex: vercel).

![A imagem de uma diagrama onde mostra a sequência do Registrant, para o Registrar, para o Registry e finalizando no TLD.](/how-to-hosting-a-website/allTheProcess.png)

No fim, para ter um site basta comprar um domínio e nas configurações do domínio, escolher o servidor autoritativo que você quer usar.
