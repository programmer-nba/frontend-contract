<template>
  <div>
    <div
      class="h-full w-full flex xl:justify-between lg:justify-between md:justify-center justify-center items-center"
    >
      <div class="w-full h-full mt-3 flex flex-col justify-center items-center">
        <div class="w-full flex flex-col items-center justify-center">
          <h1 class="text-3xl font-bold py-5">สร้างสัญญา</h1>
          <div class="flex flex-col items-center justify-center gap-y-3 flex-wrap w-fit">
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <h1>รหัสสัญญา (code)</h1>
                <InputText
                  v-model="contractBase.code"
                  :class="existCode ? 'text-red-500 border border-red-500' : ''"
                  @input="checkExistCode"
                />
                <small v-show="existCode" class="text-red-500 py-1">*ห้ามซ้ำกับรหัสอื่น</small>
              </div>
              <div>
                <h1>ประเภทสัญญา</h1>
                <AutoComplete
                  v-model="contractBase.type"
                  dropdown
                  :suggestions="contractTypes"
                  @complete="searchType"
                />
              </div>
            </div>
            <div class="flex flex-col gap-y-4 w-full">
              <div>
                <h1>หัวข้อสัญญา</h1>
                <InputText v-model="contractBase.title" class="w-full" />
              </div>
              <div>
                <h1>หัวข้อรอง (ถ้ามี)</h1>
                <InputText v-model="contractBase.sub_title" class="w-full" />
              </div>
            </div>
          </div>
          <div>
            <h1 class="text-lg font-semibold py-3">ข้อมูลผู้รับจ้าง</h1>
            <div class="flex flex-col gap-y-4">
              <div class="flex gap-2">
                <div>
                  <h1>ชื่อ-สกุล/ชื่อบริษัท</h1>
                  <InputText v-model="contractBase.company_name" />
                </div>
                <div>
                  <h1>เลขประจำตัวผู้เสียภาษี</h1>
                  <InputText v-model="contractBase.company_tax_id" />
                </div>
                <div>
                  <h1>เบอร์โทร</h1>
                  <InputText v-model="contractBase.company_tel" />
                </div>
              </div>
              <div class="w-full">
                <div>
                  <h1>ที่อยู่</h1>
                  <InputText v-model="contractBase.company_address" class="w-full" />
                </div>
              </div>
              <div class="flex gap-2">
                <div>
                  <label for="company_stamp">ตราปั้ม (ถ้ามี)</label>
                  <input if="company_stamp" type="file" />
                </div>
                <div>
                  <label for="company_signature">ลายเซ็น</label>
                  <input if="company_signature" type="file" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col h-full gap-y-2 justify-between items-center my-5">
          <div class="card">
            <Editor
              v-model="value"
              class="min-h-[400px] max-w-[600px]"
              editorStyle="height: 400px"
            />
          </div>
          <Button
            class="w-[400px] ease-in-out py-2 border border-orange-500 hover:border-orange-950 text-orange-500 hover:text-orange-950 duration-300"
            label="เพิ่ม"
            @click="addData"
          />
        </div>
        <div
          class="bg-slate-100 flex flex-col px-4 border border-dotted rounded-md items-center justify-center"
        >
          <h1 class="py-4">---------- เพิ่มลายเซ็น ----------</h1>
          <div>
            <h1>ชื่อ-สกุล</h1>
            <InputText v-model="cur_signature.name" />
          </div>
          <div class="mb-3">
            <h1>ตำแหน่ง</h1>
            <InputText v-model="cur_signature.role" />
          </div>
          <Vue3Signature
            ref="signature1"
            :sigOption="state.option"
            :w="'350px'"
            :h="'200px'"
            :disabled="state.disabled"
            class="example"
          ></Vue3Signature>
          <div class="flex justify-around w-full py-4">
            <button class="px-2 py-1" @click="clear">ล้าง</button>
            <button class="px-2 py-1" @click="undo">ย้อนกลับ</button>
            <button
              class="px-2 py-1 bg-sky-300 rounded-md hover:bg-sky-100 duration-300 hover:border hover:border-sky-300"
              @click="save('image/jpeg')"
            >
              บันทึก
            </button>
          </div>
        </div>
        <Divider class="py-2" />
        <div class="flex flex-col h-full w-full max-w-[1000px] border-t-2 mb-48 pt-4">
          <h1 class="text-center py-4 font-semibold text-3xl">ตัวอย่างสัญญา</h1>
          <div class="w-full flex justify-center pb-4">
            <Button
              @click="addWaterMark"
              class="text-xl px-2 py-2 rounded border-2 border-green-300"
              :class="stamp ? 'bg-sky-300' : ''"
              label="ลายน้ำ"
            />
          </div>
          <div
            class="flex flex-col items-center py-10 gap-y-2 w-full bg-white h-full min-h-[800px] border-2 rounded px-20"
          >
            <div class="flex flex-col gap-y-2 w-full">
              <Image class="self-center" width="150" :src="nba_logo_test" alt="mark" />
              <div class="self-end pt-4">
                <p v-if="contractBase.company_name" class="text-right">
                  ทำที่ {{ contractBase.company_name }}
                </p>
                <p class="text-right">{{ contractBase.company_address }}</p>
              </div>
              <div class="py-4">
                <p class="text-2xl font-semibold text-center">{{ contractBase.title }}</p>
                <p class="text-xl font-semibold text-center">{{ contractBase.sub_title }}</p>
              </div>
            </div>
            <p class="text-xl font-semibold text-center">{{ contractBase.head }}</p>
            <div
              v-for="(text, index) in addedValue"
              :key="index"
              class="card flex flex-wrap hover:bg-slate-100 w-full"
            >
              <Button
                class="text-red-500 w-fit bg-red-200 px-2 hover:bg-red-500 hover:text-white duration-200"
                size="small"
                icon="pi pi-times"
                @click="removeData(index)"
              />

              <div
                v-html="text"
                class="cursor-pointer hover:text-orange-500 w-full"
                @click="editData(index)"
              ></div>
            </div>
            <div class="w-full flex gap-10 justify-end pt-48 pb-36" v-if="isSign">
              <div
                v-for="(signature, index) in company_signature"
                :key="index"
                class="w-fit h-fit min-h-[100px] flex flex-col items-center justify-center"
              >
                <Image :src="signature.img_64" alt="signature" width="180" />
                <p>{{ signature.name ? `( ${signature.name} )` : '.............' }}</p>
                <p>{{ signature.role }}</p>
                <Image
                  v-if="stamp"
                  :src="tossagun_mark"
                  alt="stamp"
                  width="250"
                  class="opacity-40 absolute -rotate-6"
                />
              </div>
            </div>
          </div>
          <Button
            class="w-full self-center my-4 py-4 text-xl hover:bg-sky-500 hover:text-white bg-sky-300"
            label="บันทึก"
            @click="saveData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useBaseContract } from '@/stores/baseContract'
