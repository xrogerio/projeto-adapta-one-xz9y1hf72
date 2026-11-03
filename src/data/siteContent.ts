export interface Character {
  id: string
  name: string
  ageOrRole: string
  description: string
  avatarType:
    | 'penguin-boy'
    | 'penguin-girl'
    | 'penguin-baby-pink'
    | 'penguin-baby-green'
    | 'penguin-baby-blue'
    | 'grandma'
    | 'pilot-dad'
    | 'mom'
    | 'albatross'
    | 'whale'
  accentColor: string
}

export interface Episode {
  number: string
  title: string
  synopsis: string
  badge: string
}

export interface VideoHighlight {
  id: string
  title: string
  description: string
  url: string
  thumbnailHint: string
  tag: string
}

export interface MusicHighlight {
  title: string
  subtitle: string
  type: string
  icon: 'music' | 'laugh' | 'disc'
}

export interface SocialLink {
  platform: string
  handle: string
  label: string
  url: string
  color: string
}

export const SITE_DATA = {
  hero: {
    badge: 'Série infantil de animação 3D',
    titleMain: 'FREDDIE & LOLLA',
    titleSub: 'Aventuras na Baía Quente',
    tagline: 'Na ponta do mundo, a esperança nunca congela!',
    description:
      'O caos fofo de dois irmãos pinguins cuidando de três bebês trigêmeos na Antártica.',
    meta: 'Episódios de cerca de 6 minutos · Para crianças de 4 a 7 anos',
    youtubeChannelUrl: 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg',
    primaryCta: {
      label: 'Assistir no YouTube',
      url: 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg',
    },
    secondaryCta: { label: 'Ouvir as músicas', href: '#musicas' },
  },

  about: {
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
        icon: 'smile',
      },
      {
        title: 'O Mistério Afetuoso',
        description:
          'A guardiã excêntrica da Velha da Caneca e seus aliados gigantes, sempre por perto para proteger.',
        icon: 'heart-handshake',
      },
      {
        title: 'Lições estilo Bluey',
        description:
          'Empatia, cooperação e ciência nascendo da vivência, sem sermão, do jeito que crianças aprendem de verdade.',
        icon: 'sparkles',
      },
    ],
  },

  characters: [
    {
      id: 'freddie',
      name: 'Freddie',
      ageOrRole: '6 anos',
      description:
        'O pequeno protetor: sério, assume o papel de capitão da casa e sonha voar como o pai piloto.',
      avatarType: 'penguin-boy',
      accentColor: '#2563eb', // blue
    },
    {
      id: 'lolla',
      name: 'Lolla',
      ageOrRole: '5 anos',
      description:
        'A mente perspicaz: intuitiva, ágil, de maria-chiquinhas, e a primeira a desvendar os mistérios.',
      avatarType: 'penguin-girl',
      accentColor: '#f97316', // orange
    },
    {
      id: 'lilly',
      name: 'Lilly',
      ageOrRole: '1 ano',
      description: 'A vaidosa meiga: lacinho rosa e adoração pelo próprio reflexo no gelo.',
      avatarType: 'penguin-baby-pink',
      accentColor: '#ec4899', // pink
    },
    {
      id: 'pimpi',
      name: 'Pimpi',
      ageOrRole: '1 ano',
      description:
        'A aventureira destemida: sapeca, canta enquanto brinca e nunca solta sua boneca Pimpizete.',
      avatarType: 'penguin-baby-green',
      accentColor: '#10b981', // green
    },
    {
      id: 'popo',
      name: 'Popó',
      ageOrRole: '1 ano',
      description:
        'O sapeca jogador: dono do berreiro mais estrondoso da Antártica e com veia de engenheiro.',
      avatarType: 'penguin-baby-blue',
      accentColor: '#06b6d4', // cyan
    },
    {
      id: 'aurora',
      name: 'Vó Aurora, a Velha da Caneca',
      ageOrRole: 'Guardiã oculta',
      description:
        'A vizinha barulhenta do andar de cima que, aos poucos, revela seus atos heroicos.',
      avatarType: 'grandma',
      accentColor: '#8b5cf6', // purple
    },
    {
      id: 'atlas',
      name: 'Comandante Atlas',
      ageOrRole: 'Papai piloto',
      description: 'Explorador e apaixonado por estrelas, sempre pronto para a próxima missão.',
      avatarType: 'pilot-dad',
      accentColor: '#0ea5e9', // sky blue
    },
    {
      id: 'amelia',
      name: 'Mamãe Amélia',
      ageOrRole: 'Mamãe',
      description:
        'Navegadora e engenheira do coração da família, que sabe resolver tudo com carinho.',
      avatarType: 'mom',
      accentColor: '#f43f5e', // rose
    },
    {
      id: 'hugo',
      name: 'Hugo',
      ageOrRole: 'Albatroz',
      description: 'Três metros de envergadura, resgata bebês no ar e entrega peixes na praia.',
      avatarType: 'albatross',
      accentColor: '#eab308', // amber
    },
    {
      id: 'bel',
      name: 'Bel, a Baleia-Jubarte',
      ageOrRole: 'Guardiã aquática',
      description: 'Guardiã das águas da baía, sempre atenta a quem nada por perto.',
      avatarType: 'whale',
      accentColor: '#0284c7', // deep blue
    },
  ] as Character[],

  episodes: {
    sectionEyebrow: 'Episódios · 1ª temporada',
    sectionTitle: 'O arco da primeira temporada',
    sectionSubtitle:
      'Dez episódios cheios de descobertas, aulas de ciência e reviravoltas na Baía Quente.',
    meta: ['10 episódios', '~6 minutos cada', 'Disponível no YouTube'],
    videosHeading: 'Vídeos em Destaque',
    videosLinkLabel: 'Ver todos os vídeos no canal oficial',
    guideHeading: 'Guia de Episódios (Temporada 1)',
    list: [
      {
        number: '01',
        title: 'A Ficha Caiu',
        synopsis: 'Os pais viajam e as crianças descobrem que estão sozinhas.',
        badge: 'Ep. 1',
      },
      {
        number: '02',
        title: 'A Velha da Caneca',
        synopsis: 'Barulhos no segundo andar despertam a curiosidade da Lolla.',
        badge: 'Ep. 2',
      },
      {
        number: '03',
        title: 'O Resgate no Farol',
        synopsis: 'Uma missão de resgate pelo céu com a ajuda do Albatroz Hugo.',
        badge: 'Ep. 3',
      },
      {
        number: '04',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 1',
        synopsis: 'Aprendendo sobre gelo, correntes e vida marinha.',
        badge: 'Ep. 4',
      },
      {
        number: '05',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 2',
        synopsis: 'Experimentos divertidos na beira da baía.',
        badge: 'Ep. 5',
      },
      {
        number: '06',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 3',
        synopsis: 'Como a neve se forma e por que ela é tão bonita.',
        badge: 'Ep. 6',
      },
      {
        number: '07',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 4',
        synopsis: 'Plantas, luz e o sol que nunca se põe em certas épocas.',
        badge: 'Ep. 7',
      },
      {
        number: '08',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 5',
        synopsis: 'Observando estrelas com o Comandante Atlas.',
        badge: 'Ep. 8',
      },
      {
        number: '09',
        title: 'Aulas de Ciência e Exploração com o Professor Kiko · parte 6',
        synopsis: 'Uma grande expedição para explorar a península.',
        badge: 'Ep. 9',
      },
      {
        number: '10',
        title: 'O Retorno de Atlas e Amélia',
        synopsis: 'Os pais voltam e a Baía Quente nunca mais será a mesma.',
        badge: 'Ep. 10',
      },
    ] as Episode[],

    videos: [
      {
        id: 'ep1',
        title: 'Episódio 1 — A Ficha Caiu',
        description: 'O primeiro encontro com Freddie, Lolla e os trigêmeos.',
        url: 'https://www.youtube.com/watch?v=GHYz7uSt-xM',
        thumbnailHint: 'Episódio Piloto',
        tag: 'Episódio Completo',
      },
      {
        id: 'clipe',
        title: 'Clipe Oficial da Abertura',
        description: 'A música de entrada da Baía Quente, com toda a família no ritmo.',
        url: 'https://www.youtube.com/watch?v=QdI8DRPjTfg',
        thumbnailHint: 'Clipe Musical',
        tag: 'Música Oficial',
      },
    ] as VideoHighlight[],
  },

  soundtrack: {
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
        icon: 'music' as const,
      },
      {
        title: 'A Velha da Caneca',
        subtitle: 'Piada cantada dos irmãos',
        type: 'Faixa Destaque',
        icon: 'laugh' as const,
      },
      {
        title: 'Álbum completo',
        subtitle: '10 músicas originais',
        type: 'Álbum Completo',
        icon: 'disc' as const,
      },
    ],
    cardFooterNote: 'Disponível nos streamings',
  },

  social: {
    sectionEyebrow: 'Siga a série',
    sectionTitle: 'Acompanhe a Baía Quente',
    sectionSubtitle: 'Novidades, bastidores e clipes nas redes oficiais da série.',
    cardCtaLabel: 'Acessar perfil',
    links: [
      {
        platform: 'Instagram',
        handle: '@freddielolla',
        label: 'Bastidores e fotos',
        url: 'https://www.instagram.com/freddielolla/',
        color: '#E1306C',
      },
      {
        platform: 'Facebook',
        handle: 'Freddie e Lolla',
        label: 'Comunidade da família',
        url: 'https://www.facebook.com/freddieelolla',
        color: '#1877F2',
      },
      {
        platform: 'YouTube',
        handle: 'Canal oficial',
        label: 'Episódios e clipes',
        url: 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg',
        color: '#FF0000',
      },
    ] as SocialLink[],
  },

  market: {
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
  },
}
