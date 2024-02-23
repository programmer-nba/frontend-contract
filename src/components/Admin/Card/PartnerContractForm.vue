<template>
  <Dialog
    v-model:visible="visible"
    header="สร้างสัญญา"
    :style="[{ width: '100%' }, { height: '100%' }]"
  >
    <div
      class="h-full flex xl:justify-between lg:justify-between md:justify-center justify-center items-center"
    >
      <div class="w-full h-full">
        <div class="flex flex-col gap-y-2 justify-between items-center my-5">
          <div class="card">
            <Editor v-model="value" editorStyle="height: 400px" />
          </div>
          <Button class="w-[500px] py-2 bg-orange-300" label="เพิ่ม" @click="addData" />
        </div>
      </div>
      <div class="w-full flex flex-col h-full">
        <div class="flex flex-col gap-y-2 h-[445px] border-2 mt-5 mb-2 rounded">
          <div
            v-for="(text, index) in addedValue"
            :key="index"
            class="card flex hover:bg-slate-100"
          >
            <div
              v-html="text"
              class="cursor-pointer hover:text-orange-700"
              @click="
                () => {
                  value = text
                  indexVal = index
                  editting = true
                  console.log(indexVal)
                }
              "
            ></div>
            <Button
              class="text-red-500"
              size="small"
              icon="pi pi-times"
              @click="addedValue.splice(text, 1)"
            />
          </div>
        </div>
        <Button class="w-[500px] self-center py-2 bg-green-300" label="บันทึก" @click="saveData" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const emits = defineEmits(['savedForm', 'closeDialog'])

const visible = ref<boolean>(true)
const editting = ref<boolean>(false)
const value = ref<string>()
const indexVal = ref<number>()
const addedValue = ref<any>([])

watchEffect(() => {
  if (!visible.value) {
    emits('closeDialog')
  }
})

function addData() {
  value.value = value.value
    ?.replace('<img', '<img class="w-[100px] h-[100px]"')
    .replace('ql-align-center', 'text-center')
    .replace('ql-align-right', 'text-right')
    .replace('ql-align-justify', 'text-justify')
    .replace('<p>', '<p class="indent-8" >')
  if (editting.value && indexVal.value >= 0 && addedValue.value.length > 0) {
    addedValue.value[indexVal.value] = value.value
    indexVal.value = null
    editting.value = false
  } else {
    addedValue.value.push(value.value)
  }
  value.value = null
}

function saveData() {
  if (addedValue.value.length > 0) {
    const result = addedValue.value.join('')
    console.log(result)
    emits('savedForm', result)
    value.value = null
  }
  addedValue.value = []
}
</script>

<style scoped></style>
