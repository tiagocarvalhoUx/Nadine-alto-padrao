<template>
  <section class="py-20 px-6 bg-gray-50">
    <div class="container mx-auto">
      <!-- Title -->
      <h2 class="text-4xl md:text-5xl font-bold text-remax-blue text-center mb-12">
        Destinos em Destaque
      </h2>

      <!-- Destinations Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          v-for="(destination, index) in destinations"
          :key="index"
          class="relative h-96 rounded-lg overflow-hidden group cursor-pointer"
        >
          <img
            :src="destination.image"
            :alt="destination.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all"></div>
          <div class="absolute top-6 left-6">
            <div class="bg-white text-remax-blue px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg">
              <span class="font-semibold">{{ destination.name }}</span>
              <svg class="w-5 h-5 text-remax-red" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- More Destinations Button -->
      <div class="text-center">
        <button class="bg-remax-blue text-white px-10 py-4 rounded-md font-semibold hover:bg-remax-blue-dark transition-all inline-flex items-center space-x-2">
          <span>Mais Destinos</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const destinations = ref([
  {
    name: 'London',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200'
  },
  {
    name: 'Florida',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200'
  }
])
</script>
