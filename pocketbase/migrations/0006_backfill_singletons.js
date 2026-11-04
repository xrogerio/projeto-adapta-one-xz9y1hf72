// Backfill idempotente dos campos vazios dos singletons:
// hero, site_menu, about, soundtrack, social, market, site_footer.
// Só preenche se o campo atual for vazio/nulo/array vazio (nunca sobrescreve dados existentes).
// Em banco vazio não altera nem quebra nada.

function isEmpty(val) {
  if (val === null || val === undefined) return true
  if (typeof val === 'string') return val.trim() === ''
  if (Array.isArray(val)) return val.length === 0
  return false
}

function backfillCollection(app, collectionName, defaults) {
  let records = []
  try {
    records = app.findRecordsByFilter(collectionName, '1=1', '', 50, 0)
  } catch (_) {
    return
  }

  for (const rec of records) {
    let changed = false
    for (const key of Object.keys(defaults)) {
      let currentVal = null
      try {
        // Tenta obter o valor. Se for campo json, rec.get(key) ou rec.getString(key)
        const raw = rec.get(key)
        if (typeof raw === 'string') {
          // Se for string JSON tipo "[]" ou ""
          if (raw === '[]' || raw === '""' || raw === 'null') {
            currentVal = []
          } else {
            currentVal = raw
          }
        } else {
          currentVal = raw
        }
      } catch (_) {
        currentVal = null
      }

      if (isEmpty(currentVal)) {
        rec.set(key, defaults[key])
        changed = true
      }
    }
    if (changed) {
      app.save(rec)
    }
  }
}