import tossagun_mark from '@/assets/img/tossagun_mark.png'
import nba_logo_test from '@/assets/img/nba_logo_test.png'
import { useRoute } from 'vue-router'

onMounted(() => {
  id.value = route.params.id
  getCodeTypes()
  console.log(id.value)
  fetchData()
})

const id = ref<any>(null)
const route = useRoute()
const editting = ref<boolean>(false)
const value = ref<string | undefined>('')
const indexVal = ref<number>(0)
const addedValue = ref<string[]>([])
const baseContract = useBaseContract()
const contractBase = ref<any>({})
const company_signature = ref<string[]>([])
const contractTypes = ref<any>([])
const types = ['pdpa', 'ddsc', 'tossagun']
const existingCodes = ref<any>()
const existCode = ref<boolean>(false)
const cur_signature = ref<any>({})
const isSign = ref<boolean>(false)
const stamp = ref<boolean>(false)

function checkExistCode() {
  if (existingCodes.value.includes(contractBase.value.code)) {
    existCode.value = true
  } else {
    existCode.value = false
  }
}

async function fetchData() {
  try {
    const response = await baseContract.getBaseContractById(id.value)
    console.log(response)
    if (response.status) {
      contractBase.value.code = response.data.code
      contractBase.value.type = response.data.type
      contractBase.value.title = response.data.title
      contractBase.value.sub_title = response.data.sub_title
      contractBase.value.company_name = response.data.company.name
      contractBase.value.company_address = response.data.company.address
      contractBase.value.company_tax_id = response.data.company.tax_id
      contractBase.value.company_tel = response.data.company.tel
      company_signature.value = response.data.company.signature
      contractBase.value.company_stamp = response.data.company.stamp
      contractBase.value.company_logo = response.data.company.logo
      contractBase.value.head = response.data.detail_html.head
      contractBase.value.body = response.data.detail_html.body
      contractBase.value.footer = response.data.detail_html.footer
      addedValue.value = response.data.detail_html.body.split('</>')
    }
  } catch (err) {
    console.log(err)
  }
}

