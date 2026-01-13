<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  /** Current input value */
  modelValue: string
  /** Whether input is disabled (e.g., exercise complete) */
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)

function focusInput() {
  if (!props.disabled) {
    inputRef.value?.focus()
  }
}

// Focus the input on mount
onMounted(() => {
  focusInput()
  // Also focus when clicking anywhere on the document
  document.addEventListener('click', focusInput)
})

onUnmounted(() => {
  document.removeEventListener('click', focusInput)
})

// Re-focus when disabled changes to false
watch(
  () => props.disabled,
  (disabled) => {
    if (!disabled) {
      // Small delay to ensure DOM is ready
      setTimeout(focusInput, 10)
    }
  }
)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleBlur() {
  // Re-focus with small delay to handle click events properly
  if (!props.disabled) {
    setTimeout(focusInput, 10)
  }
}

// Expose focus method for parent components
defineExpose({
  focus: focusInput,
})
</script>

<template>
  <input
    ref="inputRef"
    type="text"
    class="typing-input"
    aria-hidden="true"
    autocomplete="off"
    autocapitalize="off"
    autocorrect="off"
    spellcheck="false"
    :value="modelValue"
    :disabled="disabled"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<style scoped lang="scss">
.typing-input {
  // Hidden but still functional
  position: absolute;
  left: -9999px;
  opacity: 0;
  width: 1px;
  height: 1px;
  padding: 0;
  border: none;

  &:focus {
    outline: none;
  }
}
</style>
