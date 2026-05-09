# UI/UX Roadmap — JhoCore Blog

Diagnóstico gerado em 2026-05-08. Atualizar o status (`[ ]` → `[x]`) conforme cada item for concluído.

---

## Pontos Fortes (manter)

- Design minimalista e coerente com a identidade visual (paleta dark + verde)
- Animações da home criativas e com personalidade
- Bilinguismo bem implementado, com troca de idioma no topo do post
- Tipografia com hierarquia clara (Jersey 10 para títulos, Raleway para corpo)
- Acessibilidade básica sólida (alt text, aria-labels, links semânticos)

---

## Checklist por Prioridade

### Tier 1 — Impacto alto, esforço baixo

- [x] **`prefers-reduced-motion`** — Adicionar media query para desabilitar animações da home quando o sistema do usuário solicitar movimento reduzido. Quebra WCAG 2.1 sem isso.
- [x] **Font-size mínimo no mobile** — Datas e metas chegam a `0.75rem`. Aumentar para no mínimo `1rem` (16px).
- [~] **Breadcrumb nos posts** — Descartado: visualmente grande e desnecessário para a escala atual do blog.
- [x] **Destaque visual na troca de idioma** — O link PT-BR ↔ EN aparece no cabeçalho do post mas sem diferenciação visual suficiente.

### Tier 2 — Impacto alto, esforço médio

- [ ] **Table of Contents (ToC)** — Posts longos (`vectors-everywhere`, `a-random-walker`) não têm âncoras de navegação interna. Gerar automaticamente a partir dos headings do Markdown.
- [ ] **Tempo estimado de leitura** — Calcular `palavras ÷ 200`. Exibir no cabeçalho do post junto à data. Define expectativa antes de o leitor começar.
- [ ] **Link explícito "Voltar para o blog"** — Após ler um post, não há caminho visual explícito de retorno. Adicionar no `PostFrontmatter` ou no rodapé do post.
- [ ] **Skeleton/placeholder para GIFs na listagem** — Em conexões lentas, os cards ficam sem conteúdo visual por mais tempo. Adicionar um placeholder de cor com proporção correta.

### Tier 3 — Impacto médio, esforço médio/alto

- [ ] **Busca ou filtro de posts** — Com 9+ posts já começa a fazer falta. Tende a piorar com crescimento. Pode ser client-side (sem servidor).
- [ ] **Posts relacionados** — Exibir 2–3 posts ao final de cada artigo para aumentar retenção. Pode ser curado manualmente via frontmatter ou por tags.
- [ ] **Botão de compartilhamento** — "Copiar link" e/ou compartilhar no LinkedIn/X. Trabalho manual demais para o leitor atualmente.
- [ ] **Alternativa visual para mobile nas animações** — Hoje o critério `window.innerWidth < 962` remove toda a animação sem oferecer nada no lugar. Criar versão estática ou animação simplificada.

### Tier 4 — Nice-to-have

- [ ] **Toggle light/dark mode** — O dark mode é forçado hoje, sem opção. Salvar preferência no `localStorage`.
- [ ] **Tags/categorias nos posts** — Adicionar campo `tags` no frontmatter e criar páginas de listagem por tag.
- [ ] **Open Graph image customizada por post** — Hoje o compartilhamento em redes sociais provavelmente usa imagem genérica. Usar a imagem `gif` do frontmatter como OG image.
- [ ] **Comentários via Giscus** — Integração leve via GitHub Discussions, compatível com SSG, zero banco de dados.

---

## Histórico de Implementações

| Data | Item | PR/Commit |
|---|---|---|
| 2026-05-08 | `prefers-reduced-motion` — CSS + JS na home | branch `ui-ux/tier-1` |
| 2026-05-08 | Font-size mínimo mobile (`0.75rem` → `1rem`) | branch `ui-ux/tier-1` |
| 2026-05-08 | Breadcrumb `Blog › Título` nos posts | branch `ui-ux/tier-1` |
| 2026-05-08 | Badge pill com flag na troca de idioma | branch `ui-ux/tier-1` |

> Atualizar esta tabela com o link do PR ou hash do commit a cada item concluído.
