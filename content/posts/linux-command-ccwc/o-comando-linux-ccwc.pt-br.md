---
title: O Comando Linux CCWC
date: "2024-11-30"
gif: /linux-command-ccwc/linux_terminal.webp
altTextGif: Um GIF de um terminal Linux com o background preto e o texto verde.
---

Ah, nada como refazer o comando Linux **_wc_** numa sexta-feira à noite.

Usando **_Python_**. Aí sim, estamos falando de vida boa.

Usando **_Vim_**, vish.

Esse post é um compilado das minhas alegrias e tragédias nesta empreitada.

Por falar em tragédia, vamos começar pelo meu Romeu e Julieta.

## Vim

Cara, usar o **_Vim_** é difícil. É tão difícil que chega a doer. Como algo no mundo virtual pode causar dor física? Eu me faço essa pergunta todos os dias.

Antes de continuar, um pouco de contexto: o **_Vim_** é um editor de texto lançado nos anos 90, bastante popular entre programadores, usuários Linux e... _sofredores_. Ele é altamente configurável e tem inúmeros atalhos, além de habilitar algo bastante poderoso chamado **_Vim Motions_**.

As **_Vim Motions_** são como você se movimenta no **_Vim_**, permitindo mover o cursor com velocidade e precisão. E sim, é um recurso incrível, porém a curva de aprendizado é colossal. Perdi a conta de quantas vezes desisti de usar o **_Vim_**.

Mas existia uma voz na minha mente que falava: _"Você vai deixar um editor de texto dos anos 90 te derrotar? Sério? Que patético!"_

Juntei meus pedaços de coragem que estavam espalhados pelo chão e fui para a batalha.

_“Vamos lá, hora de programar alguma coisa com o **Vim**.”_

## CodingChallenges

Sempre quis fazer algum desafio do [CodingChallenges](https://codingchallenges.fyi/challenges/intro/), uma série de desafios de programação criado pelo [John Crickett](https://github.com/JohnCrickett) que ajudam os desenvolvedores a praticarem programação. A proposta é simples: recriar ferramentas existentes no mundo real.

O que mais gosto nos desafios é a liberdade. Você escolhe como resolver seguindo seu próprio estilo, bem diferente de um _Tutorial Hell_.

O primeiro desafio é recriar o comando Linux **_wc_** (word count), que conta palavras, linhas, caracteres e o tamanho de arquivos de texto ou da entrada padrão.

Nossa versão do **_wc_** será chamada de **_ccwc_**.

## CCWC

Bom, vamos lá. A ideia inicial era conseguir executar o comando **_ccwc_** de qualquer pasta do sistema operacional e receber apenas um print com **_"Hello World"_**.

Logo de início, aprendi sobre o **_shebang_**, aqueles dois caracteres **_#!_** no início de um script, seguido do caminho do interpretador necessário para rodar o script, no meu caso, o **_Python_**.

Minha **_shebang_** ficou assim:

```js
#!/usr/bin/env python3
```

Com o sistema operacional já configurado para executar o script, o próximo passo é tornar o **_ccwc_** um comando reconhecido em qualquer lugar do sistema. Para isso, precisamos adicioná-lo ao **_PATH_** da máquina.

No Linux, existe uma pasta específica para scripts criados por usuários: **_/usr/local/bin_**. Basta criar um link simbólico (um atalho) do script para essa pasta, usando o seguinte comando:

```js
sudo ln -s script/path /usr/local/bin/ccwc
```

Show. Agora conseguimos executar nosso script de qualquer lugar no sistema operacional, e ele já sabe que deve ser rodado com **_Python_**.

Mas como fazemos para capturar os argumentos passados para o script?

### Argparse

O **_argparse_** é um módulo **_Python_** específico para capturar os argumentos em linha de comando. Ele permite definir os argumentos necessários e adicionar descrições sobre o que cada um faz.

Se quiser ver os detalhes de como implementei isso, confira meu código no [GitHub](https://github.com/JhonattasFerreira/ccwc).

Nesse ponto, meus dedos já estavam _"sangrando"_, não pela dificuldade do código, mas por causa do **_Vim_**. Alternar entre os modos **_insert_** e **_normal_**, combinado com a movimentação nada intuitiva, transformou uma tarefa simples em algo complicado.

Foi então que resolvi organizar as pastas de maneira mais lógica, para navegar de forma simples.

### Organização de Pastas

A ideia dessa organização foi dividir os arquivos em responsabilidades pequenas e bem definidas. Assim, criei três arquivos principais:

- **_cli.py_**: responsável exclusivamente por capturar os argumentos.
- **_helper.py_**: contém as funções específicas para lidar com cada argumento.
- **_ccwc.py_**: atua como o orquestrador principal do programa.

Além disso, criei um arquivo separado para os testes, utilizando o módulo **_unittest_**.

Poderia ter dividido ainda mais os arquivos, mas acredito que a simplicidade e a facilidade de modificação do código são muito mais importantes.

Um código simples é bem mais fácil de entender e ajustar por outro desenvolvedor que venha a trabalhar nele.

De complexo, já basta o **_Vim_**. E por falar em **_Vim_**...

### Um pouco de alegria

Depois que a dificuldade inicial do **_Vim_** passa, você é recompensado com mais dificuldade. Porém, curiosamente, você acaba gostando de usá-lo.

Nada é mais satisfatório do que executar um _"combo"_ de atalhos e fazer várias modificações no seu código. Por mais estranho que pareça, você sente um prazer em fazer isso.

Sim, faço parte dos usuários sofredores de **_Vim_**.

Não me entenda mal, para mim ainda é bem difícil de usar, mas ao mesmo tempo é bastante viciante.

## Considerações Finais

O restante do código foi desenvolvido de forma bastante intuitiva. Se quiser conferir com mais calma, o projeto está disponível no meu [GitHub](https://github.com/JhonattasFerreira/ccwc) — sinta-se à vontade para sugerir melhorias.

No geral, gostei bastante desse desafio. Levei cerca de dois dias para concluí-lo e já planejo fazer outros. Até a próxima!
