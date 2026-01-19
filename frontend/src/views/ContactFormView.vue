<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import contactsApi from '../api/contacts'
import type { Contact } from '../types/Contact'
import validateContact  from '../validators/validateContact'
import MessageModal from '../components/MessageModal.vue'

const route = useRoute();
const router = useRouter();

const contactId = route.params.id as string | undefined;
const isEdit = computed(() => !!contactId);

const loading = ref(false);
const error = ref<string | null>(null);
const showMessageModal = ref(false);
const modalMessage = ref('');


/**
 * Form state
 * Use Partial so create/edit both work
 */
const form = ref<Partial<Contact>>({
    name: '',
    contact: '',
    email: '',
    picture: ''
})

onMounted(async () => {
    if (!isEdit.value) return

    loading.value = true
    try {
        const data = await contactsApi.getContactById(contactId!)
        form.value = { ...data }
    } catch (err) {
        if(err.status === 404) {
            router.replace('/404')
            return
        }
        error.value = 'Failed to load contact'
    } finally {
        loading.value = false
    }
})

async function submit() {
    error.value = null
    loading.value = true

    try {
        const contactData = {
            ...form.value,
            id: contactId
        } as Contact;

        const { valid, message } = validateContact(contactData);

        if (!valid) {
            throw new Error(message);
        }

        if (isEdit.value) {
            await contactsApi.updateContact(contactData);
        } else {
            await contactsApi.createContact(contactData);
        }

        router.push('/');
    } catch (err: any) {
        modalMessage.value = err.message || 'Something went wrong'
        showMessageModal.value = true
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen bg-zinc-950 px-6 py-8">
        <div class="mx-auto max-w-2xl">
            <!-- Header -->
            <div class="mb-6 flex items-center gap-4">
                <button @click="router.back()"
                    class="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700 transition">
                    ← Back
                </button>

                <h1 class="text-3xl font-bold text-zinc-100">
                    {{ isEdit ? 'Edit Contact' : 'Create Contact' }}
                </h1>
            </div>

            <!-- Error -->
            <p v-if="error" class="mb-4 text-red-500">
                {{ error }}
            </p>

            <!-- Form -->
            <form @submit.prevent="submit" class="
          rounded-2xl
          bg-zinc-900
          border border-zinc-800
          p-6
          shadow-lg
          space-y-5
        ">
                <!-- Name -->
                <div>
                    <label class="mb-1 block text-sm font-medium text-zinc-400">
                        Name
                    </label>
                    <input v-model="form.name" required type="text" class="
              w-full rounded-lg bg-zinc-800 border border-zinc-700
              px-4 py-2 text-zinc-100
              focus:border-blue-500 focus:outline-none
            " />
                </div>

                <!-- Phone -->
                <div>
                    <label class="mb-1 block text-sm font-medium text-zinc-400">
                        Phone
                    </label>
                    <input v-model="form.contact" required type="text" class="
              w-full rounded-lg bg-zinc-800 border border-zinc-700
              px-4 py-2 text-zinc-100
              focus:border-blue-500 focus:outline-none
            " />
                </div>

                <!-- Email -->
                <div>
                    <label class="mb-1 block text-sm font-medium text-zinc-400">
                        Email
                    </label>
                    <input v-model="form.email" type="email" class="
              w-full rounded-lg bg-zinc-800 border border-zinc-700
              px-4 py-2 text-zinc-100
              focus:border-blue-500 focus:outline-none
            " />
                </div>

                <!-- Picture URL -->
                <div>
                    <label class="mb-1 block text-sm font-medium text-zinc-400">
                        Picture URL
                    </label>
                    <input v-model="form.picture" type="url" class="
              w-full rounded-lg bg-zinc-800 border border-zinc-700
              px-4 py-2 text-zinc-100
              focus:border-blue-500 focus:outline-none
            " />
                </div>

                <!-- Preview -->
                <img v-if="form.picture" :src="form.picture" alt="Preview" class="
            mt-2 h-32 w-32 rounded-xl object-cover
            border border-zinc-800
          " />

                <!-- Actions -->
                <div class="flex justify-end gap-3 pt-4">
                    <button type="button" @click="router.back()" class="
              rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-200
              hover:bg-zinc-700 transition
            ">
                        Cancel
                    </button>

                    <button type="submit" :disabled="loading" class="
              rounded-lg bg-blue-600 px-5 py-2 text-sm text-white
              hover:bg-blue-500 transition disabled:opacity-60
            ">
                        {{ isEdit ? 'Save Changes' : 'Create Contact' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
    <MessageModal
        :open="showMessageModal"
        title="Error"
        :message="modalMessage"
        variant="error"
        @close="showMessageModal = false"
    />
</template>
