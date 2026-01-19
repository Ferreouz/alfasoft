<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-100">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-zinc-400 mb-6">Page Not Found</p>

    <button
      @click="$router.push('/')"
      class="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-500 transition"
    >
      Go Home
    </button>
  </div>
</template>
