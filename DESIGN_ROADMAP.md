# Design Roadmap — JhoCore Blog

Plano de implementação das melhorias de design identificadas em diagnóstico completo realizado em 2026-05-09.

**Stack relevante:** Next.js App Router, CSS Modules, sem Tailwind, sem CSS-in-JS.  
**Paleta atual:** `#092635` (bg), `#ffffff` (texto), `#9ec8b9` (acento), `#5c8374` (acento secundário), `#1b4242` (acento escuro).  
**Fontes:** Raleway (corpo, 400/700) via `next/font/google`; Jersey 10 (home, 400).  
**Decisões fixas:** dark mode apenas, sem light mode, sem toggle de tema.

Cada parte é independente e pode ser implementada em sessão limpa do Claude. Siga a ordem numérica — a Parte 1 cria os tokens que as partes seguintes consomem.

---

## Parte 1 — Design Tokens (Fundação)

**Status:** `[x] concluída`

### Objetivo
Centralizar todas as cores hard-coded em CSS custom properties no `globals.css`. Hoje as cores estão duplicadas em 5+ arquivos. Esta parte não muda nenhum visual — é refatoração pura.

### O que fazer

**1. Adicionar bloco `:root` no `app/globals.css`:**

```css
:root {
  --color-bg: #092635;
  --color-text: #ffffff;
  --color-accent: #9ec8b9;
  --color-accent-muted: #5c8374;
  --color-accent-dark: #1b4242;
  --color-overlay: rgba(0, 0, 0, 0.5);
  --color-overlay-hover: rgba(0, 0, 0, 1);
  --color-badge-bg: rgba(92, 131, 116, 0.12);
  --color-badge-bg-hover: rgba(92, 131, 116, 0.3);
  --color-badge-border: #5c8374;

  /* shimmer do skeleton */
  --color-shimmer-start: #1a2a24;
  --color-shimmer-mid: #243d33;
  --color-shimmer-peak: #2e5044;
}
```

**2. Substituir valores hard-coded nos seguintes arquivos:**

| Arquivo | Substituições |
|---|---|
| `app/globals.css` | `#092635` → `var(--color-bg)`, `#9ec8b9` → `var(--color-accent)`, `#5c8374` → `var(--color-accent-muted)`, `#1b4242` → `var(--color-accent-dark)` |
| `app/home.module.css` | `#9ec8b9` → `var(--color-accent)` |
| `components/ListingPost/listing.module.css` | `rgba(0,0,0,0.5)` → `var(--color-overlay)`, `rgba(0,0,0,1)` → `var(--color-overlay-hover)`, `#5c8374` → `var(--color-badge-border)`, `rgba(92,131,116,0.12)` → `var(--color-badge-bg)`, `rgba(92,131,116,0.3)` → `var(--color-badge-bg-hover)`, `#9ec8b9` → `var(--color-accent)` |
| `components/PostFrontmatter/PostFrontmatter.module.css` | mesmas substituições acima |
| `components/NavItem/NavItem.module.css` | `#9ec8b9` → `var(--color-accent)` |
| `components/GifCard/GifCard.module.css` | `#1a2a24` → `var(--color-shimmer-start)`, `#243d33` → `var(--color-shimmer-mid)`, `#2e5044` → `var(--color-shimmer-peak)` |

### Critérios de aceite
- `npm run build` passa sem erros.
- `npm test` passa.
- Nenhuma `grep` por `#092635`, `#9ec8b9`, `#5c8374`, `#1b4242` nos arquivos CSS do projeto encontra resultado fora do `:root` do `globals.css`.
- Visual do site idêntico ao anterior (zero mudança perceptível).

---

## Parte 2 — Acessibilidade

**Status:** `[x] concluída`  
**Depende de:** Parte 1 (para usar variáveis de cor).

### Objetivo
Corrigir três falhas de acessibilidade críticas: ausência de `:focus-visible`, ausência de skip link, e hierarquia de `<h1>` incorreta na home.

### O que fazer

