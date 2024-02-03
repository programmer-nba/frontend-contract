
<template>
    <div class="card">
        {{ contracts }}
        <DataTable class="p-5" showGridlines :value="contracts" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2 p-2 rounded bg-sky-300">
                    <span class="text-xl text-surface-900 dark:text-surface-0 font-bold">ประเภทสัญญา</span>
                    <Button icon="pi pi-refresh" rounded raised />
                </div>
            </template>
            <Column class="border p-2 text-center" header="ชื่อบริษัท">
                <template #body="contract">
                    <div class="flex gap-2 items-center">
                        <span>{{ contract.data.partner_company_name }}</span>
                    </div>
                </template>
            </Column>
            <Column class="border p-2" header="เบอร์โทรบริษัท">
                <template #body="contract">
                   {{ contract.data.partner_company_phone }}
                </template>
            </Column>
            <Column class="border p-2" header="สถานะ">
                <template #body="contract">
                   <span class="px-2 rounded-full" :class="(contract.data.status_appover==='รออนุมัติ' ? 'bg-orange-500' : '')"></span>{{ contract.data.status_appover }}
                </template>
            </Column>
            <Column class="border p-2" header="ร่างสัญญา">
                <template #body="contract">
                    <router-link :to="{ name: 'ContractId', params: { id: `${contract.data._id}` }}">
                        <Button class="p-2 rounded bg-orange-500 text-white" label="ร่างสัญญา" />
                    </router-link>
                </template>
            </Column>
            
            <template #footer> จำนวนพาร์ทเนอร์ทั้งหมด {{ contracts ? contracts.length : 0 }}</template>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import axios from 'axios'

const contracts = ref();

const contractHead = ref({
    name: 'สัญญาว่าจ้างเขียนโปรแกรม',
    address: [
        'บริษัท ดิจิตอล ดิเวลล็อปเปอร์ เซอร์วิส เซ็นเตอร์ จำกัด',
        '103 หมู่ 4 ถนนรอบเมืองเชียงใหม่ ตำบลสุเทพ',
        'อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200'
    ],
    date: null,
    total_price: {
        amount: 0,
        text: ''
    },
    p1_price: {
        amount: 0,
        text: ''
    },
    p2_price: {
        amount: 0,
        text: ''
    },
    sorceCode_plus: {
        amount: 0,
        text: ''
    },
    penalty_on2: {
        amount: 0,
        text: ''
    },
    penalty_onCancle: {
        amount: 0,
        text: ''
    }

})

const getContracts = async () => {
    try{
        const response = await axios.get(`https://api.nbadigital.tech/contract/all`)
        if(response.data.status){
            contracts.value = response.data.data
            console.log(contracts.value)
        } else {
            contracts.value = []
        }
    }
    catch(err){
        contracts.value = []
        console.log(err)
    }
}

const imageSrc = (id) => {
    return `https://drive.google.com/thumbnail?id=${id}`
}

onMounted(()=>{
    getContracts()
})

</script>
