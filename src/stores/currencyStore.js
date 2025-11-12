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

  // Mapa de locales para cada moeda
  const currencyLocales = {
    'BRL': 'pt-BR',
    'USD': 'en-US',
    'EUR': 'de-DE',
    'GBP': 'en-GB',
    'CNY': 'zh-CN',
    'CAD': 'en-CA',
    'MXN': 'es-MX',
    'INR': 'en-IN'
  }

  // Função para formatar preços
  function formatPrice(amount) {
    if (!amount && amount !== 0) return ''
    
    // Usar o locale correto para a moeda selecionada
    const locale = currencyLocales[selectedCurrency.value] || 'en-US'
    
    let formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: selectedCurrency.value,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currencyDisplay: 'narrowSymbol'
    }).format(amount)

    // Para garantir que o símbolo sempre apareça na posição correta
    if (selectedCurrency.value === 'BRL') {
      const value = formatted.replace(/[^\d.,\s]/g, '').trim()
      return `R$${value}`
    }
    
    return formatted
  }

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
    // Validar parâmetros
    if (!amount || !fromCurrency || !toCurrency) {
      console.warn('Parâmetros inválidos para conversão', { amount, fromCurrency, toCurrency })
      return amount
    }

    // Garantir que temos as taxas de câmbio
    if (!exchangeRates.value || Object.keys(exchangeRates.value).length === 0) {
      console.warn('Taxas de câmbio não disponíveis, usando valores de fallback')
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
    }

    // Se as moedas são iguais, retornar o valor original
    if (fromCurrency === toCurrency) {
      return amount
    }

    try {
      // Converter para EUR primeiro (base)
      let amountInEUR
      if (fromCurrency === 'EUR') {
        amountInEUR = amount
      } else {
        amountInEUR = amount / exchangeRates.value[fromCurrency]
      }

      // Converter de EUR para a moeda de destino
      let finalAmount
      if (toCurrency === 'EUR') {
        finalAmount = amountInEUR
      } else {
        finalAmount = amountInEUR * exchangeRates.value[toCurrency]
      }

      console.log('Conversão:', {
        de: fromCurrency,
        para: toCurrency,
        valor: amount,
        resultado: finalAmount,
        taxas: exchangeRates.value
      })

      return finalAmount
    } catch (error) {
      console.error('Erro na conversão:', error)
      return amount
    }
  }

  // Formatar valor com símbolo da moeda
  function formatCurrency(amount, currencyCode = selectedCurrency.value) {
    if (!amount) return '0'
    
    const formatConfig = {
      BRL: { locale: 'pt-BR', currency: 'BRL', symbolFirst: true },
      USD: { locale: 'en-US', currency: 'USD', symbolFirst: true },
      EUR: { locale: 'de-DE', currency: 'EUR', symbolFirst: false },
      GBP: { locale: 'en-GB', currency: 'GBP', symbolFirst: true },
      CAD: { locale: 'en-CA', currency: 'CAD', symbolFirst: true },
      CNY: { locale: 'zh-CN', currency: 'CNY', symbolFirst: true },
      INR: { locale: 'en-IN', currency: 'INR', symbolFirst: true },
      MXN: { locale: 'es-MX', currency: 'MXN', symbolFirst: true }
    }

    try {
      const config = formatConfig[currencyCode] || { locale: 'en-US', currency: currencyCode, symbolFirst: true }
      
      const formatted = new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        currencyDisplay: 'narrowSymbol'
      }).format(amount)

      // Para garantir que o símbolo sempre apareça na posição correta
      if (currencyCode === 'BRL') {
        const value = formatted.replace(/[^\d.,\s]/g, '').trim()
        return `R$${value}`
      }
      
      return formatted
    } catch (error) {
      console.error('Erro na formatação:', error)
      return `${currencyCode} ${amount.toLocaleString()}`
    }
  }

  // Mudar moeda selecionada
  function setCurrency(currencyCode) {
    selectedCurrency.value = currencyCode
    console.log('Moeda alterada para:', currencyCode)
  }

  // Inicializar o store
  async function initialize() {
    console.log('Initializing currency store...')
    const savedCurrency = localStorage.getItem('currency')
    if (savedCurrency) {
      console.log('Found saved currency:', savedCurrency)
      selectedCurrency.value = savedCurrency
    }
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
