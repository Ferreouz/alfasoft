<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  open: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'danger' | 'primary' | 'success'
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const confirmButtonClass = computed(() => {
  switch (props.confirmVariant) {
    case 'primary':
      return 'bg-blue-600 hover:bg-blue-500'
    case 'success':
      return 'bg-emerald-600 hover:bg-emerald-500'
    case 'danger':
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
        <h2 class="text-lg font-semibold text-zinc-100">
          {{ title ?? 'Confirm action' }}
        </h2>

        <p class="mt-2 text-sm text-zinc-400">
          {{ message }}
        </p>

        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="emit('cancel')"
            class="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700 transition"
          >
            {{ cancelText ?? 'Cancel' }}
          </button>

          <button
            @click="emit('confirm')"
            :class="[
              'rounded-lg px-4 py-2 text-sm text-white transition',
              confirmButtonClass
            ]"
          >
            {{ confirmText ?? 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
