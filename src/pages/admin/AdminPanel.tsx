import { useCallback, useEffect, useState } from 'react'
import { LogOut, PencilRuler } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SingletonSection, { SaveButton } from '@/pages/admin/sections/SingletonSection'
import ListSection from '@/pages/admin/sections/ListSection'
import type { SectionConfig } from '@/pages/admin/sections/SingletonSection'
import type { ListSectionConfig } from '@/pages/admin/sections/ListSection'
import { useSectionForm } from '@/pages/admin/useSectionForm'
import { useAdminAuth } from '@/services/adminAuth'

/** Rótulos das abas. */
const LABELS: Record<string, string> = {
  menu: 'Menu',
  footer: 'Rodapé',
  hero: 'Início',
  about: 'Sobre a série',
  characters: 'Personagens',
  episodes: 'Episódios',
  soundtrack: 'Trilha sonora',
  social: 'Siga a série',
  market: 'Mercado',
}

/* ------------------------------------------------------------------ */
/* Configuração das seções singleton                                   */
/* ------------------------------------------------------------------ */

const MENU_CONFIG: SectionConfig = {
  value: 'menu',
  tabLabel: 'Menu',
  title: 'Menu do site',
  description: 'Marca, imagem da logo e botão do cabeçalho exibidos em todas as páginas.',
  collection: 'site_menu',
  imageField: 'logo',
  imageLabel: 'Logo do site (menu desktop e mobile)',
  imagePreviewClass: 'w-28 h-28',
  fields: [
    { name: 'brandTitle', label: 'Nome da marca' },
    { name: 'brandSubtitle', label: 'Assinatura da marca' },
    { name: 'bannerBadge', label: 'Selo do aviso do topo' },
    { name: 'bannerTagline', label: 'Frase do aviso do topo' },
    { name: 'ctaLabel', label: 'Botão do menu — texto' },
    { name: 'ctaUrl', label: 'Botão do menu — URL' },
    {
      name: 'items',
      label: 'Itens do menu (um por linha, formato: Rótulo | âncora)',
      type: 'pairList',
      pairKeys: ['label', 'href'],
    },
  ],
}

const FOOTER_CONFIG: SectionConfig = {
  value: 'footer',
  tabLabel: 'Rodapé',
  title: 'Rodapé do site',
  description: 'Conteúdo exibido no rodapé de todas as páginas.',
  collection: 'site_footer',
  imageField: 'logo',
  imageLabel: 'Logo do rodapé',
  imagePreviewClass: 'w-28 h-28',
  fields: [
    { name: 'brandTitle', label: 'Nome da marca' },
    { name: 'brandSubtitle', label: 'Assinatura da marca' },
    { name: 'tagline', label: 'Tagline' },
    { name: 'description', label: 'Texto sobre a série', type: 'textarea' },
    { name: 'navigationTitle', label: 'Título da navegação' },
    { name: 'socialTitle', label: 'Título das redes' },
    { name: 'marketTitle', label: 'Título do mercado' },
    { name: 'marketText', label: 'Texto do mercado', type: 'textarea' },
    { name: 'ctaLabel', label: 'Botão — texto' },
    { name: 'ctaUrl', label: 'Botão — URL' },
    { name: 'contactNote', label: 'Nota de contato' },
    { name: 'copyright', label: 'Nota de direitos autorais' },
    { name: 'madeWithBefore', label: 'Crédito — texto antes do destaque' },
    { name: 'madeWithHighlight', label: 'Crédito — destaque' },
    { name: 'madeWithAfter', label: 'Crédito — texto depois do destaque' },
  ],
}

const HERO_CONFIG: SectionConfig = {
  value: 'hero',
  tabLabel: 'Início',
  title: 'Início (herói)',
  description: 'Textos da primeira dobra do site e a imagem exibida ao lado do título.',
  collection: 'hero',
  imageField: 'image',
  imageLabel: 'Imagem do herói (Início)',
  imagePreviewClass: 'w-40 h-40',
  fields: [
    { name: 'badge', label: 'Selo do herói' },
    { name: 'titleMain', label: 'Título principal' },
    { name: 'titleSub', label: 'Subtítulo' },
    { name: 'tagline', label: 'Tagline' },
    { name: 'description', label: 'Descrição', type: 'textarea' },
    { name: 'meta', label: 'Meta (formato e faixa etária)' },
    { name: 'youtubeChannelUrl', label: 'URL do canal no YouTube' },
    { name: 'primaryCtaLabel', label: 'Botão principal — texto' },
    { name: 'primaryCtaUrl', label: 'Botão principal — URL' },
    { name: 'secondaryCtaLabel', label: 'Botão secundário — texto' },
    { name: 'secondaryCtaHref', label: 'Botão secundário — âncora ou URL' },
  ],
}

