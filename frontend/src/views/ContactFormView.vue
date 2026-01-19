<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import contactsApi, { isApiError, type ApiError } from '../api/contacts'
import type { Contact } from '../types/Contact'
import validateContact from '../validators/validateContact'
import MessageModal from '../components/MessageModal.vue'
import { watch } from 'vue';
const props = defineProps<{
    id: string | null
}>()

const route = useRoute();
const router = useRouter();

const contactId = route.params.id as string | undefined;
const isEdit = computed(() => !!props.id)

const loading = ref(false);
const error = ref<string | null>(null);
const showMessageModal = ref(false);
const modalMessage = ref('');
const errors = ref<Record<string, string>>({});


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
        const data = await contactsApi.getContactById(Number(contactId!))
        form.value = { ...data }
    } catch (err) {

        if (isApiError(err) && err.status === 404) {
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
        } as unknown as Contact;

        const result = await validateContact(contactData);

        if (!result.valid) {
            errors.value = result.errors
            throw new Error(Object.values(result.errors).join(', '));
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
watch(
    () => props.id,
    async (id) => {
        resetForm()
        if (!id) return
        form.value = await contactsApi.getContactById(Number(id))
    },
    { immediate: true }
)
function resetForm() {
    form.value = {
        name: '',
        contact: '',
        email: '',
        picture: ''
    }
}
</script>

<template>
    <div class="min-h-screen bg-zinc-950 px-6 py-8">
        <div class="mx-auto max-w-2xl">
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
                    <label :class="errors.name ? 'text-red-500' : 'text-zinc-400'">
                        Name
                    </label>
                    <input v-model="form.name" required type="text" class="
              w-full rounded-lg bg-zinc-800 border border-zinc-700
              px-4 py-2 text-zinc-100
              focus:border-blue-500 focus:outline-none
            " />
                    <p v-if="errors.name" class="mt-1 text-xs text-red-500">
                        {{ errors.name }}
                    </p>
                </div>

                <!-- Phone -->
                <div>
                    <label  :class="errors.contact ? 'text-red-500' : 'text-zinc-400'">
                        Contact
                    </label>
                    <input v-model="form.contact" required type="text" class="
              w-full rounded-lg bg-zinc-800 border border-zinc-700
              px-4 py-2 text-zinc-100
              focus:border-blue-500 focus:outline-none
            " />
                  <p v-if="errors.contact" class="mt-1 text-xs text-red-500">
                        {{ errors.contact }}
                    </p>
                </div>

                <!-- Email -->
                <div>
                    <label  :class="errors.email ? 'text-red-500' : 'text-zinc-400'">
                        Email
                    </label>
                    <input v-model="form.email" type="email" class="
              w-full rounded-lg bg-zinc-800 border border-zinc-700
              px-4 py-2 text-zinc-100
              focus:border-blue-500 focus:outline-none
            " />
                 <p v-if="errors.email" class="mt-1 text-xs text-red-500">
                        {{ errors.email }}
                    </p>
                </div>

                <!-- Picture URL -->
                <div>
                    <label  :class="errors.picture ? 'text-red-500' : 'text-zinc-400'">
                        Picture URL
                    </label>
                    <input v-model="form.picture" type="url" class="
              w-full rounded-lg bg-zinc-800 border border-zinc-700
              px-4 py-2 text-zinc-100
              focus:border-blue-500 focus:outline-none
            " />
                <p v-if="errors.picture" class="mt-1 text-xs text-red-500">
                    {{ errors.picture }}
                </p>
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
    <MessageModal :open="showMessageModal" title="Error" :message="modalMessage" variant="error"
        @close="showMessageModal = false" />
</template>
