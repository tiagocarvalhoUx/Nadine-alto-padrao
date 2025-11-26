<template>
  <div class="min-h-screen bg-white">
    <Navbar />

    <!-- Espaço para compensar navbar fixa -->
    <div class="pt-20"></div>

    <!-- Barra de Busca -->
    <div class="bg-remax-blue py-8 px-6">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <!-- Dropdown Global -->
          <div class="relative">
            <button class="flex items-center space-x-2 px-6 py-3 bg-white rounded-full text-remax-blue font-semibold hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z"/>
              </svg>
              <span>{{ $t('search.global') }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- Campo de Busca -->
          <div class="flex-1 w-full">
            <input
              type="text"
              v-model="searchQuery"
              :placeholder="$t('search.where')"
              class="w-full px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
            />
          </div>

          <!-- Botão de Busca -->
          <button @click="performSearch" class="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-colors flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span class="hidden md:inline">{{ $t('search.searchButton') }}</span>
          </button>

          <!-- Mais -->
          <button
            @click="showAdvancedFilters = !showAdvancedFilters"
            class="text-white hover:text-gray-200 transition-colors flex flex-col items-center"
          >
            <span class="text-sm">{{ $t('search.more') }}</span>
            <svg
              class="w-5 h-5 transition-transform duration-300"
              :class="{ 'rotate-180': showAdvancedFilters }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Advanced Filters -->
        <transition name="slide-down">
          <div v-if="showAdvancedFilters" class="container mx-auto mt-6 bg-white rounded-lg shadow-2xl p-6">
            <!-- First Row of Filters -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <!-- Tipo de Imóvel -->
              <select
                v-model="propertyType"
                class="px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
              >
                <option value="">{{ $t('search.propertyType') }}</option>
                <option value="apartment">{{ $t('propertyTypes.apartment') }}</option>
                <option value="house">{{ $t('propertyTypes.house') }}</option>
                <option value="villa">{{ $t('propertyTypes.villa') }}</option>
                <option value="condo">{{ $t('propertyTypes.condo') }}</option>
                <option value="land">{{ $t('propertyTypes.land') }}</option>
              </select>

              <!-- Mínimo (Preço) -->
              <select
                v-model="minPrice"
                class="px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
              >
                <option value="">{{ $t('search.minimum') }}</option>
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
                <option value="">{{ $t('search.maximum') }}</option>
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
                <option value="">{{ $t('search.rooms') }}</option>
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
                <option value="">{{ $t('search.bathrooms') }}</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <!-- Second Row - Reference Search and Checkboxes -->
            <div class="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
              <!-- Reference Search -->
              <input
                v-model="reference"
                type="text"
                :placeholder="$t('search.reference')"
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
                  <span class="text-sm">{{ $t('search.luxury') }}</span>
                </label>

                <label class="flex items-center space-x-2 text-gray-700 cursor-pointer">
                  <input
                    v-model="openHouse"
                    type="checkbox"
                    class="w-4 h-4 text-nadine-bronze border-gray-300 rounded focus:ring-nadine-bronze"
                  />
                  <span class="text-sm">{{ $t('search.openHouse') }}</span>
                </label>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4">
              <button
                @click="clearFilters"
                class="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition-colors"
              >
                {{ $t('search.clear') }}
              </button>
              <button
                @click="applyFilters"
                class="px-8 py-3 bg-nadine-bronze text-white rounded-md font-semibold hover:bg-nadine-bronze-dark transition-colors shadow-md hover:shadow-lg"
              >
                {{ $t('search.searchButton') }}
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="container mx-auto px-6 py-8">
      <!-- Header com Título e Ordenação -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
          {{ $t('property.forSale') }}
        </h1>

        <!-- Dropdown de Ordenação -->
        <div class="relative">
          <button
            @click="showSortDropdown = !showSortDropdown"
            class="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:border-nadine-bronze transition-colors"
          >
            <span>{{ currentSort }}</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="showSortDropdown"
            class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
          >
            <button
              @click="sortBy('recent')"
              class="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700"
              :class="{ 'bg-nadine-beige-light text-nadine-bronze font-semibold': sortOption === 'recent' }"
            >
              {{ $t('sort.recent') }}
            </button>
            <button
              @click="sortBy('price-asc')"
              class="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700"
              :class="{ 'bg-nadine-beige-light text-nadine-bronze font-semibold': sortOption === 'price-asc' }"
            >
              {{ $t('sort.priceAsc') }}
            </button>
            <button
              @click="sortBy('price-desc')"
              class="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors text-gray-700"
              :class="{ 'bg-nadine-beige-light text-nadine-bronze font-semibold': sortOption === 'price-desc' }"
            >
              {{ $t('sort.priceDesc') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Grid de Propriedades -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          v-for="property in sortedProperties"
          :key="property.id"
          @click="goToPropertyDetail(property.id)"
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
        >
          <!-- Imagem -->
          <div class="relative h-64 overflow-hidden">
            <img
              :src="property.image"
              :alt="property.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <!-- Botão Favorito -->
            <button
              @click.stop="toggleFavorite(property.id)"
              class="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-nadine-bronze transition-colors"
              :class="{ 'bg-nadine-bronze': property.isFavorite }"
            >
              <svg class="w-5 h-5" :class="property.isFavorite ? 'text-white' : 'text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </button>

            <!-- Badge de Tipo -->
            <div v-if="property.badge" class="absolute top-4 left-4 px-3 py-1 bg-nadine-bronze text-white text-xs font-bold rounded-full">
              {{ property.badge }}
            </div>
          </div>

          <!-- Informações -->
          <div class="p-5">
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ property.title }}</h3>

            <!-- Preço -->
            <p class="text-2xl font-bold text-nadine-bronze mb-3">
              {{ formatPrice(property.price) }}
            </p>

            <!-- Descrição -->
            <p v-if="property.description" class="text-sm text-gray-600 mb-3 line-clamp-2">
              {{ property.description }}
            </p>

            <!-- Detalhes -->
            <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span v-if="property.bedrooms">{{ property.bedrooms }} {{ $t('property.bedrooms') }}</span>
              <span v-if="property.bathrooms">{{ property.bathrooms }} {{ $t('property.bathrooms') }}</span>
            </div>

            <!-- Localização -->
            <p class="text-sm text-gray-600 flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ property.location }}
            </p>
          </div>
        </div>
      </div>

      <!-- Mensagem quando não há propriedades -->
      <div v-if="sortedProperties.length === 0" class="text-center py-20">
        <svg class="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ $t('messages.noProperties') }}</h3>
        <p class="text-gray-600">{{ $t('messages.adjustFilters') }}</p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { usePropertyStore } from '../stores/propertyStore'
import { useCurrencyStore } from '../stores/currencyStore'

const { t } = useI18n()
const router = useRouter()
const propertyStore = usePropertyStore()
const currencyStore = useCurrencyStore()

const searchQuery = ref('')
const showSortDropdown = ref(false)
const sortOption = ref('recent')
const showAdvancedFilters = ref(false)

// Função para formatar preços
const formatPrice = (price) => {
  if (!price) return ''

  // Converter o preço de EUR para a moeda selecionada
  const convertedPrice = currencyStore.convertCurrency(price, 'EUR', currencyStore.selectedCurrency)

  // Usar a função de formatação do currencyStore
  return currencyStore.formatCurrency(convertedPrice)
}

// Função para ordenar propriedades por preço convertido
const sortByPrice = (properties, ascending = true) => {
  return [...properties].sort((a, b) => {
    const priceA = currencyStore.convertCurrency(a.price, 'EUR', currencyStore.selectedCurrency)
    const priceB = currencyStore.convertCurrency(b.price, 'EUR', currencyStore.selectedCurrency)
    return ascending ? priceA - priceB : priceB - priceA
  })
}

// Propriedades de exemplo (você pode substituir por dados reais de uma API)
const favoriteStates = ref({})

const properties = computed(() => [
  {
    id: 1,
    title: t('properties.modernApartment'),
    description: t('properties.desc1'),
    price: 850000,
    bedrooms: 3,
    bathrooms: 2,
    location: t('properties.canada'),
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    badge: t('property.new'),
    isFavorite: favoriteStates.value[1] || false
  },
  {
    id: 2,
    title: t('properties.modernVilla'),
    description: t('properties.desc2'),
    price: 2500000,
    bedrooms: 5,
    bathrooms: 4,
    location: t('properties.lisboaPortugal'),
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    badge: t('property.featured'),
    isFavorite: favoriteStates.value[2] || false
  },
  {
    id: 3,
    title: t('properties.luxuryCondo'),
    description: t('properties.desc3'),
    price: 1200000,
    bedrooms: 4,
    bathrooms: 3,
    location: t('properties.portoPortugal'),
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    isFavorite: favoriteStates.value[3] || false
  },
  {
    id: 4,
    title: t('properties.detachedFamilyHome'),
    description: t('properties.desc4'),
    price: 699900,
    bedrooms: 3,
    bathrooms: 2,
    location: t('properties.canada'),
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    isFavorite: favoriteStates.value[4] || false
  },
  {
    id: 5,
    title: t('propertyTypes.duplex'),
    description: t('properties.desc5'),
    price: 329900,
    bedrooms: 2,
    bathrooms: 1,
    location: t('properties.canada'),
    image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800',
    isFavorite: favoriteStates.value[5] || false
  },
  {
    id: 6,
    title: t('properties.vacantLand'),
    description: t('properties.desc6'),
    price: 99500,
    bedrooms: 0,
    bathrooms: 0,
    location: t('properties.usa'),
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    badge: t('property.land'),
    isFavorite: favoriteStates.value[6] || false
  }
])

const currentSort = computed(() => {
  switch (sortOption.value) {
    case 'recent':
      return t('sort.recent')
    case 'price-asc':
      return t('sort.priceAsc')
    case 'price-desc':
      return t('sort.priceDesc')
    default:
      return t('sort.recent')
  }
})

// Função para mapear tipos de propriedade e suas variações
const getPropertyTypeVariations = (type) => {
  const variations = {
    'apartment': ['apartamento', 'apartment', 'apto', 'flat', 'condo'],
    'house': ['casa', 'house', 'moradia', 'vivenda'],
    'villa': ['vila', 'villa', 'vivenda', 'moradia'],
    'condo': ['condomínio', 'condo', 'apartamento', 'apartment'],
    'land': ['terreno', 'land', 'lote', 'terra']
  }
  return variations[type] || [type]
}

// Função para verificar se a propriedade corresponde ao tipo
const matchesPropertyType = (propertyTitle, selectedType) => {
  const title = propertyTitle.toLowerCase()
  const variations = getPropertyTypeVariations(selectedType.toLowerCase())

  // Verificar se qualquer variação está presente no título
  return variations.some(variation => {
    // Verificar se o título contém a variação como palavra completa ou parte de uma palavra
    const words = title.split(/\s+/)
    return words.some(word => word.startsWith(variation) || word.includes(variation))
  })
}

const sortedProperties = computed(() => {
  let filtered = properties.value

  // Aplicar filtro de busca por texto
  if (searchQuery.value) {
    filtered = filtered.filter(property => {
      const searchLower = searchQuery.value.toLowerCase()
      const location = property.location.toLowerCase()
      const title = property.title.toLowerCase()

      // Busca flexível: verifica se alguma palavra começa com o termo buscado
      const locationWords = location.split(/\s+/)
      const titleWords = title.split(/\s+/)

      return locationWords.some(word => word.startsWith(searchLower)) ||
             titleWords.some(word => word.startsWith(searchLower)) ||
             location.includes(searchLower) ||
             title.includes(searchLower)
    })
  }

  // Aplicar filtros da store
  const filters = propertyStore.searchFilters

  // Filtro por localização da store (vem da barra de busca principal do hero)
  if (filters.location) {
    filtered = filtered.filter(property => {
      const searchLower = filters.location.toLowerCase()
      const location = property.location.toLowerCase()
      const title = property.title.toLowerCase()

      // Busca flexível: verifica se alguma palavra começa com o termo buscado
      const locationWords = location.split(/\s+/)
      const titleWords = title.split(/\s+/)

      return locationWords.some(word => word.startsWith(searchLower)) ||
             titleWords.some(word => word.startsWith(searchLower)) ||
             location.includes(searchLower) ||
             title.includes(searchLower)
    })
  }

  // Filtro por tipo de propriedade (busca flexível e inteligente)
  if (filters.propertyType) {
    filtered = filtered.filter(property => {
      return matchesPropertyType(property.title, filters.propertyType)
    })
  }

  // Filtro por preço mínimo
  if (filters.minPrice) {
    filtered = filtered.filter(property => {
      const priceInEUR = property.price
      return priceInEUR >= parseInt(filters.minPrice)
    })
  }

  // Filtro por preço máximo
  if (filters.maxPrice) {
    filtered = filtered.filter(property => {
      const priceInEUR = property.price
      return priceInEUR <= parseInt(filters.maxPrice)
    })
  }

  // Filtro por número de quartos
  if (filters.rooms) {
    filtered = filtered.filter(property => {
      return property.bedrooms && property.bedrooms >= parseInt(filters.rooms)
    })
  }

  // Filtro por número de banheiros
  if (filters.bathrooms) {
    filtered = filtered.filter(property => {
      return property.bathrooms && property.bathrooms >= parseInt(filters.bathrooms)
    })
  }

  // Filtro por referência
  if (filters.reference) {
    filtered = filtered.filter(property => {
      return property.id.toString().includes(filters.reference)
    })
  }

  // Ordenar resultados
  switch (sortOption.value) {
    case 'price-asc':
      return sortByPrice(filtered, true)
    case 'price-desc':
      return sortByPrice(filtered, false)
    case 'recent':
    default:
      return filtered
  }
})

const sortBy = (option) => {
  sortOption.value = option
  showSortDropdown.value = false
}

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

// Limpar filtros
const clearFilters = () => {
  propertyStore.clearFilters()
  showAdvancedFilters.value = false
}

// Aplicar filtros
const applyFilters = () => {
  console.log('Filtros aplicados:', propertyStore.searchFilters)

  // Fechar os filtros avançados
  showAdvancedFilters.value = false

  // Os filtros serão aplicados automaticamente através do computed sortedProperties
}

const toggleFavorite = (id) => {
  favoriteStates.value[id] = !favoriteStates.value[id]
}

const performSearch = () => {
  // A busca já está sendo realizada pelo computed sortedProperties
  console.log('Buscando por:', searchQuery.value)
}

const goToPropertyDetail = (propertyId) => {
  router.push({ name: 'property-detail', params: { id: propertyId } })
}

// Inicializar as taxas de câmbio quando o componente for montado
currencyStore.fetchExchangeRates()
</script>

<style scoped>
/* Smooth transitions */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Slide down transition for advanced filters */
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
