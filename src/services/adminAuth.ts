import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'

/** Registro genérico do painel (qualquer coleção do site). */
export type AdminRecord = Record<string, unknown> & { id: string; collectionId?: string }

/**
 * Hook de sessão do painel: expõe o usuário autenticado do authStore
 * e o logout (limpa a sessão e volta para /admin/login).
 */
export function useAdminAuth() {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState<AdminRecord | null>(() =>
    isMaybeValidAdmin() ? (pb.authStore.record as AdminRecord | null) : null,
  )

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setAdmin(isMaybeValidAdmin() ? (pb.authStore.record as AdminRecord | null) : null)
    })
    return unsubscribe
  }, [])

  const logout = useCallback(() => {
    logoutAdmin()
    navigate('/admin/login', { replace: true })
  }, [navigate])

  return { admin, logout }
}

/** Toast de sucesso do painel (mensagens curtas e neutras). */
export function adminSuccessToast(message: string) {
  // Importe dinâmico para não carregar o ToastProvider no login.
  import('@/hooks/use-toast').then(({ toast }) => {
    toast({
      title: 'Pronto!',
      description: message,
    })
  })
}

/** Toast de erro do painel. */
export function adminErrorToast(message: string) {
  import('@/hooks/use-toast').then(({ toast }) => {
    toast({
      title: 'Erro',
      description: message,
      variant: 'destructive',
    })
  })
}

/** Indica se há um token de sessão válido no authStore do PocketBase. */
export function isMaybeValidAdmin(): boolean {
  return pb.authStore.isValid && Boolean(pb.authStore.token)
}

/**
 * Confirma/renova a sessão do painel contra o servidor.
 * Retorna true quando a sessão é realmente válida.
 */
export async function ensureAdminSession(): Promise<boolean> {
  if (!pb.authStore.isValid) return false
  try {
    await pb.collection('users').authRefresh()
    return true
  } catch {
    pb.authStore.clear()
    return false
  }
}

/** Encerra a sessão do painel e volta ao login. */
export function logoutAdmin(): void {
  pb.authStore.clear()
}
