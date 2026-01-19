<script setup lang="ts">
import type { Contact } from '../types/Contact'

defineProps<{
  contact: Contact
}>()
</script>

<template>
  <div class="card">
    <img :src="contact.picture" alt="Contact picture" />

    <h3>{{ contact.name }}</h3>

    <p><strong>Phone:</strong> {{ contact.contact }}</p>
    <p><strong>Email:</strong> {{ contact.email }}</p>
    <p><strong>ID:</strong> {{ contact.id }}</p>
  </div>
</template>

<style scoped>
.card {
  width: 260px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 16px;
  background: #fff;
  text-align: center;
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

h3 {
  margin: 8px 0;
}
</style>


