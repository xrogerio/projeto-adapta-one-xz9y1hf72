import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { isMaybeValidAdmin, ensureAdminSession } from '@/services/adminAuth'

/** Estado da checagem de sessão do painel. */
type GateStatus = 'checking' | 'allowed' | 'denied'

/**
 * Guarda de rota do painel: com sessão válida renderiza o painel;
 * sem sessão, redireciona para /admin/login.
 * Enquanto o PocketBase confirma/renova a sessão, mostra "Verificando sessão...".
 */
export default function RequireAdmin({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<GateStatus>(() =>
    isMaybeValidAdmin() ? 'checking' : 'denied',
  )

  useEffect(() => {
    if (status !== 'checking') return
    let cancelled = false
    ensureAdminSession().then((ok) => {
      if (!cancelled) setStatus(ok ? 'allowed' : 'denied')
    })
    return () => {
      cancelled = true
    }
  }, [status])

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-antarctica-gradient flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-sky-800">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm font-bold">Verificando sessão...</p>
        </div>
      </div>
    )
  }
  if (status === 'denied') return <Navigate to="/admin/login" replace />
  return <>{children}</>
}
