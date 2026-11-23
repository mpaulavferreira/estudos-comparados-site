// Guardião da REGRA DE DADOS. Roda antes de todo build; se algo quebrar a regra, o site não publica.
// Regra: nada de dados primários ou análises antes dos artigos. Só descritivo.
// No máximo 3 falas curtas e anônimas por país. Pergunta-guia: "esse dado, sozinho,
// permite que alguém faça uma pesquisa ou identifique uma pessoa?" Se sim ou talvez, não sobe.
import fs from 'node:fs';
import path from 'node:path';

const erros = [], avisos = [];
const PAISES = ['angola','argentina','brasil','cabo-verde','chile','colombia','espanha','guine-bissau','mexico','mocambique','peru','portugal','sao-tome-e-principe'];

// 1) Totais: só as 4 colunas permitidas, números inteiros, países válidos.
const csv = fs.existsSync('data/totais.csv') ? fs.readFileSync('data/totais.csv', 'utf8') : '';
const linhas = csv.split(/\r?\n/).filter((l) => l.trim() && !l.startsWith('#'));
if (linhas.length) {
  const cab = linhas[0].replace(/\s/g, '');
  if (cab !== 'pais,municipio_ou_regiao,categoria,entrevistas') erros.push(`data/totais.csv: colunas proibidas ou fora de ordem ("${cab}").`);
  linhas.slice(1).forEach((l, i) => {
    if (l.replace(/\s/g, '') === cab) return;
    const c = l.split(',');
    if (c.length !== 4) erros.push(`data/totais.csv linha ${i + 2}: esperava 4 colunas, achei ${c.length}.`);
    if (!PAISES.includes(c[0]?.trim())) erros.push(`data/totais.csv linha ${i + 2}: país "${c[0]}" não reconhecido (use o slug, ex.: cabo-verde).`);
    const n = Number(c[3]);
    if (!Number.isInteger(n) || n < 0) erros.push(`data/totais.csv linha ${i + 2}: "entrevistas" precisa ser um número inteiro.`);
    else if (n > 0 && n < 3) avisos.push(`data/totais.csv linha ${i + 2}: só ${n} entrevista(s) em ${c[1]} / ${c[2]}. Número tão pequeno pode identificar alguém: considere juntar com outra categoria ou mostrar por região.`);
  });
}

// 2) Conteúdo dos países: falas, fotos e palavras que indicam dado primário.
const PALAVRAS_PROIBIDAS = [/\bp\s*[<=>]\s*0[.,]\d/i, /\bodds\b/i, /\bregress[aã]o\b/i, /\bcorrela[cç][aã]o\b/i, /\bqui-?quadrado\b/i, /\bintervalo de confian[cç]a\b/i, /\bentrevistad[oa] \d+/i, /\bE\d{1,3}\b/];
const CAMPOS_PROIBIDOS = /^\s*(nome_entrevistad|entrevistad[oa]|cargo|unidade|idade|sexo|telefone|email|cpf)\s*:/im;
function varrer(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => d.isDirectory() ? varrer(path.join(dir, d.name)) : [path.join(dir, d.name)]);
}
for (const arq of varrer('src/content').filter((f) => /\.(md|mdx|ya?ml|json)$/.test(f) && !path.basename(f).startsWith('_'))) {
  const txt = fs.readFileSync(arq, 'utf8');
  if (CAMPOS_PROIBIDOS.test(txt)) erros.push(`${arq}: tem um campo que identifica pessoas (nome, cargo, unidade, idade...). Remova.`);
  for (const re of PALAVRAS_PROIBIDAS) if (re.test(txt)) avisos.push(`${arq}: parece trazer análise estatística ou código de entrevistado (${re}). Isso só pode sair depois dos artigos.`);
  if (arq.includes(`${path.sep}paises${path.sep}`)) {
    const falas = (txt.match(/^\s*-\s*texto\s*:/gm) || []).length;
    if (falas > 3) erros.push(`${arq}: ${falas} falas. O máximo é 3 por país.`);
  }
}

// 3) Arquivos de mídia: fotos até 400 KB, PDFs até 10 MB, nada acima de 25 MB (limite da hospedagem).
for (const f of varrer('public/media')) {
  const kb = fs.statSync(f).size / 1024;
  if (/\.(jpe?g|png|webp|avif)$/i.test(f) && kb > 400) erros.push(`${f}: foto com ${Math.round(kb)} KB. Reduza para até 400 KB (npm run fotos faz isso).`);
  if (/\.pdf$/i.test(f) && kb > 10 * 1024) erros.push(`${f}: PDF com ${Math.round(kb / 1024)} MB. Máximo 10 MB; arquivos maiores ficam na editora ou no repositório da UnB e entram por link.`);
  if (/\.(heic|mov|mp4|xlsx|csv|docx)$/i.test(f)) erros.push(`${f}: formato que não deve ir para o site (vídeo vai para o YouTube; planilhas e documentos de pesquisa nunca sobem).`);
}

avisos.forEach((a) => console.warn('! ' + a));
if (erros.length) { erros.forEach((e) => console.error('✗ ' + e)); console.error(`\nRegra de dados: ${erros.length} problema(s). O site não foi publicado.`); process.exit(1); }
console.log(`✓ Regra de dados conferida${avisos.length ? ` (${avisos.length} aviso(s) para revisar)` : ''}.`);
