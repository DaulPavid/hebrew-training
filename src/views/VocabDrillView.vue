<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useVocabStore } from '@/stores/vocabStore'
import VocabCard from '@/components/vocab/VocabCard.vue'

const vocabStore = useVocabStore()

// Start session on mount
onMounted(() => {
  vocabStore.startSession()
})

// Handle card completion
function handleComplete(correct: boolean) {
  vocabStore.recordAnswer(correct)
}

// Session complete view
const isSessionComplete = computed(() => {
  return !vocabStore.hasMoreToReview && vocabStore.sessionStats.total > 0
})

// Start a new session
function startNewSession() {
  vocabStore.startSession()
}
</script>

<template>
  <div class="vocab-drill">
    <!-- Header with stats -->
    <div class="vocab-drill__header">
      <h1>תרגול אוצר מילים</h1>
      <div class="vocab-drill__stats">
        <div class="vocab-drill__stat">
          <span class="vocab-drill__stat-value">{{ vocabStore.learnedCount }}</span>
          <span class="vocab-drill__stat-label">נלמדו</span>
        </div>
        <div class="vocab-drill__stat">
          <span class="vocab-drill__stat-value">{{ vocabStore.masteredCount }}</span>
          <span class="vocab-drill__stat-label">שולטים</span>
        </div>
        <div class="vocab-drill__stat">
          <span class="vocab-drill__stat-value">{{ vocabStore.sessionStats.remaining }}</span>
          <span class="vocab-drill__stat-label">נותרו</span>
        </div>
      </div>
    </div>

    <!-- Session complete -->
    <div v-if="isSessionComplete" class="vocab-drill__complete">
      <svg class="vocab-drill__trophy" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 8L38 24H54L41 34L47 50L32 40L17 50L23 34L10 24H26L32 8Z"
          fill="#fbbf24"
          stroke="#f59e0b"
          stroke-width="2"
        />
      </svg>
      <h2>כל הכבוד!</h2>
      <p>סיימת את התרגול להיום</p>
      <div class="vocab-drill__session-stats">
        <p>מילים חדשות: {{ vocabStore.sessionStats.newLearned }}</p>
        <p>חזרות: {{ vocabStore.sessionStats.reviewed }}</p>
      </div>
      <button class="vocab-drill__btn" @click="startNewSession">
        התחל שוב
      </button>
    </div>

    <!-- No items to review -->
    <div v-else-if="!vocabStore.currentItem" class="vocab-drill__empty">
      <h2>אין מילים לתרגול</h2>
      <p>חזור מאוחר יותר או התחל מחדש</p>
      <button class="vocab-drill__btn" @click="startNewSession">
        התחל תרגול
      </button>
    </div>

    <!-- Active drilling -->
    <VocabCard
      v-else
      :item="vocabStore.currentItem"
      @complete="handleComplete"
    />

    <!-- Progress bar -->
    <div v-if="vocabStore.currentItem" class="vocab-drill__progress">
      <div class="vocab-drill__progress-bar">
        <div
          class="vocab-drill__progress-fill"
          :style="{ width: `${(vocabStore.sessionStats.total / (vocabStore.sessionStats.total + vocabStore.sessionStats.remaining)) * 100}%` }"
        />
      </div>
      <span class="vocab-drill__progress-text">
        {{ vocabStore.sessionStats.total }} / {{ vocabStore.sessionStats.total + vocabStore.sessionStats.remaining }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vocab-drill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  max-width: 600px;
  direction: rtl;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;

    h1 {
      font-family: 'Noto Sans Hebrew', sans-serif;
      font-size: 2em;
      color: #333;
      margin: 0;
    }
  }

  &__stats {
    display: flex;
    gap: 24px;
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    padding: 12px 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &__stat-value {
    font-size: 1.5em;
    font-weight: bold;
    color: #2e8f94;
  }

  &__stat-label {
    font-size: 0.85em;
    color: #666;
  }

  &__complete,
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 48px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;

    h2 {
      font-family: 'Noto Sans Hebrew', sans-serif;
      margin: 0;
      color: #333;
    }

    p {
      color: #666;
      margin: 0;
    }
  }

  &__trophy {
    width: 80px;
    height: 80px;
    animation: bounce 0.5s ease-out;

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  }

  &__session-stats {
    display: flex;
    gap: 24px;
    font-size: 1.1em;
    color: #333;

    p {
      margin: 0;
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    font-size: 1.1em;
    font-family: 'Noto Sans Hebrew', sans-serif;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #2e8f94 0%, #1a5f63 100%);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 12px rgba(46, 143, 148, 0.3);
    margin-top: 8px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(46, 143, 148, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &__progress {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    max-width: 400px;
  }

  &__progress-bar {
    width: 100%;
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
  }

  &__progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #2e8f94, #3db8bd);
    border-radius: 4px;
    transition: width 0.3s ease-out;
  }

  &__progress-text {
    font-size: 0.9em;
    color: #666;
  }
}
</style>
