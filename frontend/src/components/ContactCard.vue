<script setup lang="ts">
import type { Contact } from '../types/Contact'

defineProps<{
  contact: Contact
}>()
</script>

<template>
  <div class="
      w-full max-w-[260px]
      rounded-2xl
      bg-zinc-900
      border border-zinc-800
      p-4
      text-center
      shadow-lg
      transition
      hover:-translate-y-1
      hover:shadow-xl
    ">
    <img :src="contact.picture" alt="Contact picture" class="
        mb-3
        h-[180px]
        w-full
        rounded-xl
        object-cover
      " />

    <h3 class="my-2 text-lg font-semibold text-zinc-100">
      {{ contact.name }}
    </h3>

    <div class="space-y-1 text-sm text-zinc-400">
      <p>
        <span class="font-medium text-zinc-300">Phone:</span>
        {{ contact.contact }}
      </p>
      <p>
        <span class="font-medium text-zinc-300">Email:</span>
        {{ contact.email }}
      </p>
      <p class="text-xs text-zinc-500">
        ID: {{ contact.id }}
      </p>
    </div>
  </div>
</template>
