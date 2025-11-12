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
                  <h3 class="text-xl font-semibold mb-2">{{ property.title }}</h3>
                  <p class="text-sm mb-1">{{ property.location }}</p>
                  <p class="text-sm mb-2">{{ property.description }}</p>
                  <p class="text-lg font-bold">{{ property.displayPrice }}</p>
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCurrencyStore } from '@/stores/currencyStore'

const { t } = useI18n()
const currentSlide = ref(0)
const currencyStore = useCurrencyStore()

// Propriedades base com preço e moeda original
const baseProperties = [
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    title: t('properties.vacantLand'),
    location: t('properties.stAnneBay'),
    description: t('property.askPrice'),
    price: null,
    currency: null
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
    title: t('properties.apartment'),
    location: t('properties.pragueCZ'),
    price: 1950000,
    currency: 'EUR'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    title: t('properties.familyHome'),
    location: t('properties.vancouverBC'),
    price: 8500000,
    currency: 'CAD'
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    title: t('properties.modernVillaSpain'),
    location: t('properties.marbellaSpain'),
    price: 6200000,
    currency: 'EUR'
  },
  {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    title: t('properties.luxuryPenthouse'),
    location: t('properties.manhattanNY'),
    price: 12500000,
    currency: 'USD'
  },
  {
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    title: t('properties.urbanHouse'),
    location: t('properties.kensingtonLondon'),
    price: 4850000,
    currency: 'GBP'
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    title: t('properties.beachfrontHouse'),
    location: t('properties.goldCoastAU'),
    price: 3500000,
    currency: 'USD'
  },
  {
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    title: t('properties.contemporaryVilla'),
    location: t('properties.monacoFR'),
    price: 18900000,
    currency: 'EUR'
  },
  {
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    title: t('properties.panoramicApartment'),
    location: t('properties.singaporeAsia'),
    price: 6500000,
    currency: 'USD'
  }
]

const properties = computed(() => {
  return baseProperties.map(property => {
    if (!property.price || !property.currency) {
      return {
        ...property,
        displayPrice: property.description || ''
      }
    }

    // Converter o preço para a moeda selecionada
    const convertedPrice = currencyStore.convertCurrency(
      property.price,
      property.currency,
      currencyStore.selectedCurrency
    )

    // Formatar o preço convertido
    const formattedPrice = currencyStore.formatCurrency(convertedPrice)

    return {
      ...property,
      displayPrice: formattedPrice
    }
  })
})

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
