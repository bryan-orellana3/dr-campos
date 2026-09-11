import React from 'react';

/** Título y descripción por ruta: una sola app, dos páginas con identidad propia. */
export function useDocumentTitle(title, description) {
  React.useEffect(() => {
    const prev = document.title;
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content');
    if (meta && description) meta.setAttribute('content', description);
    return () => {
      document.title = prev;
      if (meta && prevDesc != null) meta.setAttribute('content', prevDesc);
    };
  }, [title, description]);
}
