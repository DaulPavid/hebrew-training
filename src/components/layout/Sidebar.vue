<script setup lang="ts">
import { useExerciseStore } from '@/stores/exerciseStore'
import { useProgressStore } from '@/stores/progressStore'
import { useVocabStore } from '@/stores/vocabStore'
import ExerciseList from '@/components/exercises/ExerciseList.vue'

const exerciseStore = useExerciseStore()
const progressStore = useProgressStore()
const vocabStore = useVocabStore()

const emit = defineEmits<{
  'mode-change': [mode: 'typing' | 'vocab']
}>()

function selectTypingMode() {
  emit('mode-change', 'typing')
}

function selectVocabMode() {
  exerciseStore.clearExercise()
  emit('mode-change', 'vocab')
}
</script>

<template>
  <aside class="sidebar">
    <h1>עברית</h1>

    <!-- Mode selector -->
    <div class="sidebar__modes">
      <button class="sidebar__mode-btn" @click="selectTypingMode">
        <span class="sidebar__mode-icon">⌨️</span>
        <span>הקלדה עיוורת</span>
      </button>
      <button class="sidebar__mode-btn" @click="selectVocabMode">
        <span class="sidebar__mode-icon">📚</span>
        <span>אוצר מילים</span>
        <span v-if="vocabStore.dueItems.length > 0" class="sidebar__badge">
          {{ vocabStore.dueItems.length }}
        </span>
      </button>
    </div>

    <div class="sidebar__stats" v-if="progressStore.completedCount > 0 || vocabStore.learnedCount > 0">
      <div class="sidebar__stat" v-if="progressStore.streak > 0">
        <span class="sidebar__stat-value">{{ progressStore.streak }}</span>
        <span class="sidebar__stat-label">רצף</span>
      </div>
      <div class="sidebar__stat" v-if="progressStore.bestWPM > 0">
        <span class="sidebar__stat-value">{{ progressStore.bestWPM }}</span>
        <span class="sidebar__stat-label">WPM</span>
      </div>
      <div class="sidebar__stat" v-if="vocabStore.learnedCount > 0">
        <span class="sidebar__stat-value">{{ vocabStore.learnedCount }}/50</span>
        <span class="sidebar__stat-label">מילים</span>
      </div>
    </div>

    <ExerciseList
      class="sidebar__list"
      title="שיעורי אותיות"
      emoji="⌨️"
      :exercises="exerciseStore.letterExercises"
      @click="selectTypingMode"
    />

    <ExerciseList
      title="טקסטים"
      emoji="📖"
      :exercises="exerciseStore.textExercises"
      @click="selectTypingMode"
    />
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  min-width: 360px;
  max-width: 20vw;
  height: 100vh;
  padding: 40px 36px;
  background: #ffe8d6;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-y: auto;
  direction: rtl;

  h1 {
    font-size: 36px;
    font-family: 'Noto Sans Hebrew', sans-serif;
    font-weight: bold;
    margin: 0 0 24px 0;
  }

  &__modes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    margin-bottom: 24px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 12px;
  }

  &__mode-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    background: white;
    border: 2px solid #e9d5c9;
    border-radius: 10px;
    cursor: pointer;
    font-family: 'Noto Sans Hebrew', sans-serif;
    font-size: 1.05em;
    font-weight: 600;
    color: #333;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
      background: #fff8f3;
      border-color: #2e8f94;
      transform: translateX(-4px);
      box-shadow: 0 4px 8px rgba(46, 143, 148, 0.15);
    }
  }

  &__mode-icon {
    font-size: 1.3em;
  }

  &__badge {
    background: #ef4444;
    color: white;
    font-size: 0.75em;
    padding: 2px 8px;
    border-radius: 10px;
    margin-right: auto;
  }

  &__stats {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.5);
    padding: 8px 16px;
    border-radius: 8px;
  }

  &__stat-value {
    font-size: 1.3em;
    font-weight: bold;
    color: #2e8f94;
  }

  &__stat-label {
    font-size: 0.75em;
    color: #666;
  }

  &__list {
    margin-bottom: 16px;
  }
}
</style>
