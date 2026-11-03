import { useRef } from 'react'
import { ImagePlus, Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import pb from '@/lib/pocketbase/client'

/** URL pública de um arquivo do PocketBase (ou '' quando não há arquivo). */
export function adminFileUrl(collectionName: string, recordId: string, filename: string): string {
  if (!recordId || !filename) return ''
  return pb.files.getUrl(
    { id: recordId, collectionId: collectionName, collectionName } as never,
    filename,
  )
}

interface ImageFieldProps {
  collectionName: string
  recordId: string
  field: string
  filename: string
  label: string
  uploading?: boolean
  onUpload: (file: File) => void
  onRemove: () => void
  /** Classe do container do preview (padrão: quadrado arredondado). */
  previewClassName?: string
  emptyHint?: string
}

/**
 * Campo de imagem do painel: mostra o preview do arquivo atual
 * (ou o aviso de arte padrão), permite substituir e remover.
 */
export function ImageField({
  collectionName,
  recordId,
  field,
  filename,
  label,
  uploading = false,
  onUpload,
  onRemove,
  previewClassName = 'w-24 h-24',
  emptyHint = 'Arte padrão do site',
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const url = adminFileUrl(collectionName, recordId, filename)

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="flex items-start gap-4">
        <div
          className={`${previewClassName} shrink-0 rounded-2xl border-2 border-dashed border-slate-200 bg-white flex items-center justify-center overflow-hidden`}
        >
          {uploading ? (
            <Loader2 className="w-5 h-5 text-sky-500 animate-spin" />
          ) : url ? (
            <img src={url} alt={label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] text-slate-400 font-semibold text-center px-1 leading-tight">
              {emptyHint}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800">{label}</p>
          <p className="text-xs text-slate-500 truncate mt-0.5">
            {filename || 'Sem imagem enviada — o site usa a ilustração padrão.'}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onUpload(file)
                e.target.value = ''
              }}
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="rounded-lg gap-1.5 h-8 text-xs font-bold border-sky-200 text-sky-700 hover:bg-sky-50"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              {filename ? 'Substituir' : 'Enviar imagem'}
            </Button>
            {filename && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={uploading}
                onClick={onRemove}
                className="rounded-lg gap-1.5 h-8 text-xs font-bold border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remover
              </Button>
            )}
          </div>
          <input type="hidden" data-field={field} />
        </div>
      </div>
    </div>
  )
}
