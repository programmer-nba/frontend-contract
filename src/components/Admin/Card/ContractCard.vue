<template>
  <Toast />
  <ConfirmPopup></ConfirmPopup>
  <Card style="width: 16rem; height: 20rem; overflow: hidden">
    <template #header>
      <div class="bg-yellow-300 h-5 flex justify-around items-center">
        <small>{{ data.code }}</small>
      </div>
    </template>
    <template #title>
      <p class="text-md">{{ data.title }}</p>
    </template>
    <template #subtitle>{{ data.sub_title }}</template>
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
            label="ลบ"
            outlined
          ></Button>
          <Button
            class="text-orange-400 hover:bg-orange-300 hover:text-white px-2"
            @click="editContract"
            :loading="loading"
            label="แก้ไข"
            outlined
          ></Button>
        </div>
        <small class="text-xs w-full text-right">แก้ไขเมื่อ {{ formatDate(data.updatedAt) }}</small>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { formatDate } from '@/functions/format'
const { data } = defineProps(['data'])
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useBaseContract } from '@/stores/baseContract'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const baseContractStore = useBaseContract()
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
      deleteBaseContract()
    },
    reject: () => {
      return
    }
  })
}

const deleteBaseContract = async () => {
  loading.value = true
  try {
    const response = await baseContractStore.deleteBaseContract(data._id)
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
    name: 'edit-contract',
    params: { id: data._id }
  })
}
</script>

<style scoped></style>