**1. Adicionar estilos globais de `:focus-visible` no `app/globals.css`:**

Qualquer elemento interativo ao receber foco via teclado deve ter outline visível com a cor de acento.

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 3px;
}
```

**2. Adicionar skip link nos dois layouts:**

O skip link aparece somente quando focado via teclado (Tab), levando o usuário direto ao `<main>`.

Em `app/(home)/layout.tsx` e `app/[lang]/layout.tsx`, adicionar como **primeiro filho do `<body>`**:

```tsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

Adicionar os estilos no `app/globals.css`:

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  background: var(--color-accent);
  color: var(--color-bg);
  padding: 0.5rem 1rem;
  border-radius: 0 0 4px 4px;
  font-weight: 700;
  text-decoration: none;
  z-index: 9999;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
```

Adicionar `id="main-content"` no elemento `<main>` de cada página:
- `app/(home)/page.tsx`: `<main id="main-content" className={styles.mainContent}>`
- `components/ListingPost/index.tsx`: `<main id="main-content" className={styles.mainContent}>`
- `components/PostFrontmatter/index.tsx`: `<main id="main-content" className={styles.mainContent}>`

**3. Corrigir hierarquia de `<h1>` na home (`app/(home)/page.tsx`):**

Atualmente o `<h1>` está com `srOnly` (invisível) e o texto principal é um `<span>`. A correção é transformar o conteúdo visual em `<h1>` e remover o h1 escondido:

```tsx
/* ANTES */
<h1 className={styles.srOnly}>Jhonattas Ferreira — Software Engineer</h1>
<section className={styles.title}>
  <span className={jersey_10.className}>
    <div>&gt; Jhonattas;</div>
    <div className={styles.cursor}>...</div>
  </span>
</section>

/* DEPOIS */
<h1 className={`${styles.title} ${jersey_10.className}`}>
  <span>&gt; Jhonattas;</span>
  <span className={styles.cursor}>
    &gt; I&apos;m a Software Engineer
    {/* cursor element */}
  </span>
</h1>
```

Ajustar os estilos de `.title` em `home.module.css` para que `h1` mantenha o visual atual (sem margin padrão do browser, sem estilo de heading padrão).

**4. Aumentar opacidade do overlay nos cards de listagem:**

Em `components/ListingPost/listing.module.css`, ajustar para garantir contraste mínimo WCAG AA:

```css
/* ANTES */
.articleContent { background-color: rgba(0, 0, 0, 0.5); }

/* DEPOIS */
.articleContent { background-color: rgba(0, 0, 0, 0.65); }
```

### Critérios de aceite
- Navegando por Tab, o skip link aparece visivelmente na tela ao receber foco.
- Navegando por Tab, todos os links têm outline visível (testar em Chrome e Firefox).
- `<h1>` da home é o texto visível `> Jhonattas;` / `> I'm a Software Engineer`.
- `npm test` passa.

---

## Parte 3 — Tipografia Fluida

**Status:** `[x] concluída`  
**Depende de:** Parte 1.

### Objetivo
Substituir todas as unidades problemáticas (`pt`, `vw` puro em tipografia, `vh` puro em altura de viewport) por `clamp()` e `rem`. Eliminar os breakpoints de tipografia redundantes.

### Contexto técnico
- `clamp(mín, preferido, máx)` — o valor preferido é geralmente `Xvw` para fluidez.
- Breakpoints de **layout** (padding, margin, flex-direction) devem continuar existindo. Apenas a **tipografia** migra para clamp.
- `100dvh` (dynamic viewport height) corrige o bug em iOS Safari onde `100vh` inclui a barra de URL.

### O que fazer

**`app/home.module.css`**

