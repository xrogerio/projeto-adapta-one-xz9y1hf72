// Camada de dados do site: busca o conteúdo nas coleções do PocketBase e
// devolve sempre uma estrutura pronta para render — com fallback para os
// dados estáticos de siteContent.ts / siteChrome.ts quando o backend falhar
// ou vier vazio.

import pb from '@/lib/pocketbase/client'
import { SITE_DATA } from '@/data/siteContent'
import { SITE_CHROME } from '@/data/siteChrome'

export interface CharacterRow {
  id: string
  name: string
  ageOrRole: string
  description: string
  avatarType: string
  accentColor: string
  charGroup: string
  image: string
}

export interface EpisodeRow {
  id: string
  number: string
  title: string
  synopsis: string
  badge: string
}

export interface VideoRow {
  id: string
  title: string
  description: string
  url: string
  thumbnailHint: string
  tag: string
}

export interface SocialLinkRow {
  id: string
  platform: string
  handle: string
  label: string
  url: string
  color: string
  footerNote: string
}

export interface SiteData {
  menu: {
    bannerTagline: string
    bannerBadge: string
    brandTitle: string
    brandSubtitle: string
    logo: string
    ctaLabel: string
    ctaUrl: string
    items: { label: string; href: string; icon: string }[]
  }
  footer: {
    brandTitle: string
    brandSubtitle: string
    logo: string
    description: string
    tagline: string
    navigationTitle: string
    socialTitle: string
    marketTitle: string
    marketText: string
    ctaLabel: string
    ctaUrl: string
    contactNote: string
    copyright: string
    madeWithBefore: string
    madeWithHighlight: string
    madeWithAfter: string
  }
  hero: {
    badge: string
    titleMain: string
    titleSub: string
    tagline: string
    description: string
    meta: string
    primaryCtaLabel: string
    primaryCtaUrl: string
    secondaryCtaLabel: string
    secondaryCtaHref: string
    image: string
  }
  about: {
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    quote: string
    fullText: string
    chips: string[]
    features: { title: string; description: string }[]
  }
  charactersSection: {
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    tabs: { all: string; grownups: string; babies: string; guardians: string }
  }
  characters: CharacterRow[]
  episodesSection: {
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    meta: string[]
    videosHeading: string
    videosLinkLabel: string
    guideHeading: string
  }
  episodes: EpisodeRow[]
  videos: VideoRow[]
  soundtrack: {
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    quote: string
    quoteAuthor: string
    description: string
    platforms: string[]
    cards: { title: string; subtitle: string; type: string; icon: string }[]
    cardFooterNote: string
  }
  social: {
    sectionEyebrow: string
    sectionTitle: string
    sectionSubtitle: string
    cardCtaLabel: string
  }
  socialLinks: SocialLinkRow[]
  market: {
    sectionEyebrow: string
    sectionTitle: string
    ipTitle: string
    mainText: string
    packageTitle: string
    packageNote: string
    packageItems: string[]
    referencesTitle: string
    referencesSubtitle: string
    referenceTags: string[]
    referencesNote: string
    ctaTitle: string
    ctaText: string
    ctaLabel: string
    ctaEmail: string
    ctaUrl: string
  }
}

/** Monta a URL pública de um arquivo PocketBase da coleção informada. */
export function filesUrl(collectionName: string, filename: string): string {
  if (!filename) return ''
  return pb.files.getURL(collectionName, filename)
}

function asString(value: unknown, fallback: string): string {
  if (value === null || value === undefined) return fallback
  const s = String(value)
  return s === '' ? fallback : s
}

function asStringArray(value: unknown, fallback: string[]): string[] {
  if (Array.isArray(value)) {
    const arr = value.map((v) => String(v)).filter((v) => v !== '')
    return arr.length ? arr : fallback
  }
  return fallback
}

