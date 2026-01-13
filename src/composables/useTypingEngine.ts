import { ref, computed, type Ref, type ComputedRef } from 'vue'
import type { LetterState, LetterStatus } from '@/types'
import { normalizeGeresh } from '@/data/letters'

interface TypingEngineReturn {
  /** The text the user has typed so far */
  typedText: Ref<string>
  /** Array of letter states for rendering */
  letterStates: ComputedRef<LetterState[]>
  /** Whether the exercise is complete */
  isComplete: ComputedRef<boolean>
  /** Number of correct characters typed */
  correctCount: ComputedRef<number>
  /** Accuracy percentage (0-100) */
  accuracy: ComputedRef<number>
  /** Current character index */
  currentIndex: ComputedRef<number>
  /** Handle new input from the user */
  handleInput: (value: string) => void
  /** Reset the typing state */
  reset: () => void
}

/**
 * Core typing engine composable
 * Tracks user input against target text and computes letter states
 */
export function useTypingEngine(targetText: Ref<string>): TypingEngineReturn {
  const typedText = ref('')

  const currentIndex = computed(() => typedText.value.length)

  const isComplete = computed(
    () => typedText.value.length >= targetText.value.length
  )

  const letterStates = computed<LetterState[]>(() => {
    const target = targetText.value
    const typed = typedText.value

    return Array.from(target).map((char, index): LetterState => {
      let status: LetterStatus

      if (index === typed.length) {
        status = 'current'
      } else if (index > typed.length) {
        status = 'pending'
      } else {
        status = typed[index] === char ? 'correct' : 'incorrect'
      }

      return { char, status }
    })
  })

  const correctCount = computed(() => {
    const target = targetText.value
    const typed = typedText.value

    return Array.from(typed).reduce((count, char, index) => {
      return count + (target.charAt(index) === char ? 1 : 0)
    }, 0)
  })

  const accuracy = computed(() => {
    if (typedText.value.length === 0) return 100
    return Math.round((correctCount.value / typedText.value.length) * 100)
  })

  function handleInput(value: string): void {
    // Normalize geresh for cross-platform compatibility
    const normalizedValue = normalizeGeresh(value)

    // Only accept input up to target length
    if (normalizedValue.length <= targetText.value.length) {
      typedText.value = normalizedValue
    }
  }

  function reset(): void {
    typedText.value = ''
  }

  return {
    typedText,
    letterStates,
    isComplete,
    correctCount,
    accuracy,
    currentIndex,
    handleInput,
    reset,
  }
}
