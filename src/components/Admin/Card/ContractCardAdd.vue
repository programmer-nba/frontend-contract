<template>
  <Card
    style="width: 16rem; height: 24rem; overflow: hidden"
    class="hover:border hover:border-green-500"
  >
    <template #content>
      <div class="w-full h-full flex justify-center items-center">
        <i
          v-tooltip.top="'สร้างสัญญาใหม่'"
          class="pi pi-plus-circle w-full h-full text-[5rem] cursor-pointer text-center pt-[50%] opacity-70 hover:opacity-100 duration-200"
          style="color: green"
        ></i>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts"></script>

<style scoped></style>
