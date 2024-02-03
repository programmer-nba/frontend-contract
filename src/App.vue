<template>
  <div>
    <nav>
      <NavBar/>
    </nav>

    <router-view>
    </router-view>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';

</script>
