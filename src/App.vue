<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'

import { onMounted, onBeforeUnmount, ref } from 'vue'
import ReviewCard from '@/components/ReviewCard.vue'
import { useReviews } from '@/useReviews'
import stepsBg from '@/assets/bg-services.png'
import kpiBg from '@/assets/bg-kpi-red-glow.png'
import bgHeader from '@/assets/bg-header.png'
import bgAbout from '@/assets/bg-about.png'
import CounterStat from '@/components/CounterStat.vue'
import bgReviews from '@/assets/bg-reviews-red-contrast.png'
import TelegramButton from '@/components/TelegramButton.vue' 

const TG_URL = 'https://t.me/palpavlovih_sc' 

const { latestApproved } = useReviews()
const year = new Date().getFullYear()
const reviewsBgStyle = ref<Record<string, string>>({
  backgroundImage: `url(${bgReviews})`,
  backgroundSize: 'cover',
  backgroundPosition: '50% 50%',
});

function onReviewsMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;   // 0..1
  const y = (e.clientY - r.top) / r.height;   // 0..1
  const px = 50 + (x - 0.5) * 4;
  const py = 50 + (y - 0.5) * 4;
  reviewsBgStyle.value = {
    backgroundImage: `url(${bgReviews})`,
    backgroundSize: 'cover',
    backgroundPosition: `${px}% ${py}%`,
  };
}
function onReviewsLeave() {
  reviewsBgStyle.value = {
    backgroundImage: `url(${bgReviews})`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
  };
}
const ctaBgStyle = ref<Record<string, string>>({
  backgroundImage: `url(${bgReviews})`, 
  backgroundSize: 'cover',
  backgroundPosition: '50% 50%',
});

function onCtaMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;   
  const y = (e.clientY - r.top) / r.height;   
  const px = 50 + (x - 0.5) * 3.2;            
  const py = 50 + (y - 0.5) * 3.2;
  ctaBgStyle.value = {
    backgroundImage: `url(${bgReviews})`,
    backgroundSize: 'cover',
    backgroundPosition: `${px}% ${py}%`,
  };
}
function onCtaLeave() {
  ctaBgStyle.value = {
    backgroundImage: `url(${bgReviews})`,
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
  };
}

const hero = {
  title: 'Компанія ЛІДЕР',
  subtitle: 'Безкоштовні консультації.',
  cta1: 'Подати заявку',
  cta2: 'Категорії'
}

const aboutText = `Наша компанія надає повний супровід у процесі підготовки до отримання водійських посвідчень усіх категорій, а також допомагає з оформленням супутніх автомобільних документів.`

const whyUs = [
  { t:'Найкращі ціни та якість', d:'Доступно без втрати якості навчання.' },
  { t:'Досвідчені консультанки', d:'Консультуємо впевнено й безпечно.' },
  { t:'Гнучкий графік', d:'Усе проходить дистанційно.' },
  { t:'Полюблюємо свою справу', d:'Доброзичлива атмосфера та підтримка.' },
]

const steps = [
  { n:'1. Написати консультанту', d:'Обери місто, категорію, групу — подай документи онлайн .' },
  { n:'2. Теорія — зручно та ефективно', d:'Відвідування не обовязкове.' },
  { n:'3. Іспит з теорії', d:'Складаєш іспит у сервісному центрі МВС.' },
  { n:'4. Практичне навчання', d:'Виїзди з інструктором у реальних умовах зараховуються .' },
  { n:'5. Практичний іспит', d:'В автошколі, а потім у сервісному центрі без присутності .' },
  { n:'6. Вітаємо! Ви водій', d:'Отримуєш посвідчення та починаєш шлях за кермом.' },
]

const services = [
  { t:'Права A • B • C • D • E', d:'Повний курс підготовки, відкриття нових категорій, перепідготовка після анулювання прав.' },
  { t:'Відновлення та дублікат', d:'Допомога у відновленні/дублікаті прав, повернення після ст.130 КУпАП.' },
  { t:'Посвідчення машиніста/спецтехніка', d:'Трактор, екскаватор, бульдозер, комбайн, навантажувач — офіційні курси і документи.' },
  { t:'Техпаспорт', d:'Отримання або відновлення технічного паспорта на ТЗ.' },
  { t:'Підвищення категорії', d:'Додавання нових категорій для професійного зростання.' },
  { t:'Безкоштовні консультації', d:'Telegram, Viber або email — відповімо швидко.' },
]

const guarantees = [
  { t:'Офіційно', d:'Усі документи вносяться до бази ТСЦ (МВС).' },
  { t:'Оплата при отриманні', d:'Без передоплат, післяплата по всій Україні.' },
  { t:'Швидко', d:'Пришвидшене оформлення та доставка кур’єром.' },
  { t:'Прозоро', d:'Доступна ціна й повна конфіденційність.' },
]

