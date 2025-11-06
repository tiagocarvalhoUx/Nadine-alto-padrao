<template>
  <section class="py-20 px-6 bg-white">
    <div class="container mx-auto">
      <!-- Title -->
      <h2 class="text-4xl md:text-5xl font-bold text-remax-blue mb-12">
        {{ $t('sections.uniqueProperties') }}
      </h2>

      <!-- Carousel Container -->
      <div class="relative">
        <!-- Properties Carousel -->
        <div class="overflow-hidden">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(property, index) in properties"
              :key="index"
              class="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-3"
            >
              <div class="relative h-96 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  :src="property.image"
                  :alt="property.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 class="text-xl font-semibold mb-2">{{ $t(property.titleKey) }}</h3>
                  <p class="text-sm mb-1">{{ $t(property.locationKey) }}</p>
                  <p class="text-lg font-bold">{{ formatPropertyPrice(property) }}</p>
                </div>
                <div class="absolute top-4 right-4">
                  <div class="bg-remax-red text-white px-4 py-2 rounded-md font-semibold">
                    REMAX
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button
          @click="prevSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePropertyStore } from '../stores/propertyStore'
import { useCurrencyStore } from '../stores/currencyStore'

const { t } = useI18n()
const store = usePropertyStore()
const currencyStore = useCurrencyStore()

const currentSlide = ref(0)

const properties = ref([
  {
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
    titleKey: 'properties.vacantLand',
    locationKey: 'properties.stAnneBay',
    priceAmount: null,
    priceCurrency: null
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    titleKey: 'properties.apartment',
    locationKey: 'properties.pragueCZ',
    priceAmount: 45000000,
    priceCurrency: 'EUR'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    titleKey: 'properties.familyHome',
    locationKey: 'properties.vancouverBC',
    priceAmount: 8500000,
    priceCurrency: 'CAD'
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    titleKey: 'properties.modernVillaSpain',
    locationKey: 'properties.marbellaSpain',
    priceAmount: 6200000,
    priceCurrency: 'EUR'
  }
])

function formatPropertyPrice(property) {
  if (!property || property.priceAmount == null) {
    return t('property.askPrice')
  }

  // Converter o preço para a moeda selecionada
  const convertedAmount = currencyStore.convertCurrency(
    property.priceAmount,
    property.priceCurrency,
    currencyStore.selectedCurrency
  )

  // Formatar com o símbolo da moeda selecionada
  return currencyStore.formatCurrency(convertedAmount, currencyStore.selectedCurrency)
}

const nextSlide = () => {
  if (currentSlide.value < properties.value.length - 3) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}
</script>
