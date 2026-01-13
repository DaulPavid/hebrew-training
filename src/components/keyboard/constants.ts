// Map letters to the finger that should type them
export const LETTERS_TO_FINGERS: Record<string, string> = {
  '/שז': 'left-pinky',
  "'דס": 'left-ring-finger',
  'קגב': 'left-middle-finger',
  'רכהנעא': 'left-index-finger',
  ' ': 'left-thumb',
  'וחצמיט': 'right-index-finger',
  'ןלת': 'right-middle-finger',
  'םךץ': 'right-ring-finger',
  'פף.],[\\': 'right-pinky',
}

// Map each letter to its keycap element ID in the SVG
export const LETTER_TO_KEYCAP: Record<string, string> = {
  'ז': 'keycap-z',
  'פ': 'keycap-pe',
  '/': 'keycap-q',
  ',': 'keycap-comma',
  'ף': 'keycap-pe-sofit',
  'ש': 'keycap-shin',
  '.': 'keycap-dot',
  'ץ': 'keycap-tzadik-sofit',
  'ס': 'keycap-samech',
  'ם': 'keycap-mem-sofit',
  "'": 'keycap-geresh',
  'ך': 'keycap-kaf-sofit',
  'ד': 'keycap-dalet',
  'ת': 'keycap-taf',
  'ב': 'keycap-bet',
  'ן': 'keycap-noon-sofit',
  'ק': 'keycap-koof',
  'ל': 'keycap-lamed',
  'ג': 'keycap-gimel',
  'ה': 'keycap-hei',
  'ר': 'keycap-resh',
  'כ': 'keycap-kaf',
  'צ': 'keycap-tzadik',
  'ו': 'keycap-vav',
  'ח': 'keycap-het',
  'נ': 'keycap-noon',
  'א': 'keycap-alef',
  'ע': 'keycap-ayin',
  'מ': 'keycap-mem',
  'י': 'keycap-yod',
  'ט': 'keycap-tet',
  ' ': 'keycap-spacebar',
}

// All finger IDs used in the SVG
export const FINGER_IDS = [
  'left-pinky',
  'left-ring-finger',
  'left-middle-finger',
  'left-index-finger',
  'left-thumb',
  'right-index-finger',
  'right-middle-finger',
  'right-ring-finger',
  'right-pinky',
]

/**
 * Get the finger ID for a given letter
 */
export function getFingerForLetter(letter: string): string | null {
  for (const [letters, fingerId] of Object.entries(LETTERS_TO_FINGERS)) {
    if (letters.includes(letter)) {
      return fingerId
    }
  }
  return null
}

/**
 * Get the keycap ID for a given letter
 */
export function getKeycapForLetter(letter: string): string | null {
  return LETTER_TO_KEYCAP[letter] ?? null
}
