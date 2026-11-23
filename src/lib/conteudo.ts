import { getCollection, type CollectionEntry } from 'astro:content';
import { PADRAO, type Idioma } from '../i18n/ui';

type ColecaoTraduzida = 'paises' | 'historias' | 'novidades';

/** Idioma de uma entrada, pela pasta: paises/es/peru.md -> 'es'. */
export const idiomaDe = (id: string) => id.split('/')[0] as Idioma;
export const slugDe = (id: string) => id.split('/').slice(1).join('/');

/**
 * Entradas de uma coleção no idioma pedido. Quando não há tradução,
 * usa o português e marca `traduzido: false` (a página mostra um aviso gentil).
 */
export async function noIdioma<C extends ColecaoTraduzida>(colecao: C, lang: Idioma) {
  const todas = (await getCollection(colecao, (e: any) => import.meta.env.DEV || !e.data.rascunho)) as CollectionEntry<C>[];
  const base = todas.filter((e) => idiomaDe(e.id) === PADRAO);
  return base.map((orig) => {
    const trad = todas.find((e) => idiomaDe(e.id) === lang && slugDe(e.id) === slugDe(orig.id));
    return { entrada: trad ?? orig, slug: slugDe(orig.id), traduzido: lang === PADRAO || !!trad };
  });
}
