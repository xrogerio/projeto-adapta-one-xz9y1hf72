import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import pb from '@/lib/pocketbase/client'
import { SectionCard, SectionLoading, SectionError } from '@/pages/admin/SectionCard'
import { SectionFields } from '@/pages/admin/SectionFields'
import { ImageField } from '@/pages/admin/ImageField'
import { RecordList } from '@/pages/admin/RecordList'
import { useSectionForm } from '@/pages/admin/useSectionForm'
import { useAdminCollection } from '@/hooks/useAdminCollection'
import type { FieldConfig } from '@/pages/admin/useSectionForm'

const COLLECTION = 'hero'

const FIELDS: FieldConfig[] = [
  { name: 'badge', label: 'Selo do herói' },
  { name: 'titleMain', label: 'Título principal' },
  { name: 'titleSub', label: 'Subtítulo' },
  { name: 'tagline', label: 'Tagline' },
  { name: 'description', label: 'Descrição', type: 'textarea' },
  { name: 'meta', label: 'Meta (formato/faixa etária)' },
  { name: 'youtubeChannelUrl', label: 'URL do canal no YouTube' },
  { name: 'primaryCtaLabel', label: 'Botão principal — texto' },
  { name: 'primaryCtaUrl', label: 'Botão principal — URL' },
  { name: 'secondaryCtaLabel', label: 'Botão secundário — texto' },
  { name: 'secondaryCtaHref', label: 'Botão secundário — âncora/URL' },
]

/** Aba "Início" do painel: textos do herói + upload da imagem principal. */
export default function HeroSection() {
  const form = useSectionForm(COLLECTION, FIELDS)

  useEffect(() => {
    form.load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const footer = (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <span className="text-xs text-slate-400">
        {form.record
          ? 'Editando o registro existente da seção.'
          : 'Nenhum registro — salvar cria um.'}
      </span>
      <Button
        type="button"
        disabled={form.saving || Boolean(form.error)}
        onClick={() => form.save()}
        className="rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {form.saving && <Loader2 className="w-4 h-4 animate-spin" />}
        Salvar
      </Button>
    </div>
  )

  return (
    <SectionCard
      title="Início (herói)"
      description="Textos da primeira dobra do site e a imagem exibida ao lado do título."
      footer={footer}
    >
      {form.error ? (
        <SectionError message={form.error} onRetry={form.load} />
      ) : form.loading ? (
        <SectionLoading />
      ) : (
        <>
          <ImageField
            collectionName={COLLECTION}
            recordId={form.record?.id ?? ''}
            field="image"
            filename={String(form.record?.image ?? '')}
            label="Imagem do herói (Início)"
            uploading={form.saving}
            onUpload={(file) => form.saveFile('image', file)}
            onRemove={() => form.saveFile('image', null)}
            previewClassName="w-40 h-40"
          />
          <SectionFields fields={FIELDS} values={form.values} onChange={form.setValue} />
        </>
      )}
    </SectionCard>
  )
}
