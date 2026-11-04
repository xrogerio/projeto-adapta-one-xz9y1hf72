// Backfill idempotente dos campos de texto esvaziados nos registros singleton
// de site_menu, hero e about. Só preenche campos VAZIOS (nunca sobrescreve) e,
// em site_menu.items, só grava quando o array está vazio.
// Em banco vazio não faz nada.
function isEmptyValue(current) {
  return (
    current === null ||
    current === undefined ||
    (typeof current === 'string' && current.trim() === '') ||
    (Array.isArray(current) && current.length === 0)
  )
}

function fillEmpty(app, collectionName, values) {
  const records = app.findRecordsByFilter(collectionName, '1=1', '', 10, 0)
  for (const rec of records) {
    let changed = false
    for (const key of Object.keys(values)) {
      if (isEmptyValue(rec.get(key))) {
        rec.set(key, values[key])
        changed = true
      }
    }
    if (changed) app.save(rec)
  }
}

migrate(
  (app) => {
    fillEmpty(app, 'site_menu', {
      brandTitle: 'FREDDIE & LOLLA',
      brandSubtitle: 'Aventuras na Baía Quente',
      bannerBadge: 'Série infantil de animação 3D',
      bannerTagline: 'Na ponta do mundo, a esperança nunca congela!',
      ctaLabel: 'Assistir no YouTube',
      ctaUrl: 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg',
      items: [
        { label: 'Início', href: '#inicio' },
        { label: 'Sobre a série', href: '#sobre' },
        { label: 'Personagens', href: '#personagens' },
        { label: 'Episódios', href: '#episodios' },
        { label: 'Trilha sonora', href: '#musicas' },
        { label: 'Siga a série', href: '#redes' },
        { label: 'Mercado', href: '#mercado' },
      ],
    })

    fillEmpty(app, 'hero', {
      badge: 'Série infantil de animação 3D',
      titleMain: 'FREDDIE & LOLLA',
      titleSub: 'Aventuras na Baía Quente',
      tagline: 'Na ponta do mundo, a esperança nunca congela!',
      description:
        'O caos fofo de dois irmãos pinguins cuidando de três bebês trigêmeos na Antártica.',
      meta: 'Episódios de cerca de 6 minutos · Para crianças de 4 a 7 anos',
      primaryCtaLabel: 'Assistir no YouTube',
      primaryCtaUrl: 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg',
      secondaryCtaLabel: 'Ouvir as músicas',
      secondaryCtaHref: '#musicas',
      youtubeChannelUrl: 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg',
    })

    fillEmpty(app, 'about', {
      sectionEyebrow: 'Sobre a série',
      sectionTitle: 'Um mundo gelado cheio de afeto',
      sectionSubtitle:
        'Conheça a premissa da série e o que torna a Baía Quente um lugar tão especial.',
      quote:
        '“Quando seus pais pilotos viajam e não mandam notícias sobre sua volta, dois pinguinzinhos de seis e cinco anos precisam aprender a cuidar sozinhos de seus irmãos trigêmeos de um ano, sem saber que são secretamente vigiados e protegidos por uma misteriosa e barulhenta vizinha do andar de cima.”',
      fullText:
        'Na isolada e aconchegante Baía Quente, na Península Antártica (aquecida por uma fonte geotérmica), Freddie (6 anos) e Lolla (5 anos) precisam cuidar dos trigêmeos Lilly, Pimpi e Popó após a viagem dos pais, Atlas e Amélia. Entre papinhas de peixe, nevascas e peraltices, os irmãos desvendam o mistério dos barulhos no segundo andar — a enigmática “Velha da Caneca” — e descobrem que estão protegidos por uma guardiã que comanda o Albatroz Hugo.',
      chips: [
        'Animação 3D',
        'Comédia familiar e musical',
        'Episódios de ~6 minutos',
        '4 a 7 anos · co-viewing familiar',
      ],
    })
  },
  (app) => {
    // Sem reversão: o conteúdo restaurado é dado editável pelo painel.
  },
)
