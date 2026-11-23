import fs from 'node:fs';
import path from 'node:path';

// Lê data/totais.csv: a cópia da aba PÚBLICA da planilha (só totais descritivos).
// Colunas permitidas: pais, municipio_ou_regiao, categoria, entrevistas
export interface Linha { pais: string; local: string; categoria: string; entrevistas: number }

let cache: Linha[] | null = null;

export function linhas(): Linha[] {
  if (cache) return cache;
  const arq = path.resolve('data/totais.csv');
  if (!fs.existsSync(arq)) return (cache = []);
  const [cab, ...resto] = fs.readFileSync(arq, 'utf8').trim().split(/\r?\n/).filter((l) => l && !l.startsWith('#'));
  if (!cab) return (cache = []);
  cache = resto.map((l) => {
    const [pais, local, categoria, n] = l.split(',').map((c) => c.trim());
    return { pais, local, categoria, entrevistas: Number(n) || 0 };
  });
  return cache;
}

export function resumoPais(slug: string) {
  const ls = linhas().filter((l) => l.pais === slug);
  const porCategoria = new Map<string, number>();
  const porLocal = new Map<string, number>();
  for (const l of ls) {
    porCategoria.set(l.categoria, (porCategoria.get(l.categoria) ?? 0) + l.entrevistas);
    porLocal.set(l.local, (porLocal.get(l.local) ?? 0) + l.entrevistas);
  }
  return {
    entrevistas: ls.reduce((s, l) => s + l.entrevistas, 0),
    municipios: porLocal.size,
    porCategoria: [...porCategoria].sort((a, b) => b[1] - a[1]),
    porLocal: [...porLocal].sort((a, b) => b[1] - a[1]),
  };
}

export function resumoGeral() {
  const ls = linhas();
  return {
    entrevistas: ls.reduce((s, l) => s + l.entrevistas, 0),
    municipios: new Set(ls.map((l) => `${l.pais}|${l.local}`)).size,
  };
}
