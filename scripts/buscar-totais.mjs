// Baixa a aba PÚBLICA da planilha (só totais) e grava em data/totais.csv.
// Configure TOTAIS_CSV_URL com o link "Publicar na Web > CSV" APENAS da aba pública.
// Sem a variável, mantém o arquivo atual (o build continua funcionando).
import fs from 'node:fs';
const url = process.env.TOTAIS_CSV_URL;
if (!url) { console.log('• TOTAIS_CSV_URL não definida: usando data/totais.csv como está.'); process.exit(0); }
try {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const csv = (await r.text()).trim();
  const cab = csv.split(/\r?\n/)[0].toLowerCase().replace(/\s/g, '');
  if (cab !== 'pais,municipio_ou_regiao,categoria,entrevistas') {
    console.error(`✗ A planilha tem colunas inesperadas: "${cab}".\n  Só são aceitas: pais,municipio_ou_regiao,categoria,entrevistas.\n  Confira se o link é da aba PÚBLICA, não da planilha completa.`);
    process.exit(1);
  }
  fs.writeFileSync('data/totais.csv', `# Gerado automaticamente em ${new Date().toISOString()} a partir da aba pública.\n${csv}\n`);
  console.log('✓ Totais atualizados.');
} catch (e) {
  console.warn(`! Não consegui baixar a planilha (${e.message}). Mantendo os totais anteriores.`);
}
