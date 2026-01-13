import type { VocabItem } from '@/types'

/**
 * Essential Hebrew vocabulary - 50 foundational words
 * Organized by category for structured learning
 */
export const VOCABULARY: VocabItem[] = [
  // Greetings & Common Expressions (10)
  { id: 'v001', hebrew: 'שלום', transliteration: 'shalom', english: 'hello / peace', category: 'greetings' },
  { id: 'v002', hebrew: 'תודה', transliteration: 'toda', english: 'thank you', category: 'greetings' },
  { id: 'v003', hebrew: 'בבקשה', transliteration: 'bevakasha', english: 'please / you\'re welcome', category: 'greetings' },
  { id: 'v004', hebrew: 'סליחה', transliteration: 'slicha', english: 'excuse me / sorry', category: 'greetings' },
  { id: 'v005', hebrew: 'כן', transliteration: 'ken', english: 'yes', category: 'greetings' },
  { id: 'v006', hebrew: 'לא', transliteration: 'lo', english: 'no', category: 'greetings' },
  { id: 'v007', hebrew: 'בוקר טוב', transliteration: 'boker tov', english: 'good morning', category: 'greetings' },
  { id: 'v008', hebrew: 'ערב טוב', transliteration: 'erev tov', english: 'good evening', category: 'greetings' },
  { id: 'v009', hebrew: 'לילה טוב', transliteration: 'laila tov', english: 'good night', category: 'greetings' },
  { id: 'v010', hebrew: 'להתראות', transliteration: 'lehitraot', english: 'goodbye', category: 'greetings' },

  // Pronouns (8)
  { id: 'v011', hebrew: 'אני', transliteration: 'ani', english: 'I', category: 'pronouns' },
  { id: 'v012', hebrew: 'אתה', transliteration: 'ata', english: 'you (m)', category: 'pronouns' },
  { id: 'v013', hebrew: 'את', transliteration: 'at', english: 'you (f)', category: 'pronouns' },
  { id: 'v014', hebrew: 'הוא', transliteration: 'hu', english: 'he', category: 'pronouns' },
  { id: 'v015', hebrew: 'היא', transliteration: 'hi', english: 'she', category: 'pronouns' },
  { id: 'v016', hebrew: 'אנחנו', transliteration: 'anachnu', english: 'we', category: 'pronouns' },
  { id: 'v017', hebrew: 'הם', transliteration: 'hem', english: 'they (m)', category: 'pronouns' },
  { id: 'v018', hebrew: 'זה', transliteration: 'ze', english: 'this (m)', category: 'pronouns' },

  // Common Verbs (10)
  { id: 'v019', hebrew: 'רוצה', transliteration: 'rotze', english: 'want', category: 'verbs' },
  { id: 'v020', hebrew: 'יש', transliteration: 'yesh', english: 'there is / have', category: 'verbs' },
  { id: 'v021', hebrew: 'אין', transliteration: 'ein', english: 'there isn\'t / don\'t have', category: 'verbs' },
  { id: 'v022', hebrew: 'יודע', transliteration: 'yodea', english: 'know', category: 'verbs' },
  { id: 'v023', hebrew: 'אוהב', transliteration: 'ohev', english: 'love / like', category: 'verbs' },
  { id: 'v024', hebrew: 'הולך', transliteration: 'holech', english: 'go / walk', category: 'verbs' },
  { id: 'v025', hebrew: 'בא', transliteration: 'ba', english: 'come', category: 'verbs' },
  { id: 'v026', hebrew: 'עושה', transliteration: 'ose', english: 'do / make', category: 'verbs' },
  { id: 'v027', hebrew: 'אומר', transliteration: 'omer', english: 'say', category: 'verbs' },
  { id: 'v028', hebrew: 'רואה', transliteration: 'roe', english: 'see', category: 'verbs' },

  // Question Words (6)
  { id: 'v029', hebrew: 'מה', transliteration: 'ma', english: 'what', category: 'questions' },
  { id: 'v030', hebrew: 'מי', transliteration: 'mi', english: 'who', category: 'questions' },
  { id: 'v031', hebrew: 'איפה', transliteration: 'eifo', english: 'where', category: 'questions' },
  { id: 'v032', hebrew: 'למה', transliteration: 'lama', english: 'why', category: 'questions' },
  { id: 'v033', hebrew: 'איך', transliteration: 'eich', english: 'how', category: 'questions' },
  { id: 'v034', hebrew: 'מתי', transliteration: 'matai', english: 'when', category: 'questions' },

  // Numbers (6)
  { id: 'v035', hebrew: 'אחד', transliteration: 'echad', english: 'one', category: 'numbers' },
  { id: 'v036', hebrew: 'שניים', transliteration: 'shnayim', english: 'two', category: 'numbers' },
  { id: 'v037', hebrew: 'שלוש', transliteration: 'shalosh', english: 'three', category: 'numbers' },
  { id: 'v038', hebrew: 'ארבע', transliteration: 'arba', english: 'four', category: 'numbers' },
  { id: 'v039', hebrew: 'חמש', transliteration: 'chamesh', english: 'five', category: 'numbers' },
  { id: 'v040', hebrew: 'עשר', transliteration: 'eser', english: 'ten', category: 'numbers' },

  // Common Nouns (10)
  { id: 'v041', hebrew: 'מים', transliteration: 'mayim', english: 'water', category: 'nouns' },
  { id: 'v042', hebrew: 'אוכל', transliteration: 'ochel', english: 'food', category: 'nouns' },
  { id: 'v043', hebrew: 'בית', transliteration: 'bayit', english: 'house / home', category: 'nouns' },
  { id: 'v044', hebrew: 'ספר', transliteration: 'sefer', english: 'book', category: 'nouns' },
  { id: 'v045', hebrew: 'יום', transliteration: 'yom', english: 'day', category: 'nouns' },
  { id: 'v046', hebrew: 'לחם', transliteration: 'lechem', english: 'bread', category: 'nouns' },
  { id: 'v047', hebrew: 'חבר', transliteration: 'chaver', english: 'friend', category: 'nouns' },
  { id: 'v048', hebrew: 'עבודה', transliteration: 'avoda', english: 'work / job', category: 'nouns' },
  { id: 'v049', hebrew: 'שנה', transliteration: 'shana', english: 'year', category: 'nouns' },
  { id: 'v050', hebrew: 'עברית', transliteration: 'ivrit', english: 'Hebrew', category: 'nouns' },
]

/**
 * Get vocabulary items by category
 */
export function getVocabByCategory(category: string): VocabItem[] {
  return VOCABULARY.filter((item) => item.category === category)
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return [...new Set(VOCABULARY.map((item) => item.category))]
}

/**
 * Get a vocabulary item by ID
 */
export function getVocabById(id: string): VocabItem | undefined {
  return VOCABULARY.find((item) => item.id === id)
}

/**
 * Category display names
 */
export const CATEGORY_LABELS: Record<string, string> = {
  greetings: 'ברכות',
  pronouns: 'כינויים',
  verbs: 'פעלים',
  questions: 'מילות שאלה',
  numbers: 'מספרים',
  nouns: 'שמות עצם',
}
