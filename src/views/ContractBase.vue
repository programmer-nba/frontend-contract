<template>
  <div>
    <Toast />
    <nav>

    </nav>
    <div class="mt-10 mx-5 flex px-5 py-5 justify-center gap-8">
      <ContractTable @selectedContract="selectedContract" @seeContract="seeContract" @createContract="createContract" />

      <Dialog
        v-model:visible="visible"
        modal
        header=" "
        :style="[
          { width: '100%' },
          { 'padding-left': '10rem' },
          { 'padding-right': '10rem' },
        ]"
      >
      <div class="flex flex-col items-center">
        <div class="w-full h-full overflow-y-auto">
            <div>
                <InputText
                class="text-center w-full font-bold text-xl px-2 py-2 focus:bg-green-100 border"
                v-model="base.contract_name"
                placeholder="ชื่อสัญญา"
                required
            />
            </div>
            <div>
                <InputText
                class="text-center w-full font-semibold text-lg px-2 py-2 focus:bg-green-100 border"
                v-model="base.remark"
                placeholder="คำอธิบายสัญญา"
            />
            </div>
            <div class="flex flex-col w-full gap-y-2 bg-blue-300 px-10 shadow-md justify-center items-center my-10 py-5">
                <p class="text-xl">รายละเอียดบริษัท</p>
                <InputText
                    class="text-center w-full font-bold px-2 py-2 focus:bg-green-100 border"
                    v-model="base.contractor.name"
                    placeholder="ชื่อบริษัท"
                    required
                />
                <InputText
                    class="text-center w-full font-bold px-2 py-2 focus:bg-green-100 border"
                    v-model="base.contractor.address"
                    placeholder="ที่อยู่บริษัท"
                    required
                />
                <InputText
                    class="text-center w-full font-bold px-2 py-2 focus:bg-green-100 border"
                    v-model="base.contractor.tax_id"
                    placeholder="เลขประจำผู้เสียภาษี"
                    required
                />
            </div>
            <div class="flex flex-col gap-y-2 bg-slate-100 px-10 shadow-md justify-center items-center mb-10 py-5">
                <InputText
                    class="text-center font-bold text-xl px-2 py-2 focus:bg-green-100 border"
                    v-model="base.contract_code"
                    placeholder="รหัสสัญญา"
                    required
                />
                <div v-for="(head, headIndex) in base.contract_head"
                :key="headIndex"
                class="flex gap-2 justify-center items-center w-full"
                >
                <InputText
                    class="text-center font-bold text-xl px-2 py-2 w-full focus:bg-green-100 border"
                    v-model="base.contract_head[headIndex]"
                    />
                <Button class="text-red-500 hover:line-through p-0 m-0" v-if="headIndex!==0" icon="pi pi-times" @click="removeHead(headIndex)" />
                </div>
                <Button class="bg-orange-500 text-white px-2 py-1" label="เพิ่มหัวสัญญา" @click="addHead()" />
              </div>
          <div class="border py-5 flex w-full my-3 flex-col justify-center items-center">
            <div class="card">
              <Textarea
                class="p-3"
                :class="!sensitiveCheck ? 'border-red-500 border focus:bg-red-100' : 'border focus:bg-green-100'"
                v-model="base.contract_sub_head"
                rows="5"
                cols="100"
              />
            </div>
            <p :class="!sensitiveCheck ? 'text-red-500' : 'text-green-500' ">
              *ข้อมูลต้องมี date และ partner_name
            </p>
          </div>
          <div
            class="flex flex-col py-5 mt-4 gap-y-4 border justify-center w-full items-center"
          >
            <div
              v-for="(body, index) in baseBody"
              class="card px-5 py-5 border shadow-md rounded flex flex-col justify-center items-center"
              :key="index"
            >
              <div
                class="card flex flex-col gap-2 my-2 w-full justify-center items-center"
              >
                <label for="title"
                  ><strong>หัวข้อ {{ index + 1 }}</strong></label
                >
                <InputText
                  class="text-center px-2 py-2 w-full focus:bg-green-100 border"
                  v-model="body.title"
                />
              </div>
              <div class="card border-t flex w-full my-3 flex-col justify-center">
                <div class="flex my-2 gap-3 items-center">
                  <p class="">หัวข้อรอง</p>
                  <Button
                    class="bg-yellow-500 py-1 text-white"
                    icon="pi pi-plus-circle"
                    @click="addSubtitle(index)"
                  />
                </div>
                <Textarea
                  class="border focus:bg-green-100 p-3"
                  v-model="body.subtitle"
                  rows="5"
                  cols="100"
                />
              </div>
              <div
                class="card border-t flex my-3 py-2 w-full flex-col gap-y-2 justify-center"
              >
                <div class="flex gap-3 items-center">
                  <p class="">รายละเอียด</p>
                  <Button
                    class="bg-yellow-500 py-1 text-white"
                    icon="pi pi-plus-circle"
                    @click="addDetail(index)"
                  />
                </div>
                <div v-for="(detail, detailIndex) in body.detail" :key="detailIndex">
                  <div class="flex">
                    <Textarea
                      class="border focus:bg-green-100 p-3"
                      v-model="body.detail[detailIndex]"
                      rows="5"
                      cols="100"
                    />
                    <Button
                      v-if="body.detail[detailIndex] === ''"
                      class="bg-red-500 py-1 text-white"
                      icon="pi pi-minus-circle"
                      @click="deleteDetail(index, detailIndex)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button label="เพิ่มหัวข้อใหม่" class="px-2 py-1 bg-orange-500 text-white" @click="addBody" />
          </div>
        </div>
        <div class="py-10 w-full flex flex-col justify-center items-center border self-center">
          <ConfirmPopup group="headless">
            <template #container="{ message, acceptCallback, rejectCallback }">
              <div class="border-round p-3">
                <span>{{ message.message }}</span>
                <div class="flex align-items-center gap-2 mt-3">
                  <Button class="px-2 py-1 rounded text-white bg-green-500" label="ยืนยัน" @click="acceptCallback" size="small"></Button>
                  <Button
                    label="ยกเลิก"
                    outlined
                    @click="rejectCallback"
                    severity="secondary"
                    size="small"
                    text
                    class="px-2 py-1 rounded bg-red-400 text-white"
                  ></Button>
                </div>
              </div>
            </template>
          </ConfirmPopup>
          <div class="card flex justify-content-center">
            <Button @click="requireConfirmation($event)" :loading="loading" label="บันทึก" class="px-10 py-4 rounded bg-green-600 text-white" size="large"></Button>
          </div>
        </div>
        </div>
      </Dialog>

      <Dialog
        v-model:visible="isNew"
        modal
        header=" "
        :style="[
          { width: '100%' },
          { 'padding-left': '10rem' },
          { 'padding-right': '10rem' },
        ]"
      >
      <div class="flex flex-col items-center">
        
        <div class="w-full h-full overflow-y-auto">
            <div>
                <InputText
                class="text-center w-full font-bold text-xl px-2 py-2 focus:bg-green-100 border"
                v-model="newContract.contract_name"
                placeholder="ชื่อสัญญา"
                required
            />
            </div>
            <div>
                <InputText
                class="text-center w-full font-semibold text-lg px-2 py-2 focus:bg-green-100 border"
                v-model="newContract.remark"
                placeholder="คำอธิบายสัญญา"
            />
            </div>
            <div class="flex flex-col w-full gap-y-2 bg-blue-300 px-10 shadow-md justify-center items-center my-10 py-5">
                <p class="text-xl">รายละเอียดบริษัท</p>
                <InputText
                    class="text-center w-full font-bold px-2 py-2 focus:bg-green-100 border"
                    v-model="newContract.contractor.name"
                    placeholder="ชื่อบริษัท"
                    required
                />
                <InputText
                    class="text-center w-full font-bold px-2 py-2 focus:bg-green-100 border"
                    v-model="newContract.contractor.address"
                    placeholder="ที่อยู่บริษัท"
                    required
                />
                <InputText
                    class="text-center w-full font-bold px-2 py-2 focus:bg-green-100 border"
                    v-model="newContract.contractor.tax_id"
                    placeholder="เลขประจำผู้เสียภาษี"
                    required
                />
            </div>
          <div class="flex flex-col gap-y-2 bg-slate-100 px-10 shadow-md justify-center items-center mb-10 py-5">
            <InputText
                class="text-center font-bold text-xl px-2 py-2 focus:bg-green-100 border"
                v-model="newContract.contract_code"
                placeholder="รหัสสัญญา (เช่น HMNL)"
                required
            />
            <div v-for="(head, headIndex) in newContract.contract_head"
            :key="headIndex"
            class="flex gap-2 justify-center items-center w-full"
            >
            <InputText
                class="text-center font-bold text-xl px-2 py-2 w-full focus:bg-green-100 border"
                v-model="newContract.contract_head[headIndex]"
                placeholder="หัวเอกสาร"
                />
            <Button class="text-red-500 hover:line-through p-0 m-0" v-if="headIndex!==0" icon="pi pi-times" @click="removeNewHead(headIndex)" />
            </div>
            <Button class="bg-orange-500 text-white px-2 py-1" label="เพิ่มหัวสัญญา" @click="addNewHead()" />
          </div>
          <div class="border py-5 flex w-full my-3 flex-col justify-center items-center">
            <div class="card">
              <Textarea
                class="p-3"
                :class="!sensitiveNewCheck ? 'border-red-500 border focus:bg-red-100' : 'border focus:bg-green-100'"
                v-model="newContract.contract_sub_head"
                placeholder="คำนำเอกสาร"
                rows="5"
                cols="100"
              />
            </div>
            <p :class="!sensitiveNewCheck ? 'text-red-500' : 'text-green-500' ">
              *หมายเหตุ* date แทนวันที่สร้างสัญญา, partner_name แทนชื่อลูกค้า (จำเป็นต้องระบุตามตัวแปรที่กำหนด)
            </p>
          </div>
          <div
            class="flex flex-col py-5 mt-4 gap-y-4 border justify-center w-full items-center"
          >
            <div
              v-for="(body, index) in newContract.body"
              class="card px-5 py-5 border shadow-md rounded flex flex-col justify-center items-center"
              :key="index"
            >
              <div
                class="card flex flex-col gap-2 my-2 w-full justify-center items-center"
              >
                <div class="flex justify-center items-center gap-2 w-full">
                    <label for="title"
                  ><strong>หัวข้อ {{ index + 1 }}</strong></label
                >
                  <Button class="text-red-500 self-end" icon="pi pi-times" @click="deleteNewBody(index)" />
                </div>
                <InputText
                    class="text-center px-2 py-2 w-full focus:bg-green-100 border"
                    v-model="body.title"
                  />
              </div>
              
              <div class="card border-t flex w-full my-3 flex-col justify-center">
                <div class="flex my-2 gap-3 items-center">
                  <p class="">หัวข้อรอง (ไม่บังคับ)</p>
                </div>
                <Textarea
                  class="border focus:bg-green-100 p-3"
                  v-model="body.subtitle"
                  rows="5"
                  cols="100"
                />
              </div>
              <div
                class="card border-t flex my-3 py-2 w-full flex-col gap-y-2 justify-center"
              >
                <div class="flex gap-3 items-center">
                  <p class="">รายละเอียด</p>
                  <Button
                    class="bg-yellow-500 py-1 text-white"
                    icon="pi pi-plus-circle"
                    @click="addNewDetail(index)"
                  />
                </div>
                <div v-for="(detail, detailIndex) in body.detail" :key="detailIndex">
                  <div class="flex">
                    <Textarea
                      class="border focus:bg-green-100 p-3"
                      v-model="body.detail[detailIndex]"
                      rows="5"
                      cols="100"
                    />
                    <Button
                      v-if="body.detail[detailIndex] === ''"
                      class="bg-red-500 py-1 text-white"
                      icon="pi pi-minus-circle"
                      @click="deleteNewDetail(index, detailIndex)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button label="เพิ่มหัวข้อใหม่" class="px-2 py-1 bg-orange-500 text-white" @click="addNewBody" />
          </div>
          
        </div>
        <div class="py-10 w-full flex flex-col justify-center items-center border self-center">
          <Toast />
          <ConfirmPopup group="headless">
            <template #container="{ message, acceptCallback, rejectCallback }">
              <div class="border-round p-3">
                <span>{{ message.message }}</span>
                <div class="flex align-items-center gap-2 mt-3">
                  <Button class="px-2 py-1 rounded text-white bg-green-500" label="ยืนยัน" @click="acceptCallback" size="small"></Button>
                  <Button
                    label="ยกเลิก"
                    outlined
                    @click="rejectCallback"
                    severity="secondary"
                    size="small"
                    text
                    class="px-2 py-1 rounded bg-red-400 text-white"
                  ></Button>
                </div>
              </div>
            </template>
          </ConfirmPopup>
          <div class="card flex justify-content-center">
            <Button @click="requireNewConfirmation($event)" :loading="loading" label="บันทึก" class="px-10 py-4 rounded bg-green-600 text-white" size="large"></Button>
          </div>
        </div>
        </div>
      </Dialog>

      <Dialog
      v-model:visible="isPartner"
      modal
      header=" "
      :style="[
        { width: '100%' },
        { 'padding-left': '10rem' },
        { 'padding-right': '10rem' },
      ]"
    >
    <div class="flex flex-col items-center">
      <div class="w-full h-full overflow-y-auto">
        <div class="card flex justify-content-center">
            <Dropdown v-model="selectedContractCode" :options="baseList" optionLabel="contract_name" placeholder="เลือกสัญญา" checkmark :highlightOnSelect="false" class="w-full md:w-14rem" />
        </div>
        <Button @click="createContractPartner" label="สร้าง" />
      </div>
      </div>
    </Dialog>

      <aside>
        <ContractDoc :base="base" />
      </aside>

      <ContractOrder @genContract="genContractPartner" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import ContractTable from "../components/Contracts/ContractTable.vue";
