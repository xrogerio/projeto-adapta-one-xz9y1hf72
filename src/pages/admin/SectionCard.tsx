import type { ReactNode } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

/** Moldura padrão dos formulários de seção do painel. */
export function SectionCard({
  title,
  description,
  children,
  footer,
}: {
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/70">
        <h2 className="font-heading font-bold text-lg text-slate-900">{title}</h2>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <div className="p-6 space-y-4">{children}</div>
      {footer && <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70">{footer}</div>}
    </div>
  )
}

/** Estado de carregamento de uma seção. */
export function SectionLoading({ label = 'Carregando...' }: { label?: string }) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-10 flex flex-col items-center gap-3 text-sky-700">
      <Loader2 className="w-7 h-7 animate-spin" />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  )
}

/** Estado de erro de uma seção, com botão de tentar novamente. */
export function SectionError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-3xl bg-white border border-red-200 shadow-sm p-8 text-center">
      <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
      <p className="text-sm font-semibold text-red-700 mb-1">Falha ao carregar os dados</p>
      <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto break-words">{message}</p>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={onRetry}
        className="rounded-lg font-bold"
      >
        Tentar novamente
      </Button>
    </div>
  )
}
