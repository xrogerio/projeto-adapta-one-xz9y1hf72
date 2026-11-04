// Adiciona a coluna hero.youtubeChannelUrl (campo "URL do canal no YouTube"
// do formulário Início) e preenche com a URL exibida hoje no site quando o
// campo estiver vazio. Idempotente: em banco vazio apenas cria a coluna.
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('hero')
    let schemaChanged = false
    if (!collection.fields.find((f) => f.name === 'youtubeChannelUrl')) {
      collection.fields.add(new Field({ name: 'youtubeChannelUrl', type: 'text' }))
      schemaChanged = true
    }
    if (schemaChanged) app.save(collection)

    // Backfill: apenas registros com o campo vazio (nunca duplica).
    const URL = 'https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg'
    const records = app.findRecordsByFilter('hero', 'youtubeChannelUrl = ""')
    for (const rec of records) {
      rec.set('youtubeChannelUrl', URL)
      app.save(rec)
    }
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('hero')
    if (collection.fields.find((f) => f.name === 'youtubeChannelUrl')) {
      collection.fields.removeByName('youtubeChannelUrl')
      app.save(collection)
    }
  },
)