const ABOUT_CONFIG: SectionConfig = {
  value: 'about',
  tabLabel: 'Sobre a série',
  title: 'Sobre a série',
  description: 'Textos, chips e destaques da seção Sobre a série.',
  collection: 'about',
  fields: [
    { name: 'sectionEyebrow', label: 'Rótulo da seção' },
    { name: 'sectionTitle', label: 'Título da seção' },
    { name: 'sectionSubtitle', label: 'Subtítulo da seção', type: 'textarea' },
    { name: 'quote', label: 'Citação em destaque', type: 'textarea' },
    { name: 'fullText', label: 'Texto completo', type: 'textarea' },
    { name: 'chips', label: 'Chips (um por linha)', type: 'array' },
    {
      name: 'features',
      label: 'Destaques (uma por linha, formato: Título | texto)',
      type: 'pairList',
      pairKeys: ['title', 'description'],
    },
  ],
}

const SOUNDTRACK_CONFIG: SectionConfig = {
  value: 'soundtrack',
  tabLabel: 'Trilha sonora',
  title: 'Trilha sonora',
  description: 'Textos, citação e cards da seção de música.',
  collection: 'soundtrack',
  fields: [
    { name: 'sectionEyebrow', label: 'Rótulo da seção' },
    { name: 'sectionTitle', label: 'Título da seção' },
    { name: 'sectionSubtitle', label: 'Subtítulo da seção', type: 'textarea' },
    { name: 'quote', label: 'Citação em destaque', type: 'textarea' },
    { name: 'quoteAuthor', label: 'Autor da citação' },
    { name: 'description', label: 'Descrição', type: 'textarea' },
    { name: 'platforms', label: 'Plataformas (uma por linha)', type: 'array' },
    {
      name: 'cards',
      label:
        'Cards (um por linha, formato: Título | subtítulo | tipo | ícone music, laugh ou disc)',
      type: 'pairList',
      pairKeys: ['title', 'subtitle', 'type', 'icon'],
    },
    { name: 'cardFooterNote', label: 'Nota do rodapé dos cards' },
  ],
}

const SOCIAL_CONFIG: SectionConfig = {
  value: 'social',
  tabLabel: 'Siga a série',
  title: 'Siga a série',
  description: 'Perfis oficiais exibidos na seção de redes sociais.',
  collection: 'social',
  fields: [
    { name: 'sectionEyebrow', label: 'Rótulo da seção' },
    { name: 'sectionTitle', label: 'Título da seção' },
    { name: 'sectionSubtitle', label: 'Subtítulo da seção', type: 'textarea' },
    { name: 'cardCtaLabel', label: 'Chamada do card' },
  ],
}

const MARKET_CONFIG: SectionConfig = {
  value: 'market',
  tabLabel: 'Mercado',
  title: 'Para o mercado audiovisual',
  description: 'Textos da seção voltada a produtoras e plataformas.',
  collection: 'market',
  fields: [
    { name: 'sectionEyebrow', label: 'Rótulo da seção' },
    { name: 'sectionTitle', label: 'Título da seção' },
    { name: 'ipTitle', label: 'Título do bloco de propriedade intelectual' },
    { name: 'mainText', label: 'Texto de propriedade intelectual', type: 'textarea' },
    { name: 'packageTitle', label: 'Pacote — título' },
    { name: 'packageNote', label: 'Pacote — nota' },
    { name: 'packageItems', label: 'Itens do pacote (um por linha)', type: 'array' },
    { name: 'referencesTitle', label: 'Referências — título' },
    { name: 'referencesSubtitle', label: 'Referências — subtítulo' },
    { name: 'referenceTags', label: 'Tags de referência (uma por linha)', type: 'array' },
    { name: 'referencesNote', label: 'Nota final das referências', type: 'textarea' },
    { name: 'ctaTitle', label: 'CTA final — título', type: 'textarea' },
    { name: 'ctaText', label: 'CTA final — texto', type: 'textarea' },
    { name: 'ctaLabel', label: 'CTA final — botão' },
    { name: 'ctaEmail', label: 'CTA final — e-mail' },
  ],
}

/** Mapa aba → configuração singleton. */
const CONFIG_BY_TAB: Record<string, SectionConfig> = {
  menu: MENU_CONFIG,
  footer: FOOTER_CONFIG,
  hero: HERO_CONFIG,
  about: ABOUT_CONFIG,
  soundtrack: SOUNDTRACK_CONFIG,
  social: SOCIAL_CONFIG,
  market: MARKET_CONFIG,
}

/* ------------------------------------------------------------------ */
/* Configuração das seções de lista (múltiplos registros)              */
/* ------------------------------------------------------------------ */

const CHARACTERS_CONFIG: ListSectionConfig = {
  value: 'characters',
  tabLabel: 'Personagens',
  title: 'Personagens',
  description:
    'Lista completa dos personagens. A imagem enviada substitui a arte vetorial no site.',
  collection: 'characters',
  sortField: 'sort_order',
  emptyLabel: 'Nenhum personagem cadastrado.',
  fields: [
    { name: 'name', label: 'Nome' },
    { name: 'ageOrRole', label: 'Idade ou papel' },
    { name: 'description', label: 'Descrição', textarea: true },
    { name: 'accentColor', label: 'Cor de destaque (hex)' },
  ],
}

