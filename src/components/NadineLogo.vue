<template>
  <router-link to="/" class="nadine-logo-container">
    <svg class="nadine-logo-svg" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
      <!-- Art Deco decorative elements - top -->
      <g class="deco-top">
        <!-- Curved element on left -->
        <path d="M 15 25 Q 20 20 25 25" stroke="#B8956A" stroke-width="0.5" fill="none"/>
        <!-- Vertical lines -->
        <line x1="28" y1="18" x2="28" y2="28" stroke="#B8956A" stroke-width="0.5"/>
        <line x1="30" y1="18" x2="30" y2="28" stroke="#B8956A" stroke-width="0.5"/>
        <line x1="32" y1="18" x2="32" y2="28" stroke="#B8956A" stroke-width="0.5"/>
        <line x1="34" y1="18" x2="34" y2="28" stroke="#B8956A" stroke-width="0.5"/>
        <line x1="36" y1="18" x2="36" y2="28" stroke="#B8956A" stroke-width="0.5"/>

        <!-- Curved element on right -->
        <path d="M 175 25 Q 170 20 165 25" stroke="#B8956A" stroke-width="0.5" fill="none"/>
      </g>

      <!-- Main Text NADINE -->
      <text x="50%" y="40" text-anchor="middle" class="logo-text">
        NADINE
      </text>

      <!-- Art Deco decorative elements - bottom -->
      <g class="deco-bottom">
        <!-- Horizontal center line -->
        <line x1="40" y1="45" x2="160" y2="45" stroke="#B8956A" stroke-width="1"/>

        <!-- Center geometric element -->
        <rect x="95" y="42" width="10" height="6" fill="#B8956A"/>

        <!-- Wave patterns -->
        <path d="M 20 48 Q 25 45 30 48 Q 35 51 40 48" stroke="#B8956A" stroke-width="0.5" fill="none"/>
        <path d="M 160 48 Q 165 45 170 48 Q 175 51 180 48" stroke="#B8956A" stroke-width="0.5" fill="none"/>

        <!-- Small rectangles -->
        <rect x="43" y="43" width="4" height="4" fill="none" stroke="#B8956A" stroke-width="0.5"/>
        <rect x="153" y="43" width="4" height="4" fill="none" stroke="#B8956A" stroke-width="0.5"/>
      </g>
    </svg>
    <p class="logo-subtitle">Imobiliária de Alto Padrão</p>
  </router-link>
</template>

<script setup>
</script>

<style scoped>
.nadine-logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  text-decoration: none;
}

.nadine-logo-container:hover {
  transform: scale(1.05);
}

.nadine-logo-svg {
  width: 160px;
  height: auto;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.3em;
  fill: #1A1A1A;
}

.logo-subtitle {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: #B8956A;
  text-transform: uppercase;
  font-weight: 300;
  margin-top: -0.5rem;
}

.deco-top,
.deco-bottom {
  opacity: 0.8;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .nadine-logo-svg {
    width: 140px;
  }

  .logo-text {
    font-size: 20px;
  }

  .logo-subtitle {
    font-size: 0.55rem;
  }
}
</style>
