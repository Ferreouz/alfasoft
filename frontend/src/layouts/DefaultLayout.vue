<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '../components/PageHeader.vue'

const route = useRoute()

const title = computed(() => route.meta.title as string || '')
const showHeader = computed(() => route.meta.showHeader !== false)
const showBack = computed(() => route.meta.showBack !== false)
const showNewContact = computed(() => route.meta.showNewContact !== false)
</script>

<template>
  <div class="min-h-screen bg-zinc-950 px-6 py-8">
    <div class="mx-auto max-w-3xl">
      <PageHeader
        v-if="showHeader"
        :title="title"
        :showBack="showBack"
        :showNewContact="showNewContact"
      />

      <router-view />
    </div>
  </div>
</template>
