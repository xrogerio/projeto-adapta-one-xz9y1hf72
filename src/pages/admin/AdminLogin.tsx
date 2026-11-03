import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KeyRound, Loader2, LogIn, ShieldCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import pb from '@/lib/pocketbase/client'
import { getErrorMessage } from '@/lib/pocketbase/errors'

/** Tela de login do painel de administração (/admin/login). */
export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(true)

  // Já autenticado? Vai direto para o painel.
  useEffect(() => {
    if (pb.authStore.isValid) {
      navigate('/admin', { replace: true })
    } else {
      setChecking(false)
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await pb.collection('users').authWithPassword(email.trim(), password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
      setPassword('')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-antarctica-gradient flex items-center justify-center px-4 py-12">
      {/* Decorações do tema Antártica */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-16 left-10 text-5xl opacity-20 rotate-[-8deg]"
      >
        ❄️
      </div>
      <div
        aria-hidden
        className="pointer-events-none bottom-20 right-12 text-6xl opacity-20 rotate-[10deg]"
      >
        🐧
      </div>

      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white/95 backdrop-blur border border-sky-100 shadow-xl p-8">
          <div className="text-center mb-7">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-3xl mx-auto mb-4">
              🐧
            </div>
            <h1 className="font-heading text-2xl font-bold text-slate-900">
              Freddie <span className="text-orange-500">&</span> Lolla
            </h1>
            <p className="text-sm text-slate-500 mt-1 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Painel de administração do site
            </p>
          </div>

          {checking ? (
            <div className="flex justify-center py-6 text-sky-700">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-email" className="text-xs font-bold text-slate-600">
                  E-mail
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@freddielolla.com.br"
                  className="rounded-xl h-11 bg-white border-slate-200 focus-visible:ring-sky-400"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admin-password" className="text-xs font-bold text-slate-600">
                  Senha
                </Label>
                <Input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="rounded-xl h-11 bg-white border-slate-200 focus-visible:ring-sky-400"
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-700 flex items-start gap-2">
                  <KeyRound className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="break-words">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                Entrar no painel
              </button>

              <p className="text-xs text-slate-400 text-center">
                Acesso restrito à equipe do projeto.
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-white/70 mt-5">
          Freddie e Lolla — Aventuras na Baía Quente
        </p>
      </div>
    </div>
  )
}