const kpis = [
  { v:'80+', l:'Звернень за день' },
  { v:'85%', l:'Навчаються з нами' },
  { v:'2500+', l:'Водіїв' },
  { v:'Топ', l:'Сервіс для клієнтів' },
]

const team = [
  { name:'Олена Мартиненко', role:'Інструктор', photo:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop' },
  { name:'Олександр Іваненко', role:'Менеджер підтримки', photo:'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop' },
  { name:'Ірина Коваленко', role:'Технік обладнання', photo:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop' },
]

const posts = [
  { date:'19.07.2025', tag:'#sunset', title:'Механіка чи автомат: що краще для кросовера?' },
  { date:'16.07.2025', tag:'#life', title:'10 універсалів, що їдуть як спорткари' },
  { date:'21.07.2025', tag:'#instalike', title:'3 мінуси АКП узимку' },
]
</script>

<template>
  <div class="min-h-screen bg-[#0e0f12] text-white">
<NavBar />

    <section class="section relative overflow-hidden">
      <!-- Фон із повільним зумом -->
      <img 
        class="absolute inset-0 w-full h-full object-cover opacity-40 animate-slow-zoom"
        src="@/assets/bg-header.png"
        alt="background"
      />
      <div class="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 items-center">
        <ScrollReveal effect="slide-right">
          <h1 class="text-5xl sm:text-7xl font-extrabold leading-tight">{{ hero.title }}</h1>
          <p class="mt-4 text-2xl text-white/80">{{ hero.subtitle }}</p>
          <div class="mt-8 flex gap-3">
            <a href="#contact" class="btn-primary">{{ hero.cta1 }}</a>
            <a href="#services" class="btn-outline">{{ hero.cta2 }}</a>
          </div>
          <div class="mt-6 flex gap-3">
            <span class="chip">Офіційно</span>
            <span class="chip">Еко-підхід</span>
            <span class="chip">Швидке оформлення</span>
          </div>
        </ScrollReveal>

        <ScrollReveal effect="zoom">
          <img 
            class="w-full rounded-3xl border border-white/10 shadow-soft animate-float"
            src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop"
            alt="car"
          />
        </ScrollReveal>
      </div>
    </section>

    <section id="about" class="section relative overflow-hidden">
      <img 
        class="absolute inset-0 w-full h-full object-cover animate-zoom"
        src="@/assets/bg-about.png"
        alt="background"
      />
      <div class="absolute inset-0 bg-black/50"></div>

      <div class="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-8 items-center">
        <ScrollReveal effect="fade-up">
          <h2 class="text-4xl font-extrabold">Про нас</h2>
          <p class="mt-3 text-white/90">{{ aboutText }}</p>
          <div class="mt-6 grid sm:grid-cols-2 gap-4">
            <div 
              v-for="(b,i) in whyUs" 
              :key="i" 
              class="card p-6 bg-black/40 backdrop-blur-lg border border-white/10 hover:border-brand-400 transition-all duration-500 hover:scale-105"
            >
              <p class="font-semibold text-brand-300">{{ b.t }}</p>
              <p class="text-white/70 mt-1">{{ b.d }}</p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal effect="zoom">
          <img 
            class="w-full rounded-3xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-700"
            src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop" 
            alt="wash"
          >
        </ScrollReveal>
      </div>
    </section>

<section
  id="steps"
  class="section relative overflow-hidden bg-cover bg-center"
  :style="{ backgroundImage: `url(${stepsBg})` }"
>
  <div class="absolute inset-0 bg-black/25 backdrop-blur-[1px]"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 items-center">
    <div v-reveal="'zoom'">
      <img
        class="w-full rounded-3xl border border-white/10 shadow-soft"
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"
        alt="steps"
      />
    </div>

    <div v-reveal="'fade-up'" data-delay="80">
      <h2 class="text-4xl font-extrabold">Етапи отримання посвідчення</h2>
      <ol class="mt-6 space-y-4">
        <li
          v-for="(s, idx) in steps"
          :key="s.n"
          class="flex items-start gap-3"
          v-reveal="'fade-up'"
          :data-delay="(idx + 1) * 80"
        >
          <span class="mt-2 w-3 h-3 rounded-full bg-brand-400/90 shadow-[0_0_12px_2px_rgba(255,90,89,.7)] flex-shrink-0"></span>
          <div>
            <p class="text-xl font-semibold">{{ s.n }}</p>
            <p class="text-white/70">{{ s.d }}</p>
          </div>
        </li>
      </ol>
    </div>
  </div>
</section>


<section
  id="stats"
  class="section relative overflow-hidden bg-cover bg-center"
  :style="{ backgroundImage: `url(${kpiBg})` }"
>
  <div class="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-4 grid sm:grid-cols-4 gap-6">
    <div v-reveal="'slide-right'">
      <CounterStat value="80+" label="Звернень за день" />
    </div>
    <div v-reveal="'slide-right'" data-delay="80">
      <CounterStat value="85%" label="Навчаються з нами" :delay="80" />
    </div>
    <div v-reveal="'slide-right'" data-delay="160">
      <CounterStat value="2500+" label="Водіїв" :delay="160" />
    </div>
    <div v-reveal="'slide-right'" data-delay="240">
      <CounterStat value="Топ" label="Сервіс для клієнтів" :delay="240" />
    </div>
  </div>
</section>

<section
  id="reviews"
  class="section relative overflow-hidden bg-cover bg-center"
  :style="reviewsBgStyle"
  @mousemove="onReviewsMove"
  @mouseleave="onReviewsLeave"
>
  <div class="absolute inset-0 bg-black/40 backdrop-blur-[1px] animate-soft-fade"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-4">
    <h2 class="text-4xl font-extrabold text-center mb-10" v-reveal="'fade-up'">
    </h2>

    <div class="grid md:grid-cols-2 gap-6 justify-items-center">
      <div
        v-for="(r, i) in latestApproved"
        :key="r.id"
        class="w-full transition duration-500 will-change-transform review-tilt"
        v-reveal="'slide-right'"
        :data-delay="i * 90"
      >
        <ReviewCard :text="r.text" :author="r.author" />
      </div>
    </div>
  </div>

  <div class="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(800px_200px_at_50%_-10%,rgba(255,90,89,.35),transparent_60%)] animate-pan-slow"></div>
</section>

<section
  id="contact"
  class="section relative overflow-hidden bg-cover bg-center"
  :style="ctaBgStyle"
  @mousemove="onCtaMove"
  @mouseleave="onCtaLeave"
>
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
    <div class="absolute inset-0 opacity-50 mix-blend-screen bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,60,60,.25),transparent)]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_120%,rgba(0,0,0,.8),transparent)]"></div>
  </div>

  <div class="relative z-10 mx-auto max-w-5xl px-4 text-center">
    <ScrollReveal effect="fade-up">
      <h2
        class="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 animated-title inline-block"
      >
        Потрібна допомога з отриманням або відновленням документів?
      </h2>
    </ScrollReveal>

    <ScrollReveal effect="fade-up" :delay="120">
      <p class="text-white/85 md:text-lg mb-10">
        Напишіть нам у Telegram — відповімо швидко, надамо консультацію та допоможемо оформити всі документи.
      </p>
    </ScrollReveal>

    <ScrollReveal effect="slide-right" :delay="220">
<a
  href="https://t.me/palpavlovih_sc"
  target="_blank"
  rel="noopener noreferrer"
  class="btn-glass inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold tg-btn"
  data-fb-lead
  aria-label="CTA: Написати в Telegram"
>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             class="w-6 h-6" fill="currentColor" aria-hidden="true">
          <path d="M9.8 16.6 9.9 13l7-6.5c.3-.3-.1-.4-.5-.2L7.7 12.2l-3.4-1.1c-.7-.2-.7-.7.2-1.1l16-6.2c.7-.3 1.3.2 1 1.3l-2.7 16c-.2.9-.7 1.1-1.5.7l-4.1-3-2 1.9c-.2.2-.3.3-.6.3l.2-4.4z"/>
        </svg>
        Написати в Telegram
      </a>
    </ScrollReveal>
  </div>
</section>


<footer class="relative">
  <div class="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

  <div class="mx-auto max-w-7xl px-4 py-7 grid gap-6 md:grid-cols-[1fr_auto_auto] items-center">
    <p class="text-sm text-white/65">
      © {{ year }} <span class="font-semibold text-white/90">Avto-School24 Online</span>
    </p>

    <nav class="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
      <a href="#" class="footer-link">Умови використання</a>
      <a href="#" class="footer-link">Політика конфіденційності</a>
      <a href="#" class="footer-link">Cookies</a>
    </nav>

    <div class="flex justify-start md:justify-end gap-3">
<a
  href="https://t.me/palpavlovih_sc"
  target="_blank"
  rel="noopener noreferrer"
  class="social-btn tg-btn"
  data-fb-lead
  aria-label="Footer: Telegram"
  title="Telegram"
>
        <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current">
          <path d="M9.03 15.5 8.9 18.2a1 1 0 0 0 1.6.8l2.3-1.7 3.9 2.9a1 1 0 0 0 1.6-.6l3.7-16.4a1 1 0 0 0-1.3-1.2L2.5 9a1 1 0 0 0 .1 1.9l6 1.1 10.6-6.5-10.17 10z"/>
        </svg>
      </a>
    </div>
  </div>
</footer>
<TelegramButton />

  </div>
</template>
