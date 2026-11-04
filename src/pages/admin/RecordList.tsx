import { useCallback, useRef, useState } from 'react'
import { CheckCircle2, ImagePlus, Loader2, Pencil, Plus, Trash2, X } from 'lucide-react'
import pb from '@/lib/pocketbase/client'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { adminSuccessToast, adminErrorToast } from '@/pages/admin/adminHelpers'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

/** Campo de texto do editor de registro. */
function ItemField({
  label,
  value,
  onChange,
  textarea = false,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  textarea?: boolean
  placeholder?: string
}) {
  const id = `item-${label.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-bold text-slate-600">
        {label}
      </Label>
      {textarea ? (
        <Textarea
          id={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-xl bg-white border-slate-200 focus-visible:ring-sky-400"
        />
      ) : (
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-xl h-10 bg-white border-slate-200 focus-visible:ring-sky-400"
        />
      )}
    </div>
  )
}

/**
 * Lista CRUD de uma coleção de múltiplos registros (Personagens, Episódios):
 * lista ordenável visualmente, adicionar, editar inline e excluir.
 */
export function RecordList({
  collectionName,
  records,
  loading,
  error,
  reload,
  sortField,
  emptyLabel,
  fields,
  renderAvatar,
  fileField,
}: {
  collectionName: string
  records: Array<Record<string, unknown> & { id: string }>
  loading: boolean
  error: string
  reload: () => void
  sortField: string
  emptyLabel: string
  fields: Array<{
    name: string
    label: string
    textarea?: boolean
    placeholder?: string
  }>
  /** Preview opcional do campo de arquivo (Personagens). */
  renderAvatar?: (rec: Record<string, unknown> & { id: string }) => React.ReactNode
  /** Campo file para upload direto na lista (ex.: image dos personagens). */
  fileField?: string
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uploadTargetRef = useRef<string | null>(null)

  const startEdit = useCallback(
    (rec: Record<string, unknown> & { id: string }) => {
      const next: Record<string, string> = {}
      for (const f of fields) {
        const raw = rec[f.name]
        next[f.name] = typeof raw === 'string' ? raw : raw == null ? '' : String(raw)
      }
      setDraft(next)
      setEditingId(rec.id)
    },
    [fields],
  )

  const saveEdit = useCallback(async () => {
    if (!editingId) return
    if (error) {
      adminErrorToast('Não foi possível carregar os dados atuais — recarregue antes de salvar.')
      return
    }
    setBusy(true)
    try {
      const currentRec = records.find((r) => r.id === editingId)
      // Blindagem genérica: omite campos vazios/nulos quando a coluna já possui valor
      const payload: Record<string, unknown> = {}
      for (const [key, newVal] of Object.entries(draft)) {
        if (currentRec) {
          const currentVal = currentRec[key]
          const isCurrentFilled =
            currentVal !== undefined &&
            currentVal !== null &&
            currentVal !== '' &&
            !(Array.isArray(currentVal) && currentVal.length === 0)

          const isNewEmpty =
            newVal === undefined ||
            newVal === null ||
            (typeof newVal === 'string' && newVal.trim() === '') ||
            (Array.isArray(newVal) && newVal.length === 0)

          if (isCurrentFilled && isNewEmpty) {
            continue
          }
        }
        payload[key] = newVal
      }

      if (Object.keys(payload).length > 0) {
        await pb.collection(collectionName).update(editingId, payload)
      }
      adminSuccessToast('Item atualizado!')
      setEditingId(null)
      reload()
    } catch (err) {
      adminErrorToast(getErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }, [collectionName, editingId, draft, records, error, reload])

  const addItem = useCallback(async () => {
    if (error) {
      adminErrorToast('Não foi possível carregar os dados atuais — recarregue antes de adicionar.')
      return
    }
    setBusy(true)
    try {
      // Novo item vai para o fim da lista.
      const nextOrder = records.reduce((max, r) => Math.max(max, Number(r[sortField] ?? 0)), -1) + 1
      const payload: Record<string, unknown> = { ...draft }
      payload[sortField] = nextOrder
      await pb.collection(collectionName).create(payload)
      adminSuccessToast('Item adicionado!')
      setDraft({})
      reload()
    } catch (err) {
      adminErrorToast(getErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }, [collectionName, draft, records, sortField, error, reload])

  const removeItem = useCallback(
    async (id: string) => {
      if (!window.confirm('Excluir este item? A ação não pode ser desfeita.')) return
      setBusy(true)
      try {
        await pb.collection(collectionName).delete(id)
        adminSuccessToast('Item excluído.')
        reload()
      } catch (err) {
        adminErrorToast(getErrorMessage(err))
      } finally {
        setBusy(false)
      }
    },
    [collectionName, reload],
  )

  const uploadFile = useCallback(
    async (file: File) => {
      const target = uploadTargetRef.current
      if (!target) return
      setBusy(true)
      try {
        const fd = new FormData()
        fd.append(fileField ?? 'image', file)
        await pb.collection(collectionName).update(target, fd)
        adminSuccessToast('Imagem enviada!')
        reload()
      } catch (err) {
        adminErrorToast(getErrorMessage(err))
      } finally {
        setBusy(false)
        uploadTargetRef.current = null
      }
    },
    [collectionName, fileField, reload],
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-sky-700">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) uploadFile(file)
          e.target.value = ''
        }}
      />

      {/* Formulário de novo item */}
      <details className="rounded-2xl border border-dashed border-sky-300 bg-sky-50/50 p-4">
        <summary className="cursor-pointer text-sm font-bold text-sky-800 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Adicionar novo item
        </summary>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {fields.map((f) => (
            <div key={f.name} className={f.textarea ? 'md:col-span-2' : ''}>
              <ItemField
                label={f.label}
                value={draft[f.name] ?? ''}
                onChange={(v) => setDraft((p) => ({ ...p, [f.name]: v }))}
                textarea={f.textarea}
                placeholder={f.placeholder}
              />
            </div>
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          disabled={busy}
          onClick={addItem}
          className="mt-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" /> Salvar novo item
        </Button>
      </details>

      {/* Lista de itens */}
      {records.length === 0 && (
        <p className="text-sm text-slate-500 italic py-4 text-center">{emptyLabel}</p>
      )}
      {records.map((rec) => {
        const isEditing = editingId === rec.id
        return (
          <div key={rec.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
            {isEditing ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fields.map((f) => (
                    <div key={f.name} className={f.textarea ? 'md:col-span-2' : ''}>
                      <ItemField
                        label={f.label}
                        value={draft[f.name] ?? ''}
                        onChange={(v) => setDraft((p) => ({ ...p, [f.name]: v }))}
                        textarea={f.textarea}
                        placeholder={f.placeholder}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    disabled={busy}
                    onClick={saveEdit}
                    className="rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold"
                  >
                    Salvar
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(null)}
                    className="rounded-lg gap-1 font-bold"
                  >
                    <X className="w-3.5 h-3.5" /> Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                {renderAvatar?.(rec)}
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-sm text-slate-900 truncate">
                    {String(rec[fields[0]?.name ?? 'name'] ?? '')}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    {String(rec[fields[1]?.name ?? ''] ?? '')}
                  </p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(rec)}
                    className="rounded-lg gap-1 h-8 text-xs font-bold"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Editar
                  </Button>
                  {fileField && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        uploadTargetRef.current = rec.id
                        fileInputRef.current?.click()
                      }}
                      className="rounded-lg gap-1 h-8 text-xs font-bold border-sky-200 text-sky-700"
                    >
                      <ImagePlus className="w-3.5 h-3.5" /> Imagem
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={busy}
                    onClick={() => removeItem(rec.id)}
                    className="rounded-lg gap-1 h-8 text-xs font-bold border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
