<template>
  <Toast />
  <ConfirmPopup></ConfirmPopup>
  <Card style="width: 16rem; height: 24rem; overflow: hidden">
    <template #header>
      <div
        class="h-8 py-2 flex justify-around items-center"
        :class="[
          { 'bg-green-700 text-white': data.status[data.status.length - 1]?.name === 'signed' },
          { 'bg-orange-500 text-white': data.status[data.status.length - 1]?.name === 'pending' },
          { 'bg-yellow-200 text-black': data.status[data.status.length - 1]?.name === 'new' }
        ]"
      >
        <small class="font-bold">{{ data.contract_code }}</small>
        <p class="font-bold">
          {{
            data.status.length > 0
              ? data.status[data.status.length - 1]?.name
              : data.status[0]?.name
          }}
        </p>
      </div>
    </template>
    <template #title>
      <p
        class="text-center p-2 mb-1 rounded-3xl"
        :class="[
          { 'text-green-700 bg-green-100': data.status[data.status.length - 1]?.name === 'signed' },
          { 'bg-yellow-100 text-black': data.status[data.status.length - 1]?.name === 'new' },
          { 'bg-slate-100 text-black': data.status[data.status.length - 1]?.name === 'pending' }
        ]"
      >
        {{
          data.status.length > 0 ? data.status[data.status.length - 1]?.text : data.status[0]?.text
        }}
      </p>
      <p class="text-sm">{{ data.title }}</p>
    </template>
    <template #subtitle>
      <p class="border-b">► {{ data.partner_main_name }}</p>
    </template>
    <template #content>
      <article
        class="m-0 h-[100px] bg-slate-100 rounded overflow-hidden break-words opacity-80 text-sm"
        v-html="data.detail_html.body"
      ></article>
    </template>
    <template #footer>
      <div class="flex flex-col gap-y-3">
        <div class="card flex gap-4 justify-center">
          <Button
            class="text-red-400 hover:bg-red-300 hover:text-white px-2"
            :loading="loading"
            @click="confirmDelete($event)"
            label="ยกเลิก"
            outlined
          ></Button>
          <Button
            class="text-green-700 hover:bg-green-300 hover:text-black px-2"
            @click="editContract"
            :loading="loading"
            label="ตรวจสอบ"
            outlined
          ></Button>
          <ContractDialog />
        </div>
        <small class="text-xs w-full text-right">สร้างเมื่อ {{ formatDate(data.createdAt) }}</small>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { formatDate } from '@/functions/format'
const { data } = defineProps(['data'])
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { usePartnerContract } from '@/stores/partnerContract'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ContractDialog from '@/components/Admin/Card/ContractDialog.vue'

const router = useRouter()
const partnerContractStore = usePartnerContract()
const toast = useToast()
const confirm = useConfirm()
const loading = ref<boolean>(false)

const emits = defineEmits(['deleted'])

const confirmDelete = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'ต้องการลบสัญญานี้หรือไม่ ?',
    icon: 'pi pi-info-circle',
    rejectClass: 'px-2',
    acceptClass: 'text-red-500 px-2',
    rejectLabel: 'ยกเลิก',
    acceptLabel: 'ลบ',
    accept: () => {
      deletePartnerContract()
    },
    reject: () => {
      return
    }
  })
}

const deletePartnerContract = async () => {
  loading.value = true
  try {
    const response = await partnerContractStore.deletePartnerContract(data._id)
    console.log(response)
    if (response.status) {
      toast.add({ severity: 'info', summary: 'สำเร็จ', detail: 'ลบสัญญาแล้ว', life: 3000 })
      emits('deleted')
    }
  } catch (err) {
    console.log(err)
    toast.add({
      severity: 'error',
      summary: 'เกิดข้อผิดพลาด',
      detail: 'ไม่สามารถลบสัญญานี้',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

const editContract = () => {
  router.push({
    name: 'edit-partner-contract',
    params: { id: data._id }
  })
}
</script>

<style scoped></style>
