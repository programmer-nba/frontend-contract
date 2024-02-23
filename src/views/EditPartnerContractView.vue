<template>
  <Toast position="bottom-right" group="b" />
  <div>
    <div
      class="h-full border w-full flex xl:justify-between lg:justify-between md:justify-center justify-center items-center"
    >
      <div class="w-full h-full mt-3 flex flex-col justify-center items-center">
        <div class="w-full flex flex-col items-center justify-center">
          <h1 class="text-3xl font-bold py-5">สัญญา Partner</h1>
          <div class="flex flex-col items-center justify-center gap-y-3 flex-wrap w-full max-w-3xl">
            <div class="flex gap-3">
              <div class="flex flex-col text-xl items-start">
                รหัสสัญญา {{ contractPartner.contract_code }}
              </div>
            </div>
            <div class="flex flex-col gap-y-4 w-full">
              <div>
                <h1 class="font-semibold text-lg">หัวข้อสัญญา</h1>
                <InputText v-model="contractPartner.title" class="w-full text-lg pl-2" />
              </div>
              <div>
                <h1>หัวข้อรอง (ถ้ามี)</h1>
                <InputText v-model="contractPartner.sub_title" class="w-full" />
              </div>
            </div>
          </div>
          <div class="my-4 bg-sky-200 p-5 rounded-lg w-full max-w-3xl">
            <div class="flex gap-3">
              <h1 class="text-lg font-semibold py-3">ข้อมูล partner :</h1>
              <h1 class="text-lg font-semibold py-3">{{ contractPartner?.partner_main_name }}</h1>
            </div>
            <div class="flex flex-col gap-y-4">
              <div class="flex gap-3">
                <div>
                  <h1>ชื่อบริษัท</h1>
                  <InputText v-model="partner.company_name" disabled />
                </div>
                <div>
                  <h1>สำนักงานใหญ่/สาขา</h1>
                  <InputText v-model="partner.company_branch" disabled />
                </div>
                <div>
                  <h1>เลขประจำตัวผู้เสียภาษี</h1>
                  <InputText v-model="partner.tax_id" disabled />
                </div>
              </div>
              <div class="flex gap-3">
                <div class="flex gap-2">
                  <div>
                    <h1>คำนำหน้า</h1>
                    <InputText class="w-16 text-center" v-model="partner.prefix" disabled />
                  </div>
                  <div>
                    <h1>ชื่อ-สกุล</h1>
                    <InputText v-model="partner.full_name" disabled />
                  </div>
                </div>
                <div>
                  <h1>เบอร์โทร</h1>
                  <InputText v-model="partner.tel" disabled />
                </div>
              </div>
              <div class="w-full">
                <div>
                  <h1>ที่อยู่</h1>
                  <InputText v-model="partner.address" disabled class="w-full" />
                </div>
              </div>
            </div>
          </div>
          <div class="my-4 bg-sky-200 w-full max-w-3xl p-5 rounded-lg">
            <h1 class="text-lg font-semibold py-3">ข้อมูลผู้รับจ้าง</h1>
            <div class="flex flex-col gap-y-4">
              <div class="flex gap-2">
                <div class="w-full">
                  <h1>ชื่อ-สกุล/ชื่อบริษัท</h1>
                  <InputText class="w-full pl-2" v-model="contractPartner.company_name" />
                </div>
                <div>
                  <h1>เลขประจำตัวผู้เสียภาษี</h1>
                  <InputText class="pl-2" v-model="contractPartner.company_tax_id" />
                </div>
                <div>
                  <h1>เบอร์โทร</h1>
                  <InputText v-model="contractPartner.company_tel" />
                </div>
              </div>
              <div class="w-full">
                <div>
                  <h1>ที่อยู่</h1>
                  <InputText v-model="contractPartner.company_address" class="w-full pl-2" />
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
              <h1 class="font-semibold text-lg">บัญชีธนาคาร</h1>
              <div class="flex gap-4">
                <div class="flex flex-col">
                  <label for="bank_owner_name">ชื่อบัญชี</label>
                  <InputText id="bank_owner_name" class="px-2" v-model="bank.bank_owner_name" />
                </div>
                <div class="flex flex-col w-1/2">
                  <label for="basic">เลขบัญชี</label>
                  <InputMask
                    id="basic"
                    v-model="bank.bank_number"
                    class="px-2"
                    mask="999-9-99999-9"
                    placeholder="***-*-*****-*"
                  />
                </div>
              </div>
              <div class="flex gap-4">
                <div class="flex flex-col">
                  <label for="bank_account">ธนาคาร</label>
                  <InputText id="bank_account" class="px-2" v-model="bank.bank_type" />
                </div>
                <div class="flex flex-col">
                  <label for="bank_branch">สาขา</label>
                  <InputText id="bank_branch" class="px-2" v-model="bank.bank_branch" />
                </div>
              </div>
              <div class="flex flex-col gap-y-2">
                <div class="flex flex-col w-fit">
                  <label for="bank_img">รูปบัญชี / QR code</label>
                  <input id="bank_img" @change="uploadBankImg" type="file" />
                </div>
                <div
                  v-show="bank.bank_img"
                  class="border w-fit border-dotted border-black rounded-lg p-2 bg-white"
                >
                  <Image :src="bank.bank_img" alt="bank_img" width="250" preview />
                </div>
              </div>
              <InputGroup class="shadow-lg w-full max-w-md">
                <InputGroupAddon
                  >จำนวนเงินที่ต้อง<span class="font-semibold px-1 text-black"
                    >ชำระทั้งหมด</span
                  ></InputGroupAddon
                >
                <InputNumber
                  v-model="bank.all_price"
                  class="border-2 border-black border-dotted"
                  placeholder=""
                />
                <InputGroupAddon>บาท</InputGroupAddon>
              </InputGroup>
              <InputGroup class="shadow-lg w-full max-w-md">
                <InputGroupAddon
                  >จำนวนเงินที่ต้อง
                  <span class="font-semibold px-1 text-black"
                    >ชำระก่อนเซ็นสัญญา</span
                  ></InputGroupAddon
                >
                <InputNumber
                  v-model="bank.deposit_amount"
                  class="border-2 border-black border-dotted"
                  placeholder=""
                />
                <InputGroupAddon>บาท</InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full h-full gap-y-2 justify-between items-center my-5">
          <div class="card flex justify-center w-full">
            <Editor
              v-model="value"
              class="min-h-[400px] w-full max-w-3xl"
              editorStyle="height: 400px"
            />
          </div>
          <Button
            class="max-w-3xl ease-in-out py-2 border w-full border-orange-500 hover:border-orange-950 text-orange-500 hover:text-orange-950 duration-300"
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
            :w="'auto'"
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
        <div class="flex flex-col h-full w-full max-w-3xl border-t-2 mb-48 pt-4">
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
                <p v-if="contractPartner.company_name" class="text-right">
                  ทำที่ {{ contractPartner.company_name }}
                </p>
                <p class="text-right">{{ contractPartner.company_address }}</p>
              </div>
              <div class="py-4">
                <p class="text-2xl font-semibold text-center">{{ contractPartner.title }}</p>
                <p class="text-xl font-semibold text-center">{{ contractPartner.sub_title }}</p>
              </div>
            </div>
            <p class="text-xl font-semibold text-center">{{ contractPartner.head }}</p>
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
            :label="loading ? '...กำลังบันทึก' : 'บันทึก'"
            @click="saveData"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { usePartnerContract } from '@/stores/partnerContract'
