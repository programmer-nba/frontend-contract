<template>
  <div class="card py-5 px-5">
    <ul class="flex gap-5">
      <li>
        <a href="/admin/home"> Contract </a>
      </li>
      <li>
        <a href="/admin/partner"> Partner </a>
        <span class="px-2 py-0.5 rounded-full text-xs text-white bg-red-400">{{
          amount > 0 ? amount : null
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePartnerContract } from '@/stores/partnerContract'
import { storeToRefs } from 'pinia'

const { partnerContracts } = storeToRefs(usePartnerContract())

const amount = computed(() => {
  return partnerContracts.value.filter((item) => item.status[item.status.length - 1].name === 'new')
    .length
})
</script>

<style scoped></style>
