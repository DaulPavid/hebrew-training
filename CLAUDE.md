# Hebrew Practice - Project Overview

## Current Status

### Completed
- **Phase 1: Project Foundation** - Vue 3 + Vite + TypeScript + Pinia + SCSS
- **Phase 2: Typing Engine Core** - Real-time character feedback system
- **Phase 3: Letter Mastery Mode** - Full port from React app with keyboard visualization
- **Phase 4: Vocabulary System** - 50 essential words with spaced repetition (SRS)

### Remaining
- **Phase 5: Additional Typing Modes** - Translation, Sentence Completion, Phrase Typing
- **Phase 6: Audio Dictation** - TTS-based listening exercises
- **Phase 7: Dashboard & Polish** - Stats, streaks, milestones

---

## Project Structure

```
app/src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.vue      # Main layout with fixed sidebar
│   │   └── Sidebar.vue        # Navigation + stats + mode switching
│   ├── typing/
│   │   ├── Letter.vue         # Single character with status styling
│   │   ├── TextBlock.vue      # Multi-line text display with auto-scroll
│   │   └── TypingInput.vue    # Hidden input for keystroke capture
│   ├── keyboard/
│   │   ├── KeyboardSvg.vue    # Hebrew keyboard with finger highlighting
│   │   └── constants.ts       # Letter-to-finger/keycap mappings
│   ├── exercises/
│   │   ├── ExerciseList.vue   # Collapsible exercise group
│   │   ├── ExerciseMenuItem.vue # Individual exercise button
│   │   ├── CompletionCard.vue # Success feedback after exercise
│   │   └── HeroSection.vue    # Welcome screen
│   └── vocab/
│       └── VocabCard.vue      # Vocabulary drill card
├── composables/
│   ├── useTypingEngine.ts     # Core feedback loop logic
│   ├── useWPM.ts              # Words-per-minute calculation
│   ├── useInterval.ts         # Vue interval utility
│   └── useSRS.ts              # Spaced repetition algorithm (SM-2)
├── stores/
│   ├── exerciseStore.ts       # Exercise selection and generation
│   ├── progressStore.ts       # WPM records, streak tracking
│   └── vocabStore.ts          # Vocabulary progress with SRS
├── data/
│   ├── letters.ts             # Hebrew alphabet, geresh normalization
│   ├── letterSets.ts          # Exercise descriptors (28 exercises)
│   ├── textExercises.ts       # 7 real-world text exercises
│   └── vocabulary.ts          # 50 essential Hebrew words
├── utils/
│   └── exerciseGenerator.ts   # Random letter exercise text generation
├── views/
│   ├── ExerciseView.vue       # Letter/text typing exercises
│   └── VocabDrillView.vue     # Vocabulary drilling with SRS
├── types/
│   └── index.ts               # TypeScript interfaces
└── App.vue                    # Root with mode switching
```

---

## Core Principle: The Feedback Loop

Every learning mode follows: **PROMPT → TYPE → FEEDBACK**

1. **Prompt**: Present something to type (letter, word, phrase, audio)
2. **Type**: User types Hebrew characters
3. **Feedback**: Immediate visual response on correctness

---

## Implemented Features

### Letter Mastery (Phase 3)
- 28 letter exercises (review + practice pattern)
- 7 real-world text exercises
- Interactive keyboard with finger highlighting
- WPM tracking per exercise
- localStorage persistence

### Vocabulary Drilling (Phase 4)
- 50 essential words across 6 categories:
  - Greetings (10): שלום, תודה, בבקשה...
  - Pronouns (8): אני, אתה, היא...
  - Verbs (10): רוצה, יודע, אוהב...
  - Questions (6): מה, מי, איפה...
  - Numbers (6): אחד, שניים, שלוש...
  - Nouns (10): מים, בית, ספר...
- Spaced Repetition System (SM-2 algorithm)
- Progress persisted to localStorage
- Daily review queue with new word limits

---

## Remaining Modes to Implement

### Phase 5: Additional Typing Modes

**Translation Challenge**
- Show English word → User types Hebrew
- Accept multiple valid translations
- Derive from vocabulary data

**Sentence Completion**
- Hebrew sentence with blank + English hint
- User types missing word
- Builds contextual understanding

**Phrase Typing**
- Full conversational phrases
- Same feedback as letter exercises
- Common expressions (מה שלומך?, איפה השירותים?)

### Phase 6: Audio Dictation
- Browser TTS plays Hebrew word/phrase
- User types what they heard
- Speed options: slow/normal/fast
- Critical for listening comprehension

### Phase 7: Dashboard & Polish
- Session summary (words reviewed, accuracy)
- Streak visualization
- Milestones ("100 words learned", "7-day streak")
- Overall progress stats

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Vue 3 (Composition API) |
| **Build** | Vite |
| **State** | Pinia |
| **Styling** | SCSS (scoped) |
| **Language** | TypeScript (strict) |
| **Testing** | Vitest + Vue Test Utils |
| **Persistence** | localStorage |
| **Font** | Noto Sans Hebrew (Google Fonts) |

---

## Running the App

```bash
cd app
npm install
npm run dev      # Development server at http://localhost:5173
npm run build    # Production build
npm run test     # Run tests
```

---

## Data Models

```typescript
// Vocabulary item
interface VocabItem {
  id: string
  hebrew: string
  transliteration: string
  english: string
  category: string
}

// SRS progress per item
interface UserProgress {
  itemId: string
  easeFactor: number       // default 2.5
  interval: number         // days until next review
  dueDate: string          // ISO date string
  reviewCount: number
  correctCount: number
}

// Letter state for typing feedback
type LetterStatus = 'pending' | 'current' | 'correct' | 'incorrect'
```

---

## Key Design Decisions

1. **Fixed sidebar layout** - Sidebar stays anchored on left, content centered
2. **Mode switching via sidebar buttons** - Toggle between typing and vocab modes
3. **SRS intervals**: 1 → 3 → 7 → 14 → 30+ days
4. **Accuracy threshold**: 80% correct characters = word marked correct
5. **No routing** - Single-page app with mode state, not URL-based navigation