import { useBaseContract } from '@/stores/baseContract'
import tossagun_mark from '@/assets/img/tossagun_mark.png'
import nba_logo_test from '@/assets/img/nba_logo_test.png'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

onMounted(async () => {
  id.value = route.params.id
  console.log(id.value)
  await fetchData()
  await getCodes()
})

const ddsc_codes = ref<any>([])
const tossagun_codes = ref<any>([])
const baseContractCodes = useBaseContract()
const id = ref<any>(null)
const route = useRoute()
const router = useRouter()
const editting = ref<boolean>(false)
const value = ref<string | undefined>('')
const indexVal = ref<number>(0)
const addedValue = ref<string[]>([])
const partnerContract = usePartnerContract()
const contractPartner = ref<any>({})
const company_signature = ref<string[]>([])
const contractTypes = ref<any>([])
const types = ['pdpa', 'ddsc', 'tossagun']
const cur_signature = ref<any>({})
const isSign = ref<boolean>(false)
const stamp = ref<boolean>(false)
const partner = ref<any>({})
const loading = ref<boolean>(false)
const bank = ref<any>({})

const showSuccess = (title: string, detail: string, life: number) => {
  toast.add({ severity: 'success', summary: title, detail: detail, life: life })
}
const showError = (title: string, detail: string, life: number) => {
  toast.add({ severity: 'error', summary: title, detail: detail, life: life })
}