```css
/* ANTES */
.title { font-size: 10vw; }
@media (min-width: 600px) { .title { font-size: 9vw; } }
@media (min-width: 962px) { .title { font-size: 7.1vw; } }

/* DEPOIS */
.title { font-size: clamp(2.5rem, 8vw, 6.5rem); }
/* remover os breakpoints de font-size do .title */

/* ANTES */
.containerAbout { font-size: 8vw; }
@media tablet { font-size: 5vw; }
@media desktop { font-size: 3.5vw; }

/* DEPOIS */
.containerAbout { font-size: clamp(1.25rem, 3.5vw, 2.25rem); }

/* ANTES */
.footer { font-size: 15vw; }
@media tablet { font-size: 7vw; }
@media desktop { font-size: 4.5vw; }

/* DEPOIS */
.footer { font-size: clamp(2rem, 5vw, 4rem); }

/* ANTES */
.container { height: 100vh; }
.mainContent { height: 100vh; } (nos breakpoints)

/* DEPOIS */
.container { height: 100dvh; }
.mainContent { min-height: 100dvh; } (onde aplicável)
```

**`components/NavItem/NavItem.module.css`**

```css
/* ANTES */
.nav { font-size: 5vw; }
@media tablet { font-size: 4vw; }
@media desktop { font-size: 2.7vw; }

/* DEPOIS */
.nav { font-size: clamp(1rem, 2.5vw, 1.75rem); }
/* remover breakpoints de font-size */
```

**`components/ListingPost/listing.module.css`**

```css
/* ANTES */
.titleName { font-size: 10vw; }
@media tablet { font-size: 7vw; }
@media desktop { font-size: 4.5vw; }

/* DEPOIS */
.titleName { font-size: clamp(2rem, 6vw, 4rem); }

/* ANTES */
.title a { font-size: 12pt; } /* tablet: 13pt, desktop: 13.5pt */

/* DEPOIS */
.title a { font-size: clamp(0.85rem, 1.2vw, 0.95rem); }

/* ANTES */
.articleTitleText { font-size: 1rem; }
@media tablet { font-size: 2rem; }
@media desktop { font-size: 2.5rem; }

/* DEPOIS */
.articleTitleText { font-size: clamp(1.1rem, 2.2vw, 2.5rem); }

.articleDate { font-size: clamp(0.8rem, 1.2vw, 1rem); }
```

**`components/PostFrontmatter/PostFrontmatter.module.css`**

```css
/* ANTES */
.title { font-size: 3.5rem; }
@media tablet { font-size: 4rem; }
@media desktop { font-size: 5.8rem; }

/* DEPOIS */
.title { font-size: clamp(2rem, 5vw, 5.8rem); }

/* ANTES */
.mainContent { font-size: 1.35rem; }
@media tablet { font-size: 1.6rem; }
@media desktop { font-size: 1.7rem; }

/* DEPOIS */
.mainContent { font-size: clamp(1.1rem, 1.5vw, 1.4rem); }

/* ANTES */
.options { font-size: 1rem; }
@media tablet { font-size: 1.09rem; }
@media desktop { font-size: 1.2rem; }

/* DEPOIS */
.options { font-size: clamp(0.9rem, 1.1vw, 1.1rem); }

/* ANTES */
.container { height: 100vh; }

/* DEPOIS — post tem conteúdo longo, não deve ter altura fixa */
/* remover height: 100vh do .container */
```

**`components/CodeBlock/codeBlock.module.css`**

```css
/* ANTES */
.fontCode { font-size: 0.7rem; }
@media desktop { .fontCode { font-size: 1rem; } }

/* DEPOIS */
.fontCode { font-size: clamp(0.85rem, 1.2vw, 1rem); }
```

**`app/(home)/layout.tsx`**

```tsx
/* ANTES */
<html lang="en" style={{ overflow: "hidden" }}>
<body className={raleway.className} style={{ overflow: "hidden" }}>

/* DEPOIS — o overflow hidden deve ser controlado via CSS, mas verificar se
   a animação ainda funciona; se sim, manter no CSS module e remover do inline */
```

### Critérios de aceite
- Nenhuma ocorrência de `pt` como unidade de tipografia nos CSS modules.
- `grep -r "font-size:.*vw" app/ components/` retorna zero (exceto dentro de `clamp()`).
- Visual testado em 375px, 768px e 1440px (DevTools do browser).
- `npm run build` e `npm test` passam.

