<script setup lang="ts">
import { useExerciseStore } from '@/stores/exerciseStore'

const exerciseStore = useExerciseStore()

function startFirstExercise() {
  exerciseStore.selectExerciseByIndex(0)
}
</script>

<template>
  <div class="hero-section">
    <div class="hero-section__content">
      <h1>האתר ללמוד בו הקלדה עיוורת בעברית</h1>
      <p>לחץ על שיעור בתפריט הצד או התחל עכשיו</p>
      <button class="hero-section__start" @click="startFirstExercise">
        <span>התחל</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="hero-section__keyboard-illustration">
      <svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg">
        <!-- Simplified keyboard illustration -->
        <rect x="10" y="10" width="380" height="140" rx="8" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" />
        <!-- Row 1 -->
        <g transform="translate(20, 20)">
          <rect v-for="i in 13" :key="'r1-' + i" :x="(i-1) * 28" y="0" width="24" height="24" rx="4" fill="#e9ecef" stroke="#ced4da" />
        </g>
        <!-- Row 2 -->
        <g transform="translate(20, 48)">
          <rect v-for="i in 12" :key="'r2-' + i" :x="(i-1) * 28 + 10" y="0" width="24" height="24" rx="4" fill="#e9ecef" stroke="#ced4da" />
        </g>
        <!-- Row 3 -->
        <g transform="translate(20, 76)">
          <rect v-for="i in 11" :key="'r3-' + i" :x="(i-1) * 28 + 20" y="0" width="24" height="24" rx="4" fill="#e9ecef" stroke="#ced4da" />
        </g>
        <!-- Spacebar -->
        <rect x="100" y="110" width="200" height="28" rx="4" fill="#e9ecef" stroke="#ced4da" />
        <!-- Highlighted keys -->
        <rect x="148" y="76" width="24" height="24" rx="4" fill="#94dade" stroke="#2e8f94" stroke-width="2" />
        <rect x="232" y="76" width="24" height="24" rx="4" fill="#94dade" stroke="#2e8f94" stroke-width="2" />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
  text-align: center;
  direction: rtl;
  max-width: 600px;
  padding: 40px;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    h1 {
      font-size: 2.5em;
      font-family: 'Noto Sans Hebrew', sans-serif;
      font-weight: bold;
      color: #333;
      margin: 0;
      line-height: 1.3;
    }

    p {
      font-size: 1.2em;
      color: #666;
      margin: 0;
    }
  }

  &__start {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 32px;
    font-size: 1.2em;
    font-family: 'Noto Sans Hebrew', sans-serif;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #2e8f94 0%, #1a5f63 100%);
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 12px rgba(46, 143, 148, 0.3);
    margin-top: 16px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(46, 143, 148, 0.4);
    }

    &:active {
      transform: translateY(0);
    }

    svg {
      transform: scaleX(-1); // Flip for RTL
    }
  }

  &__keyboard-illustration {
    width: 100%;
    max-width: 400px;

    svg {
      width: 100%;
      height: auto;
    }
  }
}
</style>
