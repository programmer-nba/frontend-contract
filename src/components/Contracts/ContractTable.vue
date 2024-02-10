
<template>
    <Toast />
    <ConfirmPopup></ConfirmPopup>
    <div class="card">
        <Button class="px-2 my-2 text-green-800 hover:bg-green-300" icon="pi pi-plus" label="สร้างสัญญาใหม่" @click="createNewContract()" />
        <DataView :value="contracts" paginator :rows="6">
            <template #list="">
                <div class="grid grid-nogutter">
                    <div v-for="(contract, index) in contracts" :key="index" class="col-12 border cursor-pointer hover:border-green-400 hover:shadow-md" @click="seeContract(contract)">
                        <div class="flex flex-col sm:flex-row sm:items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <div class="md:w-5rem relative">
                                
                            </div>
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-secondary text-sm">{{ contract.contract_code }}</span>
                                        <div class="text-lg font-medium text-900 mt-2 w-60"><p class="truncate">{{ contract.contract_head[0] }}</p></div>
                                    </div>
                                    <div class="surface-100 p-1" style="border-radius: 30px">
                                        <div class="surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-900 font-medium text-sm">{{ contract.contractor.name }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col md:items-end gap-5">
                                    <span class="text-xl font-semibold text-900">{{ contract.remark }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button 
                                            icon="pi pi-trash"
                                            class="flex-auto md:flex-initial white-space-nowrap text-red-500"
                                            @click="confirm2($event, contract._id)"
                                        ></Button>
                                        <Button 
                                            label="แก้ไข" 
                                            class="flex-auto md:flex-initial white-space-nowrap bg-orange-500 text-white px-2 py-1 rounded"
                                            @click="selectContract(contract)"
                                        ></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from "vue";
import { ProductService } from '../../service/ProductService';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
    getContractsBase()
});

const emit = defineEmits(['selectedContract','seeContract', 'createContract'])

const products = ref()
const contracts = ref()
const selectedContract = ref({})

const getContractsBase = async () => {
    try {
        const response = await axios.get(`https://api.nbadigital.tech/contract/HaveplaceNocapital/GetAllContract`)
        if(response.data){
            contracts.value = response.data.data
            console.log(contracts.value)
        }
    }
    catch (err) {
        console.log(err)
    }
}

const confirm2 = (event, id) => {
    confirm.require({
        target: event.currentTarget,
        message: 'ต้องการลบสัญญานี้หรือไม่?',
        icon: 'pi pi-info-circle',
        rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
        acceptClass: 'p-button-danger p-button-sm',
        rejectLabel: 'ยกเลิก',
        acceptLabel: 'ลบ',
        accept: () => {
            deleteContract(id)
        },
        reject: () => {
            
        }
    });
};

const deleteContract = async (id) => {
    try {
        const response = await axios.delete(`https://api.nbadigital.tech/contract/HaveplaceNocapital/deleteContractBase/${id}`)
        if(response.data){
            toast.add({ severity: 'info', summary: 'สำเร็จ', detail: 'ลบสัญญาแล้ว', life: 3000 });
            getContractsBase()
        }
    }
    catch(err){
        console.log(err)
        toast.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'ลบสัญญาไม่สำเร็จ', life: 3000 });
    }
}

const selectContract = (contract) => {
    selectedContract.value = contract
    emit('selectedContract', contract)
}

const seeContract = (contract) => {
    selectedContract.value = contract
    emit('seeContract', contract)
}

const createNewContract = () => {
    emit('createContract', {})
}

</script>
