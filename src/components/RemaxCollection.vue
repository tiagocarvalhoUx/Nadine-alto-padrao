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
            <h3 class="text-xl font-semibold mb-2">{{ $t(property.titleKey) }}</h3>
            <p class="text-sm mb-2">{{ $t(property.locationKey) }}</p>
            <p class="text-lg font-bold">{{ formatPropertyPrice(property) }}</p>
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="text-center">
        <button class="border-2 border-white text-white px-10 py-4 rounded-md font-semibold hover:bg-white hover:text-remax-darkBlue transition-all text-lg">
          {{ $t('sections.discoverLuxury') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { usePropertyStore } from '../stores/propertyStore'
import { useCurrencyStore } from '../stores/currencyStore'

const store = usePropertyStore()
const currencyStore = useCurrencyStore()

const properties = ref([
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    titleKey: 'properties.multilevelHome',
    locationKey: 'properties.montrealQC',
    priceAmount: 18500000,
    priceCurrency: 'CAD'
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    titleKey: 'properties.villa',
    locationKey: 'properties.pembrokeSV',
    priceAmount: 3000000,
    priceCurrency: 'USD'
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    titleKey: 'properties.luxuryApartment',
    locationKey: 'properties.dubaiUAE',
    priceAmount: 4500000,
    priceCurrency: 'USD'
  }
])

function formatPropertyPrice(property) {
  if (!property || property.priceAmount == null) return property.price || '—'

  // Converter o preço para a moeda selecionada
  const convertedAmount = currencyStore.convertCurrency(
    property.priceAmount,
    property.priceCurrency,
    currencyStore.selectedCurrency
  )

  // Formatar com o símbolo da moeda selecionada
  return currencyStore.formatCurrency(convertedAmount, currencyStore.selectedCurrency)
}
</script>
 