const uploadBankImg = () => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64Content = e.target.result
      bank.value.bank_img = base64Content
    }
    reader.readAsDataURL(file)
  }
}

const getCodes = async () => {
  try {
    const { data } = await baseContractCodes.getBaseContractCodes()
    if (data) {
      ddsc_codes.value = data.ddsc
      tossagun_codes.value = data.tossagun
    }
  } catch (err) {
    console.log(err)
  }
}

const selectedCode = ref()
/* const groupedCodes = computed(()=>{
  return [
    {
      label: 'DDSC',
      code: 'DDSC',
      items: ddsc_codes.value
    },
    {
      label: 'TOSSAGUN',
      code: 'TSG',
      items: tossagun_codes.value
    },
  ]
}) */

async function fetchData() {
  try {
    const response = await partnerContract.getPartnerContractById(id.value)
    console.log(response)
    if (response.status) {
      contractPartner.value.code = response.data.code
      contractPartner.value.partner_main_name = response.data.partner_main_name
      partner.value = response.data.partner
      selectedCode.value = ''
      contractPartner.value.contract_code = response.data.contract_code
      contractPartner.value.type = response.data.type
      contractPartner.value.title = response.data.title
      contractPartner.value.sub_title = response.data.sub_title
      contractPartner.value.company_name = response.data.company.name
      contractPartner.value.company_address = response.data.company.address
      contractPartner.value.company_tax_id = response.data.company.tax_id
      contractPartner.value.company_tel = response.data.company.tel
      company_signature.value = response.data.company.signature
      contractPartner.value.company_stamp = response.data.company.stamp
      contractPartner.value.company_logo = response.data.company.logo
      contractPartner.value.head = response.data.detail_html.head
      contractPartner.value.body = response.data.detail_html.body
      contractPartner.value.footer = response.data.detail_html.footer
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

function editData(index: number) {
  value.value = addedValue.value[index]
  indexVal.value = index
  editting.value = true
}

function removeData(index: number) {
  addedValue.value.splice(index, 1)
}

async function saveData() {
  loading.value = true
  if (addedValue.value.length > 0) {
    const result = addedValue.value.join('</>')
    console.log(result)
    value.value = ''
    const data = {
      code: contractPartner.value.code,
      type: contractPartner.value.type,
      title: contractPartner.value.title,
      sub_title: contractPartner.value.sub_title,
      company_name: contractPartner.value.company_name,
      company_address: contractPartner.value.company_address,
      company_tax_id: contractPartner.value.company_tax_id,
      company_tel: contractPartner.value.company_tel,
      company_signature: company_signature.value,
      company_stamp: contractPartner.value.company_stamp,
      company_logo: contractPartner.value.company_logo,
      detail_text: null,
      detail_html: {
        head: contractPartner.value.head,
        body: result,
        footer: contractPartner.value.footer
      },
      bank_owner_name: bank.value.bank_owner_name,
      bank_number: bank.value.bank_number,
      bank_type: bank.value.bank_type,
      bank_branch: bank.value.bank_branch,
      deposit_amount: bank.value.deposit_amount,
      all_price: bank.value.all_price,
      bank_img: bank.value.bank_img
    }
    try {
      const response = await partnerContract.editPartnerContractById(id.value, data)
      if (response.status) {
        console.log(response.data)
        showSuccess('สำเร็จ', 'สร้างสัญญาใหม่แล้ว', 3000)
        setTimeout(() => {
          router.push('/admin/partner')
        }, 3000)
      } else {
        showError('เกิดข้อผิดพลาด', response.response.data.message, 3000)
      }
    } catch (err: any) {
      console.log(err)
      showError('เกิดข้อผิดพลาด', err.message, 3000)
    } finally {
      loading.value = false
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
