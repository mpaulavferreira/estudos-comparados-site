// Prepara fotos do Drive para o site.
// Uso: npm run fotos -- <pasta-com-as-fotos-baixadas> <Controle de Fotos.csv> <pais>
//   ex.: npm run fotos -- ~/Downloads/cabo-verde ~/Downloads/controle.csv cabo-verde
// O que faz:
//  - converte JPG/PNG/HEIC em WebP de até 400 KB (1600 px no lado maior) em public/media/<pais>/
//  - lê a planilha "Controle de Fotos" (exportada como CSV) e monta um rascunho das fotos com legenda
//  - separa vídeos (vão para o YouTube) e marca para revisão:
//      * "Pessoas identificáveis?" = SIM  -> só entra com autorização
//      * "Pessoas identificáveis?" vazio  -> alguém precisa conferir
//      * legenda que cita unidade de saúde -> tirar o nome da unidade (regra de dados)
// Nada é publicado: o resultado é um arquivo de revisão em revisao/fotos-<pais>.yml.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import heicConvert from 'heic-convert';

const [pasta, controle, pais] = process.argv.slice(2);
if (!pasta || !controle || !pais) { console.error('Uso: npm run fotos -- <pasta> <controle.csv> <pais>'); process.exit(1); }

function lerCsv(txt) {
  const linhas = []; let campo = '', linha = [], aspas = false;
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (aspas) { if (c === '"' && txt[i + 1] === '"') { campo += '"'; i++; } else if (c === '"') aspas = false; else campo += c; }
    else if (c === '"') aspas = true;
    else if (c === ',') { linha.push(campo); campo = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && txt[i + 1] === '\n') i++; linha.push(campo); linhas.push(linha); linha = []; campo = ''; }
    else campo += c;
  }
  if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
  const [cab, ...resto] = linhas.filter((l) => l.some((x) => x.trim()));
  return resto.map((l) => Object.fromEntries(cab.map((h, i) => [h.trim(), (l[i] ?? '').trim()])));
}

const registros = lerCsv(fs.readFileSync(controle, 'utf8'));
const destino = path.join('public/media', pais);
fs.mkdirSync(destino, { recursive: true });
fs.mkdirSync('revisao', { recursive: true });

const UNIDADE = /(centro de sa[uú]de|posto|unidade|ubs|usf|cl[ií]nica|hospital|delegacia de sa[uú]de)/i;
const saida = [], videos = [];
let n = 0;
for (const r of registros) {
  const nome = r['Nome do Arquivo']; if (!nome) continue;
  const origem = path.join(pasta, nome);
  if (/\.(mov|mp4|avi)$/i.test(nome)) { videos.push(nome); continue; }
  if (!fs.existsSync(origem)) { console.warn(`! Não achei ${nome} na pasta.`); continue; }
  n++;
  const final = `${pais}-${String(n).padStart(2, '0')}.webp`;
  let buf = fs.readFileSync(origem);
  if (/\.heic$/i.test(nome)) buf = Buffer.from(await heicConvert({ buffer: buf, format: 'JPEG', quality: 0.9 }));
  let q = 80, out;
  do { out = await sharp(buf).rotate().resize(1600, 1600, { fit: 'inside', withoutEnlargement: true }).webp({ quality: q }).toBuffer(); q -= 8; } while (out.length > 400 * 1024 && q > 30);
  fs.writeFileSync(path.join(destino, final), out);

  const pessoas = (r['Pessoas identificáveis?'] || '').toUpperCase();
  const legenda = r['Descrição'] || '';
  const revisar = [];
  if (pessoas === 'SIM') revisar.push('tem pessoas identificáveis: só publicar com autorização (pasta 7. Autorizações e termos)');
  if (!pessoas) revisar.push('ninguém marcou se há pessoas identificáveis: conferir a foto');
  if (UNIDADE.test(legenda) || UNIDADE.test(r['Instituição/Unidade'] || '')) revisar.push('legenda cita unidade de saúde: tirar o nome da unidade se houve entrevista lá');
  if (/\b(dra?\.|dr[ªa]\.?|professora?|mestrand[oa])\s+[A-ZÁÉÍÓÚ]/.test(legenda)) revisar.push('legenda cita nomes de pessoas: manter só com autorização');
  saida.push({ src: `/media/${pais}/${final}`, original: nome, alt: '', legenda, revisar, kb: Math.round(out.length / 1024) });
}

const yaml = [
  `# Revisão das fotos de ${pais} (gerado em ${new Date().toLocaleString('pt-BR')}).`,
  '# 1) Escreva o "alt" (o que aparece na foto). 2) Resolva cada item de "revisar".',
  '# 3) Copie as fotos aprovadas para o campo "fotos" da página do país (pelo painel ou no arquivo).',
  '# Fotos reprovadas: apague também o .webp em public/media.',
  'fotos:',
  ...saida.flatMap((f) => [
    `  - src: "${f.src}"   # ${f.original}, ${f.kb} KB`,
    `    alt: ""`,
    `    legenda: ${JSON.stringify(f.legenda)}`,
    ...(f.revisar.length ? ['    # REVISAR:', ...f.revisar.map((x) => `    #  - ${x}`)] : []),
  ]),
  '',
  videos.length ? `# Vídeos (subir no YouTube e colar o link numa história): ${videos.join(', ')}` : '',
].join('\n');
fs.writeFileSync(`revisao/fotos-${pais}.yml`, yaml);
console.log(`✓ ${saida.length} foto(s) convertida(s) para public/media/${pais}/. Revisão em revisao/fotos-${pais}.yml`);
console.log(`  ${saida.filter((f) => f.revisar.length).length} foto(s) precisam de revisão; ${videos.length} vídeo(s) separados.`);
