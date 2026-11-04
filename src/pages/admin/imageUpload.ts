import { useCallback, useState } from 'react'
import pb from '@/lib/pocketbase/client'
import type { AdminRecord } from '@/services/adminAuth'

/**
 * Upload de arquivo para um registro do PocketBase a partir de um
 * <input type="file">. Envia o novo arquivo e devolve o registro atualizado
 * (a coleção precisa ter o campo file correspondente).
 */
export async function uploadFieldFile(
  collectionName: string,
  recordId: string,
  field: string,
  file: File,
): Promise<AdminRecord> {
  const formData = new FormData()
  formData.append(field, file)
  const updated = await pb.collection(collectionName).update(recordId, formData)
  return updated as unknown as AdminRecord
}

/** Estado de upload por campo (progresso individual nos formulários). */
export function useFieldUpload() {
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  const upload = useCallback(
    async (
      collectionName: string,
      recordId: string,
      field: string,
      file: File,
    ): Promise<AdminRecord | null> => {
      setUploadingField(field)
      try {
        return await uploadFieldFile(collectionName, recordId, field, file)
      } finally {
        setUploadingField(null)
      }
    },
    [],
  )

  return { uploadingField, upload }
}

/** Nome do arquivo atual de um campo file do registro (ou ''). */
export function recordFileName(record: AdminRecord | null | undefined, field: string): string {
  if (!record) return ''
  const value = record[field]
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return String(value[0] ?? '')
  return ''
}
