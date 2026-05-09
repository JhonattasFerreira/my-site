# JhoCore — Blog Pessoal

Blog pessoal bilíngue (EN/PT-BR) construído com Next.js App Router e geração estática. Todo o conteúdo é escrito em arquivos Markdown — sem banco de dados, sem CMS.

## Comandos

```bash
nvm use 20            # garantir a versão correta do Node
npm run dev           # iniciar servidor de desenvolvimento em localhost:3000
npm run build         # build de produção
npm test              # rodar testes unitários (vitest)
npm run test:watch    # testes em modo watch
npm run test:coverage # relatório de cobertura
```

## Stack

- **Next.js 16** — App Router, SSG via `generateStaticParams`
- **React 19** — UI
- **TypeScript** — tipagem estática em todo o projeto (`strict: true`)
- **gray-matter** — faz o parse do frontmatter dos arquivos Markdown
- **react-markdown** — renderiza o conteúdo Markdown
- **react-syntax-highlighter** — highlight de blocos de código (Prism, carregado com lazy load)
- **react-icons** — ícones SVG
- **@vercel/analytics** + **@vercel/speed-insights** — analytics e métricas de performance
- **Vitest** — testes unitários

## Estrutura do Projeto

```
app/
  (home)/           # route group — home page com seu próprio layout raiz (lang="en")
  [lang]/           # segmento dinâmico — páginas do blog com lang dinâmico no <html>
    layout.tsx      # layout raiz do blog: define <html lang={lang}>
    blog/
      page.tsx      # listagem de posts: /en/blog e /pt-br/blog
      [slug]/
        page.tsx    # página do post: /en/blog/[slug] e /pt-br/blog/[slug]
  sitemap.ts        # sitemap dinâmico gerado automaticamente a partir dos posts
  robots.ts         # robots.txt gerado dinamicamente

components/         # componentes de UI
content/posts/      # arquivos Markdown, uma pasta por post
public/             # assets estáticos (imagens, exemplos p5.js)
types/              # tipos TypeScript globais (PostFrontmatter, PostMetadata, Lang, etc.)
utils/              # funções puras e constantes (getPostContent, getPostMetadata, formatDate, transformString, constants)
```

## Estrutura de URLs

| Rota | URL |
|---|---|
| Home | `/` |
| Listagem do blog (EN) | `/en/blog` |
| Listagem do blog (PT-BR) | `/pt-br/blog` |
| Post (EN) | `/en/blog/[slug]` |
| Post (PT-BR) | `/pt-br/blog/[slug]` |

As URLs antigas (`/blog/en/*`, `/blog/pt-br/*`) redirecionam permanentemente para a nova estrutura via `next.config.js`.

## Adicionando um Novo Post

1. Criar uma pasta em `content/posts/[nome-da-pasta]/`
2. Adicionar dois arquivos Markdown — um por idioma:
   - `[slug].en.md` (inglês)
   - `[slug].pt-br.md` (português)
3. Adicionar a imagem/GIF de capa em `public/[nome-da-pasta]/`

O sitemap é gerado automaticamente via `app/sitemap.ts` — não é necessário atualizar nenhum arquivo manualmente.

### Formato do frontmatter

```yaml
---
title: "Título do Post"
date: "YYYY-MM-DD"
gif: /nome-da-pasta/capa.gif
altTextGif: "Descrição acessível do GIF"
description: "Descrição de 1-2 frases para a meta tag de SEO (máx 150 caracteres)"
---
```

### Exemplos interativos com p5.js

Posts podem incorporar sketches interativos de p5.js. Coloque os arquivos do sketch em `public/[nome-da-pasta]/p5Examples/[nome-do-exemplo]/` e referencie no Markdown como uma imagem:

```markdown
![Título do sketch $ https://link-do-codigo-fonte](/nome-da-pasta/p5Examples/nome-do-exemplo)
```

O componente `Image` detecta o caminho `p5Examples` e renderiza um `<iframe>` no lugar de um `<img>`. O formato dos metadados é `título $ url-do-fonte`, separados por ` $ `.

## Notas de Arquitetura

- **Dois layouts raiz**: `(home)/layout.tsx` define `lang="en"` para a home; `[lang]/layout.tsx` define `lang` dinamicamente a partir da URL para todas as páginas do blog. Ambos incluem o componente `AnalyticsProviders` (Vercel Analytics + Speed Insights).
- **`getPostContent`** lê o arquivo correspondente ao slug e também retorna `oppositeUrl` — o slug do mesmo post no outro idioma. Isso alimenta os links de troca de idioma.
- **`getPostMetadata`** lê todos os posts de um idioma, ordenados por data decrescente.
- Todas as leituras de arquivo acontecem em tempo de build (SSG) — sem acesso ao filesystem em runtime.
- **`app/sitemap.ts`** gera o sitemap dinamicamente a partir dos posts via `getPostMetadata` — não há mais um `sitemap.xml` estático para manter.
- **`app/robots.ts`** gera o `robots.txt` dinamicamente apontando para o sitemap.
- **`utils/constants.ts`** centraliza constantes globais: `BASE_URL`, `SITE_NAME`, nomes de idioma, extensões de arquivo Markdown, metadados das páginas de listagem, etc.
- **`types/index.ts`** centraliza todos os tipos TypeScript do projeto (`Lang`, `PostFrontmatter`, `PostMetadata`, `PostContent`, etc.).
