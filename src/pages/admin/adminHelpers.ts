import pb from '@/lib/pocketbase/client'
import type { AdminRecord } from '@/services/adminAuth'

/** Toast de sucesso do painel (mensagens curtas e neutras). */
export function adminSuccessToast(message: string) {
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

/** Encerra a sessão do painel. */
export function logoutAdmin(): void {
  pb.authStore.clear()
}

/** Tipagem usada pelo painel. */
export type { AdminRecord }
