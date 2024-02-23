<template>
  <div class="flex justify-center w-full h-auto py-5 px-5">
    <div class="flex justify-center w-fit flex-wrap gap-5 gap-y-8">
      <ContractCardAdd @click="router.push('/admin/new-contract')" />
      <div v-for="contract in baseContracts" :key="contract._id">
        <ContractCard :data="contract" @deleted="fetchBaseContracts" />
      </div>
    </div>
  </div>

  <div class="px-10 py-5">
    <div class="bg-white" v-html="savedValue"></div>
  </div>

  <div v-if="newData">
    <ContractForm
      :openNew="newData"
      @closeDialog="newData = $event"
      @savedForm="savedValue = $event"
    />
  </div>
</template>

<script setup lang="ts">
import ContractCard from '@/components/Admin/Card/ContractCard.vue'
import ContractCardAdd from '@/components/Admin/Card/ContractCardAdd.vue'
import ContractForm from '@/components/Admin/Card/ContractForm.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBaseContract } from '@/stores/baseContract'

onMounted(async () => {
  await fetchBaseContracts()
})

const baseContractStore = useBaseContract()

const router = useRouter()
const newData = ref<boolean>()
const savedValue = ref<string>()
const baseContracts = ref<any>([])

async function fetchBaseContracts() {
  try {
    const response = await baseContractStore.getBaseContracts()
    console.log(response)
    if (response.status) {
      baseContracts.value = response.data
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
.ql-align-center {
  text-align: center;
}
</style>
