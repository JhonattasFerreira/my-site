---
title: "OBS no Linux: Como Fazer Live na Twitch"
date: "2025-12-27"
gif: /obs-on-linux/live.gif
altTextGif: Um GIF onde tem escrito a palavra LIVE com um círculo roxo. O texto se move até formar a palavra LIVE novamente.
---

Contra todas as possibilidades, você decidiu fazer lives usando Linux.

_"Você gosta de sofrer?"_

É o que um leigo provavelmente diria. A surpresa é que configurar tudo foi bem mais simples do que parece, e olha que eu uso Arch, _btw_.

Vou te dar um passo a passo de como configurar tudo.

## OBS

O programa que vamos utilizar para fazer a live se chama **OBS**. Ele é código aberto e felizmente tem empacotamento para Linux. O bem sempre vence o mal no final.

Para seguir este tutorial você deve baixar a versão do Flatpak. Se você não manja muito de Flatpak, a ideia é simples: ele funciona como um empacotamento “universal” de aplicativos. Assim garantimos que estamos utilizando a mesma versão do OBS, independente da distro.

Você consegue baixar e instalar na própria página do [OBS no Flathub](https://flathub.org/pt-BR/apps/com.obsproject.Studio).

Depois de instalar, você deve ver algo parecido com isso:

![Uma imagem do software OBS](/obs-on-linux/OBS.png)

Show, agora vamos separar os homens dos meninos.

## Flatseal

O OBS não funciona muito bem no Wayland, algumas funcionalidades só funcionam no Xorg.

Se você não entende muito bem o que é isso, pensa assim: Wayland e Xorg são camadas gráficas, são elas que transformam o computador em algo visual. Janelas, botões, telas... entre outros.

Primeiro, vamos descobrir se você é Xorg ou Wayland, rode no seu terminal favorito:

```js
echo $XDG_SESSION_TYPE
```

Se for Xorg, não precisa fazer nada, pode pular essa seção.

Se você é Wayland, precisamos baixar um app chamado Flatseal.

O Flatseal permite revisar ou modificar permissões de aplicativos Flatpak e como nosso OBS é um app Flatpak, conseguimos modificar uma permissão dele: _**Wayland windowing system**_.

Essa opção vem ativada por padrão. Você precisa **desativá-la**.

Vai ficar algo parecido com isso:

![Uma imagem do Flatseal com a opção wayland windowing system desativada](/obs-on-linux/flatseal.png)

Boa. Agora vamos para a configuração de áudio.

## PipeWire Audio

Existe uma funcionalidade no OBS do Windows e do MacOS que ainda não está disponível nativamente no Linux: a possibilidade de separar o áudio por aplicativo. Isso dá muito mais controle sobre o som da sua stream.

Felizmente o usuário [dimtpap](https://github.com/dimtpap) fez um plugin que implementa essa funcionalidade. O repositório se chama [obs-pipewire-audio-capture](https://github.com/dimtpap/obs-pipewire-audio-capture) e basta seguir o [tutorial de instalação](https://github.com/dimtpap/obs-pipewire-audio-capture?tab=readme-ov-file#installation) do próprio repositório.

Com isso a opção **_"Captura de áudio de aplicativo"_** vai ficar disponível no seu OBS.

Estamos chegando no fim. Só tem mais um passo.

## Próximo passo

Eu menti. Não tem próximo passo.

Pelo menos não de configuração do OBS. Se você chegou até aqui, já consegue seguir qualquer tutorial de OBS feito para Windows ou MacOS.

Agora é contigo camarada.

Você consegue. Eu confio em você.

E se quiser (ou puder) me segue lá na Twitch.

Meu canal se chama [Jhocore](https://www.twitch.tv/jhocore/about).
