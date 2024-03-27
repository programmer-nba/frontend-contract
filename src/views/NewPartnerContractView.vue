<template>
  <div>
    <div
      class="h-full border w-full flex xl:justify-between lg:justify-between md:justify-center justify-center items-center"
    >
      <div class="w-full h-full mt-3 flex flex-col justify-center items-center">
        <form class="w-full flex flex-col items-center justify-center">
          <h1 class="text-3xl font-bold py-5">สร้างสัญญา Partner</h1>
          <p v-show="selectedCode" class="py-5 text-lg px-4 border border-green-500 mb-3">
            {{ selectedCode?.title }} ({{ selectedCode?.code }})
          </p>
          <Dropdown
            v-model="selectedCode"
            :options="groupedCodes"
            optionLabel="title"
            optionGroupLabel="title"
            optionGroupChildren="items"
            placeholder="เลือประเภทสัญญา"
            class="text-center w-full max-w-3xl"
          >
            <template #optiongroup="slotProps">
              <div class="flex align-items-center">
                <div>{{ slotProps.option.label }}</div>
              </div>
            </template>
          </Dropdown>
          <div class="my-4 bg-sky-200 p-5 rounded-lg w-full max-w-3xl">
            <h1 class="text-lg font-semibold py-3">
              ข้อมูล partner :
              <span class="font-normal px-5 ml-2 rounded-md border-b border-dotted border-black">{{
                mainName === 'person' &&
                partner.prefix !== 'ไม่ระบุ' &&
                partner.first_name &&
                partner.last_name
                  ? `${partner.prefix} ${partner.first_name} ${partner.last_name}`
                  : mainName === 'person' &&
                      partner.prefix === 'ไม่ระบุ' &&
                      partner.first_name &&
                      partner.last_name
                    ? `${partner.first_name} ${partner.last_name}`
                    : partner.company_name && partner.company_branch
                      ? `${partner.company_name} (${partner.company_branch})`
                      : partner.company_name
              }}</span>
            </h1>
            <div class="flex flex-col gap-y-4">
              <div class="flex gap-5">
                <div>
                  <h1 class="pb-2">code</h1>
                  <InputText v-model="partner.code" class="py-1 px-2" />
                </div>
                <div>
                  <h1 class="pb-2">_id</h1>
                  <InputText v-model="partner._id" class="py-1 px-2" />
                </div>
              </div>

              <div class="flex gap-5">
                <div>
                  <h1 class="pb-2">ชื่อบริษัท</h1>
                  <InputText v-model="partner.company_name" class="py-1 px-2" />
                </div>
                <div>
                  <div class="flex items-center gap-2 pb-2">
                    <h1>สำนักงานใหญ่/สาขา</h1>
                    <InputSwitch v-model="isMainBranch" @change="changeMainBranch" />
                  </div>
                  <InputText
                    v-if="isMainBranch"
                    v-model="partner.company_branch"
                    class="py-1 px-2"
                    disabled
                  />
                  <InputText
                    v-if="!isMainBranch"
                    v-model="partner.company_branch"
                    class="py-1 px-2"
                  />
                </div>
                <div>
                  <h1 class="pb-2">เลขประจำตัวผู้เสียภาษี</h1>
                  <InputText v-model="partner.tax_id" class="py-1 px-2" maxlength="13" />
                </div>
              </div>
              <div class="flex gap-5">
                <div class="flex gap-2">
                  <div>
                    <h1>คำนำหน้า</h1>
                    <Dropdown
                      v-model="partner.prefix"
                      editable
                      :options="prefixs"
                      placeholder="คำนำหน้า"
                      class="w-28 px-2 py-1"
                    />
                  </div>
                  <div>
                    <h1>ชื่อ</h1>
                    <InputText v-model="partner.first_name" class="py-1 px-2" />
                  </div>
                  <div>
                    <h1>นามสกุล</h1>
                    <InputText v-model="partner.last_name" class="py-1 px-2" />
                  </div>
                </div>
              </div>
              <div class="w-full flex gap-4">
                <div>
                  <h1 class="pb-2">ที่อยู่</h1>
                  <InputText v-model="partner.address" class="px-2 py-1" />
                </div>
                <div>
                  <h1 class="pb-2">เบอร์โทร</h1>
                  <InputMask
                    id="basic"
                    v-model="partner.tel"
                    mask="099-9999999"
                    class="py-1 px-2"
                    placeholder="0xx-xxxxxxx"
                  />
                </div>
              </div>
            </div>
            <div class="py-5 flex items-center gap-3">
              <p class="font-semibold text-lg">ประสงค์สร้างสัญญาในนามของ</p>
              <div class="flex align-items-center">
                <RadioButton
                  v-model="mainName"
                  inputId="mainNamePerson"
                  name="mainName"
                  value="person"
                />
                <label for="mainNamePerson" class="ml-2">บุคคลธรรมดา</label>
              </div>
              <div class="flex align-items-center">
                <RadioButton
                  v-model="mainName"
                  inputId="mainNameCompany"
                  name="mainName"
                  value="company"
                />
                <label for="mainNameCompany" class="ml-2">บริษัท</label>
              </div>
            </div>
          </div>
          <Button
            @click.prevent="saveData"
            class="w-full border max-w-3xl py-2 mb-5 bg-green-400"
            label="สร้างสัญญา"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { usePartnerContract } from '@/stores/partnerContract'
import { useBaseContract } from '@/stores/baseContract'

onMounted(async () => {
  await getCodes()
})

const prefixs = ref<string[]>(['นาย', 'นาง', 'นางสาว', 'ไม่ระบุ'])
const ddsc_codes = ref<any>([])
const tossagun_codes = ref<any>([])
const baseContractCodes = useBaseContract()
const addedValue = ref<string[]>([])
const partnerContract = usePartnerContract()
const contractPartner = ref<any>({})
const partner = ref<any>({})
const isMainBranch = ref<boolean>(false)
const mainName = ref<string>('person')
const selectedCode = ref()
const groupedCodes = computed(() => {
  return [
    {
      label: 'PDPA',
      code: 'PDPA',
      items: [
        {
          title: 'PDPA',
          code: 'PDPA'
        }
      ]
    },
    {
      label: 'DDSC',
      code: 'DDSC',
      items: ddsc_codes.value
    },
    {
      label: 'TOSSAGUN',
      code: 'TOSSAGUN',
      items: tossagun_codes.value
    }
  ]
})

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

function changeMainBranch() {
  if (isMainBranch.value) {
    partner.value.company_branch = 'สำนักงานใหญ่'
  } else {
    partner.value.company_branch = '#'
  }
}

async function saveData() {
  //selectedCode.value.code = 'pdpa'
  const data = {
    code: selectedCode.value.code,
    start_date: contractPartner.value.start_date,
    end_date: contractPartner.value.end_date,
    partner_main_name:
      mainName.value === 'person'
        ? `${partner.value.first_name} ${partner.value.last_name}`
        : partner.value.company_name,
    partner_id: partner.value._id,
    partner_code: partner.value.code,
    partner_company_name: partner.value.company_name,
    partner_company_branch: partner.value.company_branch,
    partner_prefix: partner.value.prefix,
    partner_first_name: partner.value.first_name,
    partner_last_name: partner.value.last_name,
    partner_full_name: `${partner.value.first_name} ${partner.value.last_name}`,
    partner_address: partner.value.address,
    partner_tax_id: partner.value.tax_id,
    partner_tel: partner.value.tel,
    partner_logo: partner.value.logo,
    partner_stamp: partner.value.stamp
  }
  try {
    const response = await partnerContract.createNewPartnerContract(data)
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped></style>
