import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  ExerciseType,
  LETTER_EXERCISE_DESCRIPTORS,
  getExerciseId,
  getExerciseLabel,
  type LetterExerciseDescriptor,
} from '@/data/letterSets'
import { TEXT_EXERCISES, type TextExerciseData } from '@/data/textExercises'
import { generateExerciseText } from '@/utils/exerciseGenerator'

// Exercise data structure
export interface Exercise {
  id: string
  index: number
  type: ExerciseType
  text: string[]
  label: string
  newLetters?: [string, string]
}

export const useExerciseStore = defineStore('exercise', () => {
  // Current selected exercise
  const currentExercise = ref<Exercise | null>(null)

  // Generate all letter exercises
  const letterExercises = computed<Exercise[]>(() => {
    return LETTER_EXERCISE_DESCRIPTORS.map(
      (descriptor: LetterExerciseDescriptor, index: number) => ({
        id: getExerciseId(index, descriptor.type),
        index,
        type: descriptor.type,
        text: generateExerciseText(index),
        label: getExerciseLabel(descriptor),
        newLetters: descriptor.newLetters,
      })
    )
  })

  // Generate all text exercises
  const textExercises = computed<Exercise[]>(() => {
    return TEXT_EXERCISES.map((exercise: TextExerciseData, index: number) => ({
      id: getExerciseId(LETTER_EXERCISE_DESCRIPTORS.length + index, ExerciseType.TEXT),
      index: LETTER_EXERCISE_DESCRIPTORS.length + index,
      type: ExerciseType.TEXT,
      text: exercise.text,
      label: exercise.label,
    }))
  })

  // All exercises combined
  const allExercises = computed<Exercise[]>(() => [
    ...letterExercises.value,
    ...textExercises.value,
  ])

  // Select an exercise by ID
  function selectExercise(id: string) {
    const exercise = allExercises.value.find((e) => e.id === id)
    if (exercise) {
      currentExercise.value = exercise
    }
  }

  // Select an exercise by index
  function selectExerciseByIndex(index: number) {
    const exercise = allExercises.value.find((e) => e.index === index)
    if (exercise) {
      currentExercise.value = exercise
    }
  }

  // Regenerate current exercise (for letter exercises, generates new random text)
  function regenerateCurrentExercise() {
    if (!currentExercise.value) return

    const { type, index } = currentExercise.value

    if (type === ExerciseType.TEXT) {
      // Text exercises don't regenerate
      return
    }

    // Regenerate letter exercise with new random text
    const descriptor = LETTER_EXERCISE_DESCRIPTORS[index]
    if (descriptor) {
      currentExercise.value = {
        ...currentExercise.value,
        text: generateExerciseText(index),
      }
    }
  }

  // Clear current exercise
  function clearExercise() {
    currentExercise.value = null
  }

  // Get the current letter being practiced (first letter of new pair)
  const currentLetter = computed<string | null>(() => {
    if (!currentExercise.value?.newLetters) return null
    return currentExercise.value.newLetters[0]
  })

  return {
    currentExercise,
    letterExercises,
    textExercises,
    allExercises,
    currentLetter,
    selectExercise,
    selectExerciseByIndex,
    regenerateCurrentExercise,
    clearExercise,
  }
})
