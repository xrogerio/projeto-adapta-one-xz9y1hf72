import React, { useState } from 'react'
import {
  Play,
  Music2,
  Sparkles,
  Heart,
  Youtube,
  Instagram,
  Facebook,
  ExternalLink,
  Mail,
  Smile,
  ShieldCheck,
  Disc,
  Clock,
  Tv,
  Users,
  Compass,
  CheckCircle2,
  ChevronRight,
  Headphones,
  Award,
  Layers,
  Baby,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_DATA } from '@/data/siteContent'
import { CharacterAvatar } from '@/components/CharacterAvatar'

export default function Index() {
  const [activeTab, setActiveTab] = useState<'all' | 'babies' | 'grownups' | 'guardians'>('all')

  const filteredCharacters = SITE_DATA.characters.filter((char) => {
    if (activeTab === 'all') return true
    if (activeTab === 'babies') return ['lilly', 'pimpi', 'popo'].includes(char.id)
    if (activeTab === 'grownups') return ['freddie', 'lolla', 'atlas', 'amelia'].includes(char.id)
    if (activeTab === 'guardians') return ['aurora', 'hugo', 'bel'].includes(char.id)
    return true
  })

  return (
    <div className="w-full overflow-hidden">
      {/* =========================================================
          HERO SECTION
          ========================================================= */}
      <section
        id="inicio"
        className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-antarctica-gradient"
      >
        {/* Decorative Floating Snowflakes / Ice Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-12 left-10 text-sky-200/60 text-4xl animate-float-slow select-none">
            ❄
          </div>
          <div className="absolute top-28 right-16 text-sky-300/40 text-6xl animate-float-reverse select-none">
            ❅
          </div>
          <div className="absolute bottom-24 left-1/4 text-sky-200/50 text-3xl animate-float-slow select-none">
            ❆
          </div>
          <div className="absolute top-1/2 right-8 text-amber-200/60 text-5xl animate-float-reverse select-none">
            ☀️
          </div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 text-sky-800 border border-sky-200 text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 shadow-sm animate-fade-in-down">
            <span className="text-amber-500">✨</span>
            <span>{SITE_DATA.hero.badge}</span>
            <span className="text-amber-500">✨</span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-slate-900 leading-[1.08] mb-4">
            FREDDIE <span className="text-orange-500">&</span> LOLLA
          </h1>
          <div className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-sky-700 tracking-tight mb-6">
            Aventuras na Baía Quente
          </div>

          {/* Tagline Callout */}
          <div className="inline-block max-w-3xl mx-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-sky-50 via-amber-50 to-orange-50 border border-amber-200/80 shadow-sm mb-6">
            <p className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-slate-800">
              “{SITE_DATA.hero.tagline}”
            </p>
          </div>

          {/* Short Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
            {SITE_DATA.hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold text-base rounded-full shadow-lg hover:shadow-xl transition-all px-8 py-6 gap-2"
            >
              <a href={SITE_DATA.hero.youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5 fill-white" />
                Assistir no YouTube
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white/90 hover:bg-sky-50 text-sky-800 border-2 border-sky-300 font-bold text-base rounded-full shadow-sm hover:shadow-md transition-all px-8 py-6 gap-2"
            >
              <a href="#musicas">
                <Music2 className="w-5 h-5 text-sky-600" />
                Ouvir as músicas
              </a>
            </Button>
          </div>

          {/* Hero Metadata Pill */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <Clock className="w-4 h-4 text-sky-500" />
            <span>{SITE_DATA.hero.meta}</span>
          </div>

          {/* Quick Mascot Preview Row */}
          <div className="mt-12 flex items-center justify-center -space-x-3 sm:-space-x-4">
            {SITE_DATA.characters.slice(0, 5).map((char) => (
              <div
                key={char.id}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1 shadow-md border-2 border-white hover:scale-110 hover:z-20 transition-all cursor-pointer"
                title={`${char.name} (${char.ageOrRole})`}
              >
                <CharacterAvatar
                  type={char.avatarType}
                  name={char.name}
                  accentColor={char.accentColor}
                  className="w-full h-full rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SOBRE A SÉRIE
          ========================================================= */}
      <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow & Title */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              {SITE_DATA.about.sectionEyebrow}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 mt-3 mb-4">
              {SITE_DATA.about.sectionTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-600">{SITE_DATA.about.sectionSubtitle}</p>
          </div>

          {/* Premise Quote Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border-2 border-sky-100 p-8 sm:p-10 lg:p-12 mb-12 shadow-sm">
            <div className="absolute top-6 left-6 text-sky-200 text-6xl font-serif select-none pointer-events-none">
              “
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <blockquote className="font-heading font-semibold text-lg sm:text-xl md:text-2xl text-slate-800 leading-relaxed mb-6 italic">
                {SITE_DATA.about.quote}
              </blockquote>
              <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-orange-400 rounded-full mx-auto mb-6" />
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify sm:text-center">
                {SITE_DATA.about.fullText}
              </p>
            </div>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14">
            {SITE_DATA.about.chips.map((chip, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200/80 shadow-xs flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                {chip}
              </span>
            ))}
          </div>

          {/* Three Feature Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {SITE_DATA.about.features.map((feature, idx) => (
              <Card
                key={idx}
                className="rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-b from-white to-slate-50/50"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xl mb-5">
                    {idx === 0 && '🤹'}
                    {idx === 1 && '☕'}
                    {idx === 2 && '🌟'}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PERSONAGENS
          ========================================================= */}
      <section id="personagens" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              Personagens
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 mt-3 mb-4">
              Quem vive na Baía Quente
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Pinguins, trigêmeos, uma vizinha misteriosa e amigos gigantes do mar e do céu.
            </p>
          </div>

          {/* Character Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'Todos os 10' },
              { id: 'grownups', label: 'Freddie, Lolla e Pais' },
              { id: 'babies', label: 'Os Trigêmeos' },
              { id: 'guardians', label: 'Guardiões e Vizinha' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Character Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCharacters.map((char) => (
              <Card
                key={char.id}
                className="group rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <CharacterAvatar
                      type={char.avatarType}
                      name={char.name}
                      accentColor={char.accentColor}
                      className="w-20 h-20 shrink-0"
                    />
                    <Badge
                      variant="secondary"
                      className="font-bold text-xs px-2.5 py-1 rounded-full whitespace-nowrap"
                      style={{
                        backgroundColor: `${char.accentColor}18`,
                        color: char.accentColor,
                        borderColor: `${char.accentColor}30`,
                      }}
                    >
                      {char.ageOrRole}
                    </Badge>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {char.name}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed flex-1">
                    {char.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          EPISÓDIOS & VÍDEOS
          ========================================================= */}
      <section id="episodios" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              {SITE_DATA.episodes.sectionEyebrow}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 mt-3 mb-4">
              {SITE_DATA.episodes.sectionTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-6">
              {SITE_DATA.episodes.sectionSubtitle}
            </p>

            {/* Badges metadata */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {SITE_DATA.episodes.meta.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-800 font-bold text-xs sm:text-sm border border-sky-100 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Videos Highlights Row */}
          <div className="mb-16">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-6 flex items-center gap-2">
              <span className="text-red-500">▶</span> Vídeos em Destaque
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {SITE_DATA.episodes.videos.map((video) => (
                <Card
                  key={video.id}
                  className="rounded-3xl border-2 border-sky-100 bg-gradient-to-br from-slate-900 to-sky-950 text-white shadow-md overflow-hidden group"
                >
                  <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-full px-3 py-1">
                          {video.tag}
                        </Badge>
                        <span className="text-xs text-sky-300 font-semibold">
                          {video.thumbnailHint}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-2xl text-white mb-2 group-hover:text-amber-300 transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                        {video.description}
                      </p>
                    </div>

                    <Button
                      asChild
                      className="w-full sm:w-auto self-start bg-white text-slate-900 hover:bg-amber-300 font-bold rounded-full gap-2 px-6 shadow-md transition-all"
                    >
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        <Play className="w-4 h-4 fill-slate-900" />
                        Assistir no YouTube
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Direct Channel CTA */}
            <div className="text-center">
              <a
                href={SITE_DATA.hero.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-red-600 hover:text-red-700 underline underline-offset-4"
              >
                <span>Ver todos os vídeos no canal oficial</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 10 Episodes List Grid */}
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-6 flex items-center gap-2">
              <Tv className="w-5 h-5 text-sky-600" /> Guia de Episódios (Temporada 1)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {SITE_DATA.episodes.list.map((ep) => (
                <div
                  key={ep.number}
                  className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-sky-300 hover:shadow-md transition-all flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 font-heading font-extrabold text-base flex items-center justify-center shrink-0 border border-sky-200">
                    {ep.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900 truncate">
                        {ep.title}
                      </h4>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-bold text-sky-700 border-sky-200 shrink-0"
                      >
                        {ep.badge}
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {ep.synopsis}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRILHA SONORA
          ========================================================= */}
      <section
        id="musicas"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sky-900 via-sky-950 to-slate-950 text-white relative"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              {SITE_DATA.soundtrack.sectionEyebrow}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mt-3 mb-4">
              {SITE_DATA.soundtrack.sectionTitle}
            </h2>
            <p className="text-base sm:text-lg text-sky-200">
              {SITE_DATA.soundtrack.sectionSubtitle}
            </p>
          </div>

          {/* Quote Block */}
          <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-10 text-center max-w-3xl mx-auto mb-12 shadow-xl">
            <Music2 className="w-10 h-10 text-amber-300 mx-auto mb-4" />
            <blockquote className="font-heading font-bold text-xl sm:text-2xl text-amber-200 leading-relaxed mb-3">
              {SITE_DATA.soundtrack.quote}
            </blockquote>
            <p className="text-sky-300 text-xs sm:text-sm font-medium tracking-wide">
              — {SITE_DATA.soundtrack.quoteAuthor}
            </p>
          </div>

          {/* Description & Platform Chips */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sky-100 text-base sm:text-lg leading-relaxed mb-6">
              {SITE_DATA.soundtrack.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-sky-200">
              {SITE_DATA.soundtrack.platforms.map((platform, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* 3 Soundtrack Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_DATA.soundtrack.cards.map((card, idx) => (
              <Card
                key={idx}
                className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-white/15 transition-all shadow-lg"
              >
                <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-4">
                      {card.icon === 'music' && <Music2 className="w-6 h-6" />}
                      {card.icon === 'laugh' && <Smile className="w-6 h-6" />}
                      {card.icon === 'disc' && <Disc className="w-6 h-6" />}
                    </div>
                    <Badge className="bg-sky-400/20 text-sky-200 hover:bg-sky-400/30 text-xs font-bold rounded-full mb-3">
                      {card.type}
                    </Badge>
                    <h3 className="font-heading font-bold text-2xl text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sky-200 text-sm sm:text-base leading-relaxed">
                      {card.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-sky-300 font-semibold">
                    <span>Disponível nos streamings</span>
                    <span>♪</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SIGA A SÉRIE
          ========================================================= */}
      <section id="redes" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              {SITE_DATA.social.sectionEyebrow}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 mt-3 mb-4">
              {SITE_DATA.social.sectionTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              {SITE_DATA.social.sectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_DATA.social.links.map((link) => {
              const isYoutube = link.platform === 'YouTube'
              const isInstagram = link.platform === 'Instagram'
              const isFacebook = link.platform === 'Facebook'

              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md transition-transform group-hover:scale-110"
                      style={{ backgroundColor: link.color }}
                    >
                      {isYoutube && <Youtube className="w-7 h-7 fill-current" />}
                      {isInstagram && <Instagram className="w-7 h-7" />}
                      {isFacebook && <Facebook className="w-7 h-7 fill-current" />}
                    </div>

                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                      {link.platform}
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                      {link.handle}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{link.label}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 group-hover:text-sky-600">
                    <span>Acessar perfil</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          PARA O MERCADO AUDIOVISUAL
          ========================================================= */}
      <section id="mercado" className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              {SITE_DATA.market.sectionEyebrow}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 mt-3 mb-4">
              {SITE_DATA.market.sectionTitle}
            </h2>
          </div>

          {/* Legal / IP Paragraph Card */}
          <div className="rounded-3xl bg-slate-900 text-slate-100 p-8 sm:p-10 mb-12 shadow-xl border border-slate-800">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  Propriedade Intelectual 100% Original e Registrada
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {SITE_DATA.market.mainText}
                </p>
              </div>
            </div>
          </div>

          {/* Two Columns: Package & References */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Column 1: Evaluation Package */}
            <Card className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    📦
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-slate-900">
                      {SITE_DATA.market.packageTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {SITE_DATA.market.packageNote}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mt-6">
                  {SITE_DATA.market.packageItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base text-slate-700 font-semibold"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Column 2: Style References */}
            <Card className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    🎬
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-slate-900">
                      {SITE_DATA.market.referencesTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {SITE_DATA.market.referencesSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 mt-6">
                  {SITE_DATA.market.referenceTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs text-slate-800 font-heading font-bold text-sm flex items-center gap-1.5"
                    >
                      <span className="text-orange-500">★</span>
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-500 mt-6 leading-relaxed">
                  Narrativa focada em co-viewing familiar, lições orgânicas de cooperação, empatia e
                  ciência natural para crianças em idade pré-escolar e fundamental inicial.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Big CTA to Request Series Bible */}
          <div className="rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 text-white p-8 sm:p-12 text-center shadow-xl">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white mb-4">
              Interessado em levar a Baía Quente para sua plataforma?
            </h3>
            <p className="text-sky-100 max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
              Solicite a bíblia completa de produção, roteiros e materiais musicais diretamente com
              a equipe criativa.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-heading font-extrabold text-base sm:text-lg rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all gap-2"
            >
              <a href={SITE_DATA.market.ctaEmail}>
                <Mail className="w-5 h-5 text-slate-950" />
                {SITE_DATA.market.ctaLabel}
              </a>
            </Button>
            <div className="mt-4 text-xs text-sky-200">Email direto: lacerdarogerio1@gmail.com</div>
          </div>
        </div>
      </section>
    </div>
  )
}
