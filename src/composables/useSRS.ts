import type { UserProgress } from '@/types'

/**
 * Spaced Repetition System (SRS) - Simplified SM-2 Algorithm
 *
 * The algorithm determines when to show an item again based on:
 * - Whether the user got it correct
 * - How many times they've reviewed it
 * - The current ease factor (how easy the item is for them)
 *
 * Intervals progress roughly: 1 day → 3 days → 7 days → 14 days → 30 days → etc.
 */

// Default values for new items
const DEFAULT_EASE_FACTOR = 2.5
const MIN_EASE_FACTOR = 1.3
const MAX_EASE_FACTOR = 3.0
const EASE_ADJUSTMENT = 0.15

/**
 * Get today's date as ISO string (YYYY-MM-DD)
 */
function getTodayISO(): string {
  return new Date().toISOString().split('T')[0] ?? ''
}

/**
 * Add days to a date and return ISO string
 */
function addDays(date: Date, days: number): string {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result.toISOString().split('T')[0] ?? ''
}

/**
 * Create initial progress for a new vocabulary item
 */
export function createInitialProgress(itemId: string): UserProgress {
  return {
    itemId,
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    dueDate: getTodayISO(),
    reviewCount: 0,
    correctCount: 0,
  }
}

/**
 * Calculate next review based on answer correctness
 *
 * @param progress - Current progress state
 * @param correct - Whether the answer was correct
 * @returns Updated progress with new interval and due date
 */
export function calculateNextReview(
  progress: UserProgress,
  correct: boolean
): UserProgress {
  const { easeFactor, interval, reviewCount, correctCount } = progress

  if (correct) {
    // Calculate new interval
    let newInterval: number
    if (interval === 0) {
      // First correct answer: review tomorrow
      newInterval = 1
    } else if (interval === 1) {
      // Second correct: review in 3 days
      newInterval = 3
    } else {
      // Subsequent correct: multiply by ease factor
      newInterval = Math.round(interval * easeFactor)
    }

    // Slightly increase ease factor for correct answers
    const newEaseFactor = Math.min(MAX_EASE_FACTOR, easeFactor + EASE_ADJUSTMENT)

    return {
      ...progress,
      easeFactor: newEaseFactor,
      interval: newInterval,
      dueDate: addDays(new Date(), newInterval),
      reviewCount: reviewCount + 1,
      correctCount: correctCount + 1,
    }
  } else {
    // Incorrect answer: reset interval to 1 day, decrease ease
    const newEaseFactor = Math.max(MIN_EASE_FACTOR, easeFactor - (EASE_ADJUSTMENT * 2))

    return {
      ...progress,
      easeFactor: newEaseFactor,
      interval: 1,
      dueDate: addDays(new Date(), 1),
      reviewCount: reviewCount + 1,
      // correctCount stays the same
    }
  }
}

/**
 * Check if an item is due for review
 */
export function isDue(progress: UserProgress): boolean {
  return progress.dueDate <= getTodayISO()
}

/**
 * Check if an item is considered "mastered" (long interval)
 */
export function isMastered(progress: UserProgress): boolean {
  return progress.interval >= 21 // 3 weeks or more
}

/**
 * Get items that are due for review
 */
export function getDueItems(progressList: UserProgress[]): UserProgress[] {
  return progressList.filter(isDue)
}

/**
 * Sort items by priority (overdue first, then by interval ascending)
 */
export function sortByPriority(progressList: UserProgress[]): UserProgress[] {
  const today = getTodayISO()

  return [...progressList].sort((a, b) => {
    // Overdue items first
    const aOverdue = a.dueDate < today
    const bOverdue = b.dueDate < today

    if (aOverdue && !bOverdue) return -1
    if (!aOverdue && bOverdue) return 1

    // Then by due date (earliest first)
    if (a.dueDate !== b.dueDate) {
      return a.dueDate.localeCompare(b.dueDate)
    }

    // Then by interval (shorter interval = needs more practice)
    return a.interval - b.interval
  })
}

/**
 * Calculate accuracy percentage for a progress item
 */
export function getAccuracy(progress: UserProgress): number {
  if (progress.reviewCount === 0) return 0
  return Math.round((progress.correctCount / progress.reviewCount) * 100)
}

/**
 * Get a human-readable status for an item
 */
export function getProgressStatus(progress: UserProgress): 'new' | 'learning' | 'reviewing' | 'mastered' {
  if (progress.reviewCount === 0) return 'new'
  if (progress.interval <= 1) return 'learning'
  if (progress.interval >= 21) return 'mastered'
  return 'reviewing'
}
