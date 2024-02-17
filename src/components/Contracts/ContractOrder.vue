
<template>
    <Toast />
    <ConfirmPopup></ConfirmPopup>
    <div class="card">
        <Button class="px-2 my-2 text-green-800 hover:bg-green-300" icon="pi pi-replay" @click="getContractOrders()" />
        <DataView :value="contracts" paginator :rows="6">
            <template #list="">
                <div class="grid grid-nogutter">
                    <div v-for="(contract, index) in contracts" :key="index" class="col-12 border cursor-pointer hover:border-green-400 hover:shadow-md">
                        <div class="flex flex-col sm:flex-row sm:items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-secondary text-sm">{{ contract.createdAt }}</span>
                                    </div>
                                    <div class="surface-100 p-1" style="border-radius: 30px">
                                        <div class="surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-900 font-medium text-sm">{{ contract.partner_name }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col md:items-end gap-5">
                                    <span class="text-xl font-semibold text-900">{{ contract.contract_type }}</span>
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button 
                                            icon="pi pi-trash"
                                            class="flex-auto md:flex-initial white-space-nowrap text-red-500"
                                            @click="confirm2($event, contract._id)"
                                        ></Button>
                                        <Button 
                                            label="สร้างสัญญา" 
                                            class="flex-auto md:flex-initial white-space-nowrap bg-orange-500 text-white px-2 py-1 rounded"
                                            @click="genContract(contract)"
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
    getContractOrders()
});

const emit = defineEmits(['genContract'])

const products = ref()
const contracts = ref()
const selectedContract = ref({})

const genContract = (data) => {
    emit('genContract', data)
}

const getContractOrders = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_PARTNER}/partner/GetAllPartner`)
        if(response.data){
            console.log(contracts.value)
            contracts.value = response.data.data.filter(item=>item.status==='new')
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
        const response = await axios.delete(``)
        if(response.data){
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'ลบสัญญาสำเร็จ', life: 3000 });
        }
    }
    catch(err){
        console.log(err)
    }
}

</script>