function asObjectArray(value: unknown, fallback: unknown[]): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    const arr = value.filter((v) => v && typeof v === 'object') as Record<string, unknown>[]
    return arr.length ? arr : fallback
  }
  return fallback
}

/** SiteData completo montado a partir do conteúdo estático (fallback). */
function buildStatic(): SiteData {
  const d = SITE_DATA
  return {
    menu: {
      bannerTagline: SITE_CHROME.menu.bannerTagline,
      bannerBadge: SITE_CHROME.menu.bannerBadge,
      brandTitle: SITE_CHROME.menu.brandTitle,
      brandSubtitle: SITE_CHROME.menu.brandSubtitle,
      logo: '',
      ctaLabel: SITE_CHROME.menu.ctaLabel,
      ctaUrl: SITE_CHROME.menu.ctaUrl,
      items: SITE_CHROME.menu.items,
    },
    footer: {
      brandTitle: SITE_CHROME.footer.brandTitle,
      brandSubtitle: SITE_CHROME.footer.brandSubtitle,
      logo: '',
      description: SITE_CHROME.footer.description,
      tagline: SITE_CHROME.footer.tagline,
      navigationTitle: SITE_CHROME.footer.navigationTitle,
      socialTitle: SITE_CHROME.footer.socialTitle,
      marketTitle: SITE_CHROME.footer.marketTitle,
      marketText: SITE_CHROME.footer.marketText,
      ctaLabel: SITE_CHROME.footer.ctaLabel,
      ctaUrl: SITE_CHROME.footer.ctaUrl,
      contactNote: SITE_CHROME.footer.contactNote,
      copyright: SITE_CHROME.footer.copyright,
      madeWithBefore: SITE_CHROME.footer.madeWithBefore,
      madeWithHighlight: SITE_CHROME.footer.madeWithHighlight,
      madeWithAfter: SITE_CHROME.footer.madeWithAfter,
    },
    hero: {
      badge: d.hero.badge,
      titleMain: d.hero.titleMain,
      titleSub: d.hero.titleSub,
      tagline: d.hero.tagline,
      description: d.hero.description,
      meta: d.hero.meta,
      primaryCtaLabel: d.hero.primaryCta.label,
      primaryCtaUrl: d.hero.primaryCta.url,
      secondaryCtaLabel: d.hero.secondaryCta.label,
      secondaryCtaHref: d.hero.secondaryCta.href,
      image: '',
    },
    about: {
      sectionEyebrow: d.about.sectionEyebrow,
      sectionTitle: d.about.sectionTitle,
      sectionSubtitle: d.about.sectionSubtitle,
      quote: d.about.quote,
      fullText: d.about.fullText,
      chips: d.about.chips,
      features: d.about.features.map((f) => ({ title: f.title, description: f.description })),
    },
    charactersSection: {
      sectionEyebrow: SITE_CHROME.charactersSection.sectionEyebrow,
      sectionTitle: SITE_CHROME.charactersSection.sectionTitle,
      sectionSubtitle: SITE_CHROME.charactersSection.sectionSubtitle,
      tabs: SITE_CHROME.charactersSection.tabs,
    },
    characters: d.characters.map((c, i) => ({
      id: 'static-' + i,
      name: c.name,
      ageOrRole: c.ageOrRole,
      description: c.description,
      avatarType: c.avatarType,
      accentColor: c.accentColor,
      charGroup: c.charGroup,
      image: '',
    })),
    episodesSection: {
      sectionEyebrow: d.episodes.sectionEyebrow,
      sectionTitle: d.episodes.sectionTitle,
      sectionSubtitle: d.episodes.sectionSubtitle,
      meta: d.episodes.meta,
      videosHeading: d.episodes.videosHeading,
      videosLinkLabel: d.episodes.videosLinkLabel,
      guideHeading: d.episodes.guideHeading,
    },
    episodes: d.episodes.list.map((e, i) => ({
      id: 'static-' + i,
      number: e.number,
      title: e.title,
      synopsis: e.synopsis,
      badge: e.badge,
    })),
    videos: d.episodes.videos.map((v) => ({ ...v })),
    soundtrack: {
      sectionEyebrow: d.soundtrack.sectionEyebrow,
      sectionTitle: d.soundtrack.sectionTitle,
      sectionSubtitle: d.soundtrack.sectionSubtitle,
      quote: d.soundtrack.quote,
      quoteAuthor: d.soundtrack.quoteAuthor,
      description: d.soundtrack.description,
      platforms: d.soundtrack.platforms,
      cards: d.soundtrack.cards,
      cardFooterNote: d.soundtrack.cardFooterNote,
    },
    social: {
      sectionEyebrow: d.social.sectionEyebrow,
      sectionTitle: d.social.sectionTitle,
      sectionSubtitle: d.social.sectionSubtitle,
      cardCtaLabel: d.social.cardCtaLabel,
    },
    socialLinks: d.social.links.map((l, i) => ({
      id: 'static-' + i,
      platform: l.platform,
      handle: l.handle,
      label: l.label,
      url: l.url,
      color: l.color,
      footerNote: l.footerNote,
    })),
    market: {
      sectionEyebrow: d.market.sectionEyebrow,
      sectionTitle: d.market.sectionTitle,
      ipTitle: d.market.ipTitle,
      mainText: d.market.mainText,
      packageTitle: d.market.packageTitle,
      packageNote: d.market.packageNote,
      packageItems: d.market.packageItems,
      referencesTitle: d.market.referencesTitle,
      referencesSubtitle: d.market.referencesSubtitle,
      referenceTags: d.market.referenceTags,
      referencesNote: d.market.referencesNote,
      ctaTitle: d.market.ctaTitle,
      ctaText: d.market.ctaText,
      ctaLabel: d.market.ctaLabel,
      ctaEmail: d.market.ctaEmail,
      ctaUrl: d.market.ctaUrl,
    },
  }
}

