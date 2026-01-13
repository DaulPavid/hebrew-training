<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { VocabItem } from '@/types'
import { useTypingEngine } from '@/composables/useTypingEngine'
import Letter from '@/components/typing/Letter.vue'
import TypingInput from '@/components/typing/TypingInput.vue'

const props = defineProps<{
  item: VocabItem
}>()

const emit = defineEmits<{
  complete: [correct: boolean, accuracy: number]
}>()

// Target text is the Hebrew word
const targetText = computed(() => props.item.hebrew)

// Set up typing engine
const {
  typedText,
  letterStates,
  isComplete,
  accuracy,
  handleInput,
  reset,
} = useTypingEngine(targetText)

// Track if result has been shown
const showResult = ref(false)
const wasCorrect = ref(false)

// Watch for completion
watch(isComplete, (complete) => {
  if (complete) {
    // Consider correct if accuracy >= 80%
    wasCorrect.value = accuracy.value >= 80
    showResult.value = true

    // Emit after a short delay for user to see result
    setTimeout(() => {
      emit('complete', wasCorrect.value, accuracy.value)
    }, 1500)
  }
})

// Reset when item changes
watch(
  () => props.item.id,
  () => {
    reset()
    showResult.value = false
    wasCorrect.value = false
  }
)
</script>

<template>
  <div class="vocab-card">
    <TypingInput
      v-model="typedText"
      :disabled="showResult"
      @update:model-value="handleInput"
    />

    <!-- English prompt -->
    <div class="vocab-card__prompt">
      <span class="vocab-card__english">{{ item.english }}</span>
      <span class="vocab-card__transliteration">({{ item.transliteration }})</span>
    </div>

    <!-- Hebrew letters display -->
    <div class="vocab-card__hebrew">
      <Letter
        v-for="(state, i) in letterStates"
        :key="i"
        :char="state.char"
        :status="state.status"
      />
    </div>

    <!-- Result feedback -->
    <div
      v-if="showResult"
      class="vocab-card__result"
      :class="{ 'vocab-card__result--correct': wasCorrect, 'vocab-card__result--incorrect': !wasCorrect }"
    >
      <span v-if="wasCorrect">{{ accuracy }}% - נכון!</span>
      <span v-else>{{ accuracy }}% - נסה שוב</span>
    </div>

    <!-- Category badge -->
    <div class="vocab-card__category">{{ item.category }}</div>
  </div>
</template>

<style scoped lang="scss">
.vocab-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 400px;

  &__prompt {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  &__english {
    font-size: 2em;
    font-weight: bold;
    color: #333;
  }

  &__transliteration {
    font-size: 1.2em;
    color: #666;
    font-style: italic;
  }

  &__hebrew {
    display: flex;
    flex-direction: row;
    gap: 4px;
    font-size: 2.5em;
    font-family: 'Noto Sans Hebrew', sans-serif;
    direction: rtl;
    padding: 16px 24px;
    background: #f8f9fa;
    border-radius: 12px;
    min-height: 80px;
    align-items: center;
  }

  &__result {
    font-size: 1.5em;
    font-weight: bold;
    padding: 12px 24px;
    border-radius: 8px;
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

    &--correct {
      background: #dcfce7;
      color: #166534;
    }

    &--incorrect {
      background: #fef2f2;
      color: #991b1b;
    }
  }

  &__category {
    font-size: 0.9em;
    color: #666;
    background: #e9ecef;
    padding: 4px 12px;
    border-radius: 12px;
  }
}
</style>
