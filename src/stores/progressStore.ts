import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

// LocalStorage key
const STORAGE_KEY = 'hebrew-practice-progress'

// Progress data structure
interface ProgressData {
  wpmRecords: Record<string, number> // exerciseId -> best WPM
  streak: number
  lastPracticeDate: string | null // ISO date string
}

// Default progress data
function getDefaultProgress(): ProgressData {
  return {
    wpmRecords: {},
    streak: 0,
    lastPracticeDate: null,
  }
}

// Load progress from localStorage
function loadProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Failed to load progress from localStorage:', e)
  }
  return getDefaultProgress()
}

// Save progress to localStorage
function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e)
  }
}

// Get today's date as ISO string (YYYY-MM-DD)
function getTodayISO(): string {
  return new Date().toISOString().split('T')[0] ?? ''
}

// Check if a date is yesterday
function isYesterday(dateStr: string): boolean {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return dateStr === (yesterday.toISOString().split('T')[0] ?? '')
}

export const useProgressStore = defineStore('progress', () => {
  // Load initial data
  const initialData = loadProgress()

  // State
  const wpmRecords = ref<Record<string, number>>(initialData.wpmRecords)
  const streak = ref<number>(initialData.streak)
  const lastPracticeDate = ref<string | null>(initialData.lastPracticeDate)

  // Watch for changes and persist
  watch(
    [wpmRecords, streak, lastPracticeDate],
    () => {
      saveProgress({
        wpmRecords: wpmRecords.value,
        streak: streak.value,
        lastPracticeDate: lastPracticeDate.value,
      })
    },
    { deep: true }
  )

  // Computed: Best WPM overall
  const bestWPM = computed<number>(() => {
    const wpms = Object.values(wpmRecords.value)
    return wpms.length > 0 ? Math.max(...wpms) : 0
  })

  // Computed: Average WPM
  const averageWPM = computed<number>(() => {
    const wpms = Object.values(wpmRecords.value)
    if (wpms.length === 0) return 0
    return Math.round(wpms.reduce((a, b) => a + b, 0) / wpms.length)
  })

  // Computed: Number of completed exercises
  const completedCount = computed<number>(() => {
    return Object.keys(wpmRecords.value).length
  })

  // Save WPM for an exercise (only if better than previous)
  function saveWPM(exerciseId: string, wpm: number): boolean {
    const current = wpmRecords.value[exerciseId] ?? 0
    if (wpm > current) {
      wpmRecords.value[exerciseId] = wpm
      updateStreak()
      return true
    }
    return false
  }

  // Get WPM for a specific exercise
  function getWPM(exerciseId: string): number | null {
    return wpmRecords.value[exerciseId] ?? null
  }

  // Update streak based on practice dates
  function updateStreak(): void {
    const today = getTodayISO()

    if (lastPracticeDate.value === today) {
      // Already practiced today, no change
      return
    }

    if (lastPracticeDate.value === null) {
      // First practice ever
      streak.value = 1
    } else if (isYesterday(lastPracticeDate.value)) {
      // Practiced yesterday, increment streak
      streak.value += 1
    } else {
      // Missed a day, reset streak
      streak.value = 1
    }

    lastPracticeDate.value = today
  }

  // Check and potentially reset streak on app load
  function checkStreak(): void {
    if (lastPracticeDate.value === null) return

    const today = getTodayISO()
    if (lastPracticeDate.value !== today && !isYesterday(lastPracticeDate.value)) {
      // Streak is broken
      streak.value = 0
    }
  }

  // Reset all progress
  function resetProgress(): void {
    wpmRecords.value = {}
    streak.value = 0
    lastPracticeDate.value = null
  }

  // Check streak on store initialization
  checkStreak()

  return {
    wpmRecords,
    streak,
    lastPracticeDate,
    bestWPM,
    averageWPM,
    completedCount,
    saveWPM,
    getWPM,
    updateStreak,
    checkStreak,
    resetProgress,
  }
})