---

## Parte 4 — Estilos dos Elementos Markdown

**Status:** `[x] concluída`  
**Depende de:** Parte 1.

### Objetivo
Os posts são renderizados via `react-markdown`. Hoje, `h2`, `h3`, `blockquote`, `ul`, `ol`, `table`, `hr` recebem apenas o estilo padrão do browser, inconsistente com a paleta. Esta parte adiciona estilos scoped à classe `.post` do `PostFrontmatter.module.css` e define `max-width` correto para a coluna de leitura.

### O que fazer

**1. Corrigir `max-width` do container do post em `PostFrontmatter.module.css`:**

```css
/* ANTES */
.mainContent {
  width: 80%;  /* tablet */
  width: 59%;  /* desktop */
}

/* DEPOIS — max-width com ch garante legibilidade independente de tela */
.mainContent {
  width: 90%;
  max-width: 75ch;  /* ~750px equivalente, ideal para leitura */
  margin: 0 auto;
}
/* remover os breakpoints de width */
```

**2. Adicionar estilo de `line-height` melhorado no `.post`:**

```css
.post {
  line-height: 1.75;  /* era 155%, agora ~175% */
}
```

**3. Adicionar estilos dos elementos Markdown dentro de `.post` em `PostFrontmatter.module.css`:**

```css
.post h2 {
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-accent-muted);
  padding-bottom: 0.3rem;
}

.post h3 {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.post p {
  margin-bottom: 1.25rem;
}

.post ul,
.post ol {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.post li {
  margin-bottom: 0.4rem;
}

.post blockquote {
  border-left: 3px solid var(--color-accent-muted);
  padding-left: 1rem;
  margin-left: 0;
  opacity: 0.85;
  font-style: italic;
}

.post hr {
  border: none;
  border-top: 1px solid var(--color-accent-muted);
  margin: 2rem 0;
  opacity: 0.4;
}

.post strong {
  color: var(--color-accent);
  font-weight: 700;
}

.post table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.post th,
.post td {
  border: 1px solid var(--color-accent-muted);
  padding: 0.5rem 0.75rem;
  text-align: left;
}

.post th {
  background-color: rgba(92, 131, 116, 0.15);
  font-weight: 700;
}
```

**4. Revisar espaçamento da seção do GIF:**

```css
/* ANTES */
.gifSection { margin-top: 1.5rem; min-height: 300px; }

/* DEPOIS */
.gifSection {
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: 300px;
}
```

### Critérios de aceite
- Em qualquer post com `## Heading`, o h2 aparece com border-bottom e tamanho maior que o parágrafo.
- Blockquotes têm borda lateral verde.
- `strong` aparece na cor de acento (`#9ec8b9`).
- Em monitor de 1440px, a coluna de texto não ultrapassa ~750px de largura.
- Em 375px, a coluna ocupa ~90% da tela.
- `npm run build` e `npm test` passam.

---

## Parte 5 — Layout e Cards

**Status:** `[x] concluída`  
**Depende de:** Parte 1.

### Objetivo
Corrigir os problemas de layout na listagem de posts: alturas fixas em `vw` nos cards, ausência de indicador de interatividade, e largura máxima da listagem para monitores largos.

### O que fazer

**1. Corrigir altura dos cards na listagem (`listing.module.css`):**

Hoje os cards usam `height: Xvw` — em telas largas ficam enormes, em mobile ficam pequenos.

```css
/* ANTES */
.articleBox { height: 25vw; }
@media tablet { height: 20vw; }
@media desktop { height: 15vw; }

/* DEPOIS */
.articleBox {
  height: clamp(160px, 20vw, 300px);
}
/* remover os breakpoints de height */
```

**2. Adicionar indicador visual de interatividade nos cards:**

Hoje o card só muda no hover (overlay escurece). Adicionar uma transição de borda ou seta que sinalize clicabilidade:

