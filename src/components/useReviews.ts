import { ref, computed } from "vue"

export type Review = {
  id: string
  text: string
  name?: string
  anonymous?: boolean
  createdAt: number
  approved?: boolean
}

const LS_APPROVED = "reviews.approved"
const LS_PENDING = "reviews.pending"

const load = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const save = (key: string, val: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch {}
}

const approved = ref<Review[]>(
  load<Review[]>(LS_APPROVED, [
    { id: "seed-1", text: "“Скористалися послугами — все офіційно та в строк.”", createdAt: Date.now(), approved: true },
    { id: "seed-2", text: "“Доступна ціна і чудова підтримка.”", createdAt: Date.now(), approved: true }
  ])
)

const pending = ref<Review[]>(load<Review[]>(LS_PENDING, []))

save(LS_APPROVED, approved.value)
save(LS_PENDING, pending.value)

const latestApproved = computed(() =>
  [...approved.value].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6)
)

const pendingCount = computed(() => pending.value.length)

const newId = () => {
  try {
    // @ts-ignore
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID()
  } catch {}
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function addReview(text: string, name?: string, anonymous = true) {
  const r: Review = {
    id: newId(),
    text: text.trim(),
    name: name?.trim() || undefined,
    anonymous,
    createdAt: Date.now(),
    approved: false
  }
  pending.value.unshift(r)
  save(LS_PENDING, pending.value)
  return r
}

function submitAnonymous(text: string) {
  return addReview(text, undefined, true)
}

function approve(id: string) {
  const i = pending.value.findIndex(r => r.id === id)
  if (i >= 0) {
    const item = pending.value.splice(i, 1)[0]
    item.approved = true
    approved.value.push(item)
    save(LS_PENDING, pending.value)
    save(LS_APPROVED, approved.value)
    return true
  }
  return false
}

function reject(id: string) {
  const i = pending.value.findIndex(r => r.id === id)
  if (i >= 0) {
    pending.value.splice(i, 1)
    save(LS_PENDING, pending.value)
    return true
  }
  return false
}

const isAdminOpen = ref(false)
const toggleAdmin = () => (isAdminOpen.value = !isAdminOpen.value)
const openAdmin = () => (isAdminOpen.value = true)
const closeAdmin = () => (isAdminOpen.value = false)

export function useReviews() {
  return {
    approved,
    pending,
    latestApproved,
    pendingCount,
    isAdminOpen,
    addReview,
    submitAnonymous,
    approve,
    reject,
    toggleAdmin,
    openAdmin,
    closeAdmin
  }
}
