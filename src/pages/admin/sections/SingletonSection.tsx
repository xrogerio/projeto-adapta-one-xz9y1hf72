import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SectionCard, SectionLoading, SectionError } from '@/pages/admin/SectionCard'
import { SectionFields } from '@/pages/admin/SectionFields'
import { ImageField } from '@/pages/admin/ImageField'
import type { FieldConfig } from '@/pages/admin/useSectionForm'

/** Configuração declarativa de uma aba singleton do painel. */
export interface SectionConfig {
  /** Valor da aba (TabsTrigger value). */
  value: string
  /** Rótulo curto na navegação. */
  tabLabel: string
  /** Título grande no formulário. */
  title: string
  /** Descrição de apoio. */
  description: string
  /** Coleção PocketBase. */
  collection: string
  /** Campos editáveis (allowlist). */
  fields: FieldConfig[]
  /** Campo file para o ImageField (opcional). */
  imageField?: string
  /** Rótulo do ImageField. */
  imageLabel?: string
  /** Tamanho do preview (classes tailwind). */
  imagePreviewClass?: string
}

/** Objeto devolvido por useSectionForm (para tipagem da view). */
export interface SectionFormLike {
  record: (Record<string, unknown> & { id: string }) | null
  values: Record<string, string>
  loading: boolean
  saving: boolean
  error: string
  load: () => Promise<void>
  setValue: (field: string, value: string) => void
  save: () => Promise<boolean>
  saveFile: (field: string, file: File | null) => Promise<boolean>
}

/** Formulário de uma aba singleton, alimentado pelo hook compartilhado do painel. */
export default function SingletonSection({
  config,
  form,
}: {
  config: SectionConfig
  form: SectionFormLike
}) {
  const filename = config.imageField ? String(form.record?.[config.imageField] ?? '') : ''

  return (
    <SectionCard title={config.title} description={config.description}>
      {form.error ? (
        <SectionError message={form.error} onRetry={form.load} />
      ) : form.loading ? (
        <SectionLoading />
      ) : (
        <>
          {config.imageField && (
            <ImageField
              collectionName={config.collection}
              recordId={form.record?.id ?? ''}
              field={config.imageField}
              filename={filename}
              label={config.imageLabel ?? 'Imagem da seção'}
              uploading={form.saving}
              onUpload={(file) => form.saveFile(config.imageField as string, file)}
              onRemove={() => form.saveFile(config.imageField as string, null)}
              previewClassName={config.imagePreviewClass ?? 'w-24 h-24'}
            />
          )}
          <SectionFields fields={config.fields} values={form.values} onChange={form.setValue} />
        </>
      )}
    </SectionCard>
  )
}

/** Botão Salvar padrão dos formulários singleton. */
export function SaveButton({
  saving,
  disabled,
  onSave,
}: {
  saving: boolean
  disabled?: boolean
  onSave: () => void
}) {
  return (
    <Button
      type="button"
      disabled={saving || disabled}
      onClick={onSave}
      className="rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
      Salvar
    </Button>
  )
}
