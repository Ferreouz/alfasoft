<script setup lang="ts">
import type { Contact } from '../types/Contact'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

defineProps<{
  contact: Contact
}>()

const emit = defineEmits<{
  (e: 'delete', id: string | number): void
}>()

const router = useRouter();

function goToDetails(id: string | number) {
  router.push(`/contacts/${id}`)
}
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
    <div @click="goToDetails(contact.id)" class="cursor-pointer">
      <img :src="contact.picture" alt="Contact picture" class="
             mb-3
             h-[180px]
             w-full
             rounded-xl
             object-cover
             hover:opacity-90
             transition
           " />
    </div>

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
    </div>

    <!-- Actions -->
    <div class="mt-4 flex justify-between gap-2">
      <RouterLink :to="`/contacts/${contact.id}`"
        class="flex-1 rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-700 transition">
        Details
      </RouterLink>

      <RouterLink :to="`/contacts/${contact.id}/edit`"
        class="flex-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-500 transition">
        Edit
      </RouterLink>

      <button @click="goToDetails(contact.id)"
        class="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-500 transition">
        Delete
      </button>
    </div>
  </div>
</template>
