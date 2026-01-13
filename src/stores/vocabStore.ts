import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { UserProgress, VocabItem } from '@/types'
import { VOCABULARY, getVocabById } from '@/data/vocabulary'
import {
  createInitialProgress,
  calculateNextReview,
  isDue,
  isMastered,
  sortByPriority,
  getProgressStatus,
} from '@/composables/useSRS'

// LocalStorage key
const STORAGE_KEY = 'hebrew-practice-vocab-progress'

// Default settings
const DEFAULT_DAILY_NEW_LIMIT = 5
const DEFAULT_DAILY_REVIEW_LIMIT = 20

// Load progress from localStorage
function loadProgress(): Record<string, UserProgress> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load vocab progress:', e)
  }
  return {}
}

// Save progress to localStorage
function saveProgress(data: Record<string, UserProgress>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save vocab progress:', e)
  }
}

export const useVocabStore = defineStore('vocab', () => {
  // State
  const progress = ref<Record<string, UserProgress>>(loadProgress())
  const dailyNewLimit = ref(DEFAULT_DAILY_NEW_LIMIT)
  const dailyReviewLimit = ref(DEFAULT_DAILY_REVIEW_LIMIT)

  // Current session tracking
  const sessionNewCount = ref(0)
  const sessionReviewCount = ref(0)
  const currentItem = ref<VocabItem | null>(null)

  // Persist progress on change
  watch(
    progress,
    (newProgress) => {
      saveProgress(newProgress)
    },
    { deep: true }
  )

  // Computed: All vocabulary items with their progress status
  const vocabWithProgress = computed(() => {
    return VOCABULARY.map((item) => ({
      item,
      progress: progress.value[item.id] ?? null,
      status: progress.value[item.id]
        ? getProgressStatus(progress.value[item.id]!)
        : 'new',
    }))
  })

  // Computed: Items due for review
  const dueItems = computed(() => {
    const items = Object.values(progress.value).filter(isDue)
    return sortByPriority(items)
  })

  // Computed: New items (not yet learned)
  const newItems = computed(() => {
    return VOCABULARY.filter((item) => !progress.value[item.id])
  })

  // Computed: Count of learned words
  const learnedCount = computed(() => {
    return Object.keys(progress.value).length
  })

  // Computed: Count of mastered words
  const masteredCount = computed(() => {
    return Object.values(progress.value).filter(isMastered).length
  })

  // Computed: Today's review queue
  const reviewQueue = computed(() => {
    // Get due items (limited)
    const due = dueItems.value
      .slice(0, dailyReviewLimit.value - sessionReviewCount.value)
      .map((p) => getVocabById(p.itemId))
      .filter((item): item is VocabItem => item !== undefined)

    // Get new items (limited)
    const newOnes = newItems.value.slice(
      0,
      dailyNewLimit.value - sessionNewCount.value
    )

    // Combine: reviews first, then new
    return [...due, ...newOnes]
  })

  // Computed: Is there more to review?
  const hasMoreToReview = computed(() => {
    return reviewQueue.value.length > 0
  })

  // Computed: Session stats
  const sessionStats = computed(() => ({
    newLearned: sessionNewCount.value,
    reviewed: sessionReviewCount.value,
    total: sessionNewCount.value + sessionReviewCount.value,
    remaining: reviewQueue.value.length,
  }))

  // Actions

  /**
   * Start a new review session
   */
  function startSession() {
    sessionNewCount.value = 0
    sessionReviewCount.value = 0
    selectNextItem()
  }

  /**
   * Select the next item to review
   */
  function selectNextItem() {
    if (reviewQueue.value.length > 0) {
      currentItem.value = reviewQueue.value[0] ?? null
    } else {
      currentItem.value = null
    }
  }

  /**
   * Record an answer and move to next item
   */
  function recordAnswer(correct: boolean) {
    if (!currentItem.value) return

    const itemId = currentItem.value.id
    const existing = progress.value[itemId]

    if (existing) {
      // Update existing progress
      progress.value[itemId] = calculateNextReview(existing, correct)
      sessionReviewCount.value++
    } else {
      // Create new progress for first-time item
      const initial = createInitialProgress(itemId)
      progress.value[itemId] = calculateNextReview(initial, correct)
      sessionNewCount.value++
    }

    // Move to next item
    selectNextItem()
  }

  /**
   * Get progress for a specific item
   */
  function getItemProgress(itemId: string): UserProgress | null {
    return progress.value[itemId] ?? null
  }

  /**
   * Reset all vocabulary progress
   */
  function resetProgress() {
    progress.value = {}
    sessionNewCount.value = 0
    sessionReviewCount.value = 0
    currentItem.value = null
  }

  /**
   * Skip current item (move to end of queue)
   */
  function skipItem() {
    selectNextItem()
  }

  return {
    // State
    progress,
    dailyNewLimit,
    dailyReviewLimit,
    currentItem,

    // Computed
    vocabWithProgress,
    dueItems,
    newItems,
    learnedCount,
    masteredCount,
    reviewQueue,
    hasMoreToReview,
    sessionStats,

    // Actions
    startSession,
    selectNextItem,
    recordAnswer,
    getItemProgress,
    resetProgress,
    skipItem,
  }
})
