<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  open: boolean
  title?: string
  message: string
  variant?: 'error' | 'success' | 'info'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const titleColor = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'text-emerald-400'
    case 'info':
      return 'text-blue-400'
    case 'error':
    default:
      return 'text-red-400'
  }
})

const buttonClass = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'bg-emerald-600 hover:bg-emerald-500'
    case 'info':
      return 'bg-blue-600 hover:bg-blue-500'
    case 'error':
    default:
      return 'bg-red-600 hover:bg-red-500'
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div
        class="
          w-full max-w-sm
          rounded-2xl
          bg-zinc-900
          border border-zinc-800
          p-6
          shadow-xl
        "
      >
        <h2
          class="text-lg font-semibold"
          :class="titleColor"
        >
          {{ title ?? 'Message' }}
        </h2>

        <p class="mt-2 text-sm text-zinc-400">
          {{ message }}
        </p>

        <div class="mt-6 flex justify-end">
          <button
            @click="emit('close')"
            :class="[
              'rounded-lg px-4 py-2 text-sm text-white transition',
              buttonClass
            ]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
