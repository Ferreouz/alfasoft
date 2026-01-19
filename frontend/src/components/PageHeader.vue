<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  title: string
  showBack?: boolean
  showNewContact?: boolean
}>()

const router = useRouter()
</script>

<template>
  <div class="mb-6 flex items-center gap-4">
    <button v-if="showBack !== false" @click="router.back()"
      class="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700 transition">
      ← Back
    </button>

    <h1 class="text-3xl font-bold text-zinc-100">
      {{ title }}
    </h1>

    <!-- Optional right-side actions -->
    <div class="ml-auto">
      <RouterLink v-if="showNewContact" to="/app/contacts/new" class="
            inline-flex items-center gap-2
            rounded-lg bg-blue-600 px-4 py-2
            text-sm font-medium text-white
            hover:bg-blue-500 transition
            ">
        + New Contact
      </RouterLink>
    </div>
  </div>
</template>