import ContractOrder from "../components/Contracts/ContractOrder.vue";
import ContractDoc from "../components/ContractDoc.vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import axios from "axios";

onMounted(()=>{
    getListBaseContract()
})

const confirm = useConfirm()
const toast = useToast();
const loading = ref(false)
const isNew = ref(false)
const base = ref({});
const partnerContract = ref({})
const isPartner = ref(false)
const selectedContractCode = ref()
const baseList = ref()

const genContractPartner = (value) => {
    isPartner.value = true
    partnerContract.value = value
}

const getListBaseContract = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_CONTRACT}/HaveplaceNoCapital/GetAllContractByCode`)
        if(response.data.status){
            baseList.value = response.data.data
            console.log( baseList.value)
        }
    }
    catch (err) {
        console.log(err)
    }
}

const createContractPartner = async () => {
    const data = {
        orderId: selectedContractCode.value._id,
        name: selectedContractCode.value.contract_code,
        partner_id: partnerContract.value.partner_id,
        partner_name: partnerContract.value.partner_name,
        partner_address: `${partnerContract.value.partner_address} ${partnerContract.value.partner_district} ${partnerContract.value.partner_amphure} ${partnerContract.value.partner_province} ${partnerContract.value.partner_postcode}`,
        partner_signature: partnerContract.value.partner_signature
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_CONTRACT}/HaveplaceNocapital/createCode`,
            data
        )
        if(response.data){
            console.log(response.data)
            isPartner.value = false
            alert('success!')
        }
    }
    catch(err){
        console.log(err)
        isPartner.value = false
    }
}