migrate(
  (app) => {
    // 1. site_menu
    backfillCollection(app, 'site_menu', {
      bannerTagline: 'Na ponta do mundo, a esperança nunca congela!',
      bannerBadge: 'Série infantil de animação 3D',
      brandTitle: 'FREDDIE & LOLLA',
      brandSubtitle: 'Aventuras na Baía Quente',
      ctaLabel: 'Assistir no YouTube',
      ctaUrl: 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg',
      items: [
        { label: 'Início', href: '#inicio', icon: 'compass' },
        { label: 'Sobre a série', href: '#sobre', icon: 'sparkles' },
        { label: 'Personagens', href: '#personagens', icon: 'users' },
        { label: 'Episódios', href: '#episodios', icon: 'tv' },
        { label: 'Trilha sonora', href: '#musicas', icon: 'music' },
        { label: 'Siga a série', href: '#redes', icon: 'heart' },
        { label: 'Mercado', href: '#mercado', icon: 'briefcase' },
      ],
    })

    // 2. hero
    backfillCollection(app, 'hero', {
      badge: 'Série infantil de animação 3D',
      titleMain: 'FREDDIE & LOLLA',
      titleSub: 'Aventuras na Baía Quente',
      tagline: 'Na ponta do mundo, a esperança nunca congela!',
      description:
        'O caos fofo de dois irmãos pinguins cuidando de três bebês trigêmeos na Antártica.',
      meta: 'Episódios de cerca de 6 minutos · Para crianças de 4 a 7 anos',
      youtubeChannelUrl: 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg',
      primaryCtaLabel: 'Assistir no YouTube',
      primaryCtaUrl: 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg',
      secondaryCtaLabel: 'Ouvir as músicas',
      secondaryCtaHref: '#musicas',
    })

    // 3. about
    backfillCollection(app, 'about', {
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
      features: [
        {
          title: 'O Humor das Nadadeiras',
          description:
            'O caos físico e fofo de crianças tentando ser adultas, com tropeços, birras e muitas gargalhadas.',
        },
        {
          title: 'O Mistério Afetuoso',
          description:
            'A guardiã excêntrica da Velha da Caneca e seus aliados gigantes, sempre por perto para proteger.',
        },
        {
          title: 'Lições estilo Bluey',
          description:
            'Empatia, cooperação e ciência nascendo da vivência, sem sermão, do jeito que crianças aprendem de verdade.',
        },
      ],
    })

    // 4. soundtrack
    backfillCollection(app, 'soundtrack', {
      sectionEyebrow: 'Trilha sonora',
      sectionTitle: 'A Trilha da Baía Quente',
      sectionSubtitle:
        'Um single e um álbum com dez músicas originais, disponíveis nas principais plataformas.',
      quote: '“Na Baía Quente, na ponta do mundo, a neve cai, mas a esperança não congela!”',
      quoteAuthor: 'Letra da Abertura Oficial',
      description:
        'Destaques do álbum: a Abertura Oficial da série e a divertidíssima “A Velha da Caneca”, a piada cantada dos irmãos que você vai querer ouvir de novo e de novo.',
      platforms: ['Spotify', 'Deezer', 'YouTube Music', 'e as principais streamings'],
      cards: [
        {
          title: 'Abertura Oficial',
          subtitle: 'Single · tema de entrada da série',
          type: 'Single',
          icon: 'music',
        },
        {
          title: 'A Velha da Caneca',
          subtitle: 'Piada cantada dos irmãos',
          type: 'Faixa Destaque',
          icon: 'laugh',
        },
        {
          title: 'Álbum completo',
          subtitle: '10 músicas originais',
          type: 'Álbum Completo',
          icon: 'disc',
        },
      ],
      cardFooterNote: 'Disponível nos streamings',
    })

    // 5. social
    backfillCollection(app, 'social', {
      sectionEyebrow: 'Siga a série',
      sectionTitle: 'Acompanhe a Baía Quente',
      sectionSubtitle: 'Novidades, bastidores e clipes nas redes oficiais da série.',
      cardCtaLabel: 'Acessar perfil',
    })

    // 6. market
    backfillCollection(app, 'market', {
      sectionEyebrow: 'Para o mercado audiovisual',
      sectionTitle: 'Para produtoras, distribuidoras e plataformas de streaming',
      ipTitle: 'Propriedade Intelectual 100% Original e Registrada',
      mainText:
        'Freddie e Lolla: Aventuras na Baía Quente é uma propriedade intelectual 100% original e registrada: bíblia de animação, guia de personagens, guia de cenários, linha do tempo da temporada e roteiros masters arquivados no Escritório de Direitos Autorais da Fundação Biblioteca Nacional (EDA/FBN), conforme a Lei nº 9.610/1998. A trilha sonora original — single e álbum com 10 faixas — está registrada na Escola de Música da UFRJ. Episódios e clipes já no ar no YouTube e redes sociais, com álbum completo nos streamings.',
      packageTitle: 'Pacote disponível para avaliação',
      packageNote: 'Material enviado sob pedido, com termos de confidencialidade.',
      packageItems: [
        'Bíblia da série completa',
        'Roteiros masters dos episódios',
        'Álbum com 10 músicas originais',
        'Episódio piloto e clipes publicados',
      ],
      referencesTitle: 'Referências de estilo',
      referencesSubtitle: 'Afeto, humor e universos visuais que inspiram a Baía Quente.',
      referenceTags: ['Bluey', 'Up', 'Wall-E', 'Toy Story', 'Procurando Nemo'],
      referencesNote:
        'Narrativa focada em co-viewing familiar, lições orgânicas de cooperação, empatia e ciência natural para crianças em idade pré-escolar e fundamental inicial.',
      ctaTitle: 'Interessado em levar a Baía Quente para sua plataforma?',
      ctaText:
        'Solicite a bíblia completa de produção, roteiros e materiais musicais diretamente com a equipe criativa.',
      ctaLabel: 'Solicitar a bíblia da série',
      ctaEmail: 'lacerdarogerio1@gmail.com',
      ctaUrl: 'mailto:lacerdarogerio1@gmail.com',
    })

    // 7. site_footer
    backfillCollection(app, 'site_footer', {
      brandTitle: 'FREDDIE & LOLLA',
      brandSubtitle: 'Aventuras na Baía Quente',
      description:
        'O caos fofo de dois irmãos pinguins cuidando de três bebês trigêmeos na Antártica. Série infantil de animação 3D cheia de música, ciência e afeto familiar.',
      tagline: 'Na ponta do mundo, a esperança nunca congela!',
      navigationTitle: 'Navegação',
      socialTitle: 'Redes Oficiais',
      marketTitle: 'Mercado Audiovisual',
      marketText:
        'Propriedade intelectual 100% original e registrada (EDA/FBN e Escola de Música da UFRJ).',
      ctaLabel: 'Solicitar a bíblia da série',
      ctaUrl: 'mailto:lacerdarogerio1@gmail.com',
      contactNote: 'Contato: lacerdarogerio1@gmail.com',
      copyright: '© 2025 Freddie e Lolla — Aventuras na Baía Quente. Todos os direitos reservados.',
      madeWithBefore: 'Feito com',
      madeWithHighlight: '💛',
      madeWithAfter: 'na Baía Quente, Península Antártica.',
    })
  },
  (app) => {
    // Migração de dados de backfill; nenhuma reversão necessária
  },
)
