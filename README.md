# Hebrew Practice

A Vue 3 application for learning Hebrew typing, vocabulary, and conversational basics through a tight feedback loop.

## Tech Stack

- Vue 3 (Composition API)
- TypeScript (strict mode)
- Vite
- Pinia (state management)
- SCSS
- Vitest (testing)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173` by default.

### Testing the Typing Engine

1. Start the dev server with `npm run dev`
2. Open the URL in your browser
3. **Switch your keyboard to Hebrew** (important!)
4. Click anywhere on the page to focus the hidden input
5. Type the Hebrew text shown on screen

**What to look for:**
- Green letters = typed correctly
- Red letters = typed incorrectly
- Blue underline (blinking) = current position
- WPM appears after 1 second of typing
- Completion card shows final stats

**Demo phrases:**
- "שלום עולם" (shalom olam) - "hello world"
- "אני לומד עברית" (ani lomed ivrit) - "I am learning Hebrew"

### Build for Production

```bash
npm run build
```

Output is in the `dist/` directory.

### Run Tests

```bash
npm run test        # Watch mode
npm run test:run    # Single run
```

## Project Structure

```
src/
├── components/
│   ├── typing/         # Letter, TextBlock, TypingInput
│   ├── keyboard/       # KeyboardSvg (coming soon)
│   ├── layout/         # App layout components
│   └── exercises/      # Exercise UI components
├── composables/        # Vue composables
│   ├── useTypingEngine.ts
│   ├── useWPM.ts
│   └── useInterval.ts
├── stores/             # Pinia stores
├── data/               # Hebrew letters, vocabulary
├── types/              # TypeScript interfaces
└── views/              # Page components
```
