# Ambiente virtual do Estudos Comparados

Site público da rede de 13 países do Estudos Comparados (Laboratório ECoS/UnB). Tom: "ciência com afeto".
Proposta aprovada: https://claude.ai/artifact/YMKatrFYz2hg4Sq2W9PYaS

## Comandos
- `npm run dev` abre o site em http://localhost:4321
- `npm run build` busca os totais, roda o guardião da regra de dados e gera o site em `dist/`
- `npm run checar` só o guardião da regra de dados
- `npm run fotos -- <pasta> <controle.csv> <pais>` converte fotos do Drive (HEIC/JPG) para WebP ≤ 400 KB e gera `revisao/fotos-<pais>.yml`

## Regra de dados (inegociável)
1. Nada de dados primários nem análises antes da publicação dos artigos. Só descritivo: número de entrevistas por país, município (ou região) e categoria profissional.
2. No máximo 3 falas curtas por país, sem nome, cargo, unidade, cidade ou qualquer detalhe que identifique.
3. Pergunta-guia antes de publicar qualquer coisa: "esse dado, sozinho, permite que alguém faça uma pesquisa ou identifique uma pessoa?" Sim ou talvez: não sobe.
4. Fotos com pessoas identificáveis só com autorização. Legendas não citam unidade de saúde onde houve entrevista.
5. Do Drive "RELATÓRIO 2026", as pastas 3 (Relatórios), 4 (Planilhas) e 7 (Autorizações) nunca vão para o site.
Isso está travado em três lugares: `src/content.config.ts` (schemas), `scripts/checar-dados.mjs` (roda no build) e `.pages.yml` (painel). Nunca afrouxe essas travas para um build passar.

## Liberdade criativa
Na parte criativa, a proposta é ponto de partida, não limite. Ouse em estrutura, ilustração e animação. O critério é sempre: isso leva o visitante ao conteúdo mais rápido e com mais vontade?
- Qualquer país, história ou material a no máximo 2 cliques do início ("Para onde vamos?" e a tecla `/` levam a qualquer destino).
- O visitante sempre sabe onde está e como seguir viagem (próxima parada, atalhos de países).
- Imersão: a navegação é uma viagem pela rede, não um catálogo.
- O que não muda: regra de dados, acessibilidade (contraste, texto alternativo, `prefers-reduced-motion`) e leveza (páginas rápidas em 3G; nada de bibliotecas pesadas no navegador sem necessidade).

## Estrutura
- `src/data/paises.ts`: os 13 países (nome nos 4 idiomas, cor da seta, coordenada).
- `src/content/{paises,historias,novidades}/{pt,es,en,fr}/`: conteúdo editável. Falta tradução? O site mostra o português com um aviso gentil.
- `src/content/biblioteca/`: um `.yml` por material (fases I–V do site antigo + novos).
- `data/totais.csv`: cópia da aba PÚBLICA da planilha (só totais). Nunca a planilha completa.
- `src/i18n/ui.ts`: textos fixos nos 4 idiomas (es/en/fr precisam de revisão de falante nativo).
- `docs/modelos/`: modelos de cada tipo de conteúdo.
- Rotas em `src/pages/[...lang]/`: português sem prefixo; `/es`, `/en`, `/fr`.

## Identidade
Base na logo (azul-marinho #1c3c84, azul do globo #acdcea, setas coloridas). Tokens em `src/styles/global.css`. Fontes: Fraunces (títulos) e Atkinson Hyperlegible (texto, feita para leitura fácil). A identidade está "aberta para criatividade": pode evoluir, mantendo a logo reconhecível.

## Antes de entregar qualquer mudança
- `npm run build` passa sem erro do guardião.
- Conferir no celular (390 px) e no computador; navegação por teclado funciona.
- Textos novos em linguagem simples, sem jargão (termo técnico vai no glossário de bolso `<Termo>`).
