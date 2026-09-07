import { useEffect, useState } from 'react'

export function useScrollSpy(ids: readonly string[], offset = 120) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (elements.length === 0) return

    const onScroll = () => {
      const fromTop = window.scrollY + offset
      let current = elements[0].id

      for (const el of elements) {
        if (el.offsetTop <= fromTop) current = el.id
      }

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
      if (nearBottom) current = elements[elements.length - 1].id

      setActiveId(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return activeId
}
