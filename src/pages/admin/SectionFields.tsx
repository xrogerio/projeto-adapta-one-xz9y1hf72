import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { FieldConfig } from '@/pages/admin/useSectionForm'

interface FieldsProps {
  fields: FieldConfig[]
  values: Record<string, string>
  onChange: (field: string, value: string) => void
}

/** Renderiza os campos declarados de uma seção (input, textarea ou lista). */
export function SectionFields({ fields, values, onChange }: FieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((f) => {
        const full = f.type === 'textarea' || f.type === 'array'
        return (
          <div key={f.name} className={full ? 'md:col-span-2 space-y-1.5' : 'space-y-1.5'}>
            <Label htmlFor={`fld-${f.name}`} className="text-xs font-bold text-slate-600">
              {f.label}
            </Label>
            {f.type === 'textarea' || f.type === 'array' ? (
              <Textarea
                id={`fld-${f.name}`}
                rows={f.type === 'array' ? 4 : 3}
                value={values[f.name] ?? ''}
                onChange={(e) => onChange(f.name, e.target.value)}
                placeholder={f.placeholder}
                className="rounded-xl bg-white border-slate-200 focus-visible:ring-sky-400"
              />
            ) : (
              <Input
                id={`fld-${f.name}`}
                type={f.type === 'number' ? 'number' : 'text'}
                value={values[f.name] ?? ''}
                onChange={(e) => onChange(f.name, e.target.value)}
                placeholder={f.placeholder}
                className="rounded-xl h-10 bg-white border-slate-200 focus-visible:ring-sky-400"
              />
            )}
            {f.type === 'array' && <p className="text-[11px] text-slate-400">Um item por linha.</p>}
          </div>
        )
      })}
    </div>
  )
}
