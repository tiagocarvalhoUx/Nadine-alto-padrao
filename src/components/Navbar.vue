<template>
  <nav class="py-4 px-6 fixed w-full top-0 z-50 shadow-md" style="background-color: #E6E5E2;">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <NadineLogo />
      </div>

      <!-- Menu Desktop -->
      <div class="hidden lg:flex items-center space-x-8">
        <router-link to="/" class="nav-link font-medium">Sobre Nós</router-link>
        <router-link to="/propriedades" class="nav-link font-medium">Propriedades</router-link>
        <a href="#" class="nav-link font-medium">Escritórios e Agentes</a>
        <a href="#" class="nav-link font-medium">Franchising</a>
        <a href="#" class="nav-link font-medium">Contacto</a>
      </div>

      <!-- Dropdowns de Idioma e Moeda (Desktop) -->
      <div class="hidden lg:flex items-center space-x-4">
        <!-- Language Selector -->
        <div class="relative">
          <button
            @click="toggleLanguageDropdown"
            class="nav-link flex items-center space-x-1"
          >
            <span>Português</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-if="showLanguageDropdown"
            class="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2"
          >
            <a href="#" class="block px-4 py-2 hover:bg-nadine-beige-light">Português</a>
            <a href="#" class="block px-4 py-2 hover:bg-nadine-beige-light">English</a>
            <a href="#" class="block px-4 py-2 hover:bg-nadine-beige-light">Español</a>
          </div>
        </div>

        <!-- Currency Selector -->
        <div class="relative">
          <button
            @click="toggleCurrencyDropdown"
            class="nav-link flex items-center space-x-1"
          >
            <span>USD</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-if="showCurrencyDropdown"
            class="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-lg py-2 max-h-96 overflow-y-auto"
          >
            <a href="#" class="block px-4 py-2 hover:bg-nadine-beige-light flex items-center space-x-2">
              <span>🇨🇦</span>
              <span>Canadian Dollar</span>
            </a>
            <a href="#" class="block px-4 py-2 hover:bg-nadine-beige-light flex items-center space-x-2">
              <span>🇨🇳</span>
              <span>Chinese Renminbi</span>
            </a>
            <a href="#" class="block px-4 py-2 hover:bg-nadine-beige-light flex items-center space-x-2">
              <span>🇪🇺</span>
              <span>Euro</span>
            </a>
            <a href="#" class="block px-4 py-2 hover:bg-nadine-beige-light flex items-center space-x-2">
              <span>🇬🇧</span>
              <span>British Pound</span>
            </a>
            <a href="#" class="block px-4 py-2 hover:bg-nadine-beige-light flex items-center space-x-2">
              <span>🇮🇳</span>
              <span>Indian Rupees</span>
            </a>
            <a href="#" class="block px-4 py-2 hover:bg-nadine-beige-light flex items-center space-x-2">
              <span>🇲🇽</span>
              <span>Mexican Pesos</span>
            </a>
            <a href="#" class="block px-4 py-2 hover:bg-nadine-beige-light flex items-center space-x-2">
              <span>🇺🇸</span>
              <span>US Dollar</span>
            </a>
            <button class="w-full mt-2 bg-nadine-bronze text-white py-2 hover:bg-nadine-bronze-dark transition-colors">
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
              <span>Sobre Nós</span>
            </router-link>
            <router-link to="/propriedades" @click="closeMobileMenu" class="mobile-nav-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Propriedades</span>
            </router-link>
            <a href="#" class="mobile-nav-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Escritórios e Agentes</span>
            </a>
            <a href="#" class="mobile-nav-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Franchising</span>
            </a>
            <a href="#" class="mobile-nav-link">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Contacto</span>
            </a>
          </nav>

          <!-- Divisor -->
          <div class="my-6 border-t border-gray-200"></div>

          <!-- Seletores Mobile -->
          <div class="space-y-4">
            <!-- Idioma Mobile -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Idioma</label>
              <select class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze">
                <option>Português</option>
                <option>English</option>
                <option>Español</option>
              </select>
            </div>

            <!-- Moeda Mobile -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Moeda</label>
              <select class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-nadine-bronze">
                <option>🇺🇸 US Dollar</option>
                <option>🇪🇺 Euro</option>
                <option>🇬🇧 British Pound</option>
                <option>🇨🇦 Canadian Dollar</option>
                <option>🇨🇳 Chinese Renminbi</option>
                <option>🇮🇳 Indian Rupees</option>
                <option>🇲🇽 Mexican Pesos</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import NadineLogo from './NadineLogo.vue'

const showLanguageDropdown = ref(false)
const showCurrencyDropdown = ref(false)
const showMobileMenu = ref(false)

const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value
  showCurrencyDropdown.value = false
}

const toggleCurrencyDropdown = () => {
  showCurrencyDropdown.value = !showCurrencyDropdown.value
  showLanguageDropdown.value = false
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

