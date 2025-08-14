import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import { initAOS, refreshAOS } from './plugins/aos'
import RevealDirective from './directives/reveal' // якщо у тебе export { RevealDirective } — заміни на { RevealDirective } замість default

declare global {
  interface Window {
    fbq?: (...args: any[]) => void
  }
}

const app = createApp(App)
app.directive('reveal', RevealDirective)
app.mount('#app')

requestAnimationFrame(() => {
  initAOS()
})

if (import.meta && import.meta.hot) {
  import.meta.hot.on('vite:afterUpdate', () => {
    setTimeout(() => {
      refreshAOS()
    }, 0)
  })
}

/* ============================
   Facebook Pixel Lead tracking
   ============================ */

function safeFbq(...args: any[]) {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq(...args)
    }
  } catch {}
}

function getLabel(el: Element | null): string {
  if (!el) return 'telegram button'
  const t = (el.textContent || '').trim()
  return t || (el.getAttribute('aria-label') || 'telegram button')
}

document.addEventListener('click', (ev) => {
  const target = ev.target as HTMLElement | null
  if (!target) return

  const el = target.closest('a,button') as HTMLAnchorElement | HTMLButtonElement | null
  if (!el) return

  const href = (el as HTMLAnchorElement).href || ''
  const isTelegramHref = href.includes('t.me') || href.startsWith('tg:')
  const isTgClass = el.classList.contains('tg-btn')
  const hasAttr = el.hasAttribute('data-fb-lead')

  if (isTelegramHref || isTgClass || hasAttr) {
    safeFbq('track', 'Lead', {
      source: 'telegram',
      label: getLabel(el),
      href: href || undefined,
    })
  }
})
