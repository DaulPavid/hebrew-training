// Letter state for typing feedback
export type LetterStatus = 'pending' | 'current' | 'correct' | 'incorrect'

export interface LetterState {
  char: string
  status: LetterStatus
}

// Exercise types
export type ExerciseType = 'letter' | 'vocab' | 'translation' | 'dictation' | 'sentence' | 'phrase'

export interface Exercise {
  id: string
  type: ExerciseType
  content: string
  meta?: Record<string, unknown>
}

// Letter exercise specific
export type LetterExerciseMode = 'review' | 'practice'

export interface LetterExercise extends Exercise {
  type: 'letter'
  mode: LetterExerciseMode
  letters: string[]
  label: string
}

// Vocabulary item
export interface VocabItem {
  id: string
  hebrew: string
  transliteration: string
  english: string
  category: string
  partOfSpeech?: string
  audio?: string
  exampleSentence?: {
    hebrew: string
    english: string
  }
}

// Sentence completion item
export interface SentenceItem {
  id: string
  template: string      // "אני רוצה {blank}"
  answer: string        // "מים"
  hint: string          // "water"
  fullSentence: string  // "אני רוצה מים"
  translation: string   // "I want water"
}

// Phrase item
export interface PhraseItem {
  id: string
  hebrew: string
  transliteration: string
  english: string
  category: string
}

// User progress for SRS
export interface UserProgress {
  itemId: string
  easeFactor: number       // default 2.5
  interval: number         // days
  dueDate: string          // ISO date string
  reviewCount: number
  correctCount: number
}

// WPM record
export interface WPMRecord {
  exerciseId: string
  wpm: number
  date: string
}

// Overall user stats
export interface UserStats {
  streak: number
  lastPracticeDate: string | null
  wpmRecords: Record<string, number>  // exerciseId -> best WPM
  wordsLearned: number
  wordsMastered: number
}

// Keyboard mapping types
export type FingerName =
  | 'left-pinky'
  | 'left-ring-finger'
  | 'left-middle-finger'
  | 'left-index-finger'
  | 'left-thumb'
  | 'right-thumb'
  | 'right-index-finger'
  | 'right-middle-finger'
  | 'right-ring-finger'
  | 'right-pinky'

export interface KeyboardMapping {
  letterToFinger: Record<string, FingerName>
  letterToKeycap: Record<string, string>
}
