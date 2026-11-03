// Cria as coleções de registros repetíveis do site (personagens, episódios,
// vídeos em destaque e links de redes sociais). Leitura pública; gravação
// somente autenticado.

migrate(
  (app) => {
    const authRule = "@request.auth.id != ''"
    const IMAGE_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']

    function createRecords(name, fields, indexes) {
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
            { name: 'slug', type: 'text' },
            { name: 'sort_order', type: 'number', onlyInt: true },
            { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
            { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
          ]),
          indexes: indexes,
        }),
      )
    }

    createRecords(
      'characters',
      [
        { name: 'name', type: 'text', required: true, presentable: true },
        { name: 'ageOrRole', type: 'text' },
        { name: 'description', type: 'text' },
        {
          name: 'avatarType',
          type: 'select',
          maxSelect: 1,
          values: [
            'penguin-boy',
            'penguin-girl',
            'penguin-baby-pink',
            'penguin-baby-green',
            'penguin-baby-blue',
            'grandma',
            'pilot-dad',
            'mom',
            'albatross',
            'whale',
          ],
        },
        { name: 'accentColor', type: 'text' },
        {
          name: 'charGroup',
          type: 'select',
          maxSelect: 1,
          values: ['grownups', 'babies', 'guardians'],
        },
        {
          name: 'image',
          type: 'file',
          maxSelect: 1,
          maxSize: 10485760,
          mimeTypes: IMAGE_MIME,
        },
      ],
      ['CREATE INDEX idx_characters_order ON characters (sort_order)'],
    )

    createRecords(
      'episodes',
      [
        { name: 'number', type: 'text' },
        { name: 'title', type: 'text', required: true, presentable: true },
        { name: 'synopsis', type: 'text' },
        { name: 'badge', type: 'text' },
      ],
      ['CREATE INDEX idx_episodes_order ON episodes (sort_order)'],
    )

    createRecords(
      'site_videos',
      [
        { name: 'title', type: 'text', required: true, presentable: true },
        { name: 'description', type: 'text' },
        { name: 'url', type: 'text' },
        { name: 'thumbnailHint', type: 'text' },
        { name: 'tag', type: 'text' },
      ],
      ['CREATE INDEX idx_site_videos_order ON site_videos (sort_order)'],
    )

    createRecords(
      'social_links',
      [
        { name: 'platform', type: 'text', required: true, presentable: true },
        { name: 'handle', type: 'text' },
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
        { name: 'color', type: 'text' },
        { name: 'footerNote', type: 'text' },
      ],
      ['CREATE INDEX idx_social_links_order ON social_links (sort_order)'],
    )
  },
  (app) => {
    const names = ['social_links', 'site_videos', 'episodes', 'characters']
    for (const name of names) {
      try {
        app.delete(app.findCollectionByNameOrId(name))
      } catch (_) {}
    }
  },
)
