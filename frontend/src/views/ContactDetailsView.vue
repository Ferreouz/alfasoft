<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import contactsApi from '../api/contacts'
import type { Contact } from '../types/Contact'
import ConfirmModal from '../components/ConfirmModal.vue'
import PageHeader from '../components/PageHeader.vue'

const route = useRoute();
const router = useRouter();

const contact = ref<Contact | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const contactId = route.params.id as string;

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
        router.push('/');
    } catch (err) {
        console.error(err);
    } finally {
        cancelDelete();
    }
}

import type { AxiosError } from 'axios';

onMounted(async () => {
  try {
    contact.value = await contactsApi.getContactById(contactId);
  } catch (err) {
    if(err.status === 404) {
        router.replace('/404');
        return;
    } else {
      error.value = 'Failed to fetch contact';
    }
  } finally {
    loading.value = false;
  }
});

</script>

<template>
    <div class="min-h-screen bg-zinc-950 px-6 py-8">
        <div class="mx-auto max-w-3xl">
            <!-- Loading -->
            <p v-if="loading" class="text-zinc-400">
                Loading contact...
            </p>

            <!-- Error -->
            <p v-else-if="error" class="text-red-500">
                {{ error }}
            </p>

            <!-- Content -->
            <div v-else-if="contact" class="
                rounded-2xl
                bg-zinc-900
                border border-zinc-800
                p-6
                shadow-lg
            ">
                <div class="flex flex-col gap-6 md:flex-row">
                    <!-- Picture -->
                    <img :src="contact.picture" alt="Contact picture" class="
                        h-[200px]
                        w-full
                        rounded-xl
                        object-cover
                        md:h-[140px]
                        md:w-[140px]
                    " />


                    <!-- Info -->
                    <div class="flex-1 space-y-3">
                        <h2 class="text-2xl font-semibold text-zinc-100">
                            {{ contact.name }}
                        </h2>

                        <p class="text-zinc-300">
                            <span class="font-medium text-zinc-400">Phone:</span>
                            {{ contact.contact }}
                        </p>

                        <p class="text-zinc-300">
                            <span class="font-medium text-zinc-400">Email:</span>
                            {{ contact.email }}
                        </p>

                        <p class="text-sm text-zinc-500">
                            ID: {{ contact.id }}
                        </p>

                        <!-- Actions -->
                        <div class="mt-6 flex gap-3">
                            <RouterLink :to="`/contacts/${contact.id}/edit`"
                                class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 transition cursor-pointer">
                                Edit
                            </RouterLink>

                            <button @click="requestDelete(contact)"
                                class="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500 transition cursor-pointer">
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Not found -->
            <p v-else class="text-zinc-400">
                Contact not found.
            </p>
        </div>
    </div>
    <ConfirmModal :open="showDeleteModal" title="Delete contact"
        :message="`Are you sure you want to delete '${contactToDelete?.name}'?`" confirm-text="Delete"
        confirm-variant="danger" @confirm="confirmDelete" @cancel="cancelDelete" />
</template>
