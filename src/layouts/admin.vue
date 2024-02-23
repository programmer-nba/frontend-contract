<template>
  <div>
    <nav>
      <NavAdmin />
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavAdmin from '@/components/Admin/NavBar/NavAdmin.vue'
</script>

<style scoped></style>
