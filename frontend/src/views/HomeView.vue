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
  <div class="page">
    <h1>Contacts</h1>

    <p v-if="loading">Loading contacts...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div class="grid">
      <ContactCard
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
      />
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.error {
  color: red;
}
</style>
