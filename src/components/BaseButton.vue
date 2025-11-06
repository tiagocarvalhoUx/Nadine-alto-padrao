<template>
  <button
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const base = 'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variants = {
    primary: 'bg-luxury-gold text-white hover:bg-opacity-90 focus:ring-luxury-gold',
    secondary: 'bg-luxury-dark text-white hover:bg-gray-800 focus:ring-luxury-dark',
    outline: 'border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white focus:ring-luxury-gold'
  }

  return `${base} ${sizes[props.size]} ${variants[props.variant]}`
})
</script>
