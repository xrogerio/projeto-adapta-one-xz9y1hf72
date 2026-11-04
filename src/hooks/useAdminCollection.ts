import { useCallback, useEffect, useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import type { AdminRecord } from '@/pages/admin/adminHelpers'

/**
 * Hook das coleções de múltiplos registros no painel (Personagens, Episódios):
 * lista ordenada, com recarga manual após criar/editar/excluir.
 */
export function useAdminCollection(collectionName: string, sort = '-updated', ascending = false) {
  const [records, setRecords] = useState<AdminRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  /** Recarrega a lista completa da coleção. */
  const reload = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const list = await pb.collection(collectionName).getFullList({
        sort,
      })
      const rows = list as unknown as AdminRecord[]
      setRecords(ascending ? rows.slice().reverse() : rows)
    } catch (err) {
      setError(getErrorMessage(err))
      setRecords([])
    } finally {
      setLoading(false)
    }
  }, [collectionName, sort, ascending])

  useEffect(() => {
    reload()
  }, [reload])

  return { records, loading, error, reload }
}
