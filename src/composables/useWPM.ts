import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'
import { useInterval } from './useInterval'

const WPM_REFRESH_RATE_MS = 800
const WORD_LENGTH = 5 // Standard WPM calculation uses 5 chars per word
const MS_IN_SECONDS = 1000
const SECONDS_IN_MINUTE = 60

interface WPMReturn {
  /** Current words per minute */
  wpm: Ref<number>
  /** Elapsed time in seconds since first keystroke */
  elapsedTimeSeconds: ComputedRef<number>
  /** Whether typing is finished */
  isFinished: ComputedRef<boolean>
  /** Reset the WPM timer */
  resetWPM: () => void
}

/**
 * WPM (Words Per Minute) tracking composable
 * Calculates typing speed based on correct characters typed
 */
export function useWPM(
  typedText: Ref<string>,
  targetText: Ref<string>,
  correctCount: Ref<number>
): WPMReturn {
  const wpm = ref(0)
  const startTime = ref<number | null>(null)

  const isFinished = computed(
    () => typedText.value.length >= targetText.value.length
  )

  const elapsedTimeSeconds = computed(() => {
    if (startTime.value === null) return 0
    return (performance.now() - startTime.value) / MS_IN_SECONDS
  })

  // Interval delay: null when finished (stops interval), otherwise refresh rate
  const intervalDelay = computed(() =>
    isFinished.value ? null : WPM_REFRESH_RATE_MS
  )

  function calculateWPM(): void {
    // Don't calculate if no input yet or already finished
    if (typedText.value === '' && startTime.value === null) {
      return
    }

    // Start timer on first keystroke
    if (startTime.value === null && typedText.value.length > 0) {
      startTime.value = performance.now()
      return
    }

    const elapsed = elapsedTimeSeconds.value
    if (elapsed <= 0) return

    // WPM = (correct characters / 5) / minutes
    const numCorrectWords = correctCount.value / WORD_LENGTH
    const minutes = elapsed / SECONDS_IN_MINUTE
    wpm.value = Math.round(numCorrectWords / minutes)
  }

  // Set up the interval
  useInterval(calculateWPM, intervalDelay)

  // Also calculate when input changes (for immediate feedback)
  watch(typedText, () => {
    if (typedText.value.length > 0 && startTime.value === null) {
      startTime.value = performance.now()
    }
  })

  function resetWPM(): void {
    startTime.value = null
    wpm.value = 0
  }

  return {
    wpm,
    elapsedTimeSeconds,
    isFinished,
    resetWPM,
  }
}
