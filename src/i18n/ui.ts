// Textos fixos da interface nos 4 idiomas.
// Português é a língua de origem. Espanhol, inglês e francês precisam de revisão de falante nativo antes de ir ao ar.
export const IDIOMAS = ['pt', 'es', 'en', 'fr'] as const;
export type Idioma = (typeof IDIOMAS)[number];
export const PADRAO: Idioma = 'pt';

export const NOME_IDIOMA: Record<Idioma, string> = { pt: 'Português', es: 'Español', en: 'English', fr: 'Français' };

const pt = {
  'site.nome': 'Estudos Comparados',
  'site.lema': 'Ciência com afeto, do Peru a Moçambique',
  'nav.inicio': 'Início',
  'nav.pesquisa': 'A pesquisa',
  'nav.paises': 'Os países',
  'nav.historias': 'Histórias da rede',
  'nav.biblioteca': 'Biblioteca',
  'nav.novidades': 'Novidades',
  'nav.quem': 'Quem somos',
  'nav.contato': 'Contato',
  'busca.abrir': 'Para onde vamos?',
  'busca.placeholder': 'Digite um país, um tema ou um material',
  'busca.vazio': 'Nada por aqui. Tente o nome de um país.',
  'pular': 'Pular para o conteúdo',
  'home.titulo': '13 países. As mesmas perguntas. Muitas histórias.',
  'home.sub': 'Fomos perguntar a quem cuida da saúde perto de casa onde ela encontra informação confiável. Escolha um país e embarque.',
  'home.escolha': 'Escolha um destino',
  'home.comoFizemos': 'Como fizemos, em quatro passos',
  'home.ultimas': 'O que há de novo',
  'num.paises': 'países',
  'num.municipios': 'municípios visitados',
  'num.entrevistas': 'conversas com profissionais',
  'pais.retrato': 'Retrato rápido',
  'pais.numeros': 'Os números da coleta',
  'pais.diario': 'Diário de viagem',
  'pais.falas': 'O que ouvimos',
  'pais.parceira': 'Quem nos recebeu',
  'pais.materiais': 'Materiais do país',
  'pais.proxima': 'Próxima parada',
  'pais.anterior': 'Parada anterior',
  'pais.coletaAndamento': 'Coleta em andamento: os números ainda vão crescer.',
  'pais.semNumeros': 'Os números deste país entram assim que a planilha pública for atualizada.',
  'biblioteca.filtrar': 'Filtrar por',
  'biblioteca.todos': 'Todos',
  'traducao.aviso': 'Este conteúdo ainda não foi traduzido. Você está lendo a versão em português.',
  'saibaMais': 'Para saber mais',
  'rodape.financiadores': 'Apoio: OPAS/Decit, Ministério da Saúde e CNPq',
} as const;

type Chave = keyof typeof pt;

