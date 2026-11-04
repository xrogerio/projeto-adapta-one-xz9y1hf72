// Backfill dos campos JSON vazios em site_menu (items) e about (chips)
// e quaisquer campos restantes vazios.

function isJsonEmpty(rec, key) {
  try {
    const raw = rec.getString(key)
    if (!raw || raw.trim() === '' || raw === '[]' || raw === 'null' || raw === '{}') {
      return true
    }
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length === 0) return true
    return false
  } catch (_) {
    return true
  }
}

migrate(
  (app) => {
    // 1. site_menu: items
    try {
      const menuRecords = app.findRecordsByFilter('site_menu', '1=1', '', 10, 0)
      for (const rec of menuRecords) {
        if (isJsonEmpty(rec, 'items')) {
          rec.set('items', [
            { label: 'Início', href: '#inicio', icon: 'compass' },
            { label: 'Sobre a série', href: '#sobre', icon: 'sparkles' },
            { label: 'Personagens', href: '#personagens', icon: 'users' },
            { label: 'Episódios', href: '#episodios', icon: 'tv' },
            { label: 'Trilha sonora', href: '#musicas', icon: 'music' },
            { label: 'Siga a série', href: '#redes', icon: 'heart' },
            { label: 'Mercado', href: '#mercado', icon: 'briefcase' },
          ])
          app.save(rec)
        }
      }
    } catch (_) {}

    // 2. about: chips
    try {
      const aboutRecords = app.findRecordsByFilter('about', '1=1', '', 10, 0)
      for (const rec of aboutRecords) {
        if (isJsonEmpty(rec, 'chips')) {
          rec.set('chips', [
            'Animação 3D',
            'Comédia familiar e musical',
            'Episódios de ~6 minutos',
            '4 a 7 anos · co-viewing familiar',
          ])
          app.save(rec)
        }
      }
    } catch (_) {}
  },
  (app) => {},
)