/** Busca todo o conteúdo do site no PocketBase; em qualquer falha devolve o fallback estático. */
export async function loadSiteData(): Promise<SiteData> {
  const base = buildStatic()
  try {
    const results = await Promise.all([
      pb
        .collection('site_menu')
        .getFirstListItem('key="main"')
        .catch(() => null),
      pb
        .collection('site_footer')
        .getFirstListItem('key="main"')
        .catch(() => null),
      pb
        .collection('hero')
        .getFirstListItem('key="main"')
        .catch(() => null),
      pb
        .collection('about')
        .getFirstListItem('key="main"')
        .catch(() => null),
      pb
        .collection('site_characters')
        .getFirstListItem('key="main"')
        .catch(() => null),
      pb
        .collection('site_episodes')
        .getFirstListItem('key="main"')
        .catch(() => null),
      pb
        .collection('soundtrack')
        .getFirstListItem('key="main"')
        .catch(() => null),
      pb
        .collection('social')
        .getFirstListItem('key="main"')
        .catch(() => null),
      pb
        .collection('market')
        .getFirstListItem('key="main"')
        .catch(() => null),
      pb
        .collection('characters')
        .getFullList({ sort: 'sort_order' })
        .catch(() => []),
      pb
        .collection('episodes')
        .getFullList({ sort: 'sort_order' })
        .catch(() => []),
      pb
        .collection('site_videos')
        .getFullList({ sort: 'sort_order' })
        .catch(() => []),
      pb
        .collection('social_links')
        .getFullList({ sort: 'sort_order' })
        .catch(() => []),
    ])

    const [
      menuRaw,
      footerRaw,
      heroRaw,
      aboutRaw,
      charsSecRaw,
      epsSecRaw,
      soundRaw,
      socialRaw,
      marketRaw,
      charactersRaw,
      episodesRaw,
      videosRaw,
      linksRaw,
    ] = results as unknown[]

    const menuRec = (menuRaw ?? {}) as Record<string, unknown>
    const footerRec = (footerRaw ?? {}) as Record<string, unknown>
    const heroRec = (heroRaw ?? {}) as Record<string, unknown>
    const aboutRec = (aboutRaw ?? {}) as Record<string, unknown>
    const csRec = (charsSecRaw ?? {}) as Record<string, unknown>
    const esRec = (epsSecRaw ?? {}) as Record<string, unknown>
    const sdRec = (soundRaw ?? {}) as Record<string, unknown>
    const socRec = (socialRaw ?? {}) as Record<string, unknown>
    const mkRec = (marketRaw ?? {}) as Record<string, unknown>

    // ---- Menu ----------------------------------------------------------------
    const menuItems = asObjectArray(menuRec.items, base.menu.items).map((it) => ({
      label: asString(it.label, ''),
      href: asString(it.href, '#'),
      icon: asString(it.icon, 'sparkles'),
    }))
    base.menu = {
      bannerTagline: asString(menuRec.bannerTagline, base.menu.bannerTagline),
      bannerBadge: asString(menuRec.bannerBadge, base.menu.bannerBadge),
      brandTitle: asString(menuRec.brandTitle, base.menu.brandTitle),
      brandSubtitle: asString(menuRec.brandSubtitle, base.menu.brandSubtitle),
      logo: filesUrl('site_menu', asString(menuRec.logo, '')),
      ctaLabel: asString(menuRec.ctaLabel, base.menu.ctaLabel),
      ctaUrl: asString(menuRec.ctaUrl, base.menu.ctaUrl),
      items: menuItems.length ? menuItems : base.menu.items,
    }

    // ---- Rodapé ---------------------------------------------------------------
    base.footer = {
      brandTitle: asString(footerRec.brandTitle, base.footer.brandTitle),
      brandSubtitle: asString(footerRec.brandSubtitle, base.footer.brandSubtitle),
      logo: filesUrl('site_footer', asString(footerRec.logo, '')),
      description: asString(footerRec.description, base.footer.description),
      tagline: asString(footerRec.tagline, base.footer.tagline),
      navigationTitle: asString(footerRec.navigationTitle, base.footer.navigationTitle),
      socialTitle: asString(footerRec.socialTitle, base.footer.socialTitle),
      marketTitle: asString(footerRec.marketTitle, base.footer.marketTitle),
      marketText: asString(footerRec.marketText, base.footer.marketText),
      ctaLabel: asString(footerRec.ctaLabel, base.footer.ctaLabel),
      ctaUrl: asString(footerRec.ctaUrl, base.footer.ctaUrl),
      contactNote: asString(footerRec.contactNote, base.footer.contactNote),
      copyright: asString(footerRec.copyright, base.footer.copyright),
      madeWithBefore: asString(footerRec.madeWithBefore, base.footer.madeWithBefore),
      madeWithHighlight: asString(footerRec.madeWithHighlight, base.footer.madeWithHighlight),
      madeWithAfter: asString(footerRec.madeWithAfter, base.footer.madeWithAfter),
    }

    // ---- Início (hero) --------------------------------------------------------
    base.hero = {
      badge: asString(heroRec.badge, base.hero.badge),
      titleMain: asString(heroRec.titleMain, base.hero.titleMain),
      titleSub: asString(heroRec.titleSub, base.hero.titleSub),
      tagline: asString(heroRec.tagline, base.hero.tagline),
      description: asString(heroRec.description, base.hero.description),
      meta: asString(heroRec.meta, base.hero.meta),
      primaryCtaLabel: asString(heroRec.primaryCtaLabel, base.hero.primaryCtaLabel),
      primaryCtaUrl: asString(heroRec.primaryCtaUrl, base.hero.primaryCtaUrl),
      secondaryCtaLabel: asString(heroRec.secondaryCtaLabel, base.hero.secondaryCtaLabel),
      secondaryCtaHref: asString(heroRec.secondaryCtaHref, base.hero.secondaryCtaHref),
      image: filesUrl('hero', asString(heroRec.image, '')),
    }

    // ---- Sobre a série --------------------------------------------------------
    const aboutFeatures = asObjectArray(aboutRec.features, base.about.features).map((f) => ({
      title: asString(f.title, ''),
      description: asString(f.description, ''),
    }))
    base.about = {
      sectionEyebrow: asString(aboutRec.sectionEyebrow, base.about.sectionEyebrow),
      sectionTitle: asString(aboutRec.sectionTitle, base.about.sectionTitle),
      sectionSubtitle: asString(aboutRec.sectionSubtitle, base.about.sectionSubtitle),
      quote: asString(aboutRec.quote, base.about.quote),
      fullText: asString(aboutRec.fullText, base.about.fullText),
      chips: asStringArray(aboutRec.chips, base.about.chips),
      features: aboutFeatures.length ? aboutFeatures : base.about.features,
    }

    // ---- Personagens (cabeçalho da seção) -------------------------------------
    base.charactersSection = {
      sectionEyebrow: asString(csRec.sectionEyebrow, base.charactersSection.sectionEyebrow),
      sectionTitle: asString(csRec.sectionTitle, base.charactersSection.sectionTitle),
      sectionSubtitle: asString(csRec.sectionSubtitle, base.charactersSection.sectionSubtitle),
      tabs: {
        all: asString(csRec.tabAllLabel, base.charactersSection.tabs.all),
        grownups: asString(csRec.tabGrownupsLabel, base.charactersSection.tabs.grownups),
        babies: asString(csRec.tabBabiesLabel, base.charactersSection.tabs.babies),
        guardians: asString(csRec.tabGuardiansLabel, base.charactersSection.tabs.guardians),
      },
    }

    // ---- Episódios (cabeçalho da seção) ---------------------------------------
    base.episodesSection = {
      sectionEyebrow: asString(esRec.sectionEyebrow, base.episodesSection.sectionEyebrow),
      sectionTitle: asString(esRec.sectionTitle, base.episodesSection.sectionTitle),
      sectionSubtitle: asString(esRec.sectionSubtitle, base.episodesSection.sectionSubtitle),
      meta: asStringArray(esRec.meta, base.episodesSection.meta),
      videosHeading: asString(esRec.videosHeading, base.episodesSection.videosHeading),
      videosLinkLabel: asString(esRec.videosLinkLabel, base.episodesSection.videosLinkLabel),
      guideHeading: asString(esRec.guideHeading, base.episodesSection.guideHeading),
    }

    // ---- Trilha sonora --------------------------------------------------------
    const sdCards = asObjectArray(sdRec.cards, base.soundtrack.cards).map((c) => ({
      title: asString(c.title, ''),
      subtitle: asString(c.subtitle, ''),
      type: asString(c.type, ''),
      icon: asString(c.icon, 'music'),
    }))
    base.soundtrack = {
      sectionEyebrow: asString(sdRec.sectionEyebrow, base.soundtrack.sectionEyebrow),
      sectionTitle: asString(sdRec.sectionTitle, base.soundtrack.sectionTitle),
      sectionSubtitle: asString(sdRec.sectionSubtitle, base.soundtrack.sectionSubtitle),
      quote: asString(sdRec.quote, base.soundtrack.quote),
      quoteAuthor: asString(sdRec.quoteAuthor, base.soundtrack.quoteAuthor),
      description: asString(sdRec.description, base.soundtrack.description),
      platforms: asStringArray(sdRec.platforms, base.soundtrack.platforms),
      cards: sdCards.length ? sdCards : base.soundtrack.cards,
      cardFooterNote: asString(sdRec.cardFooterNote, base.soundtrack.cardFooterNote),
    }

    // ---- Siga a série ---------------------------------------------------------
    base.social = {
      sectionEyebrow: asString(socRec.sectionEyebrow, base.social.sectionEyebrow),
      sectionTitle: asString(socRec.sectionTitle, base.social.sectionTitle),
      sectionSubtitle: asString(socRec.sectionSubtitle, base.social.sectionSubtitle),
      cardCtaLabel: asString(socRec.cardCtaLabel, base.social.cardCtaLabel),
    }

    // ---- Mercado --------------------------------------------------------------
    base.market = {
      sectionEyebrow: asString(mkRec.sectionEyebrow, base.market.sectionEyebrow),
      sectionTitle: asString(mkRec.sectionTitle, base.market.sectionTitle),
      ipTitle: asString(mkRec.ipTitle, base.market.ipTitle),
      mainText: asString(mkRec.mainText, base.market.mainText),
      packageTitle: asString(mkRec.packageTitle, base.market.packageTitle),
      packageNote: asString(mkRec.packageNote, base.market.packageNote),
      packageItems: asStringArray(mkRec.packageItems, base.market.packageItems),
      referencesTitle: asString(mkRec.referencesTitle, base.market.referencesTitle),
      referencesSubtitle: asString(mkRec.referencesSubtitle, base.market.referencesSubtitle),
      referenceTags: asStringArray(mkRec.referenceTags, base.market.referenceTags),
      referencesNote: asString(mkRec.referencesNote, base.market.referencesNote),
      ctaTitle: asString(mkRec.ctaTitle, base.market.ctaTitle),
      ctaText: asString(mkRec.ctaText, base.market.ctaText),
      ctaLabel: asString(mkRec.ctaLabel, base.market.ctaLabel),
      ctaEmail: asString(mkRec.ctaEmail, base.market.ctaEmail),
      ctaUrl: asString(mkRec.ctaUrl, base.market.ctaUrl),
    }

    // ---- Registros: personagens / episódios / vídeos / links -------------------
    const charRows: CharacterRow[] = ((charactersRaw as Array<Record<string, unknown>>) ?? []).map(
      (r, i) => ({
        id: asString(r.id, 'static-' + i),
        name: asString(r.name, ''),
        ageOrRole: asString(r.ageOrRole, ''),
        description: asString(r.description, ''),
        avatarType: asString(r.avatarType, 'penguin-boy'),
        accentColor: asString(r.accentColor, '#0ea5e9'),
        charGroup: asString(r.charGroup, 'grownups'),
        image: filesUrl('characters', asString(r.image, '')),
      }),
    )
    if (charRows.length) base.characters = charRows

    const epRows: EpisodeRow[] = ((episodesRaw as Array<Record<string, unknown>>) ?? []).map(
      (r, i) => ({
        id: asString(r.id, 'static-' + i),
        number: asString(r.number, ''),
        title: asString(r.title, ''),
        synopsis: asString(r.synopsis, ''),
        badge: asString(r.badge, ''),
      }),
    )
    if (epRows.length) base.episodes = epRows

    const vidRows: VideoRow[] = ((videosRaw as Array<Record<string, unknown>>) ?? []).map(
      (r, i) => ({
        id: asString(r.id, 'static-' + i),
        title: asString(r.title, ''),
        description: asString(r.description, ''),
        url: asString(r.url, ''),
        thumbnailHint: asString(r.thumbnailHint, ''),
        tag: asString(r.tag, ''),
      }),
    )
    if (vidRows.length) base.videos = vidRows

    const linkRows: SocialLinkRow[] = ((linksRaw as Array<Record<string, unknown>>) ?? []).map(
      (r, i) => ({
        id: asString(r.id, 'static-' + i),
        platform: asString(r.platform, ''),
        handle: asString(r.handle, ''),
        label: asString(r.label, ''),
        url: asString(r.url, ''),
        color: asString(r.color, ''),
        footerNote: asString(r.footerNote, ''),
      }),
    )
    if (linkRows.length) base.socialLinks = linkRows

    return base
  } catch (_err) {
    return base
  }
}
