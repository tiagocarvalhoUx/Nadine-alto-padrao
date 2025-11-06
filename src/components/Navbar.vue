<template>
  <nav class="py-4 px-6 fixed w-full top-0 z-50 shadow-md" style="background-color: #E6E5E2;">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <NadineLogo />
      </div>

      <!-- Menu Desktop -->
      <div class="hidden lg:flex items-center space-x-8">
        <router-link to="/" class="nav-link font-medium">{{ $t('nav.about') }}</router-link>
        <router-link to="/propriedades" class="nav-link font-medium">{{ $t('nav.properties') }}</router-link>
        <a href="#" class="nav-link font-medium">{{ $t('nav.offices') }}</a>
        <a href="#" class="nav-link font-medium">{{ $t('nav.franchising') }}</a>
        <a href="#" class="nav-link font-medium">{{ $t('nav.contact') }}</a>
      </div>

      <!-- Language & Currency Selectors (Desktop) -->
      <div class="hidden lg:flex items-center space-x-4 ml-8">
        <!-- Language Selector -->
        <div class="relative">
          <button
            @click="toggleLanguageDropdown"
            class="nav-link flex items-center space-x-1"
          >
            <span>{{ languageStore.currentLanguage?.name.split(' - ')[0] || 'Português' }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-if="showLanguageDropdown"
            class="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50 max-h-96 overflow-y-auto"
          >
            <button
              v-for="language in languageStore.availableLanguages"
              :key="language.code"
              @click="selectLanguage(language.code)"
              class="w-full text-left px-4 py-2 hover:bg-nadine-beige-light flex items-center space-x-3"
              :class="{ 'bg-nadine-beige-light': languageStore.selectedLanguage === language.code }"
            >
              <span class="text-2xl">{{ language.flag }}</span>
              <span>{{ language.name }}</span>
            </button>
            <div class="border-t border-gray-200 my-2"></div>
            <button
              @click="showMoreLanguages"
              class="w-full text-left px-4 py-2 text-white font-semibold"
              style="background-color: #C71E1E;"
            >
              View More
            </button>
          </div>
        </div>

        <!-- Currency Selector -->
        <div class="relative">
          <button
            @click="toggleCurrencyDropdown"
            class="nav-link flex items-center space-x-1"
          >
            <span>{{ currencyStore.selectedCurrency }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-if="showCurrencyDropdown"
            class="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50"
          >
            <button
              v-for="currency in currencyStore.availableCurrencies"
              :key="currency.code"
              @click="selectCurrency(currency.code)"
              class="w-full text-left px-4 py-2 hover:bg-nadine-beige-light flex items-center space-x-3"
              :class="{ 'bg-nadine-beige-light': currencyStore.selectedCurrency === currency.code }"
            >
              <span class="text-2xl">{{ currency.flag }}</span>
              <span>{{ currency.name }}</span>
            </button>
            <div class="border-t border-gray-200 my-2"></div>
            <button
              @click="showAllCurrencies"
              class="w-full text-left px-4 py-2 text-white font-semibold"
              style="background-color: #C71E1E;"
            >
              View More
            </button>
          </div>
        </div>
      </div>

      <!-- Botão Hamburguer (Mobile/Tablet) -->
      <button
        @click="toggleMobileMenu"
        class="lg:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
        aria-label="Menu"
      >
        <span
          class="hamburger-line"
          :class="{ 'hamburger-line-top-open': showMobileMenu }"
        ></span>
        <span
          class="hamburger-line"
          :class="{ 'hamburger-line-middle-open': showMobileMenu }"
        ></span>
        <span
          class="hamburger-line"
          :class="{ 'hamburger-line-bottom-open': showMobileMenu }"
        ></span>
      </button>
    </div>

    <!-- Overlay escuro (Mobile) -->
    <transition name="fade">
      <div
        v-if="showMobileMenu"
        @click="closeMobileMenu"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      ></div>
    </transition>

    <!-- Menu Lateral Mobile -->
    <transition name="slide">
      <div
        v-if="showMobileMenu"
        class="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
      >
        <!-- Header do Menu Mobile -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-xl font-serif font-bold text-nadine-black">Menu</h3>
          <button
            @click="closeMobileMenu"
            class="text-gray-600 hover:text-nadine-bronze transition-colors"
            aria-label="Fechar menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Links do Menu Mobile -->
        <div class="p-6">
          <nav class="space-y-1">
            <router-link to="/" @click="closeMobileMenu" class="mobile-nav-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ $t('nav.about') }}</span>
            </router-link>
            <router-link to="/propriedades" @click="closeMobileMenu" class="mobile-nav-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{{ $t('nav.properties') }}</span>
            </router-link>
            <a href="#" class="mobile-nav-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{{ $t('nav.offices') }}</span>
            </a>
            <a href="#" class="mobile-nav-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{{ $t('nav.franchising') }}</span>
            </a>
            <a href="#" class="mobile-nav-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{{ $t('nav.contact') }}</span>
            </a>
          </nav>

          <!-- Divisor -->
          <div class="my-6 border-t border-gray-200"></div>

          <!-- Language & Currency Selector Mobile -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Idioma</label>
              <select
                v-model="languageStore.selectedLanguage"
                @change="handleLanguageChangeMobile"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
              >
                <option
                  v-for="language in languageStore.availableLanguages"
                  :key="language.code"
                  :value="language.code"
                >
                  {{ language.flag }} {{ language.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Moeda</label>
              <select
                v-model="currencyStore.selectedCurrency"
                @change="handleCurrencyChange"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze"
              >
                <option
                  v-for="currency in currencyStore.availableCurrencies"
                  :key="currency.code"
                  :value="currency.code"
                >
                  {{ currency.flag }} {{ currency.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import NadineLogo from './NadineLogo.vue'
import { usePropertyStore } from '../stores/propertyStore'
import { useCurrencyStore } from '../stores/currencyStore'
import { useLanguageStore } from '../stores/languageStore'

const { locale } = useI18n()
const store = usePropertyStore()
const currencyStore = useCurrencyStore()
const languageStore = useLanguageStore()

const showLanguageDropdown = ref(false)
const showCurrencyDropdown = ref(false)
const showMobileMenu = ref(false)

const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value
  showCurrencyDropdown.value = false // Fechar o outro dropdown
}

const toggleCurrencyDropdown = () => {
  showCurrencyDropdown.value = !showCurrencyDropdown.value
  showLanguageDropdown.value = false // Fechar o outro dropdown
}

const selectLanguage = (languageCode) => {
  languageStore.setLanguage(languageCode)
  locale.value = languageCode // Atualizar o idioma do i18n
  showLanguageDropdown.value = false
}

const handleLanguageChangeMobile = () => {
  locale.value = languageStore.selectedLanguage
  console.log('Idioma alterado para:', languageStore.selectedLanguage)
}

const showMoreLanguages = () => {
  // Pode abrir um modal ou página com mais idiomas
  alert('Funcionalidade "View More" - Adicionar mais idiomas')
  showLanguageDropdown.value = false
}

const selectCurrency = (currencyCode) => {
  currencyStore.setCurrency(currencyCode)
  showCurrencyDropdown.value = false
}

const handleCurrencyChange = () => {
  console.log('Moeda alterada para:', currencyStore.selectedCurrency)
}

const showAllCurrencies = () => {
  // Pode abrir um modal ou página com mais moedas
  alert('Funcionalidade "View More" - Adicionar mais moedas')
  showCurrencyDropdown.value = false
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

// Prevenir scroll quando o menu mobile está aberto
watch(showMobileMenu, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Inicializar os stores
onMounted(async () => {
  languageStore.initialize()
  await currencyStore.initialize()

  // Sincronizar o idioma do i18n com o store
  locale.value = languageStore.selectedLanguage
})
</script>

<style scoped>
/* Desktop Nav Links */
.nav-link {
  color: #FAFAFA;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #B8956A !important;
}

.nav-link:hover svg {
  color: #B8956A !important;
}

/* Hamburger Animation */
.hamburger-line {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #1A1A1A;
  transition: all 0.3s ease-in-out;
  margin: 3px 0;
}

.hamburger-line-top-open {
  transform: translateY(8px) rotate(45deg);
  background-color: #B8956A;
}

.hamburger-line-middle-open {
  opacity: 0;
  transform: translateX(-10px);
}

.hamburger-line-bottom-open {
  transform: translateY(-8px) rotate(-45deg);
  background-color: #B8956A;
}

/* Mobile Nav Links */
.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  color: #1A1A1A;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  background-color: #F5F0E8;
  color: #B8956A;
  transform: translateX(4px);
}

.mobile-nav-link svg {
  color: #B8956A;
  flex-shrink: 0;
}

/* Fade Transition (Overlay) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide Transition (Menu Lateral) */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .nav-link {
    font-size: 0.95rem;
  }
}

@media (max-width: 640px) {
  /* Ajustar largura do menu mobile em telas pequenas */
  .fixed.right-0.w-80 {
    width: 85vw;
    max-width: 320px;
  }
}
</style>

