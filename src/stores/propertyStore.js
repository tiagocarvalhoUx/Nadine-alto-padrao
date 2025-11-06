import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePropertyStore = defineStore('property', () => {
  // Estado dos filtros de busca
  const searchFilters = ref({
    type: 'buy', // 'buy' ou 'rent'
    location: '',
    locationType: 'global', // 'global', 'portugal', 'brasil'
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    rooms: '',
    bathrooms: '',
    reference: '',
    luxuryCollection: false,
    openHouse: false
  })

  // Lista de propriedades (mock data - substituir por API real)
  const properties = ref([
    {
      id: 1,
      type: 'apartment',
      title: 'Apartamento de Luxo',
      location: 'Marvila, Lisboa, Portugal',
      price: 1277000,
      currency: 'EUR',
      priceUSD: 1480489.95,
      rooms: 3,
      bathrooms: 2,
      area: 150,
      images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'],
      luxuryCollection: true,
      openHouse: false,
      reference: 'REF001'
    },
    {
      id: 2,
      type: 'villa',
      title: 'Vila Moderna',
      location: 'Cascais, Lisboa, Portugal',
      price: 3500000,
      currency: 'EUR',
      priceUSD: 4120000,
      rooms: 5,
      bathrooms: 4,
      area: 450,
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'],
      luxuryCollection: true,
      openHouse: true,
      reference: 'REF002'
    },
    {
      id: 3,
      type: 'house',
      title: 'Casa de Família',
      location: 'Porto, Portugal',
      price: 850000,
      currency: 'EUR',
      priceUSD: 1000000,
      rooms: 4,
      bathrooms: 3,
      area: 280,
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
      luxuryCollection: false,
      openHouse: true,
      reference: 'REF003'
    },
    {
      id: 4,
      type: 'condo',
      title: 'Condomínio de Alto Padrão',
      location: 'Miami Beach, Florida',
      price: 5500000,
      currency: 'USD',
      priceUSD: 5500000,
      rooms: 4,
      bathrooms: 3,
      area: 350,
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'],
      luxuryCollection: true,
      openHouse: false,
      reference: 'REF004'
    }
  ])

  // Resultados da busca filtrada
  const searchResults = ref([])
  const isSearching = ref(false)

  // Computed: propriedades filtradas
  const filteredProperties = computed(() => {
    let filtered = properties.value

    // Filtro por tipo de transação (buy/rent) - simulado
    // Em produção, isso viria de diferentes endpoints da API

    // Filtro por localização
    if (searchFilters.value.location) {
      filtered = filtered.filter(prop =>
        prop.location.toLowerCase().includes(searchFilters.value.location.toLowerCase())
      )
    }

    // Filtro por tipo de propriedade
    if (searchFilters.value.propertyType) {
      filtered = filtered.filter(prop =>
        prop.type === searchFilters.value.propertyType
      )
    }

    // Filtro por preço mínimo
    if (searchFilters.value.minPrice) {
      filtered = filtered.filter(prop =>
        prop.priceUSD >= parseInt(searchFilters.value.minPrice)
      )
    }

    // Filtro por preço máximo
    if (searchFilters.value.maxPrice) {
      filtered = filtered.filter(prop =>
        prop.priceUSD <= parseInt(searchFilters.value.maxPrice)
      )
    }

    // Filtro por número de quartos
    if (searchFilters.value.rooms) {
      filtered = filtered.filter(prop =>
        prop.rooms >= parseInt(searchFilters.value.rooms)
      )
    }

    // Filtro por número de banheiros
    if (searchFilters.value.bathrooms) {
      filtered = filtered.filter(prop =>
        prop.bathrooms >= parseInt(searchFilters.value.bathrooms)
      )
    }

    // Filtro por referência
    if (searchFilters.value.reference) {
      filtered = filtered.filter(prop =>
        prop.reference.toLowerCase().includes(searchFilters.value.reference.toLowerCase())
      )
    }

    // Filtro Luxury Collection
    if (searchFilters.value.luxuryCollection) {
      filtered = filtered.filter(prop => prop.luxuryCollection)
    }

    // Filtro Open House
    if (searchFilters.value.openHouse) {
      filtered = filtered.filter(prop => prop.openHouse)
    }

    return filtered
  })

  // Actions
  function updateFilters(newFilters) {
    searchFilters.value = { ...searchFilters.value, ...newFilters }
  }

  function clearFilters() {
    searchFilters.value = {
      type: 'buy',
      location: '',
      locationType: 'global',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      rooms: '',
      bathrooms: '',
      reference: '',
      luxuryCollection: false,
      openHouse: false
    }
  }

  async function searchProperties() {
    isSearching.value = true

    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 500))

    searchResults.value = filteredProperties.value

    isSearching.value = false

    return searchResults.value
  }

  function getPropertyById(id) {
    return properties.value.find(prop => prop.id === id)
  }

  return {
    // State
    searchFilters,
    properties,
    searchResults,
    isSearching,

    // Getters
    filteredProperties,

    // Actions
    updateFilters,
    clearFilters,
    searchProperties,
    getPropertyById
  }
})
