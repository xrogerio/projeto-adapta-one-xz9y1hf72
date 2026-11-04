import { useCallback, useRef, useState } from 'react'
import pb from '@/lib/pocketbase/client'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { adminSuccessToast, adminErrorToast } from '@/pages/admin/adminHelpers'
import type { AdminRecord } from '@/hooks/useAdminCollection'

/** Configuração de campo: nome, rótulo e tipo de editor. */
export interface FieldConfig {
  name: string
  label: string
  /**
   * textarea = multilinha; array = lista de textos (um item por linha);
   * pairList = lista de objetos json (cada linha vira um objeto com as
   * chaves de `pairKeys`, separadas por " | ").
   */
  type?: 'text' | 'textarea' | 'array' | 'pairList' | 'number' | 'url' | 'email'
  placeholder?: string
  /** Chaves do objeto json quando type === 'pairList'. */
  pairKeys?: string[]
}

/** Extrai os valores dos campos declarados a partir do registro. */
export function extractValues(
  fields: FieldConfig[],
  rec: AdminRecord | null,
): Record<string, string> {
  const next: Record<string, string> = {}
  for (const f of fields) {
    const raw = rec ? rec[f.name] : undefined
    if (f.type === 'array') {
      next[f.name] = Array.isArray(raw) ? raw.map(String).join('\n') : ''
    } else if (f.type === 'pairList') {
      const keys = f.pairKeys ?? []
      next[f.name] = Array.isArray(raw)
        ? raw
            .map((item) => {
              const obj = (item ?? {}) as Record<string, unknown>
              return keys.map((k) => String(obj[k] ?? '')).join(' | ')
            })
            .filter((line) => line.replace(/\s*\|/g, '').length > 0)
            .join('\n')
        : ''
    } else {
      next[f.name] = typeof raw === 'string' ? raw : raw == null ? '' : String(raw)
    }
  }
  return next
}

/** Divide um texto de lista em itens (um por linha, sem vazios). */
export function splitLines(text: string): string[] {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

/** Converte as linhas "a | b | c" em objetos json com as chaves informadas. */
export function parsePairLines(text: string, keys: string[]): Record<string, string>[] {
  return splitLines(text).map((line) => {
    const parts = line.split('|').map((p) => p.trim())
    const obj: Record<string, string> = {}
    keys.forEach((k, i) => {
      obj[k] = parts[i] ?? ''
    })
    return obj
  })
}

/**
 * Hook dos formulários de seção única do painel (Menu, Rodapé, Início,
 * Sobre a série, Trilha sonora, Siga a série, Mercado):
 * carrega o registro singleton, mantém apenas os campos declarados
 * (allowlist — nunca toca em campos file/json/autodate) e salva de volta.
 */
export function useSectionForm(collectionName: string, fields: FieldConfig[]) {
  const [record, setRecord] = useState<AdminRecord | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const recRef = useRef<AdminRecord | null>(null)
  const cfgRef = useRef({ collectionName, fields })
  cfgRef.current = { collectionName, fields }

  /** Carrega o primeiro registro da coleção (singleton). */
  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    const { collectionName: col, fields: flds } = cfgRef.current
    try {
      const list = await pb.collection(col).getList(1, 1, { sort: '-updated' })
      const first = (list.items[0] ?? null) as unknown as AdminRecord | null
      recRef.current = first
      setRecord(first)
      setValues(extractValues(flds, first))
    } catch (err) {
      recRef.current = null
      setRecord(null)
      setValues({})
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  /** Atualiza um campo do formulário. */
  const setValue = useCallback((field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }, [])

  /** Salva os campos declarados no registro (ou cria, se não existir). */
  const save = useCallback(
    async (extra?: Record<string, unknown>) => {
      setSaving(true)
      const { collectionName: col, fields: flds } = cfgRef.current
      try {
        const payload: Record<string, unknown> = { ...extra }
        for (const f of flds) {
          if (extra && f in extra) continue
          const v = values[f.name] ?? ''
          if (f.type === 'pairList') {
            payload[f.name] = parsePairLines(v, f.pairKeys ?? [])
          } else {
            payload[f.name] = f.type === 'array' ? splitLines(v) : v
          }
        }
        let saved: AdminRecord
        if (recRef.current) {
          saved = (await pb
            .collection(col)
            .update(recRef.current.id, payload)) as unknown as AdminRecord
        } else {
          saved = (await pb.collection(col).create(payload)) as unknown as AdminRecord
        }
        recRef.current = saved
        setRecord(saved)
        setValues(extractValues(flds, saved))
        adminSuccessToast('Seção salva com sucesso!')
        return true
      } catch (err) {
        adminErrorToast(getErrorMessage(err))
        return false
      } finally {
        setSaving(false)
      }
    },
    [values],
  )

  /** Substitui (File) ou remove (null) o arquivo de um campo file. */
  const saveFile = useCallback(
    async (field: string, file: File | null) => {
      const current = recRef.current
      if (!current) {
        adminErrorToast('Salve a seção antes de enviar a imagem.')
        return false
      }
      setSaving(true)
      try {
        const formData = new FormData()
        if (file) {
          formData.append(field, file)
        } else {
          formData.append(field, '') // valor vazio limpa o campo no PocketBase
        }
        await pb.collection(cfgRef.current.collectionName).update(current.id, formData)
        await load()
        adminSuccessToast(file ? 'Imagem atualizada!' : 'Imagem removida!')
        return true
      } catch (err) {
        adminErrorToast(getErrorMessage(err))
        return false
      } finally {
        setSaving(false)
      }
    },
    [load],
  )

  return { record, values, loading, saving, error, load, setValue, save, saveFile }
}
