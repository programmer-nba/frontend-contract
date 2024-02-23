<template>
  <div class="card py-2 px-2 bg-sky-200">
    <Toolbar>
      <template #start>
        <Button icon="pi pi-plus" class="mr-2 opacity-50 cursor-not-allowed" severity="secondary" />
        <Button
          icon="pi pi-print"
          class="mr-2 opacity-50 cursor-not-allowed"
          severity="secondary"
        />
        <Button
          icon="pi pi-upload"
          class="mr-2 opacity-50 cursor-not-allowed"
          severity="secondary"
        />
      </template>

      <template #center>
        <IconField iconPosition="left">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText
            class="text-center py-2 shadow-md"
            placeholder="Search"
            @input="searchContract"
            v-model="search"
          />
        </IconField>
      </template>

      <template #end>
        <small>{{ formatDateTime(lastFetch) }}</small>
        <Button
          :icon="loading ? 'pi-spin pi pi-sync' : 'pi pi-sync'"
          class="mr-2"
          severity="secondary"
          @click="fetchPartnerContracts"
      /></template>
    </Toolbar>
  </div>

  <div class="flex justify-center w-full h-auto py-5 px-5">
    <div class="flex justify-center w-fit flex-wrap gap-5 gap-y-8">
      <ContractCardAdd @click="router.push('/admin/new-partner-contract')" />
      <div v-for="contract in partnerContracts" :key="contract._id">
        <PartnerContractCard :data="contract" @deleted="fetchPartnerContracts" />
      </div>
    </div>
  </div>

  <div class="px-10 py-5">
    <div class="bg-white" v-html="savedValue"></div>
  </div>

  <div v-if="newData">
    <PartnerContractForm
      :openNew="newData"
      @closeDialog="newData = $event"
      @savedForm="savedValue = $event"
    />
  </div>
</template>

<script setup lang="ts">
import PartnerContractCard from '@/components/Admin/Card/PartnerContractCard.vue'
import ContractCardAdd from '@/components/Admin/Card/ContractCardAdd.vue'
import PartnerContractForm from '@/components/Admin/Card/PartnerContractForm.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePartnerContract } from '@/stores/partnerContract'
import { formatDateTime } from '@/functions/format'

onMounted(async () => {
  await fetchPartnerContracts()
})

const partnerContractStore = usePartnerContract()

const loading = ref<boolean>(false)
const router = useRouter()
const newData = ref<boolean>()
const savedValue = ref<string>()
const partnerContracts = ref<any>([])
const originalContracts = ref<any>([])
const lastFetch = ref<any>(null)
const search = ref<string>('')

function searchContract() {
  partnerContracts.value = originalContracts.value.filter(
    (contract) => contract.company.name === search.value
  )
}

async function fetchPartnerContracts() {
  loading.value = true
  try {
    const response = await partnerContractStore.getPartnerContracts()
    console.log(response)
    if (response.status) {
      originalContracts.value = response.data
      partnerContracts.value = response.data
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
    lastFetch.value = new Date()
  }
}
</script>

<style scoped>
.ql-align-center {
  text-align: center;
}
</style>
