// Migração 0008: Restauração idempotente dos campos vazios de todas as coleções do site.
// Só repovoa campos que estiverem vazios/nulos/array vazio.
// Nunca sobrescreve dados já preenchidos.
// Para coleções de lista (characters, episodes, site_videos, social_links), só insere se o registro
// não existir (pelo slug ou number) ou se a coleção estiver vazia; se o registro já existir, apenas
// preenche os campos que estiverem vazios.

function isEmpty(val) {
  if (val === null || val === undefined) return true
  if (typeof val === 'string') return val.trim() === ''
  if (Array.isArray(val)) return val.length === 0
  return false
}

function backfillRecordFields(app, rec, defaults) {
  let changed = false
  for (const key of Object.keys(defaults)) {
    let currentVal = null
    try {
      const raw = rec.get(key)
      if (typeof raw === 'string') {
        if (raw === '[]' || raw === '""' || raw === 'null' || raw === '{}') {
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

function backfillCollectionSingletons(app, collectionName, defaults) {
  let records = []
  try {
    records = app.findRecordsByFilter(collectionName, '1=1', '', 50, 0)
  } catch (_) {
    return
  }

  if (records.length === 0) {
    try {
      const col = app.findCollectionByNameOrId(collectionName)
      const newRec = new Record(col)
      newRec.set('key', 'main')
      for (const k of Object.keys(defaults)) {
        newRec.set(k, defaults[k])
      }
      app.save(newRec)
    } catch (_) {}
    return
  }

  for (const rec of records) {
    backfillRecordFields(app, rec, defaults)
  }
}

function backfillListItem(app, collectionName, matchField, matchValue, defaults) {
  let record = null
  try {
    record = app.findFirstRecordByFilter(collectionName, `${matchField} = '${matchValue}'`)
  } catch (_) {}

  if (!record) {
    try {
      const col = app.findCollectionByNameOrId(collectionName)
      const newRec = new Record(col)
      newRec.set(matchField, matchValue)
      for (const k of Object.keys(defaults)) {
        newRec.set(k, defaults[k])
      }
      app.save(newRec)
    } catch (_) {}
  } else {
    backfillRecordFields(app, record, defaults)
  }
}

migrate(
  (app) => {
    // 1. site_menu
    backfillCollectionSingletons(app, 'site_menu', {
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
    backfillCollectionSingletons(app, 'hero', {
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
    backfillCollectionSingletons(app, 'about', {
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

    // 4. site_characters (singleton de cabeçalho da seção)
    backfillCollectionSingletons(app, 'site_characters', {
      sectionEyebrow: 'Personagens',
      sectionTitle: 'Quem vive na Baía Quente',
      sectionSubtitle:
        'Pinguins, trigêmeos, uma vizinha misteriosa e amigos gigantes do mar e do céu.',
      tabAllLabel: 'Todos os 10',
      tabGrownupsLabel: 'Freddie, Lolla e Pais',
      tabBabiesLabel: 'Os Trigêmeos',
      tabGuardiansLabel: 'Guardiões e Vizinha',
    })

    // 5. site_episodes (singleton de cabeçalho da seção)
    backfillCollectionSingletons(app, 'site_episodes', {
      sectionEyebrow: 'Episódios · 1ª temporada',
      sectionTitle: 'O arco da primeira temporada',
      sectionSubtitle:
        'Dez episódios cheios de descobertas, aulas de ciência e reviravoltas na Baía Quente.',
      meta: ['10 episódios', '~6 minutos cada', 'Disponível no YouTube'],
      videosHeading: 'Vídeos em Destaque',
      videosLinkLabel: 'Ver todos os vídeos no canal oficial',
      guideHeading: 'Guia de Episódios (Temporada 1)',
    })

    // 6. soundtrack
    backfillCollectionSingletons(app, 'soundtrack', {
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

    // 7. social
    backfillCollectionSingletons(app, 'social', {
      sectionEyebrow: 'Siga a série',
      sectionTitle: 'Acompanhe a Baía Quente',
      sectionSubtitle: 'Novidades, bastidores e clipes nas redes oficiais da série.',
      cardCtaLabel: 'Acessar perfil',
    })

    // 8. market
    backfillCollectionSingletons(app, 'market', {
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

    // 9. site_footer
    backfillCollectionSingletons(app, 'site_footer', {
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

    // 10. characters
    const characters = [
      {
        slug: 'freddie',
        name: 'Freddie',
        ageOrRole: '6 anos',
        description:
          'O pequeno protetor: sério, assume o papel de capitão da casa e sonha voar como o pai piloto.',
        avatarType: 'penguin-boy',
        accentColor: '#2563eb',
        charGroup: 'grownups',
        sort_order: 0,
      },
      {
        slug: 'lolla',
        name: 'Lolla',
        ageOrRole: '5 anos',
        description:
          'A mente perspicaz: intuitiva, ágil, de maria-chiquinhas, e a primeira a desvendar os mistérios.',
        avatarType: 'penguin-girl',
        accentColor: '#f97316',
        charGroup: 'grownups',
        sort_order: 1,
      },
      {
        slug: 'lilly',
        name: 'Lilly',
        ageOrRole: '1 ano',
        description: 'A vaidosa meiga: lacinho rosa e adoração pelo próprio reflexo no gelo.',
        avatarType: 'penguin-baby-pink',
        accentColor: '#ec4899',
        charGroup: 'babies',
        sort_order: 2,
      },
      {
        slug: 'pimpi',
        name: 'Pimpi',
        ageOrRole: '1 ano',
        description:
          'A aventureira destemida: sapeca, canta enquanto brinca e nunca solta sua boneca Pimpizete.',
        avatarType: 'penguin-baby-green',
        accentColor: '#10b981',
        charGroup: 'babies',
        sort_order: 3,
      },
      {
        slug: 'popo',
        name: 'Popó',
        ageOrRole: '1 ano',
        description:
          'O sapeca jogador: dono do berreiro mais estrondoso da Antártica e com veia de engenheiro.',
        avatarType: 'penguin-baby-blue',
        accentColor: '#06b6d4',
        charGroup: 'babies',
        sort_order: 4,
      },
      {
        slug: 'aurora',
        name: 'Vó Aurora, a Velha da Caneca',
        ageOrRole: 'Guardiã oculta',
        description:
          'A vizinha barulhenta do andar de cima que, aos poucos, revela seus atos heroicos.',
        avatarType: 'grandma',
        accentColor: '#8b5cf6',
        charGroup: 'guardians',
        sort_order: 5,
      },
      {
        slug: 'atlas',
        name: 'Comandante Atlas',
        ageOrRole: 'Papai piloto',
        description: 'Explorador e apaixonado por estrelas, sempre pronto para a próxima missão.',
        avatarType: 'pilot-dad',
        accentColor: '#0ea5e9',
        charGroup: 'grownups',
        sort_order: 6,
      },
      {
        slug: 'amelia',
        name: 'Mamãe Amélia',
        ageOrRole: 'Mamãe',
        description:
          'Navegadora e engenheira do coração da família, que sabe resolver tudo com carinho.',
        avatarType: 'mom',
        accentColor: '#f43f5e',
        charGroup: 'grownups',
        sort_order: 7,
      },
      {
        slug: 'hugo',
        name: 'Hugo',
        ageOrRole: 'Albatroz',
        description: 'Três metros de envergadura, resgata bebês no ar e entrega peixes na praia.',
        avatarType: 'albatross',
        accentColor: '#eab308',
        charGroup: 'guardians',
        sort_order: 8,
      },
      {
        slug: 'bel',
        name: 'Bel, a Baleia-Jubarte',
        ageOrRole: 'Guardiã aquática',
        description: 'Guardiã das águas da baía, sempre atenta a quem nada por perto.',
        avatarType: 'whale',
        accentColor: '#0284c7',
        charGroup: 'guardians',
        sort_order: 9,
      },
    ]

    for (const c of characters) {
      backfillListItem(app, 'characters', 'slug', c.slug, c)
    }

    // 11. episodes
    const episodes = [
      {
        number: '01',
        title: 'A Ficha Caiu',
        synopsis: 'Os pais viajam e as crianças descobrem que estão sozinhas.',
        badge: 'Ep. 1',
        sort_order: 0,
      },
      {
        number: '02',
        title: 'A Velha da Caneca',
        synopsis: 'Barulhos no segundo andar despertam a curiosidade da Lolla.',
        badge: 'Ep. 2',
        sort_order: 1,
      },
      {
        number: '03',
        title: 'O Resgate no Farol',
        synopsis: 'Uma missão de resgate pelo céu com a ajuda do Albatroz Hugo.',
        badge: 'Ep. 3',
        sort_order: 2,
      },
      {
        number: '04',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 1',
        synopsis: 'Aprendendo sobre gelo, correntes e vida marinha.',
        badge: 'Ep. 4',
        sort_order: 3,
      },
      {
        number: '05',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 2',
        synopsis: 'Experimentos divertidos na beira da baía.',
        badge: 'Ep. 5',
        sort_order: 4,
      },
      {
        number: '06',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 3',
        synopsis: 'Como a neve se forma e por que ela é tão bonita.',
        badge: 'Ep. 6',
        sort_order: 5,
      },
      {
        number: '07',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 4',
        synopsis: 'Plantas, luz e o sol que nunca se põe em certas épocas.',
        badge: 'Ep. 7',
        sort_order: 6,
      },
      {
        number: '08',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 5',
        synopsis: 'Observando estrelas com o Comandante Atlas.',
        badge: 'Ep. 8',
        sort_order: 7,
      },
      {
        number: '09',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 6',
        synopsis: 'Uma grande expedição para explorar a península.',
        badge: 'Ep. 9',
        sort_order: 8,
      },
      {
        number: '10',
        title: 'O Retorno de Atlas e Amélia',
        synopsis: 'Os pais voltam e a Baía Quente nunca mais será a mesma.',
        badge: 'Ep. 10',
        sort_order: 9,
      },
    ]

    for (const e of episodes) {
      backfillListItem(app, 'episodes', 'number', e.number, e)
    }

    // 12. site_videos
    const videos = [
      {
        slug: 'ep1',
        title: 'Episódio 1 — A Ficha Caiu',
        description: 'O primeiro encontro com Freddie, Lolla e os trigêmeos.',
        url: 'https://www.youtube.com/watch?v=GHYz7uSt-xM',
        thumbnailHint: 'Episódio Piloto',
        tag: 'Episódio Completo',
        sort_order: 0,
      },
      {
        slug: 'clipe',
        title: 'Clipe Oficial da Abertura',
        description: 'A música de entrada da Baía Quente, com toda a família no ritmo.',
        url: 'https://www.youtube.com/watch?v=QdI8DRPjTfg',
        thumbnailHint: 'Clipe Musical',
        tag: 'Música Oficial',
        sort_order: 1,
      },
    ]

    for (const v of videos) {
      backfillListItem(app, 'site_videos', 'slug', v.slug, v)
    }

    // 13. social_links
    const socials = [
      {
        slug: 'instagram',
        platform: 'Instagram',
        handle: '@freddielolla',
        label: 'Bastidores e fotos',
        url: 'https://www.instagram.com/freddielolla/',
        color: '#E1306C',
        footerNote: '@freddielolla',
        sort_order: 0,
      },
      {
        slug: 'facebook',
        platform: 'Facebook',
        handle: 'Freddie e Lolla',
        label: 'Comunidade da família',
        url: 'https://www.facebook.com/freddieelolla',
        color: '#1877F2',
        footerNote: 'Freddie e Lolla',
        sort_order: 1,
      },
      {
        slug: 'youtube',
        platform: 'YouTube',
        handle: 'Canal oficial',
        label: 'Episódios e clipes',
        url: 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg',
        color: '#FF0000',
        footerNote: 'Canal oficial da série',
        sort_order: 2,
      },
    ]

    for (const s of socials) {
      backfillListItem(app, 'social_links', 'slug', s.slug, s)
    }
  },
  (app) => {
    // Migração de dados de restauração; nenhuma reversão necessária
  },
)
