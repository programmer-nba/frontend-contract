<template>
  <h1>{{ msg }}</h1>
  <div class="container-fluid bg-yellow-500">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>

</template>

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>
