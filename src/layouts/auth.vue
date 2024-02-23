<template>
  <div class="body p-10 h-screen">
    <main class="h-full">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.body {
  background-image: url('../assets/img/auth-bg.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
