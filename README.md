# Estudos Comparados · ambiente virtual

Site da rede de 13 países do Estudos Comparados. Feito em Astro, hospedado de graça no Cloudflare Pages e editado pelo Pages CMS.

## Para quem vai editar (sem mexer em código)
1. Aceite o convite do painel (Pages CMS) que chegou no seu e-mail.
2. Escolha o que quer mexer: "Países (português) › Peru", "Novidades", "Biblioteca"...
3. Preencha o formulário. Tudo nasce como **rascunho**: a coordenação revisa e desmarca "Rascunho" para publicar.
4. Clique em Salvar. Em 1 ou 2 minutos o site atualiza sozinho.

Se o site não atualizar, é quase sempre a **regra de dados** funcionando: mais de 3 falas num país, foto acima de 400 KB, ou um campo que identifica pessoas. A mensagem de erro diz o que ajustar.

## Fotos do Drive
As fotos da pasta "RELATÓRIO 2026" chegam em HEIC e com vários MB. Quem tem o projeto no computador roda:

    npm run fotos -- <pasta-das-fotos> "<Controle de Fotos>.csv" cabo-verde

O script converte, reduz e cria `revisao/fotos-cabo-verde.yml`, já marcando o que precisa de revisão (pessoas identificáveis, nome de unidade de saúde na legenda). Vídeos são separados para ir ao YouTube.

## Números da coleta
Os números vêm de uma aba separada da planilha do Google, só com totais (colunas: `pais, municipio_ou_regiao, categoria, entrevistas`). Publique **só essa aba** como CSV e coloque o link na variável `TOTAIS_CSV_URL` do Cloudflare Pages. O site lê a planilha a cada publicação; um agendamento diário e um botão de "atualizar agora" (deploy hook) completam o combinado na proposta.

## Para quem desenvolve
    npm install
    npm run dev

Regras e estrutura em `CLAUDE.md`.
