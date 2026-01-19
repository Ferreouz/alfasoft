<script setup lang="ts">
import { onMounted, ref } from 'vue'
import contactsApi from '../api/contacts'
import type { Contact } from '../types/Contact'
import ContactCard from '../components/ContactCard.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

const contacts = ref<Contact[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const showDeleteModal = ref(false);
const contactToDelete = ref<Contact | null>(null);

function requestDelete(contact: Contact) {
    contactToDelete.value = contact;
    showDeleteModal.value = true;
}

function cancelDelete() {
    showDeleteModal.value = false;
    contactToDelete.value = null;
}

async function confirmDelete() {
    if (!contactToDelete.value) return

    try {
        await contactsApi.deleteContact(contactToDelete.value.id);
        contacts.value = contacts.value.filter(
            c => c.id !== contactToDelete.value!.id
        )
    } catch (err) {
        console.error(err);
    } finally {
        cancelDelete();
    }
}


onMounted(async () => {
    try {
        contacts.value = await contactsApi.getContacts();
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
            <ContactCard v-for="contact in contacts" :key="contact.id" :contact="contact"
                @delete="requestDelete(contact)" />
        </div>
    </div>

    <ConfirmModal :open="showDeleteModal" title="Delete contact"
        :message="`Are you sure you want to delete ${contactToDelete?.name}?`" confirm-text="Delete" confirm-variant="danger"
        @confirm="confirmDelete" @cancel="cancelDelete" />


</template>
