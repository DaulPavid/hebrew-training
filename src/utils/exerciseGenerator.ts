import {
  ExerciseType,
  LETTER_EXERCISE_DESCRIPTORS,
  getLettersUpToExercise,
} from '@/data/letterSets'
import type { LetterPair } from '@/data/letterSets'

// Configuration for exercise text generation
const LINE_LENGTH = 25
const NUM_LINES = 3
const AVERAGE_WORD_LENGTH = 5

/**
 * Generate a random word length (2 to AVERAGE_WORD_LENGTH+1)
 */
function randomWordLength(): number {
  return Math.max(2, Math.floor(Math.random() * AVERAGE_WORD_LENGTH + 1))
}

/**
 * Pick a random letter from the given set
 */
function randomLetter(letters: string[]): string {
  const index = Math.floor(Math.random() * letters.length)
  // Non-null assertion is safe here because we always pass non-empty arrays
  return letters[index]!
}

/**
 * Generate a random line of text using the given letter set
 * @param letters - The set of letters to use
 * @param isLastLine - Whether this is the last line (no trailing space)
 */
function generateLine(letters: string[], isLastLine: boolean): string {
  const numWords = Math.ceil(LINE_LENGTH / AVERAGE_WORD_LENGTH)
  const words: string[] = []

  for (let i = 0; i < numWords; i++) {
    const wordLength = randomWordLength()
    let word = ''
    for (let j = 0; j < wordLength; j++) {
      word += randomLetter(letters)
    }
    words.push(word)
  }

  return words.join(' ') + (isLastLine ? '' : ' ')
}

/**
 * Generate multiple lines of random text using the given letter set
 */
function generateLines(letters: string[], numLines: number = NUM_LINES): string[] {
  const lines: string[] = []
  for (let i = 0; i < numLines; i++) {
    lines.push(generateLine(letters, i === numLines - 1))
  }
  return lines
}

/**
 * Generate a review exercise (uses only the new letter pair)
 */
export function generateReviewExercise(newLetters: LetterPair): string[] {
  return generateLines(newLetters)
}

/**
 * Generate a practice exercise (uses all letters learned up to this point)
 */
export function generatePracticeExercise(exerciseIndex: number): string[] {
  const letters = getLettersUpToExercise(exerciseIndex)
  return generateLines(letters)
}

/**
 * Generate exercise text based on exercise index and type
 */
export function generateExerciseText(exerciseIndex: number): string[] {
  const descriptor = LETTER_EXERCISE_DESCRIPTORS[exerciseIndex]
  if (!descriptor) {
    throw new Error(`Invalid exercise index: ${exerciseIndex}`)
  }

  if (descriptor.type === ExerciseType.REVIEW) {
    return generateReviewExercise(descriptor.newLetters)
  } else {
    return generatePracticeExercise(exerciseIndex)
  }
}

/**
 * Get the full text as a single string (lines joined)
 */
export function generateExerciseTextString(exerciseIndex: number): string {
  return generateExerciseText(exerciseIndex).join('')
}
