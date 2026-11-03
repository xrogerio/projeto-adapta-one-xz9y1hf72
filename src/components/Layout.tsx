import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  Play,
  Heart,
  Youtube,
  Instagram,
  Facebook,
  Music2,
  Compass,
  Users,
  Tv,
  Briefcase,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { label: 'Início', href: '#inicio', icon: Compass },
  { label: 'Sobre a série', href: '#sobre', icon: Sparkles },
  { label: 'Personagens', href: '#personagens', icon: Users },
  { label: 'Episódios', href: '#episodios', icon: Tv },
  { label: 'Trilha sonora', href: '#musicas', icon: Music2 },
  { label: 'Siga a série', href: '#redes', icon: Heart },
  { label: 'Mercado', href: '#mercado', icon: Briefcase },
]

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const location = useLocation()

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

  return (
    <div className="flex flex-col min-h-screen text-slate-900 bg-slate-50 selection:bg-sky-200 selection:text-sky-900">
      {/* Top Antarctic Banner - Snow/Warmth vibe */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-900 text-sky-100 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 select-none z-50">
        <span className="text-amber-300">❄️</span>
        <span>Na ponta do mundo, a esperança nunca congela!</span>
        <span className="hidden sm:inline text-sky-300/70">·</span>
        <span className="hidden sm:inline text-sky-200">Série infantil de animação 3D</span>
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
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-xl">
                🐧
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg sm:text-xl leading-tight text-slate-900 group-hover:text-sky-600 transition-colors tracking-tight">
                FREDDIE <span className="text-orange-500">&</span> LOLLA
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Aventuras na Baía Quente
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
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
              <a
                href="https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">Assistir no</span> YouTube
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
              {NAV_LINKS.map((link) => {
                const Icon = link.icon
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
                href="https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm shadow-md"
              >
                <Youtube className="w-5 h-5 fill-white" />
                Assistir no YouTube
              </a>
              <div className="flex items-center justify-center gap-4 text-slate-500 pt-2 text-sm">
                <a
                  href="https://www.instagram.com/freddielolla/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-pink-600"
                >
                  <Instagram className="w-4 h-4" /> @freddielolla
                </a>
              </div>
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
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-xl">
                    🐧
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">FREDDIE & LOLLA</h3>
                  <p className="text-xs text-sky-400 font-medium">Aventuras na Baía Quente</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                O caos fofo de dois irmãos pinguins cuidando de três bebês trigêmeos na Antártica.
                Série infantil de animação 3D cheia de música, ciência e afeto familiar.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-300">
                <span>❄️</span> Na ponta do mundo, a esperança nunca congela!
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs text-sky-400">
                Navegação
              </h4>
              <ul className="space-y-2.5 text-sm">
                {NAV_LINKS.map((link) => (
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
                Redes Oficiais
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCE8XJTPjM16alpIZUPM5DXg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-red-400 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Youtube className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">YouTube</div>
                      <div className="text-xs text-slate-400">Canal oficial da série</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/freddielolla/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-pink-400 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-pink-600/20 text-pink-500 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-colors">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Instagram</div>
                      <div className="text-xs text-slate-400">@freddielolla</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/freddieelolla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Facebook className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Facebook</div>
                      <div className="text-xs text-slate-400">Freddie e Lolla</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Mercado & Contato */}
            <div>
              <h4 className="font-heading font-bold text-white text-base mb-4 tracking-wide uppercase text-xs text-sky-400">
                Mercado Audiovisual
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Propriedade intelectual 100% original e registrada (EDA/FBN e Escola de Música da
                UFRJ).
              </p>
              <a
                href="mailto:lacerdarogerio1@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Solicitar a bíblia da série</span>
              </a>
              <div className="mt-3 text-xs text-slate-500">Contato: lacerdarogerio1@gmail.com</div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © 2025 Freddie e Lolla — Aventuras na Baía Quente. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-1">
              <span>Feito com</span>
              <span className="text-amber-400">💛</span>
              <span>na Baía Quente, Península Antártica.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
