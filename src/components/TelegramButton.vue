<script setup lang="ts">
const TG_URL = 'https://t.me/palpavlovih_sc' 
</script>

<template>
  <a
    :href="TG_URL"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Написати в Telegram"
    class="fixed right-6 bottom-6 z-[60] group"
    data-fb-lead
  >
    <span
      class="relative grid place-items-center w-16 h-16 rounded-full
             bg-[rgba(20,20,24,0.65)] backdrop-blur-md
             ring-1 ring-white/8
             shadow-[inset_0_1px_0_0_rgba(255,255,255,.08),0_10px_30px_-10px_rgba(255,90,89,.55)]
             transition-all duration-300 ease-out
             group-hover:scale-[1.03] group-active:scale-95
             outline-none"
    >
      <span
        class="pointer-events-none absolute inset-0 rounded-full
               bg-[radial-gradient(120%_80%_at_50%_-20%,rgba(255,90,89,.25),transparent_55%)]
               opacity-80"
      ></span>

      <svg
        viewBox="0 0 24 24"
        class="relative z-10 w-7 h-7 text-white transition-transform duration-300
               group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M9.03 15.5 8.9 18.2a1 1 0 0 0 1.6.8l2.3-1.7 3.9 2.9a1 1 0 0 0 1.6-.6l3.7-16.4a1 1 0 0 0-1.3-1.2L2.5 9a1 1 0 0 0 .1 1.9l6 1.1 10.6-6.5-10.17 10z"
        />
      </svg>

      <span
        class="pointer-events-none absolute -inset-2 rounded-full
               blur-xl opacity-70
               bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,90,89,.35),transparent_60%)]
               transition-opacity duration-300
               group-hover:opacity-100"
      ></span>
    </span>
  </a>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  a .breath {
    animation: breath 4s ease-in-out infinite;
  }
  @keyframes breath {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.02); }
  }
}
</style>
