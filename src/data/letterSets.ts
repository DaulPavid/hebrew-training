// Exercise types
export const ExerciseType = {
  REVIEW: 'review',
  PRACTICE: 'practice',
  TEXT: 'text',
} as const

export type ExerciseType = (typeof ExerciseType)[keyof typeof ExerciseType]

// A pair of new letters to learn together
export type LetterPair = [string, string]

// Descriptor for a letter exercise
export interface LetterExerciseDescriptor {
  newLetters: LetterPair
  type: typeof ExerciseType.PRACTICE | typeof ExerciseType.REVIEW
}

/**
 * Letter progression exercises
 * Each pair introduces letters that are typed by corresponding fingers on each hand.
 * Review exercises focus only on the new pair; Practice includes all learned letters.
 */
export const LETTER_EXERCISE_DESCRIPTORS: LetterExerciseDescriptor[] = [
  { newLetters: ['כ', 'ח'], type: ExerciseType.REVIEW },
  { newLetters: ['ג', 'ל'], type: ExerciseType.REVIEW },
  { newLetters: ['ג', 'ל'], type: ExerciseType.PRACTICE },
  { newLetters: ['ד', 'ך'], type: ExerciseType.REVIEW },
  { newLetters: ['ד', 'ך'], type: ExerciseType.PRACTICE },
  { newLetters: ['ש', 'ף'], type: ExerciseType.REVIEW },
  { newLetters: ['ש', 'ף'], type: ExerciseType.PRACTICE },
  { newLetters: ['ע', 'י'], type: ExerciseType.REVIEW },
  { newLetters: ['ע', 'י'], type: ExerciseType.PRACTICE },
  { newLetters: ['ר', 'ו'], type: ExerciseType.REVIEW },
  { newLetters: ['ר', 'ו'], type: ExerciseType.PRACTICE },
  { newLetters: ['ק', 'ן'], type: ExerciseType.REVIEW },
  { newLetters: ['ק', 'ן'], type: ExerciseType.PRACTICE },
  { newLetters: ['ם', "'"], type: ExerciseType.REVIEW },
  { newLetters: ['ם', "'"], type: ExerciseType.PRACTICE },
  { newLetters: ['/', 'ט'], type: ExerciseType.REVIEW },
  { newLetters: ['/', 'ט'], type: ExerciseType.PRACTICE },
  { newLetters: ['פ', 'א'], type: ExerciseType.REVIEW },
  { newLetters: ['פ', 'א'], type: ExerciseType.PRACTICE },
  { newLetters: ['ה', 'צ'], type: ExerciseType.REVIEW },
  { newLetters: ['ה', 'צ'], type: ExerciseType.PRACTICE },
  { newLetters: ['ב', 'ת'], type: ExerciseType.REVIEW },
  { newLetters: ['ב', 'ת'], type: ExerciseType.PRACTICE },
  { newLetters: ['ס', 'ץ'], type: ExerciseType.REVIEW },
  { newLetters: ['ס', 'ץ'], type: ExerciseType.PRACTICE },
  { newLetters: ['ז', '.'], type: ExerciseType.REVIEW },
  { newLetters: ['ז', '.'], type: ExerciseType.PRACTICE },
  { newLetters: ['נ', 'מ'], type: ExerciseType.REVIEW },
  { newLetters: ['נ', 'מ'], type: ExerciseType.PRACTICE },
]

/**
 * Get all letters learned up to and including a given exercise index
 */
export function getLettersUpToExercise(exerciseIndex: number): string[] {
  return LETTER_EXERCISE_DESCRIPTORS.slice(0, exerciseIndex + 1)
    .flatMap((descriptor) => descriptor.newLetters)
}

/**
 * Get a unique exercise ID from its index and type
 */
export function getExerciseId(index: number, type: ExerciseType): string {
  return `${type}-${index}`
}

/**
 * Get display label for an exercise
 */
export function getExerciseLabel(descriptor: LetterExerciseDescriptor): string {
  const [letter1, letter2] = descriptor.newLetters
  const typeLabel = descriptor.type === ExerciseType.REVIEW ? 'Review' : 'Practice'
  return `${letter1} ${letter2} (${typeLabel})`
}
