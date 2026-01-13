<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import type { LetterState } from '@/types'
import Letter from './Letter.vue'

const props = defineProps<{
  /** Array of letter states to display */
  letterStates: LetterState[]
  /** Lines of text (for multi-line display) */
  lines?: string[]
}>()

// Refs for line elements (for auto-scroll)
const lineRefs = ref<(HTMLElement | null)[]>([])

// If lines are provided, compute line markers; otherwise treat as single line
const lineMarkers = computed(() => {
  if (!props.lines || props.lines.length === 0) {
    // Single line mode
    return [{ start: 0, end: props.letterStates.length }]
  }

  // Multi-line mode
  return props.lines.reduce<{ start: number; end: number }[]>((acc, line) => {
    const lastMarker = acc[acc.length - 1]
    const start = lastMarker ? lastMarker.end : 0
    return [...acc, { start, end: start + line.length }]
  }, [])
})

// Current position in the text
const currentIndex = computed(() => {
  const idx = props.letterStates.findIndex((s) => s.status === 'current')
  return idx >= 0 ? idx : props.letterStates.length
})

// Current line index (for auto-scroll)
const currentLineIndex = computed(() => {
  return lineMarkers.value.findIndex(
    (marker) => marker.start <= currentIndex.value && currentIndex.value < marker.end
  )
})

// Auto-scroll to keep current line visible
watch(currentLineIndex, async (lineIdx) => {
  if (lineIdx < 0) return

  await nextTick()
  // Scroll to the next line (or current if at end) for better visibility
  const targetIdx = Math.min(lineIdx + 1, lineRefs.value.length - 1)
  lineRefs.value[targetIdx]?.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
  })
})

// Set ref for each line element
function setLineRef(el: HTMLElement | null, index: number) {
  lineRefs.value[index] = el
}
</script>

<template>
  <div class="text-block">
    <div class="text-block__content">
      <div
        v-for="(marker, lineIndex) in lineMarkers"
        :key="`line_${marker.start}`"
        :ref="(el) => setLineRef(el as HTMLElement, lineIndex)"
        class="text-block__line"
      >
        <Letter
          v-for="(state, i) in letterStates.slice(marker.start, marker.end)"
          :key="marker.start + i"
          :char="state.char"
          :status="state.status"
        />
      </div>
    </div>
    <div class="text-block__divider" />
  </div>
</template>

<style scoped lang="scss">
.text-block {
  &__content {
    font-size: 1.6em;
    margin-bottom: 16px;
    font-family: 'Noto Sans Hebrew', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1px;
    max-height: 10ch;
    overflow-y: scroll;
    direction: rtl; // Hebrew is RTL

    &::-webkit-scrollbar {
      visibility: hidden;
    }

    // Firefox
    scrollbar-width: none;
  }

  &__line {
    display: flex;
    flex-direction: row;
    gap: 1px;
  }

  &__divider {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>
