import { ref, watch, onUnmounted, type Ref } from 'vue'

/**
 * Vue composable for running an interval that can be paused/resumed
 * @param callback Function to call on each interval
 * @param delay Delay in ms, or null to pause
 */
export function useInterval(
  callback: () => void,
  delay: Ref<number | null>
): void {
  const intervalId = ref<ReturnType<typeof setInterval> | null>(null)

  const clear = () => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }

  watch(
    delay,
    (newDelay) => {
      clear()
      if (newDelay !== null) {
        intervalId.value = setInterval(callback, newDelay)
      }
    },
    { immediate: true }
  )

  onUnmounted(clear)
}
