// Os 13 países da rede. Dados fixos (não são dados da pesquisa).
// cor: tons das setas da logo, para cada país ter "sua" seta.
export type Regiao = 'america-latina' | 'africa' | 'europa';
export interface Pais {
  slug: string;
  iso: string; // código numérico ISO 3166 (usado pelo mapa)
  coord: [number, number]; // [longitude, latitude] aproximada da capital
  regiao: Regiao;
  cor: string;
  nome: { pt: string; es: string; en: string; fr: string };
}

export const ORIGEM: [number, number] = [-47.88, -15.79]; // Brasília, UnB

export const PAISES: Pais[] = [
  { slug: 'angola', iso: '024', coord: [13.23, -8.84], regiao: 'africa', cor: '#117148', nome: { pt: 'Angola', es: 'Angola', en: 'Angola', fr: 'Angola' } },
  { slug: 'argentina', iso: '032', coord: [-58.38, -34.6], regiao: 'america-latina', cor: '#f2a47e', nome: { pt: 'Argentina', es: 'Argentina', en: 'Argentina', fr: 'Argentine' } },
  { slug: 'brasil', iso: '076', coord: [-47.88, -15.79], regiao: 'america-latina', cor: '#0f5a3a', nome: { pt: 'Brasil', es: 'Brasil', en: 'Brazil', fr: 'Brésil' } },
  { slug: 'cabo-verde', iso: '132', coord: [-23.51, 14.93], regiao: 'africa', cor: '#388a84', nome: { pt: 'Cabo Verde', es: 'Cabo Verde', en: 'Cape Verde', fr: 'Cap-Vert' } },
  { slug: 'chile', iso: '152', coord: [-70.67, -33.45], regiao: 'america-latina', cor: '#e3263a', nome: { pt: 'Chile', es: 'Chile', en: 'Chile', fr: 'Chili' } },
  { slug: 'colombia', iso: '170', coord: [-74.07, 4.71], regiao: 'america-latina', cor: '#b84a3c', nome: { pt: 'Colômbia', es: 'Colombia', en: 'Colombia', fr: 'Colombie' } },
  { slug: 'espanha', iso: '724', coord: [-3.7, 40.42], regiao: 'europa', cor: '#1c3c84', nome: { pt: 'Espanha', es: 'España', en: 'Spain', fr: 'Espagne' } },
  { slug: 'guine-bissau', iso: '624', coord: [-15.6, 11.86], regiao: 'africa', cor: '#b3bd62', nome: { pt: 'Guiné-Bissau', es: 'Guinea-Bisáu', en: 'Guinea-Bissau', fr: 'Guinée-Bissau' } },
  { slug: 'mexico', iso: '484', coord: [-99.13, 19.43], regiao: 'america-latina', cor: '#352f5a', nome: { pt: 'México', es: 'México', en: 'Mexico', fr: 'Mexique' } },
  { slug: 'mocambique', iso: '508', coord: [32.57, -25.97], regiao: 'africa', cor: '#2f9a6a', nome: { pt: 'Moçambique', es: 'Mozambique', en: 'Mozambique', fr: 'Mozambique' } },
  { slug: 'peru', iso: '604', coord: [-77.04, -12.05], regiao: 'america-latina', cor: '#d9c94a', nome: { pt: 'Peru', es: 'Perú', en: 'Peru', fr: 'Pérou' } },
  { slug: 'portugal', iso: '620', coord: [-9.14, 38.72], regiao: 'europa', cor: '#1f6489', nome: { pt: 'Portugal', es: 'Portugal', en: 'Portugal', fr: 'Portugal' } },
  { slug: 'sao-tome-e-principe', iso: '678', coord: [6.73, 0.34], regiao: 'africa', cor: '#8fa83c', nome: { pt: 'São Tomé e Príncipe', es: 'Santo Tomé y Príncipe', en: 'São Tomé and Príncipe', fr: 'Sao Tomé-et-Principe' } },
];

export const porSlug = (slug: string) => PAISES.find((p) => p.slug === slug);
