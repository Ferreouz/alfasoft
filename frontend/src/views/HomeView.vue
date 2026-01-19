<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getContacts } from '../api/contacts'
import type { Contact } from '../types/Contact'
import ContactCard from '../components/ContactCard.vue'

const contacts = ref<Contact[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
    try {
        contacts.value = await getContacts()
    } catch (err) {
        error.value = (err as Error).message
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="min-h-screen bg-zinc-950 px-6 py-8">
        <h1 class="mb-6 text-3xl font-bold text-zinc-100">
            Contacts
        </h1>

        <p v-if="loading" class="text-zinc-400">
            Loading contacts...
        </p>

        <p v-if="error" class="text-red-500">
            {{ error }}
        </p>

        <div class="
        mt-6
        grid
        grid-cols-[repeat(auto-fill,minmax(260px,1fr))]
        gap-6
        place-items-center
      ">
            <ContactCard v-for="contact in contacts" :key="contact.id" :contact="contact" />
        </div>
    </div>
</template>
