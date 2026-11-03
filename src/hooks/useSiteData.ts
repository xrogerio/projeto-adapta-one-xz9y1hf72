import { useEffect, useState } from 'react'
import { buildStaticSiteData, loadSiteData, type SiteData } from '@/services/siteData'

/**
 * Conteúdo do site para as páginas públicas: começa com o fallback estático
 * (o site nunca fica em branco nem muda de visual) e troca para os dados do
 * backend quando o carregamento termina.
 */
export function useSiteData(): SiteData {
  const [data, setData] = useState<SiteData>(() => buildStaticSiteData())

  useEffect(() => {
    let cancelled = false
    loadSiteData()
      .then((loaded) => {
        if (!cancelled) setData(loaded)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return data
}

export default useSiteData
