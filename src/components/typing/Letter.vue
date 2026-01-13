<script setup lang="ts">
import type { LetterStatus } from '@/types'

const props = defineProps<{
  char: string
  status: LetterStatus
}>()

// Convert space to non-breaking space for display
const displayChar = props.char === ' ' ? '\u00A0' : props.char
</script>

<template>
  <span
    class="letter"
    :class="{
      'letter--current': status === 'current',
      'letter--correct': status === 'correct',
      'letter--incorrect': status === 'incorrect',
      'letter--pending': status === 'pending',
    }"
  >
    {{ displayChar }}
  </span>
</template>

<style scoped lang="scss">
.letter {
  margin: 0.5px;
  border-radius: 2px;
  padding-inline: 4px;
  transition: background-color 0.1s ease;
  color: #333; // Default readable color

  &--pending {
    color: #999; // Dimmed text for untyped letters
  }

  &--current {
    $animation-speed: 0.8s;

    position: relative;
    background-color: rgba(0, 0, 0, 0.1);
    animation: blink-bg $animation-speed ease-in-out infinite alternate;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background-color: #2b2fff;
      border-radius: 2px;
      animation: blink-caret $animation-speed ease-in-out infinite alternate;
    }
  }

  &--correct {
    background: #22fa95d3;
  }

  &--incorrect {
    background: #ff6e63d3;
  }
}

@keyframes blink-bg {
  0% {
    background-color: rgba(0, 0, 0, 0.1);
  }
  100% {
    background-color: rgba(0, 0, 0, 0);
  }
}

@keyframes blink-caret {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