export const ui: Record<Idioma, Partial<Record<Chave, string>>> = {
  pt,
  es: {
    'site.lema': 'Ciencia con afecto, de Perú a Mozambique',
    'nav.inicio': 'Inicio', 'nav.pesquisa': 'La investigación', 'nav.paises': 'Los países', 'nav.historias': 'Historias de la red',
    'nav.biblioteca': 'Biblioteca', 'nav.novidades': 'Novedades', 'nav.quem': 'Quiénes somos', 'nav.contato': 'Contacto',
    'busca.abrir': '¿A dónde vamos?', 'busca.placeholder': 'Escriba un país, un tema o un material', 'busca.vazio': 'Nada por aquí. Pruebe con el nombre de un país.',
    'pular': 'Saltar al contenido',
    'home.titulo': '13 países. Las mismas preguntas. Muchas historias.',
    'home.sub': 'Preguntamos a quienes cuidan la salud cerca de casa dónde encuentran información confiable. Elija un país y embarque.',
    'home.escolha': 'Elija un destino', 'home.comoFizemos': 'Cómo lo hicimos, en cuatro pasos', 'home.ultimas': 'Lo nuevo',
    'num.paises': 'países', 'num.municipios': 'municipios visitados', 'num.entrevistas': 'conversaciones con profesionales',
    'pais.retrato': 'Retrato rápido', 'pais.numeros': 'Los números de la recolección', 'pais.diario': 'Diario de viaje', 'pais.falas': 'Lo que escuchamos',
    'pais.parceira': 'Quién nos recibió', 'pais.materiais': 'Materiales del país', 'pais.proxima': 'Próxima parada', 'pais.anterior': 'Parada anterior',
    'pais.coletaAndamento': 'Recolección en curso: los números todavía van a crecer.',
    'pais.semNumeros': 'Los números de este país aparecerán cuando se actualice la planilla pública.',
    'biblioteca.filtrar': 'Filtrar por', 'biblioteca.todos': 'Todos',
    'traducao.aviso': 'Este contenido aún no está traducido. Está leyendo la versión en portugués.',
    'saibaMais': 'Para saber más', 'rodape.financiadores': 'Apoyo: OPS/Decit, Ministerio de Salud de Brasil y CNPq',
  },
  en: {
    'site.lema': 'Science with care, from Peru to Mozambique',
    'nav.inicio': 'Home', 'nav.pesquisa': 'The research', 'nav.paises': 'The countries', 'nav.historias': 'Network stories',
    'nav.biblioteca': 'Library', 'nav.novidades': 'News', 'nav.quem': 'About us', 'nav.contato': 'Contact',
    'busca.abrir': 'Where to?', 'busca.placeholder': 'Type a country, a topic or a material', 'busca.vazio': 'Nothing here. Try a country name.',
    'pular': 'Skip to content',
    'home.titulo': '13 countries. The same questions. Many stories.',
    'home.sub': 'We asked people who care for health close to home where they find reliable information. Pick a country and come aboard.',
    'home.escolha': 'Pick a destination', 'home.comoFizemos': 'How we did it, in four steps', 'home.ultimas': "What's new",
    'num.paises': 'countries', 'num.municipios': 'municipalities visited', 'num.entrevistas': 'conversations with health workers',
    'pais.retrato': 'Quick portrait', 'pais.numeros': 'Fieldwork in numbers', 'pais.diario': 'Travel diary', 'pais.falas': 'What we heard',
    'pais.parceira': 'Who welcomed us', 'pais.materiais': 'Materials from the country', 'pais.proxima': 'Next stop', 'pais.anterior': 'Previous stop',
    'pais.coletaAndamento': 'Fieldwork in progress: these numbers will still grow.',
    'pais.semNumeros': "This country's numbers will appear once the public sheet is updated.",
    'biblioteca.filtrar': 'Filter by', 'biblioteca.todos': 'All',
    'traducao.aviso': 'This content has not been translated yet. You are reading the Portuguese version.',
    'saibaMais': 'Learn more', 'rodape.financiadores': "Support: PAHO/Decit, Brazil's Ministry of Health and CNPq",
  },
  fr: {
    'site.lema': 'Science avec affection, du Pérou au Mozambique',
    'nav.inicio': 'Accueil', 'nav.pesquisa': 'La recherche', 'nav.paises': 'Les pays', 'nav.historias': 'Histoires du réseau',
    'nav.biblioteca': 'Bibliothèque', 'nav.novidades': 'Actualités', 'nav.quem': 'Qui sommes-nous', 'nav.contato': 'Contact',
    'busca.abrir': 'On va où ?', 'busca.placeholder': 'Tapez un pays, un thème ou un document', 'busca.vazio': "Rien ici. Essayez le nom d'un pays.",
    'pular': 'Aller au contenu',
    'home.titulo': '13 pays. Les mêmes questions. Beaucoup d’histoires.',
    'home.sub': 'Nous avons demandé à celles et ceux qui soignent près de chez nous où trouver une information fiable. Choisissez un pays et embarquez.',
    'home.escolha': 'Choisissez une destination', 'home.comoFizemos': 'Comment nous avons fait, en quatre étapes', 'home.ultimas': 'Quoi de neuf',
    'num.paises': 'pays', 'num.municipios': 'communes visitées', 'num.entrevistas': 'entretiens avec des professionnels',
    'pais.retrato': 'Portrait rapide', 'pais.numeros': 'La collecte en chiffres', 'pais.diario': 'Carnet de voyage', 'pais.falas': 'Ce que nous avons entendu',
    'pais.parceira': 'Qui nous a accueillis', 'pais.materiais': 'Documents du pays', 'pais.proxima': 'Prochaine escale', 'pais.anterior': 'Escale précédente',
    'pais.coletaAndamento': 'Collecte en cours : ces chiffres vont encore augmenter.',
    'pais.semNumeros': 'Les chiffres de ce pays apparaîtront dès la mise à jour du tableau public.',
    'biblioteca.filtrar': 'Filtrer par', 'biblioteca.todos': 'Tous',
    'traducao.aviso': "Ce contenu n'est pas encore traduit. Vous lisez la version en portugais.",
    'saibaMais': 'En savoir plus', 'rodape.financiadores': 'Soutien : OPS/Decit, ministère de la Santé du Brésil et CNPq',
  },
};

export function t(lang: Idioma, chave: Chave): string {
  return ui[lang][chave] ?? pt[chave];
}

/** Monta um link no idioma certo: pt não tem prefixo. */
export function rota(lang: Idioma, caminho = '/'): string {
  const limpo = caminho.startsWith('/') ? caminho : `/${caminho}`;
  return lang === PADRAO ? limpo : `/${lang}${limpo === '/' ? '' : limpo}`;
}

/** Para getStaticPaths: uma rota por idioma (pt na raiz). */
export const caminhosIdiomas = () => IDIOMAS.map((l) => ({ params: { lang: l === PADRAO ? undefined : l }, props: { lang: l } }));
