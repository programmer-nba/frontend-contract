<template>
    <div>
        <div class="mt-10 mx-5 border flex px-5 py-5 justify-center gap-8">
            <ContractTable @selectedContract="selectedContract" @seeContract="seeContract"/>
            
            <Dialog v-model:visible="visible" modal header=" " :style="[{ width: '100%' },{ 'padding-left': '10rem' },{ 'padding-right': '10rem' }]">
                <div class="w-full h-full overflow-y-auto">
                    <div class="flex flex-col gap-y-2 border justify-center items-center py-5">
                        <span>( <span>{{ base.contract_code }}</span> )</span>
                        <div class="card w-full px-5" v-for="(head, headIndex) in base.contract_head" :key="headIndex">
                            <div class="card flex flex-col gap-1 w-full justify-center items-center">
                                <InputText class="text-center font-bold text-xl px-2 py-2 w-full focus:bg-green-100 border" v-model="base.contract_head[headIndex]" />
                            </div>
                        </div>
                    </div>
                    <div class="border py-5 flex w-full my-3 flex-col justify-center items-center">
                        <div class="card">
                            <Textarea class="border focus:bg-green-100 p-3" v-model="base.contract_sub_head" rows="5" cols="100" />
                        </div>
                        <p class="text-red-500">*ห้ามแก้ไขข้อมูล date, tax_id, address, partner_name</p>
                    </div>
                    <div class="flex flex-col py-5 mt-4 gap-y-4 border justify-center w-full items-center">
                        <div v-for="(body, index) in baseBody" class="card px-5 py-5 border shadow-md rounded flex flex-col justify-center items-center" :key="index">
                            <div class="card flex flex-col gap-2 my-2 w-full justify-center items-center">
                                <label for="title"><strong>หัวข้อ {{ index+1 }}</strong></label> 
                                <InputText class="text-center px-2 py-2 w-full focus:bg-green-100 border" v-model="body.title" />
                            </div>
                            <div class="card border-t flex w-full my-3 flex-col justify-center">
                                <div class="flex my-2 gap-3 items-center">
                                    <p class="">หัวข้อรอง</p>
                                    <Button class="bg-yellow-500 py-1 text-white" icon="pi pi-plus-circle" @click="addSubtitle(index)"/>
                                </div>
                                <Textarea class="border focus:bg-green-100 p-3" v-model="body.subtitle" rows="5" cols="100" />
                            </div>
                            <div class="card border-t flex my-3 py-2 w-full flex-col gap-y-2 justify-center">
                                <div class="flex gap-3 items-center">
                                    <p class="">รายละเอียด</p>
                                    <Button class="bg-yellow-500 py-1 text-white" icon="pi pi-plus-circle" @click="addDetail(index)"/>
                                </div>
                                <div v-for="(detail, detailIndex) in body.detail" :key="detailIndex">
                                    <div class="flex">
                                        <Textarea class="border focus:bg-green-100 p-3" v-model="body.detail[detailIndex]" rows="5" cols="100" />
                                        <Button v-if="body.detail[detailIndex] ===''" class="bg-red-500 py-1 text-white" icon="pi pi-minus-circle" @click="deleteDetail(index,detailIndex)"/>
                                    </div>
                                </div>
                            </div>
                            <Button v-if="body === baseBody[baseBody.lenght-1]" label="+" @click="addBody()" />
                        </div>
                    </div>
                </div>
            </Dialog>
            
            <aside>
                <ContractDoc :base="base" />
            </aside>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import ContractTable from '../components/Contracts/ContractTable.vue';
import ContractDoc from '../components/ContractDoc.vue';
import Partners from '../components/Partners.vue'

const base = ref({})
const visible = ref(false)
const baseBody = computed(()=>{
    return base.value.body
})

const selectedContract = (value) => {
    base.value = value
    visible.value = true
}

const seeContract = (value) => {
    base.value = value
}

const addSubtitle = (index) => {
    base.value.body[index].subtitle = "-"
}

const addDetail = (index) => {
    base.value.body[index].detail.push("")
}

const deleteDetail = (index, detailIndex) => {
    base.value.body[index].detail.splice(detailIndex, 1)
}
</script>
<style scoped>
    
</style>