const sensitiveCheck = computed(()=>{
    if(!base.value.contract_sub_head.includes('partner_name') || !base.value.contract_sub_head.includes('date')){
        return false
    } else {
        return true
    }
})

const sensitiveNewCheck = computed(()=>{
    if(!newContract.value.contract_sub_head.includes('partner_name') || !newContract.value.contract_sub_head.includes('date')){
        return false
    } else {
        return true
    }
})

const newContract_body = ref({
    no: '',
    title: '',
    subtitle: '',
    detail: ['']
})

const newContract_signature = ref([
    {
        name: '',
        position: '',
        role: '',
        sign: '',
        stamp: false
    }
])

const newContract = ref({
    contract_code: '',
    contract_name: '',
    contract_head: [''],
    contract_sub_head: '(ตัวอย่าง) สัญญาฉบับนี้จัดทำขึ้น ณ ....สถานที่ทำสัญญา.... เมื่อวันที่ date ระหว่าง ....ชื่อบริษัท.... ทะเบียนบริษัทเลขที่ ....เลขประจำตัวผู้เสียภาษี.... สำนักงานใหญ่ตั้งอยู่ ....ที่อยู่บริษัท.... ซึ่งต่อไปในสัญญาฉบับนี้ เรียกว่า “บริษัทฯ” ฝ่ายหนึ่งกับ partner_name ซึ่งต่อไปนี้เรียกว่า “ผู้เปิดศูนย์” ในการให้บริการตามแผนการตลาดของ บริษัทฯ การรับสมัครสมาชิก/การให้บริการสมาชิก การขายสินค้าทุกประเภท และการบริการทุกประเภท โดยบริษัทฯ เป็นศูนย์กลางในการให้ข้อมูล และประสานงาน ทั้งสองฝ่ายตกลงทำสัญญากันดังมีข้อความต่อไปนี้',
    body: [
        {
            no: '1',
            title: '',
            subtitle: '',
            detail: [''] 
        }
    ],
    contractor: {
        address: '',
        name: '',
        stamp: null,
        tax_id: '',
        tel: '',
        signature: []
    },
    remark: ''
})

