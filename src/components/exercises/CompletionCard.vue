<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  wpm: number
  accuracy: number
}>()

const formattedWpm = computed(() => Math.round(props.wpm))
const formattedAccuracy = computed(() => Math.round(props.accuracy))
</script>

<template>
  <div class="completion-card">
    <svg class="completion-card__checkmark" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="25" fill="none" stroke="#22c55e" stroke-width="2" />
      <path
        fill="none"
        stroke="#22c55e"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>

    <div class="completion-card__stats">
      <p>{{ formattedWpm }} WPM</p>
      <p>{{ formattedAccuracy }}% דיוק</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.completion-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: #f0fdf4;
  border-radius: 16px;
  border: 2px solid #22c55e;
  animation: pop-in 0.3s ease-out;

  @keyframes pop-in {
    0% {
      transform: scale(0.9);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  &__checkmark {
    width: 64px;
    height: 64px;

    circle {
      animation: circle-draw 0.6s ease-out forwards;
      stroke-dasharray: 166;
      stroke-dashoffset: 166;
    }

    path {
      animation: check-draw 0.4s ease-out 0.4s forwards;
      stroke-dasharray: 48;
      stroke-dashoffset: 48;
    }

    @keyframes circle-draw {
      to {
        stroke-dashoffset: 0;
      }
    }

    @keyframes check-draw {
      to {
        stroke-dashoffset: 0;
      }
    }
  }

  &__stats {
    display: flex;
    gap: 32px;
    font-size: 1.5em;
    font-weight: bold;
    color: #166534;

    p {
      margin: 0;
    }
  }
}
</style>