const EPISODES_CONFIG: ListSectionConfig = {
  value: 'episodes',
  tabLabel: 'Episódios',
  title: 'Episódios (1ª temporada)',
  description: 'Guia de episódios exibido na seção de episódios do site.',
  collection: 'episodes',
  sortField: 'number',
  emptyLabel: 'Nenhum episódio cadastrado.',
  fields: [
    { name: 'number', label: 'Número (ex.: 01)' },
    { name: 'title', label: 'Título' },
    { name: 'synopsis', label: 'Sinopse', textarea: true },
    { name: 'badge', label: 'Etiqueta (ex.: Ep. 1)' },
  ],
}

/** Ordem das abas: as 9 seções pedidas. */
const TAB_VALUES = [
  'menu',
  'footer',
  'hero',
  'about',
  'characters',
  'episodes',
  'soundtrack',
  'social',
  'market',
] as const

/* ------------------------------------------------------------------ */
/* Painel                                                              */
/* ------------------------------------------------------------------ */

export default function AdminPanel() {
  const { admin, logout } = useAdminAuth()

  // Um hook por seção singleton, na ordem das abas.
  const menuForm = useSectionForm(MENU_CONFIG.collection, MENU_CONFIG.fields)
  const footerForm = useSectionForm(FOOTER_CONFIG.collection, FOOTER_CONFIG.fields)
  const heroForm = useSectionForm(HERO_CONFIG.collection, HERO_CONFIG.fields)
  const aboutForm = useSectionForm(ABOUT_CONFIG.collection, ABOUT_CONFIG.fields)
  const soundtrackForm = useSectionForm(SOUNDTRACK_CONFIG.collection, SOUNDTRACK_CONFIG.fields)
  const socialForm = useSectionForm(SOCIAL_CONFIG.collection, SOCIAL_CONFIG.fields)
  const marketForm = useSectionForm(MARKET_CONFIG.collection, MARKET_CONFIG.fields)

  // Carrega todas as seções uma única vez na montagem do painel.
  useEffect(() => {
    menuForm.load()
    footerForm.load()
    heroForm.load()
    aboutForm.load()
    soundtrackForm.load()
    socialForm.load()
    marketForm.load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sectionForms: Record<string, ReturnType<typeof useSectionForm>> = {
    menu: menuForm,
    footer: footerForm,
    hero: heroForm,
    about: aboutForm,
    soundtrack: soundtrackForm,
    social: socialForm,
    market: marketForm,
  }

  const [savingTab, setSavingTab] = useState<string | null>(null)

  const saveCurrent = useCallback(
    async (tab: string) => {
      const form = sectionForms[tab]
      if (!form) return
      setSavingTab(tab)
      try {
        await form.save()
      } finally {
        setSavingTab(null)
      }
    },
    [sectionForms],
  )

  return (
    <div className="min-h-screen bg-antarctica-gradient">
      {/* Cabeçalho do painel: marca + usuário + sair */}
      <header className="bg-white/90 backdrop-blur border-b border-sky-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-xl shrink-0">
              🐧
            </div>
            <div className="min-w-0">
              <h1 className="font-heading font-bold text-slate-900 truncate">
                Freddie <span className="text-orange-500">&</span> Lolla — Painel
              </h1>
              <p className="text-xs text-slate-500 truncate">
                {String(admin?.name ?? '') || 'Administrador'} · {String(admin?.email ?? '')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/"
              className="text-xs sm:text-sm font-bold text-slate-600 hover:text-sky-700 flex items-center gap-1"
            >
              <PencilRuler className="w-4 h-4" /> Ver site
            </a>
            <ButtonSair onClick={logout} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="w-full h-auto flex-wrap justify-start gap-1 rounded-2xl bg-white/80 border border-sky-100 p-1.5 shadow-sm">
            {TAB_VALUES.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-xl px-3 py-2 text-xs sm:text-sm font-bold data-[state=active]:bg-sky-600 data-[state=active]:text-white"
              >
                {LABELS[tab]}
              </TabsTrigger>
            ))}
          </TabsList>

          {TAB_VALUES.map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-5 space-y-4">
              {tab === 'characters' && <ListSection config={CHARACTERS_CONFIG} withImageField />}
              {tab === 'episodes' && <ListSection config={EPISODES_CONFIG} />}
              {tab !== 'characters' && tab !== 'episodes' && (
                <div className="space-y-4">
                  <SingletonSection config={CONFIG_BY_TAB[tab]} form={sectionForms[tab]} />
                  <div className="flex justify-end">
                    <SaveButton
                      saving={savingTab === tab}
                      disabled={Boolean(sectionForms[tab]?.error)}
                      onSave={() => saveCurrent(tab)}
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}

/** Botão Sair do cabeçalho do painel. */
function ButtonSair({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 h-8 text-xs font-bold text-slate-700 hover:bg-slate-50"
    >
      <LogOut className="w-4 h-4" /> Sair
    </button>
  )
}