const addNewHead = () => {
    newContract.value.contract_head.push("")
}
const addHead = () => {
    base.value.contract_head.push("")
}

const removeNewHead = (index) => {
    newContract.value.contract_head.splice(index, 1)
}
const removeHead = (index) => {
    base.value.contract_head.splice(index, 1)
}

const visible = ref(false);

const baseBody = computed(() => {
  return base.value.body;
});

const createContract = (value) => {
    base.value = value;
    isNew.value = true
}

const selectedContract = (value) => {
  base.value = value;
  visible.value = true;
};

const seeContract = (value) => {
  base.value = value;
};

const addSubtitle = (index) => {
  base.value.body[index].subtitle = "";
};

const addNewSubtitle = (index) => {
    newContract.value.body[index].subtitle = ""
}

const addBody = () => {
    base.value.body.push(newContract_body.value)
}

const addNewBody = () => {
    newContract.value.body.push(newContract_body.value)
}

const addDetail = (index) => {
  base.value.body[index].detail.push("");
};

const addNewDetail = (index) => {
    newContract.value.body[index].detail.push("");
};

const deleteDetail = (index, detailIndex) => {
  base.value.body[index].detail.splice(detailIndex, 1);
};

const deleteNewDetail = (index, detailIndex) => {
    newContract.value.body[index].detail.splice(detailIndex, 1);
};

