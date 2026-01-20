<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useExerciseStore } from '@/stores/exerciseStore'
import AppLayout from '@/components/layout/AppLayout.vue'
import ExerciseView from '@/views/ExerciseView.vue'
import VocabDrillView from '@/views/VocabDrillView.vue'
import TranslationView from '@/views/TranslationView.vue'
import SentenceCompletionView from '@/views/SentenceCompletionView.vue'
import PhraseTypingView from '@/views/PhraseTypingView.vue'
import DictationView from '@/views/DictationView.vue'
import ConjugationView from '@/views/ConjugationView.vue'
import PluralView from '@/views/PluralView.vue'
import NumberView from '@/views/NumberView.vue'
import RootView from '@/views/RootView.vue'
import MinimalPairView from '@/views/MinimalPairView.vue'

const exerciseStore = useExerciseStore()

// Mobile detection
const isMobile = computed(() => {
  if (typeof window === 'undefined') return false
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const isNarrow = window.innerWidth < 768
  return hasTouch && isNarrow
})

// Current mode
type AppMode = 'typing' | 'vocab' | 'translation' | 'sentence' | 'phrase' | 'dictation' | 'conjugation' | 'plural' | 'number' | 'root' | 'minimalPair'
const currentMode = ref<AppMode>('typing')

// Handle mode change from sidebar
function handleModeChange(mode: AppMode) {
  currentMode.value = mode
}

// Switch to typing mode when an exercise is selected
watch(
  () => exerciseStore.currentExercise,
  (exercise) => {
    if (exercise) {
      currentMode.value = 'typing'
    }
  }
)
</script>

<template>
  <!-- Mobile message -->
  <div v-if="isMobile" class="mobile-message">
    <div class="mobile-message__content">
      <h1>אימון עברית</h1>
      <p class="mobile-message__subtitle">Hebrew Typing Practice</p>
      <div class="mobile-message__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="4" width="20" height="14" rx="2" />
          <line x1="6" y1="8" x2="6" y2="8" stroke-linecap="round" />
          <line x1="10" y1="8" x2="10" y2="8" stroke-linecap="round" />
          <line x1="14" y1="8" x2="14" y2="8" stroke-linecap="round" />
          <line x1="18" y1="8" x2="18" y2="8" stroke-linecap="round" />
          <line x1="6" y1="12" x2="6" y2="12" stroke-linecap="round" />
          <line x1="18" y1="12" x2="18" y2="12" stroke-linecap="round" />
          <line x1="8" y1="16" x2="16" y2="16" stroke-linecap="round" />
        </svg>
      </div>
      <h2>נדרשת מקלדת</h2>
      <p class="mobile-message__subtitle">Keyboard Required</p>
      <p class="mobile-message__description">
        אפליקציה זו מיועדת לתרגול הקלדה בעברית ודורשת מקלדת פיזית.
      </p>
      <p class="mobile-message__description">
        This app is designed for Hebrew typing practice and requires a physical keyboard.
      </p>
      <p class="mobile-message__suggestion">
        אנא בקר/י באתר ממחשב.
        <br />
        Please visit from a desktop or laptop computer.
      </p>
    </div>
  </div>

  <!-- Desktop app -->
  <AppLayout v-else @mode-change="handleModeChange">
    <ExerciseView v-if="currentMode === 'typing'" />
    <VocabDrillView v-else-if="currentMode === 'vocab'" />
    <TranslationView v-else-if="currentMode === 'translation'" />
    <SentenceCompletionView v-else-if="currentMode === 'sentence'" />
    <PhraseTypingView v-else-if="currentMode === 'phrase'" />
    <DictationView v-else-if="currentMode === 'dictation'" />
    <ConjugationView v-else-if="currentMode === 'conjugation'" />
    <PluralView v-else-if="currentMode === 'plural'" />
    <NumberView v-else-if="currentMode === 'number'" />
    <RootView v-else-if="currentMode === 'root'" />
    <MinimalPairView v-else-if="currentMode === 'minimalPair'" />
  </AppLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Noto Sans Hebrew', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
}

.mobile-message {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #ffe8d6 0%, #f5f5f5 100%);
}

.mobile-message__content {
  text-align: center;
  max-width: 400px;
}

.mobile-message__content h1 {
  font-size: 2.5em;
  color: #333;
  margin: 0 0 4px 0;
}

.mobile-message__content h2 {
  font-size: 1.5em;
  color: #2e8f94;
  margin: 16px 0 4px 0;
}

.mobile-message__subtitle {
  color: #666;
  margin: 0 0 16px 0;
  font-size: 1em;
}

.mobile-message__icon {
  margin: 24px 0;
}

.mobile-message__icon svg {
  width: 80px;
  height: 80px;
  color: #2e8f94;
}

.mobile-message__description {
  color: #555;
  line-height: 1.6;
  margin: 8px 0;
}

.mobile-message__suggestion {
  margin-top: 24px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  color: #333;
  line-height: 1.8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
