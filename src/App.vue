<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores'

const auth = useAuthStore()

onMounted(() => {
  console.log(auth.token)
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
