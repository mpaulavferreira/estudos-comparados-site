import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// REGRA DE DADOS (vale para tudo aqui):
// nada de dados primários nem análises antes dos artigos. Só descritivo.
// No máximo 3 falas curtas por país, sem nome, cargo, unidade ou lugar.
// Os schemas abaixo travam o build se alguém quebrar essas regras.

const idioma = z.enum(['pt', 'es', 'en', 'fr']);
const PAISES = [
  'angola', 'argentina', 'brasil', 'cabo-verde', 'chile', 'colombia', 'espanha',
  'guine-bissau', 'mexico', 'mocambique', 'peru', 'portugal', 'sao-tome-e-principe',
] as const;
const pais = z.enum(PAISES);

const foto = z.object({
  src: z.string(),
  alt: z.string().min(5, 'Toda foto precisa de texto alternativo (o que aparece nela).'),
  legenda: z.string().optional(),
  autorizada: z.literal(true, { message: 'Foto com pessoas só entra com autorização de uso de imagem.' }).optional(),
});

const fala = z.object({
  texto: z.string().min(10).max(280, 'Fala longa demais: use um trecho curto (até 280 caracteres).'),
}).strict(); // .strict(): não aceita campos como nome, cargo ou unidade

// Glob ignora arquivos que começam com "_" (exemplos e modelos).
const padrao = '**/[!_]*.{md,mdx}';

const paises = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/paises' }),
  schema: z.object({
    pais,
    resumo: z.string().max(220).optional(),
    retrato: z.string().optional(),
    coleta: z.enum(['concluida', 'em-andamento']).default('concluida'),
    nivelMapa: z.enum(['municipio', 'regiao']).default('municipio'),
    universidade: z.object({ nome: z.string(), site: z.string().url().optional(), logo: z.string().optional() }).optional(),
    falas: z.array(fala).max(3, 'No máximo 3 falas por país (regra de dados).').default([]),
    fotos: z.array(foto).default([]),
    rascunho: z.boolean().default(false),
  }),
});

const historias = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/historias' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string().max(220),
    pais: pais.optional(),
    autoria: z.string().optional(),
    data: z.coerce.date(),
    capa: foto.optional(),
    video: z.string().url().optional(),
    rascunho: z.boolean().default(false),
  }),
});

const novidades = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/novidades' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string().max(220),
    data: z.coerce.date(),
    tipo: z.enum(['noticia', 'evento']).default('noticia'),
    capa: foto.optional(),
    urlAntiga: z.string().optional(), // endereço no WordPress antigo, para redirecionar
    rascunho: z.boolean().default(false),
  }),
});

const biblioteca = defineCollection({
  loader: glob({ pattern: '**/[!_]*.{yml,yaml,json}', base: './src/content/biblioteca' }),
  schema: z.object({
    titulo: z.string(),
    tipo: z.enum(['artigo', 'tese', 'relatorio', 'atlas', 'cartilha', 'apresentacao', 'material-educativo', 'livro', 'video', 'outro']),
    paises: z.array(pais).default([]),
    idiomas: z.array(idioma).min(1),
    fase: z.enum(['I', 'II', 'III', 'IV', 'V', 'VI']).optional(),
    ano: z.number().int().min(2008).max(2100),
    autoria: z.string().optional(),
    resumo: z.string().max(400).optional(),
    arquivo: z.string().optional(), // PDF em /media (até 10 MB)
    link: z.string().url().optional(), // ou link externo (SciELO, OPAS, repositório UnB, editora, YouTube)
    capa: z.string().optional(),
    publicadoApósArtigos: z.boolean().default(false),
  }).refine((d) => d.arquivo || d.link, 'Cada item da biblioteca precisa de um arquivo ou de um link.'),
});

export const collections = { paises, historias, novidades, biblioteca };
