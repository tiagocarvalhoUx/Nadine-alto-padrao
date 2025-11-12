<template>
  <div class="relative h-screen w-full overflow-hidden">
    <!-- Carousel Items -->
    <transition-group name="fade">
      <div
        v-for="(property, index) in properties"
        v-show="currentIndex === index"
        :key="index"
        class="absolute inset-0 w-full h-full"
      >
        <div
          class="w-full h-full bg-cover bg-center"
          :style="{ backgroundImage: `url(${property.image})` }"
        >
          <div class="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      </div>
    </transition-group>

    <!-- Content Overlay -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
      <!-- Main Title -->
      <h1 class="text-5xl md:text-7xl font-bold text-center mb-8 drop-shadow-2xl">
        {{ $t('hero.carouselTitle') }}
      </h1>

      <!-- Buttons -->
      <div class="flex space-x-4 mb-8">
        <button
          :class="searchType === 'buy' ? 'bg-nadine-cream text-nadine-black' : 'bg-transparent border-2 border-white'"
          @click="searchType = 'buy'"
          class="px-8 py-3 rounded-md font-semibold transition-all hover:bg-nadine-cream hover:text-nadine-black"
        >
          {{ $t('hero.buy') }}
        </button>
        <button
          :class="searchType === 'rent' ? 'bg-nadine-cream text-nadine-black' : 'bg-transparent border-2 border-white'"
          @click="searchType = 'rent'"
          class="px-8 py-3 rounded-md font-semibold transition-all hover:bg-nadine-cream hover:text-nadine-black"
        >
          {{ $t('hero.rent') }}
        </button>
      </div>

      <!-- Search Bar -->
      <div class="w-full max-w-4xl flex items-center bg-white rounded-lg shadow-2xl overflow-hidden">
        <!-- Location Type Dropdown -->
        <div class="relative">
          <button
            @click="showLocationTypeDropdown = !showLocationTypeDropdown"
            class="flex items-center space-x-2 px-6 py-4 text-nadine-bronze font-semibold hover:bg-gray-50 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z"/>
            </svg>
            <span>{{ $t('search.global') }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-if="showLocationTypeDropdown"
            class="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800 z-20"
          >
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">{{ $t('search.global') }}</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Portugal</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Brasil</a>
          </div>
        </div>

        <!-- Search Input -->
        <input
          type="text"
          :placeholder="$t('search.where')"
          class="flex-1 px-6 py-4 text-gray-800 focus:outline-none"
          v-model="searchLocation"
          @keyup.enter="performSearch"
        />

        <!-- Search Button -->
        <button
          @click="performSearch"
          class="bg-nadine-bronze px-8 py-4 hover:bg-nadine-bronze-dark transition-colors"
        >
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      <!-- More Link -->
      <button
        @click="showAdvancedFilters = !showAdvancedFilters"
        class="mt-6 text-white flex flex-col items-center hover:text-gray-200 transition-colors"
      >
        <span class="mb-2">{{ $t('search.more') }}</span>
        <svg
          class="w-6 h-6 transition-transform duration-300"
          :class="{ 'rotate-180': showAdvancedFilters }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Advanced Filters -->
      <transition name="slide-down">
        <div v-if="showAdvancedFilters" class="w-full max-w-6xl mt-6 bg-white rounded-lg shadow-2xl p-6">
          <!-- First Row of Filters -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <!-- Tipo de Imóvel -->
            <select
              v-model="propertyType"
              class="px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
            >
              <option value="">Tipo de Imóvel</option>
              <option value="apartment">Apartamento</option>
              <option value="house">Casa</option>
              <option value="villa">Vila</option>
              <option value="condo">Condomínio</option>
              <option value="land">Terreno</option>
            </select>

            <!-- Mínimo (Preço) -->
            <select
              v-model="minPrice"
              class="px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
            >
              <option value="">Mínimo:</option>
              <option value="100000">100.000</option>
              <option value="250000">250.000</option>
              <option value="500000">500.000</option>
              <option value="750000">750.000</option>
              <option value="1000000">1.000.000</option>
              <option value="2000000">2.000.000</option>
              <option value="5000000">5.000.000</option>
            </select>

            <!-- Máximo (Preço) -->
            <select
              v-model="maxPrice"
              class="px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
            >
              <option value="">Máximo:</option>
              <option value="250000">250.000</option>
              <option value="500000">500.000</option>
              <option value="1000000">1.000.000</option>
              <option value="2000000">2.000.000</option>
              <option value="5000000">5.000.000</option>
              <option value="10000000">10.000.000</option>
              <option value="20000000">20.000.000+</option>
            </select>

            <!-- Rooms (Quartos) -->
            <select
              v-model="rooms"
              class="px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
            >
              <option value="">Rooms:</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>

            <!-- Casas de Banho -->
            <select
              v-model="bathrooms"
              class="px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
            >
              <option value="">Casas de Banho:</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          <!-- Active Filters Tags Row -->
          <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mb-4 px-1">
            <!-- Property Type -->
            <button
              v-if="propertyType"
              @click="propertyType = ''"
              class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              <span>*{{ getPropertyTypeLabel(propertyType) }}*</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Min Price -->
            <button
              v-if="minPrice"
              @click="minPrice = ''"
              class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              <span>Mínimo: {{ formatPrice(minPrice) }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Max Price -->
            <button
              v-if="maxPrice"
              @click="maxPrice = ''"
              class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              <span>Máximo: {{ formatPrice(maxPrice) }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Rooms -->
            <button
              v-if="rooms"
              @click="rooms = ''"
              class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              <span>Rooms: {{ rooms }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Bathrooms -->
            <button
              v-if="bathrooms"
              @click="bathrooms = ''"
              class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              <span>Casas de Banho: {{ bathrooms }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Reference -->
            <button
              v-if="reference"
              @click="reference = ''"
              class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              <span>Ref: {{ reference }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Luxury Collection -->
            <button
              v-if="luxuryCollection"
              @click="luxuryCollection = false"
              class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              <span>REMAX Collection</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Open House -->
            <button
              v-if="openHouse"
              @click="openHouse = false"
              class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
            >
              <span>Open House</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Second Row - Reference Search and Checkboxes -->
          <div class="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
            <!-- Reference Search -->
            <input
              v-model="reference"
              type="text"
              placeholder="Pesquisar por Ref"
              class="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
            />

            <!-- Checkboxes -->
            <div class="flex flex-wrap gap-4">
              <label class="flex items-center space-x-2 text-gray-700 cursor-pointer">
                <input
                  v-model="luxuryCollection"
                  type="checkbox"
                  class="w-4 h-4 text-nadine-bronze border-gray-300 rounded focus:ring-nadine-bronze"
                />
                <span class="text-sm">Imóveis de Luxo - The REMAX Collection</span>
              </label>

              <label class="flex items-center space-x-2 text-gray-700 cursor-pointer">
                <input
                  v-model="openHouse"
                  type="checkbox"
                  class="w-4 h-4 text-nadine-bronze border-gray-300 rounded focus:ring-nadine-bronze"
                />
                <span class="text-sm">Imóveis em Open House</span>
              </label>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-4">
            <button
              @click="clearFilters"
              class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition-colors"
            >
              Limpar
            </button>
            <button
              @click="applyFilters"
              class="px-8 py-3 bg-nadine-bronze text-white rounded-md font-semibold hover:bg-nadine-bronze-dark transition-colors shadow-md hover:shadow-lg"
            >
              Procurar
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Property Info Banner -->
    <div class="absolute bottom-0 left-0 right-0 bg-nadine-black bg-opacity-90 text-white py-4 px-8 flex items-center justify-between z-0 backdrop-blur-sm">
      <div class="flex items-center space-x-3">
        <span class="font-semibold text-nadine-bronze">{{ properties[currentIndex].type }}</span>
        <span class="text-nadine-beige">|</span>
        <span>{{ properties[currentIndex].location }}</span>
        <span class="text-nadine-beige">|</span>
        <span class="font-bold text-nadine-bronze">{{ properties[currentIndex].price }}</span>
      </div>
      <button class="bg-nadine-bronze text-white rounded-full p-2 hover:bg-nadine-bronze-dark transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>

    <!-- Navigation Arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-4 rounded-full transition-all"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-4 rounded-full transition-all"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePropertyStore } from '../stores/propertyStore'

const router = useRouter()
const propertyStore = usePropertyStore()

const currentIndex = ref(0)
const showLocationTypeDropdown = ref(false)
const showAdvancedFilters = ref(false)

// Usar filtros da store
const searchType = computed({
  get: () => propertyStore.searchFilters.type,
  set: (value) => propertyStore.updateFilters({ type: value })
})

const searchLocation = computed({
  get: () => propertyStore.searchFilters.location,
  set: (value) => propertyStore.updateFilters({ location: value })
})

// Computed properties para cada filtro
const propertyType = computed({
  get: () => propertyStore.searchFilters.propertyType,
  set: (value) => propertyStore.updateFilters({ propertyType: value })
})

const minPrice = computed({
  get: () => propertyStore.searchFilters.minPrice,
  set: (value) => propertyStore.updateFilters({ minPrice: value })
})

const maxPrice = computed({
  get: () => propertyStore.searchFilters.maxPrice,
  set: (value) => propertyStore.updateFilters({ maxPrice: value })
})

const rooms = computed({
  get: () => propertyStore.searchFilters.rooms,
  set: (value) => propertyStore.updateFilters({ rooms: value })
})

const bathrooms = computed({
  get: () => propertyStore.searchFilters.bathrooms,
  set: (value) => propertyStore.updateFilters({ bathrooms: value })
})

const reference = computed({
  get: () => propertyStore.searchFilters.reference,
  set: (value) => propertyStore.updateFilters({ reference: value })
})

const luxuryCollection = computed({
  get: () => propertyStore.searchFilters.luxuryCollection,
  set: (value) => propertyStore.updateFilters({ luxuryCollection: value })
})

const openHouse = computed({
  get: () => propertyStore.searchFilters.openHouse,
  set: (value) => propertyStore.updateFilters({ openHouse: value })
})

// Verificar se há filtros ativos
const hasActiveFilters = computed(() => {
  return !!(
    propertyType.value ||
    minPrice.value ||
    maxPrice.value ||
    rooms.value ||
    bathrooms.value ||
    reference.value ||
    luxuryCollection.value ||
    openHouse.value
  )
})

// Obter label do tipo de propriedade
const getPropertyTypeLabel = (type) => {
  const labels = {
    apartment: 'Apartamento',
    house: 'Casa',
    villa: 'Vila',
    condo: 'Condomínio',
    land: 'Terreno'
  }
  return labels[type] || type
}

// Formatar preço
const formatPrice = (price) => {
  if (!price) return ''
  const numPrice = parseInt(price)
  return numPrice.toLocaleString('pt-PT')
}

const properties = ref([
  {
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600',
    type: 'VILA',
    location: 'Perivolia, Larnaca, Cyprus',
    price: '3.700.000 € / 4.289.595 USD'
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600',
    type: 'LUXURY CONDO',
    location: 'Kathu, Phuket, Thailand',
    price: '5.500.000 USD'
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600',
    type: 'VILLA',
    location: 'Miami Beach, Florida',
    price: '8.900.000 USD'
  }
])

let intervalId = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % properties.value.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? properties.value.length - 1 : currentIndex.value - 1
}

// Limpar filtros
const clearFilters = () => {
  propertyStore.clearFilters()
}

// Realizar busca pela barra principal
const performSearch = () => {
  console.log('Buscando por localização:', searchLocation.value)

  // Limpar todos os filtros antigos antes de fazer nova busca
  propertyStore.clearFilters()

  // Atualizar apenas o filtro de localização na store
  if (searchLocation.value) {
    propertyStore.updateFilters({ location: searchLocation.value })
  }

  // Navegar para a página de propriedades
  router.push({ name: 'properties' })
}

// Aplicar filtros e navegar para página de propriedades
const applyFilters = async () => {
  console.log('Filtros aplicados:', propertyStore.searchFilters)

  // Navegar para a página de propriedades
  router.push({ name: 'properties' })

  // Fechar o painel de filtros
  showAdvancedFilters.value = false
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