const deleteBody = (index) => {
    base.value.body.splice(index, 1)
}

const deleteNewBody = (index) => {
    newContract.value.body.splice(index, 1)
}

const requireConfirmation = (event) => {
    confirm.require({
        target: event.currentTarget,
        group: 'headless',
        message: 'Save your current process?',
        accept: () => {
            updateContract()
        },
        reject: () => {
            toast.add({severity:'error', summary:'Rejected', detail:'ยกเลิกการแก้ไขสัญญา', life: 3000});
            visible.value = false
        }
    });
}

const requireNewConfirmation = (event) => {
    confirm.require({
        target: event.currentTarget,
        group: 'headless',
        message: 'Save your current process?',
        accept: () => {
           createNewBaseContract()
        },
        reject: () => {
            toast.add({severity:'error', summary:'Rejected', detail:'ยกเลิกการสร้างสัญญา', life: 3000});
            isNew.value = false
        }
    });
}

const createNewBaseContract = async () => {
    const payload = {
        contractor: newContract.value.contractor, //*
        contract_name: newContract.value.contract_name, //*
        contract_head: newContract.value.contract_head,
        contract_sub_head: newContract.value.contract_sub_head,
        contract_code: newContract.value.contract_code,
        contractor: newContract.value.contractor,
        body: newContract.value.body,
        remark: newContract.value.remark //*
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_CONTRACT}/HaveplaceNocapital/create`,
            payload
        )
        if(response.data){
            console.log(response.data)
            loading.value = false
            toast.add({severity:'info', summary:'Confirmed', detail:'สร้างสัญญาสำเร็จ', life: 3000});
            isNew.value = false
        }
    }
    catch (err) {
        loading.value = false
        isNew.value = false
        toast.add({severity:'error', summary:'สร้างสัญญาล้มเหลว', detail:err.response.data.message, life: 3000});
        console.log(err)
    }
}

const updateContract = async () => {
    loading.value = true
    const id = base.value._id
    const payload = {
        contractor: base.value.contractor,
        contract_name: base.value.contract_name,
        contract_head: base.value.contract_head,
        contract_sub_head: base.value.contract_sub_head,
        contract_code: base.value.contract_code,
        body: base.value.body,
        remark: base.value.remark
    }
    try {
        const response = await axios.put(`${import.meta.env.VITE_CONTRACT}/HaveplaceNocapital/EditContract/${id}`,
            payload
        )
        if(response.data){
            console.log(response.data)
            loading.value = false
            toast.add({severity:'info', summary:'Confirmed', detail:'แก้ไขสัญญาสำเร็จ', life: 3000});
            visible.value = false
        }
    }
    catch(err){
        loading.value = false
        console.log(err)
        visible.value = false
        toast.add({severity:'error', summary:'Rejected', detail:'แก้ไขสัญญาล้มเหลว', life: 3000});
    }
}

</script>
<style scoped></style>
