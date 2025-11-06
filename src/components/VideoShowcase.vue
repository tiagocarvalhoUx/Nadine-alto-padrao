<template>
  <section class="relative h-screen w-full overflow-hidden bg-black">
    <!-- Video Carousel -->
    <div class="relative h-full w-full">
      <!-- Videos -->
      <transition-group name="video-fade">
        <div
          v-for="(video, index) in videos"
          v-show="currentIndex === index"
          :key="index"
          class="absolute inset-0 w-full h-full"
        >
          <!-- Video Element -->
          <video
            :src="video.videoUrl"
            :poster="video.posterUrl"
            class="w-full h-full object-cover"
            autoplay
            loop
            muted
            playsinline
          ></video>

          <!-- Dark Overlay -->
          <div class="absolute inset-0 bg-black bg-opacity-40"></div>

          <!-- Centered Text "você" -->
          <div class="absolute inset-0 flex items-center justify-center">
            <h2 class="text-6xl md:text-8xl font-bold text-luxury-orange drop-shadow-2xl">
              você
            </h2>
          </div>

          <!-- Property Info - Bottom Left -->
          <div class="absolute bottom-8 left-8 text-white z-20">
            <h3 class="text-2xl font-bold mb-2">{{ video.type }}</h3>
            <p class="text-lg">{{ video.location }} | {{ formatPropertyPrice(video) }}</p>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-4 rounded-full transition-all backdrop-blur-sm"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-4 rounded-full transition-all backdrop-blur-sm"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Language/Translation Icon - Bottom Right -->
    <button class="absolute bottom-8 right-8 z-30 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all">
      <svg class="w-6 h-6 text-remax-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    </button>

    <!-- Fullscreen Icon - Top Right -->
    <button
      @click="toggleFullscreen"
      class="absolute top-8 right-8 z-30 text-white hover:text-gray-300 transition-colors"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    </button>

    <!-- Progress Indicators -->
    <div class="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
      <button
        v-for="(video, index) in videos"
        :key="index"
        @click="goToSlide(index)"
        class="transition-all"
        :class="currentIndex === index ? 'w-12 h-2 bg-white' : 'w-2 h-2 bg-white bg-opacity-50 hover:bg-opacity-75'"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePropertyStore } from '../stores/propertyStore'

const propertyStore = usePropertyStore()

const currentIndex = ref(0)

// Vídeos de propriedades de luxo
// Nota: Para produção, use URLs de vídeos reais do seu servidor ou CDN
// Por enquanto, usando imagens estáticas como fallback até adicionar vídeos reais
const videos = ref([
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600',
    type: 'LUXURY CONDO',
    location: 'Kathu, Phuket, Thailand',
    priceAmount: 5500000,
    priceCurrency: 'USD'
  },
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600',
    type: 'PENTHOUSE',
    location: 'Dubai Marina, Emirates',
    priceAmount: 8900000,
    priceCurrency: 'USD'
  },
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600',
    type: 'BEACHFRONT VILLA',
    location: 'Malibu, California',
    priceAmount: 12500000,
    priceCurrency: 'USD'
  },
  {
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600',
    type: 'MODERN APARTMENT',
    location: 'Manhattan, New York',
    priceAmount: 6200000,
    priceCurrency: 'USD'
  }
])

function formatPropertyPrice(property) {
  if (!property || property.priceAmount == null) return property.price || '—'
  const formatter = new Intl.NumberFormat('pt-PT', { 
    style: 'currency', 
    currency: property.priceCurrency || 'USD'
  })
  return formatter.format(property.priceAmount)
}

let intervalId = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % videos.value.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? videos.value.length - 1 : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

onMounted(() => {
  // Auto-advance carousel every 8 seconds
  intervalId = setInterval(nextSlide, 8000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.video-fade-enter-active, .video-fade-leave-active {
  transition: opacity 1.5s ease;
}
.video-fade-enter-from, .video-fade-leave-to {
  opacity: 0;
}
</style>
