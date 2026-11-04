import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {
  Menu,
  X,
  Youtube,
  Instagram,
  Facebook,
  Music2,
  Compass,
  Users,
  Tv,
  Briefcase,
  Sparkles,
  Heart,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useSiteData from '@/hooks/useSiteData'
import { renderBrandTitle } from '@/components/brandTitle'

// Ícones possíveis dos itens de menu (nome vindo do painel admin -> ícone lucide)
const NAV_ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  sparkles: Sparkles,
  users: Users,
  tv: Tv,
  music: Music2,
  heart: Heart,
  briefcase: Briefcase,
}

// Ícones das redes sociais do rodapé
const SOCIAL_ICONS: Record<string, LucideIcon> = {
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
}

const SOCIAL_COLORS: Record<string, { box: string; hover: string; title: string }> = {
  youtube: {
    box: 'bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white',
    hover: 'hover:text-red-400',
    title: '',
  },
  instagram: {
    box: 'bg-pink-600/20 text-pink-500 group-hover:bg-pink-600 group-hover:text-white',
    hover: 'hover:text-pink-400',
    title: '',
  },
  facebook: {
    box: 'bg-blue-600/20 text-blue-500 group-hover:bg-blue-600 group-hover:text-white',
    hover: 'hover:text-blue-400',
    title: '',
  },
}

export default function Layout() {
  const site = useSiteData()
  const { menu, footer, socialLinks } = site

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      // Section scroll spy
      const sections = [
        'inicio',
        'sobre',
        'personagens',
        'episodios',
        'musicas',
        'redes',
        'mercado',
      ]
      const scrollPosition = window.scrollY + 180

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        const navHeight = 72
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navHeight

        window.scrollTo({
          top: targetId === 'inicio' ? 0 : offsetPosition,
          behavior: 'smooth',
        })
      }
      setMobileMenuOpen(false)
    }
  }

  const navItems = menu.items
  const instagramLink = socialLinks.find((l) => l.platform.toLowerCase().includes('insta'))

  return (
    <div className="flex flex-col min-h-screen text-slate-900 bg-slate-50 selection:bg-sky-200 selection:text-sky-900">
      {/* Top Antarctic Banner - Snow/Warmth vibe */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-900 text-sky-100 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 select-none z-50">
        <span className="text-amber-300">❄️</span>
        <span>{menu.bannerTagline}</span>
        <span className="hidden sm:inline text-sky-300/70">·</span>
        <span className="hidden sm:inline text-sky-200">{menu.bannerBadge}</span>
        <span className="text-amber-300">🐧</span>
      </div>

      {/* Main Navbar */}
      <header
        className={`fixed top-[28px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-sky-100 py-2.5'
            : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-full"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-sky-400 to-amber-400 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              {menu.logo ? (
                <img
                  src={menu.logo}
                  alt={menu.brandTitle}
                  className="w-full h-full rounded-[14px] object-cover bg-slate-900"
                />
              ) : (
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-xl">
                  🐧
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl leading-tight text-slate-900 group-hover:text-sky-600 transition-colors tracking-tight">
                {renderBrandTitle(menu.brandTitle)}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                {menu.brandSubtitle}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-sky-700 bg-sky-50'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-slate-100/80'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-orange-500 rounded-full" />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all px-4 sm:px-5 gap-1.5 text-xs sm:text-sm"
            >
              <a href={menu.ctaUrl} target="_blank" rel="noopener noreferrer">
                <Youtube className="w-4 h-4 fill-white" />
                <span>{menu.ctaLabel}</span>
              </a>
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-sky-100 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
            <nav className="flex flex-col gap-1.5">
              {navItems.map((link) => {
                const Icon = NAV_ICONS[link.icon] ?? Compass
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </a>
                )
              })}
            </nav>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={menu.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm shadow-md"
              >
                <Youtube className="w-5 h-5 fill-white" />
                {menu.ctaLabel}
              </a>
              {instagramLink && (
                <div className="flex items-center justify-center gap-4 text-slate-500 pt-2 text-sm">
                  <a
                    href={instagramLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-pink-600"
                  >
                    <Instagram className="w-4 h-4" /> {instagramLink.handle}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Outlet */}
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-200 border-t border-slate-800 relative overflow-hidden">
        {/* Subtle ice background wave glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-24 bg-gradient-to-b from-sky-500/10 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Column 1: Brand & Tagline */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-amber-400 p-0.5 shadow-md">
                  {footer.logo ? (
                    <img
                      src={footer.logo}
                      alt={footer.brandTitle}
                      className="w-full h-full rounded-[14px] object-cover bg-slate-900"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-xl">
                      🐧
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {renderBrandTitle(footer.brandTitle)}
                  </h3>
                  <p className="text-xs text-sky-400 font-medium">{footer.brandSubtitle}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{footer.description}</p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-300">
                <span>❄️</span> {footer.tagline}
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs text-sky-400">
                {footer.navigationTitle}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {navItems.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Redes & Canais */}
            <div>
              <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs text-sky-400">
                {footer.socialTitle}
              </h4>
              <ul className="space-y-3 text-sm">
                {socialLinks.map((link) => {
                  const key = link.platform.toLowerCase()
                  const Icon = SOCIAL_ICONS[key] ?? Instagram
                  const colors = SOCIAL_COLORS[key] ?? SOCIAL_COLORS.instagram
                  return (
                    <li key={link.platform}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 text-slate-300 transition-colors group ${colors.hover}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${colors.box}`}
                        >
                          <Icon className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{link.platform}</div>
                          <div className="text-xs text-slate-400">
                            {key === 'youtube' ? 'Canal oficial da série' : link.handle}
                          </div>
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Column 4: Mercado & Contato */}
            <div>
              <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs text-sky-400">
                {footer.marketTitle}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{footer.marketText}</p>
              <a
                href={footer.ctaUrl}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>{footer.ctaLabel}</span>
              </a>
              <div className="mt-3 text-xs text-slate-500">{footer.contactNote}</div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>{footer.copyright}</div>
            <div className="flex items-center gap-1">
              <span>{footer.madeWithBefore}</span>
              <span className="text-amber-400">{footer.madeWithHighlight}</span>
              <span>{footer.madeWithAfter}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
