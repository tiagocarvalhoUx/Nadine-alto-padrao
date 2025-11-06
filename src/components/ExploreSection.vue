<template>
  <section class="py-20 px-6 bg-gray-50">
    <div class="container mx-auto">
      <!-- Explore Options Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(option, index) in exploreOptions"
          :key="index"
          class="relative h-80 rounded-lg overflow-hidden group cursor-pointer"
        >
          <img
            :src="option.image"
            :alt="option.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all"></div>
          <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <div class="bg-white bg-opacity-20 p-6 rounded-lg mb-4 backdrop-blur-sm">
              <component :is="option.icon" class="w-12 h-12" />
            </div>
            <h3 class="text-2xl font-bold text-center">{{ option.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, h } from 'vue'

// Icon components as render functions
const PriceIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-full h-full'
}, [
  h('path', {
    d: 'M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z'
  }),
  h('path', {
    'fill-rule': 'evenodd',
    d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z',
    'clip-rule': 'evenodd'
  })
])

const LifestyleIcon = () => h('svg', {
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-full h-full'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': '2',
    d: 'M13 10V3L4 14h7v7l9-11h-7z'
  })
])

const LocationIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 20 20',
  class: 'w-full h-full'
}, [
  h('path', {
    'fill-rule': 'evenodd',
    d: 'M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z',
    'clip-rule': 'evenodd'
  })
])

const exploreOptions = ref([
  {
    title: 'Explore Por Preço',
    image: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
    icon: PriceIcon
  },
  {
    title: 'Explore por Estilo de Vida',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    icon: LifestyleIcon
  },
  {
    title: 'Explore por Local',
    image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800',
    icon: LocationIcon
  }
])
</script>
