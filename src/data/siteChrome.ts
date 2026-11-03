// Conteúdo de "moldura" do site (menu, rodapé e cabeçalho da seção de
// personagens) — usado como fallback estático pelo services/siteData.ts.
// Os textos abaixo são exatamente os que o site renderiza hoje.

export const SITE_CHROME = {
  menu: {
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
  },
  footer: {
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
  },
  charactersSection: {
    sectionEyebrow: 'Personagens',
    sectionTitle: 'Quem vive na Baía Quente',
    sectionSubtitle:
      'Pinguins, trigêmeos, uma vizinha misteriosa e amigos gigantes do mar e do céu.',
    tabs: {
      all: 'Todos os 10',
      grownups: 'Freddie, Lolla e Pais',
      babies: 'Os Trigêmeos',
      guardians: 'Guardiões e Vizinha',
    },
  },
}