function addData() {
  if (value.value && value.value !== '') {
    value.value = value.value
      .replace('<img', '<img class="w-[100px] h-[100px]"')
      .replace('ql-align-center', 'text-center')
      .replace('ql-align-right', 'text-right')
      .replace('ql-align-justify', 'text-justify')
      .replace('<p>', '<p class="indent-8 break-words" >')
    if (editting.value && addedValue.value.length > 0) {
      addedValue.value[indexVal.value] = value.value
      indexVal.value = 0
      editting.value = false
    } else {
      addedValue.value.push(value.value)
    }
    value.value = ''
  }
}

const searchType = (event: any) => {
  let _items = [...types.values()]
  contractTypes.value = event.query ? [...types.values()].map((item) => item) : _items
}

async function getCodeTypes() {
  try {
    const response = await baseContract.getBaseContractCodes()
    console.log('codes', response)
    const existingCodesDDSC = response.data.ddsc.map((code: any) => code.code)
    const existingCodesTOSS = response.data.tossagun.map((code: any) => code.code)
    existingCodes.value = [...existingCodesDDSC, ...existingCodesTOSS]
  } catch (err) {
    console.log(err)
  }
}

function editData(index: number) {
  value.value = addedValue.value[index]
  indexVal.value = index
  editting.value = true
}

function removeData(index: number) {
  addedValue.value.splice(index, 1)
}

async function saveData() {
  if (addedValue.value.length > 0) {
    const result = addedValue.value.join('</>')
    console.log(result)
    value.value = ''
    const data = {
      code: contractBase.value.code,
      type: contractBase.value.type,
      title: contractBase.value.title,
      sub_title: contractBase.value.sub_title,
      company_name: contractBase.value.company_name,
      company_address: contractBase.value.company_address,
      company_tax_id: contractBase.value.company_tax_id,
      company_tel: contractBase.value.company_tel,
      company_signature: company_signature.value,
      company_stamp: contractBase.value.company_stamp,
      company_logo: contractBase.value.company_logo,
      detail_text: null,
      detail_html: {
        head: contractBase.value.head,
        body: result,
        footer: contractBase.value.footer
      }
    }
    try {
      const response = await baseContract.editBaseContractById(id.value, data)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}

const state = reactive({
  count: 0,
  option: {
    penColor: 'rgb(0, 0, 0)',
    backgroundColor: 'white'
  },
  disabled: false
})

const signature1 = ref<any>(null)

const save = (t: any) => {
  cur_signature.value.img_64 = signature1.value.save(t)
  console.log(cur_signature.value)
  company_signature.value.push(cur_signature.value)
  cur_signature.value = {}
  isSign.value = true
}

const clear = () => {
  signature1.value.clear()
}

const undo = () => {
  signature1.value.undo()
}

const addWaterMark = () => {
  stamp.value = !stamp.value
}
</script>

<style scoped></style>
