import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCurrencyStore = defineStore('currency', () => {
  // Moeda selecionada (default: USD)
  const selectedCurrency = ref('USD')

  // Taxas de câmbio (base: EUR)
  const exchangeRates = ref({})

  // Loading state
  const isLoading = ref(false)

  // Última atualização
  const lastUpdate = ref(null)

  // Moedas disponíveis
  const availableCurrencies = ref([
    { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'CNY', name: 'Chinese Renminbi', flag: '🇨🇳' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'INR', name: 'Indian Rupees', flag: '🇮🇳' },
    { code: 'MXN', name: 'Mexican Pesos', flag: '🇲🇽' },
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' }
  ])

  // Computed: Moeda selecionada (objeto completo)
  const currentCurrency = computed(() => {
    return availableCurrencies.value.find(c => c.code === selectedCurrency.value)
  })

  // Buscar taxas de câmbio da API
  async function fetchExchangeRates() {
    isLoading.value = true

    try {
      // Usando a Frankfurter API (gratuita, sem necessidade de API key)
      const response = await fetch('https://api.frankfurter.app/latest?from=EUR')

      if (!response.ok) {
        throw new Error('Erro ao buscar taxas de câmbio')
      }

      const data = await response.json()

      // Adicionar EUR como 1 (base)
      exchangeRates.value = {
        EUR: 1,
        ...data.rates
      }

      lastUpdate.value = new Date()

      console.log('Taxas de câmbio atualizadas:', exchangeRates.value)
    } catch (error) {
      console.error('Erro ao buscar taxas de câmbio:', error)

      // Valores de fallback (aproximados)
      exchangeRates.value = {
        EUR: 1,
        USD: 1.09,
        GBP: 0.86,
        BRL: 6.10,
        CAD: 1.48,
        CNY: 7.85,
        INR: 90.50,
        MXN: 18.60
      }
    } finally {
      isLoading.value = false
    }
  }

  // Converter valor de uma moeda para outra
  function convertCurrency(amount, fromCurrency, toCurrency) {
    if (!exchangeRates.value || Object.keys(exchangeRates.value).length === 0) {
      console.warn('Taxas de câmbio não disponíveis')
      return amount
    }

    // Se as moedas são iguais, retornar o valor original
    if (fromCurrency === toCurrency) {
      return amount
    }

    // Converter para EUR primeiro (base)
    const amountInEUR = amount / exchangeRates.value[fromCurrency]

    // Converter de EUR para a moeda de destino
    const convertedAmount = amountInEUR * exchangeRates.value[toCurrency]

    return convertedAmount
  }

  // Formatar valor com símbolo da moeda
  function formatCurrency(amount, currencyCode = selectedCurrency.value) {
    const symbols = {
      BRL: 'R$',
      USD: '$',
      EUR: '€',
      GBP: '£',
      CAD: 'CA$',
      CNY: '¥',
      INR: '₹',
      MXN: 'MX$'
    }

    const symbol = symbols[currencyCode] || currencyCode

    // Formatar número com separadores
    const formattedAmount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)

    return `${symbol}${formattedAmount}`
  }

  // Mudar moeda selecionada
  function setCurrency(currencyCode) {
    selectedCurrency.value = currencyCode
    console.log('Moeda alterada para:', currencyCode)
  }

  // Inicializar o store
  async function initialize() {
    await fetchExchangeRates()
  }

  return {
    // State
    selectedCurrency,
    exchangeRates,
    isLoading,
    lastUpdate,
    availableCurrencies,

    // Getters
    currentCurrency,

    // Actions
    fetchExchangeRates,
    convertCurrency,
    formatCurrency,
    setCurrency,
    initialize
  }
})