```css
.articleBox {
  border-radius: 6px;
  border: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.articleBox:hover {
  border-color: var(--color-accent-muted);
}
```

Adicionar seta no canto do `articleContent` no hover (via pseudo-elemento ou ícone já existente do `react-icons`). Alternativa mais simples: transformar leve no hover:

```css
.articleBox a {
  transition: transform 0.2s ease;
  display: block;
}

.articleBox:hover a {
  transform: translateY(-2px);
}
```

**3. Adicionar `max-width` à listagem para monitores largos:**

```css
/* ANTES */
.listBlogPosts {
  margin: 0 15vw;  /* só no desktop */
}

/* DEPOIS */
.listBlogPosts {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 3vw;
  padding-top: clamp(4rem, 9vh, 8rem);
}
/* remover os breakpoints de margin/padding-top */
```

**4. Corrigir tamanho do footer de ícones na home (`home.module.css`):**

```css
/* ANTES */
.footer { font-size: 15vw; }
@media tablet { font-size: 7vw; }
@media desktop { font-size: 4.5vw; }

/* DEPOIS */
.footer { font-size: clamp(2rem, 5vw, 3.5rem); }
```

**5. Adicionar `max-width` ao container da home para monitores ultrawide:**

```css
/* Em home.module.css */
.mainContent {
  max-width: 1400px;
  width: 100%;
}
```

### Critérios de aceite
- Em 375px, o card de post tem altura entre 160px e 200px (proporcional).
- Em 1440px, o card não ultrapassa 300px de altura.
- Os cards têm borda sutil visível no hover.
- `npm run build` e `npm test` passam.

---

## Parte 6 — Progress Bar de Leitura

**Status:** `[ ] pendente`  
**Depende de:** Parte 1.

### Objetivo
Adicionar uma barra fina no topo da página de post que cresce conforme o usuário faz scroll, indicando o progresso de leitura.

### O que fazer

**1. Criar componente `components/ProgressBar/index.tsx`:**

```tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./progressBar.module.css";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className={styles.bar}
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
};

export default ProgressBar;
```

**2. Criar `components/ProgressBar/progressBar.module.css`:**

```css
.bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background-color: var(--color-accent);
  z-index: 1000;
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
}
```

**3. Integrar no `components/PostFrontmatter/index.tsx`:**

```tsx
import ProgressBar from "@/components/ProgressBar";

const PostFrontmatterLayout = ({ ... }: Props) => {
  return (
    <div className={styles.container}>
      <ProgressBar />
      <header>...</header>
      ...
    </div>
  );
};
```

**4. Criar teste `components/ProgressBar/index.test.tsx`:**

O teste deve verificar:
- O componente renderiza sem erros.
- O elemento tem `role="progressbar"`.
- `aria-valuenow` começa em 0.

```tsx
// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProgressBar from "./index";

describe("ProgressBar", () => {
  it("renders a progressbar element", () => {
    render(<ProgressBar />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("starts at zero progress", () => {
    render(<ProgressBar />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });
});
```

### Critérios de aceite
- A barra aparece no topo da página de post (não na home nem na listagem).
- A barra cresce suavemente conforme o scroll.
- `npm test` passa incluindo os novos testes.
- `npm run build` passa.

---

## Ordem de Execução Recomendada

```
Parte 1 → Parte 2 → Parte 3 → Parte 4 → Parte 5 → Parte 6
```

As Partes 3, 4, 5 e 6 dependem apenas da Parte 1 (tokens) e podem ser feitas em qualquer ordem entre si após a Parte 1 estar completa. A Parte 2 (acessibilidade) é independente e pode ser feita antes da Parte 1 se necessário, apenas sem usar as variáveis CSS.

## Checklist Geral

- [x] Parte 1 — Design Tokens
- [x] Parte 2 — Acessibilidade
- [x] Parte 3 — Tipografia Fluida
- [x] Parte 4 — Estilos dos Elementos Markdown
- [x] Parte 5 — Layout e Cards
- [ ] Parte 6 — Progress Bar de Leitura
