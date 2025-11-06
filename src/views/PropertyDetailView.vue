<template>
  <div class="min-h-screen bg-white">
    <Navbar />

    <!-- Espaço para compensar navbar fixa -->
    <div class="pt-20"></div>

    <!-- Carrossel de Imagens -->
    <div class="relative w-full h-[600px] bg-black">
      <!-- Imagens do Carrossel -->
      <transition-group name="fade">
        <div
          v-for="(image, index) in property.images"
          v-show="currentImageIndex === index"
          :key="index"
          class="absolute inset-0 w-full h-full"
        >
          <img
            :src="image"
            :alt="`${property.title} - Foto ${index + 1}`"
            class="w-full h-full object-contain bg-black"
          />
        </div>
      </transition-group>

      <!-- Navegação de Imagens -->
      <button
        v-if="property.images.length > 1"
        @click="previousImage"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all shadow-lg"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        v-if="property.images.length > 1"
        @click="nextImage"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full transition-all shadow-lg"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Contador de Imagens -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium">
        {{ currentImageIndex + 1 }} / {{ property.images.length }}
      </div>

      <!-- Botões de Ação (Topo Direito) -->
      <div class="absolute top-6 right-6 z-20 flex items-center gap-3">
        <!-- Mapa -->
        <button class="bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-colors" title="Mapa">
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </button>

        <!-- Vista de Rua -->
        <button class="bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-colors" title="Vista de Rua">
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <!-- Download -->
        <button @click="downloadCurrentImage" class="bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-colors" title="Download">
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>

        <!-- Fullscreen -->
        <button @click="toggleFullscreen" class="bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-colors" title="Tela Cheia">
          <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>

        <!-- View All Photos -->
        <button class="bg-white hover:bg-gray-100 px-4 py-2 rounded-full shadow-lg transition-colors font-medium text-sm text-gray-700">
          {{ $t('property.viewAllPhotos') }}
        </button>
      </div>
    </div>

    <!-- Informações do Imóvel -->
    <div class="container mx-auto px-6 py-8">
      <!-- Navegação e Ações -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-4">
          <button
            @click="goToPreviousProperty"
            :disabled="!hasPreviousProperty"
            class="px-6 py-2 border-2 border-gray-300 rounded-lg font-medium transition-colors"
            :class="hasPreviousProperty ? 'text-gray-700 hover:border-nadine-bronze hover:text-nadine-bronze cursor-pointer' : 'text-gray-400 cursor-not-allowed opacity-50'"
          >
            {{ $t('property.previous') }}
          </button>
          <button
            @click="goToNextProperty"
            :disabled="!hasNextProperty"
            class="px-6 py-2 border-2 border-gray-300 rounded-lg font-medium transition-colors"
            :class="hasNextProperty ? 'text-gray-700 hover:border-nadine-bronze hover:text-nadine-bronze cursor-pointer' : 'text-gray-400 cursor-not-allowed opacity-50'"
          >
            {{ $t('property.next') }}
          </button>
        </div>

        <router-link
          to="/propriedades"
          class="text-nadine-bronze hover:text-nadine-bronze-dark font-medium flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ $t('property.backToResults') }}
        </router-link>
      </div>

      <!-- Detalhes Principais -->
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <!-- Badge e Tipo -->
        <div class="flex items-center gap-3 mb-4">
          <span v-if="property.badge" class="px-4 py-1 bg-nadine-bronze text-white text-sm font-bold rounded-full">
            {{ property.badge }}
          </span>
          <span class="text-gray-600 font-medium">{{ property.type || 'Casa de Família Isolada' }}</span>
        </div>

        <!-- Título -->
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ property.title }}</h1>

        <!-- Preço -->
        <p class="text-4xl font-bold text-nadine-bronze mb-6">
          {{ formatPrice(property.price) }}
        </p>

        <!-- Localização -->
        <p class="text-lg text-gray-600 flex items-center gap-2 mb-6">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ property.location }}
        </p>

        <!-- Características -->
        <div class="flex items-center gap-8 text-gray-700 pb-6 border-b border-gray-200">
          <div v-if="property.bedrooms" class="flex items-center gap-2">
            <svg class="w-6 h-6 text-nadine-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="text-lg"><strong>{{ property.bedrooms }}</strong> {{ $t('property.bedrooms') }}</span>
          </div>

          <div v-if="property.bathrooms" class="flex items-center gap-2">
            <svg class="w-6 h-6 text-nadine-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            <span class="text-lg"><strong>{{ property.bathrooms }}</strong> {{ $t('property.bathrooms') }}</span>
          </div>

          <div v-if="property.area" class="flex items-center gap-2">
            <svg class="w-6 h-6 text-nadine-bronze" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
            </svg>
            <span class="text-lg"><strong>{{ property.area }}</strong> m²</span>
          </div>
        </div>

        <!-- Botão de Contato -->
        <div class="mt-6">
          <button class="w-full md:w-auto px-12 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg transition-colors shadow-lg">
            {{ $t('property.contactMe') }}
          </button>
        </div>
      </div>

      <!-- Descrição -->
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('property.description') }}</h2>
        <p class="text-gray-700 leading-relaxed">
          {{ property.descriptionKey ? $t(property.descriptionKey) : $t('property.descriptionFallback') }}
        </p>
      </div>

      <!-- Miniaturas das Fotos -->
      <div v-if="property.images.length > 1" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('property.viewAllPhotos') }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button
            v-for="(image, index) in property.images"
            :key="index"
            @click="currentImageIndex = index; scrollToTop()"
            class="relative aspect-square rounded-lg overflow-hidden border-2 transition-all"
            :class="currentImageIndex === index ? 'border-nadine-bronze shadow-lg' : 'border-gray-200 hover:border-nadine-bronze-light'"
          >
            <img
              :src="image"
              :alt="`Miniatura ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { usePropertyStore } from '../stores/propertyStore'
