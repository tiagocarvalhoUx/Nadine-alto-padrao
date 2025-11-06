import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLanguageStore = defineStore('language', () => {
  // Idioma selecionado (default: Português)
  const selectedLanguage = ref('pt')

  // Idiomas disponíveis
  const availableLanguages = ref([
    { code: 'zh', name: '中文 - Chinese', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français - French', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch - German', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano - Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Português - Portuguese', flag: '🇵🇹' },
    { code: 'es', name: 'Español - Spanish', flag: '🇪🇸' }
  ])

  // Computed: Idioma selecionado (objeto completo)
  const currentLanguage = computed(() => {
    return availableLanguages.value.find(lang => lang.code === selectedLanguage.value)
  })

  // Mudar idioma selecionado
  function setLanguage(languageCode) {
    selectedLanguage.value = languageCode
    // Salvar preferência no localStorage
    localStorage.setItem('nadine-language', languageCode)
    console.log('Idioma alterado para:', languageCode)
  }

  // Inicializar o store
  function initialize() {
    // Verificar se há um idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('nadine-language')
    if (savedLanguage && availableLanguages.value.find(lang => lang.code === savedLanguage)) {
      selectedLanguage.value = savedLanguage
    }
  }

  return {
    // State
    selectedLanguage,
    availableLanguages,

    // Getters
    currentLanguage,

    // Actions
    setLanguage,
    initialize
  }
})
