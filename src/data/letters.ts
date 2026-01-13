// Hebrew alphabet
export const HEBREW_LETTERS = [
  'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
  'ך', 'כ', 'ל', 'ם', 'מ', 'ן', 'נ', 'ס', 'ע',
  'ף', 'פ', 'ץ', 'צ', 'ק', 'ר', 'ש', 'ת',
]

// Final forms (sofit)
export const FINAL_LETTERS: Record<string, string> = {
  'כ': 'ך',
  'מ': 'ם',
  'נ': 'ן',
  'פ': 'ף',
  'צ': 'ץ',
}

// Geresh normalization (Windows vs Mac)
export const WINDOWS_GERESH = "'"
export const MAC_GERESH = '׳'

/**
 * Normalize geresh (Hebrew apostrophe) differences between platforms
 * Windows types: ' (single quote)
 * Mac types: ׳ (Hebrew punctuation geresh)
 */
export function normalizeGeresh(input: string): string {
  return input.replace(new RegExp(MAC_GERESH, 'g'), WINDOWS_GERESH)
}