import { useCurrencyStore } from '../stores/currencyStore'

const route = useRoute()
const router = useRouter()
const currentImageIndex = ref(0)
const currencyStore = useCurrencyStore()

// Dados mock - em produção, viriam de uma API
const properties = [
  {
    id: 1,
    title: 'Apartamento Moderno',
    price: 850000,
    currency: 'CAD',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: 'Apartamento',
    location: 'Hamilton, Canadá',
    badge: 'NOVO',
    descriptionKey: 'properties.desc1',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1600',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600'
    ]
  },
  {
    id: 2,
    title: 'Villa Luxuosa',
    price: 2500000,
    currency: 'EUR',
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    type: 'Villa',
    location: 'Lisboa, Portugal',
    badge: 'DESTAQUE',
    descriptionKey: 'properties.desc2',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600'
    ]
  },
  {
    id: 3,
    title: 'Condomínio Premium',
    price: 1200000,
    currency: 'EUR',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    type: 'Condomínio',
    location: 'Porto, Portugal',
    descriptionKey: 'properties.desc3',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1600',
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1600'
    ]
  },
  {
    id: 4,
    title: 'Casa de Família Isolada',
    price: 699900,
    currency: 'CAD',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    type: 'Casa de Família Isolada',
    location: 'Hamilton, Canadá',
    descriptionKey: 'properties.desc4',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600',
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1600',
      'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=1600'
    ]
  },
  {
    id: 5,
    title: 'Duplex',
    price: 329900,
    currency: 'CAD',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    type: 'Duplex',
    location: 'Victoriaville, Canadá',
    descriptionKey: 'properties.desc5',
    images: [
      'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=1600',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1600',
      'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=1600'
    ]
  },
  {
    id: 6,
    title: 'Terra Desocupada',
    price: 99500,
    currency: 'USD',
    bedrooms: 0,
    bathrooms: 0,
    area: 1000,
    type: 'Terreno',
    location: 'Madera, Estados Unidos',
    badge: 'TERRENO',
    descriptionKey: 'properties.desc6',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600'
    ]
  }
]

const property = ref({
  id: 0,
  title: '',
  price: 0,
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  type: '',
  location: '',
  badge: '',
  descriptionKey: '',
  images: []
})

const loadProperty = () => {
  const propertyId = parseInt(route.params.id)
  const foundProperty = properties.find(p => p.id === propertyId)

  if (foundProperty) {
    property.value = foundProperty
    currentImageIndex.value = 0 // Resetar para primeira imagem
  } else {
    // Fallback para primeira propriedade se não encontrar
    property.value = properties[0]
  }
}

onMounted(() => {
  loadProperty()
})

// Watch para detectar mudanças na rota e recarregar propriedade
watch(() => route.params.id, () => {
  loadProperty()
})

const nextImage = () => {
  if (currentImageIndex.value < property.value.images.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = property.value.images.length - 1
  }
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Computed properties para navegação entre propriedades
const currentPropertyIndex = computed(() => {
  return properties.findIndex(p => p.id === property.value.id)
})

const hasPreviousProperty = computed(() => {
  return currentPropertyIndex.value > 0
})

const hasNextProperty = computed(() => {
  return currentPropertyIndex.value < properties.length - 1
})

// Funções de navegação
const goToPreviousProperty = () => {
  if (hasPreviousProperty.value) {
    const previousProperty = properties[currentPropertyIndex.value - 1]
    router.push({ name: 'property-detail', params: { id: previousProperty.id } })
    scrollToTop()
  }
}

const goToNextProperty = () => {
  if (hasNextProperty.value) {
    const nextProperty = properties[currentPropertyIndex.value + 1]
    router.push({ name: 'property-detail', params: { id: nextProperty.id } })
    scrollToTop()
  }
}

const store = usePropertyStore()

const formatPrice = (price) => {
  if (!price) return '—'

  // Converter o preço para a moeda selecionada
  const convertedAmount = currencyStore.convertCurrency(
    price,
    property.value.currency || 'USD',
    currencyStore.selectedCurrency
  )

  // Formatar com o símbolo da moeda selecionada
  return currencyStore.formatCurrency(convertedAmount, currencyStore.selectedCurrency)
}

// Função para fazer download da imagem atual
const downloadCurrentImage = async () => {
  const currentImage = property.value.images[currentImageIndex.value]
  if (!currentImage) return

  try {
    // Buscar a imagem como blob
    const response = await fetch(currentImage)
    const blob = await response.blob()

    // Criar URL temporário para o blob
    const url = window.URL.createObjectURL(blob)

    // Criar elemento <a> temporário para fazer o download
    const link = document.createElement('a')
    link.href = url
    link.download = `${property.value.title}-foto-${currentImageIndex.value + 1}.jpg`

    // Adicionar ao DOM, clicar e remover
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Limpar o URL temporário
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erro ao fazer download da imagem:', error)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
