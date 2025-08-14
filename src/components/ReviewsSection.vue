<!-- src/components/ReviewsSection.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import ReviewCard from './ReviewCard.vue'
import { useReviews } from '@/useReviews'

import bgReviews from '@/assets/bg-kpi-red-glow.png'

const { approved, pending, addReview, approve, reject } = useReviews()

const form = ref({ text: '', name: '', anonymous: true })
const sent = ref(false)

function submit() {
  if (!form.value.text.trim()) return
  addReview(form.value.text, form.value.name, form.value.anonymous)
  sent.value = true
  form.value = { text: '', name: '', anonymous: true }
  setTimeout(() => sent.value = false, 3000)
}

const showAdmin = ref(false)

function onKey(e: KeyboardEvent) {
  if (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'm')) {
    e.preventDefault()
    showAdmin.value = !showAdmin.value
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <section
    id="reviews"
    class="section relative overflow-hidden bg-cover bg-center"
    :style="{ backgroundImage: `url(${bgReviews})` }"
  >
    <div class="absolute inset-0 bg-black/40"></div>

    <div class="relative z-10 mx-auto max-w-7xl px-4">
      <h2 class="text-4xl font-extrabold mb-8">Відгуки</h2>

      <div class="grid md:grid-cols-2 gap-6">
        <ReviewCard
          v-for="r in approved"
          :key="r.id"
          :text="r.text"
          :author="r.author"
        />
      </div>

      <div
        class="mt-10 rounded-2xl border border-white/10 bg-white/[0.05] p-6 md:p-8 backdrop-blur"
      >
        <h3 class="text-xl font-semibold mb-3">Залишити відгук</h3>

        <form @submit.prevent="submit" class="grid md:grid-cols-2 gap-4">
          <textarea
            v-model="form.text"
            rows="4"
            required
            placeholder="Ваші враження..."
            class="rounded-xl px-4 py-3 bg-white text-black md:col-span-2"
          />
          <input
            v-model="form.name"
            placeholder="Ім'я (необов’язково)"
            class="rounded-xl px-4 py-3 bg-white text-black"
            :disabled="form.anonymous"
          />
          <label class="flex items-center gap-3 text-white/85">
            <input
              type="checkbox"
              v-model="form.anonymous"
              class="scale-110 accent-brand-500"
            />
            Публікувати анонімно
          </label>
          <button class="btn-primary md:col-span-2 justify-center">Надіслати</button>
        </form>

        <p
          v-if="sent"
          class="mt-3 text-sm text-white/80"
        >
          Дякуємо! Відгук відправлено на модерацію та з’явиться після схвалення.
        </p>
        <p class="mt-2 text-xs text-white/50">
          Підказка для адміністратора: натисни <b>Ctrl + Shift + M</b> для відкриття панелі модерації.
        </p>
      </div>
    </div>

    <!-- МОДАЛКА МОДЕРАЦІЇ -->
    <div
      v-if="showAdmin"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
    >
      <div class="w-full max-w-3xl rounded-2xl bg-[#15161a] border border-white/10">
        <div class="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h4 class="font-semibold">Модерація відгуків ({{ pending.length }})</h4>
          <button class="btn-outline" @click="showAdmin = false">Закрити</button>
        </div>

        <div class="max-h-[60vh] overflow-y-auto p-5 space-y-4">
          <div
            v-if="pending.length === 0"
            class="text-white/70 text-sm"
          >
            Немає нових відгуків на модерацію.
          </div>

          <div
            v-for="r in pending"
            :key="r.id"
            class="rounded-xl border border-white/10 bg-white/[0.04] p-4"
          >
            <p class="text-white/90">{{ r.text }}</p>
            <p class="mt-2 text-xs text-white/60">Автор: {{ r.author }} · {{ new Date(r.createdAt).toLocaleString() }}</p>
            <div class="mt-4 flex gap-3">
              <button class="btn-primary" @click="approve(r.id)">Схвалити</button>
              <button class="btn-outline" @click="reject(r.id)">Відхилити</button>
            </div>
          </div>
        </div>

        <div class="px-5 py-4 border-t border-white/10 text-xs text-white/50">
          Натисни <b>Ctrl + Shift + M</b> ще раз, щоб швидко закрити панель.
        </div>
      </div>
    </div>
  </section>
</template>
