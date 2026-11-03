import React from 'react'

/**
 * Renderiza o título da marca estilizando o "&" em laranja,
 * exatamente como no design original do site.
 */
export function renderBrandTitle(title: string): React.ReactNode {
  const parts = title.split('&')
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}
        <span className="text-orange-500">&</span>
        {parts[1]}
      </>
    )
  }
  return <>{title}</>
}
