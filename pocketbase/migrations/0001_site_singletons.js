// Cria as coleções "singleton" de conteúdo do site (um registro por seção, key = 'main').
// Leitura pública; gravação somente autenticado.

migrate(
  (app) => {
    const authRule = "@request.auth.id != ''"
    const IMAGE_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']

    function createSingleton(name, fields) {
      const indexSql = 'CREATE UNIQUE INDEX idx_' + name + '_key ON ' + name + ' (key)'
      app.save(
        new Collection({
          name: name,
          type: 'base',
          listRule: '',
          viewRule: '',
          createRule: authRule,
          updateRule: authRule,
          deleteRule: authRule,
          fields: fields.concat([
            { name: 'key', type: 'text', required: true, presentable: true },
            { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
            { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
          ]),
          indexes: [indexSql],
        }),
      )
    }

    // ---- Menu / cabeçalho do site -------------------------------------------
    createSingleton('site_menu', [
      { name: 'bannerTagline', type: 'text' },
      { name: 'bannerBadge', type: 'text' },
      { name: 'brandTitle', type: 'text' },
      { name: 'brandSubtitle', type: 'text' },
      {
        name: 'logo',
        type: 'file',
        maxSelect: 1,
        maxSize: 5242880,
        mimeTypes: IMAGE_MIME,
      },
      { name: 'ctaLabel', type: 'text' },
      { name: 'ctaUrl', type: 'text' },
      { name: 'items', type: 'json', maxSize: 500000 },
    ])

    // ---- Rodapé --------------------------------------------------------------
    createSingleton('site_footer', [
      { name: 'brandTitle', type: 'text' },
      { name: 'brandSubtitle', type: 'text' },
      {
        name: 'logo',
        type: 'file',
        maxSelect: 1,
        maxSize: 5242880,
        mimeTypes: IMAGE_MIME,
      },
      { name: 'description', type: 'text' },
      { name: 'tagline', type: 'text' },
      { name: 'navigationTitle', type: 'text' },
      { name: 'socialTitle', type: 'text' },
      { name: 'marketTitle', type: 'text' },
      { name: 'marketText', type: 'text' },
      { name: 'ctaLabel', type: 'text' },
      { name: 'ctaUrl', type: 'text' },
      { name: 'contactNote', type: 'text' },
      { name: 'copyright', type: 'text' },
      { name: 'madeWithBefore', type: 'text' },
      { name: 'madeWithHighlight', type: 'text' },
      { name: 'madeWithAfter', type: 'text' },
    ])

    // ---- Início (hero) ---------------------------------------------------------
    createSingleton('hero', [
      { name: 'badge', type: 'text' },
      { name: 'titleMain', type: 'text' },
      { name: 'titleSub', type: 'text' },
      { name: 'tagline', type: 'text' },
      { name: 'description', type: 'text' },
      { name: 'meta', type: 'text' },
      { name: 'primaryCtaLabel', type: 'text' },
      { name: 'primaryCtaUrl', type: 'text' },
      { name: 'secondaryCtaLabel', type: 'text' },
      { name: 'secondaryCtaHref', type: 'text' },
      {
        name: 'image',
        type: 'file',
        maxSelect: 1,
        maxSize: 10485760,
        mimeTypes: IMAGE_MIME,
      },
    ])

    // ---- Sobre a série ---------------------------------------------------------
    createSingleton('about', [
      { name: 'sectionEyebrow', type: 'text' },
      { name: 'sectionTitle', type: 'text' },
      { name: 'sectionSubtitle', type: 'text' },
      { name: 'quote', type: 'text' },
      { name: 'fullText', type: 'text' },
      { name: 'chips', type: 'json', maxSize: 200000 },
      { name: 'features', type: 'json', maxSize: 500000 },
    ])

    // ---- Cabeçalho da seção Personagens + rótulos das abas ----------------------
    createSingleton('site_characters', [
      { name: 'sectionEyebrow', type: 'text' },
      { name: 'sectionTitle', type: 'text' },
      { name: 'sectionSubtitle', type: 'text' },
      { name: 'tabAllLabel', type: 'text' },
      { name: 'tabGrownupsLabel', type: 'text' },
      { name: 'tabBabiesLabel', type: 'text' },
      { name: 'tabGuardiansLabel', type: 'text' },
    ])

    // ---- Cabeçalho da seção Episódios + títulos de vídeos/guia ------------------
    createSingleton('site_episodes', [
      { name: 'sectionEyebrow', type: 'text' },
      { name: 'sectionTitle', type: 'text' },
      { name: 'sectionSubtitle', type: 'text' },
      { name: 'meta', type: 'json', maxSize: 200000 },
      { name: 'videosHeading', type: 'text' },
      { name: 'videosLinkLabel', type: 'text' },
      { name: 'guideHeading', type: 'text' },
    ])

    // ---- Trilha sonora ----------------------------------------------------------
    createSingleton('soundtrack', [
      { name: 'sectionEyebrow', type: 'text' },
      { name: 'sectionTitle', type: 'text' },
      { name: 'sectionSubtitle', type: 'text' },
      { name: 'quote', type: 'text' },
      { name: 'quoteAuthor', type: 'text' },
      { name: 'description', type: 'text' },
      { name: 'platforms', type: 'json', maxSize: 200000 },
      { name: 'cards', type: 'json', maxSize: 500000 },
      { name: 'cardFooterNote', type: 'text' },
    ])

    // ---- Siga a série (cabeçalho; links ficam em social_links) ------------------
    createSingleton('social', [
      { name: 'sectionEyebrow', type: 'text' },
      { name: 'sectionTitle', type: 'text' },
      { name: 'sectionSubtitle', type: 'text' },
      { name: 'cardCtaLabel', type: 'text' },
    ])

    // ---- Mercado audiovisual ------------------------------------------------------
    createSingleton('market', [
      { name: 'sectionEyebrow', type: 'text' },
      { name: 'sectionTitle', type: 'text' },
      { name: 'ipTitle', type: 'text' },
      { name: 'mainText', type: 'text' },
      { name: 'packageTitle', type: 'text' },
      { name: 'packageNote', type: 'text' },
      { name: 'packageItems', type: 'json', maxSize: 200000 },
      { name: 'referencesTitle', type: 'text' },
      { name: 'referencesSubtitle', type: 'text' },
      { name: 'referenceTags', type: 'json', maxSize: 200000 },
      { name: 'referencesNote', type: 'text' },
      { name: 'ctaTitle', type: 'text' },
      { name: 'ctaText', type: 'text' },
      { name: 'ctaLabel', type: 'text' },
      { name: 'ctaEmail', type: 'text' },
      { name: 'ctaUrl', type: 'text' },
    ])
  },
  (app) => {
    const names = [
      'market',
      'social',
      'soundtrack',
      'site_episodes',
      'site_characters',
      'about',
      'hero',
      'site_footer',
      'site_menu',
    ]
    for (const name of names) {
      try {
        app.delete(app.findCollectionByNameOrId(name))
      } catch (_) {}
    }
  },
)
