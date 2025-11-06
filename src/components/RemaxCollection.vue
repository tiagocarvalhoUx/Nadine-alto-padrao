<template>
  <section class="bg-remax-darkBlue py-20 px-6">
    <div class="container mx-auto">
      <!-- Title -->
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-bold text-white mb-2">THE</h2>
        <h2 class="text-5xl md:text-6xl font-bold text-white mb-2">
          <span class="text-white">NAD</span><span class="text-nadine-bronze">INE</span>
        </h2>
        <h2 class="text-5xl md:text-6xl font-bold text-white tracking-widest">COLLECTION</h2>
      </div>

      <!-- Properties Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div
          v-for="(property, index) in properties"
          :key="index"
          class="relative group overflow-hidden rounded-lg cursor-pointer h-96"
        >
          <img
            :src="property.image"
            :alt="property.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 class="text-xl font-semibold mb-2">{{ property.title }}</h3>
            <p class="text-sm mb-2">{{ property.location }}</p>
            <p class="text-lg font-bold">{{ property.price }}</p>
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="text-center">
        <button class="border-2 border-white text-white px-10 py-4 rounded-md font-semibold hover:bg-white hover:text-remax-darkBlue transition-all text-lg">
          DESCUBRA O LUXO
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const properties = ref([
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    title: 'Casa em vários níveis',
    location: 'Montréal (Westmount), Quebeque, Canadá',
    price: '18.500.000 CDN / 13.163.984,72 USD'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    title: 'Vila',
    location: 'Pembroke, St Vincent, Caribe e América Central',
    price: '3.000.000 USD'
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    title: 'Apartamento de Luxo',
    location: 'Dubai Marina, Dubai, Emirados Árabes',
    price: '4.500.000 USD'
  }
])
</script>
