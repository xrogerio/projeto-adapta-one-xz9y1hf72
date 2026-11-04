import { SectionCard, SectionLoading, SectionError } from '@/pages/admin/SectionCard'
import { RecordList } from '@/pages/admin/RecordList'
import { useAdminCollection } from '@/hooks/useAdminCollection'
import pb from '@/lib/pocketbase/client'

/** Configuração de uma aba de múltiplos registros. */
export interface ListSectionConfig {
  value: string
  tabLabel: string
  title: string
  description: string
  collection: string
  sortField: string
  emptyLabel: string
  fields: Array<{ name: string; label: string; textarea?: boolean; placeholder?: string }>
}

/** URL pública de arquivo do PocketBase para preview na lista. */
export function filePreviewUrl(collection: string, id: string, filename: unknown): string {
  const name = typeof filename === 'string' ? filename : ''
  if (!id || !name) return ''
  return pb.files.getURL(
    { id, collectionId: collection, collectionName: collection } as never,
    name,
  )
}

/**
 * Aba de coleção de múltiplos registros (Personagens, Episódios).
 * Personagens ganham, além da edição inline, o campo de upload da
 * imagem com preview (substitui a arte vetorial no site público).
 */
export default function ListSection({
  config,
  withImageField = false,
  imageFieldName = 'image',
}: {
  config: ListSectionConfig
  withImageField?: boolean
  imageFieldName?: string
}) {
  const { records, loading, error, reload } = useAdminCollection(
    config.collection,
    `${config.sortField}`,
    true,
  )

  const listRecords = records as Array<Record<string, unknown> & { id: string }>

  const renderAvatar = withImageField
    ? (rec: Record<string, unknown> & { id: string }) => {
        const filename = rec[imageFieldName]
        const url = filePreviewUrl(config.collection, rec.id, filename)
        return (
          <div className="shrink-0">
            <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
              {url ? (
                <img src={url} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[9px] text-slate-400 font-bold text-center px-0.5 leading-tight">
                  arte
                </span>
              )}
            </div>
          </div>
        )
      }
    : undefined

  return (
    <SectionCard title={config.title} description={config.description}>
      {error ? (
        <SectionError message={error} onRetry={reload} />
      ) : loading ? (
        <SectionLoading />
      ) : (
        <RecordList
          collectionName={config.collection}
          records={listRecords}
          loading={loading}
          error={error}
          reload={reload}
          sortField={config.sortField}
          emptyLabel={config.emptyLabel}
          fields={config.fields}
          renderAvatar={renderAvatar}
          fileField={withImageField ? imageFieldName : undefined}
        />
      )}
    </SectionCard>
  )
}
